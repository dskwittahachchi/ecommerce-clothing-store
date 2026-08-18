import { Router } from "express";
import { z } from "zod";
import { products } from "../data/products.js";
import { store } from "../data/store.js";
import { validate } from "../middleware/validate.js";
import { ApiError } from "../utils/apiError.js";

export const cartRoutes = Router();

const cartItemSchema = z.object({
  productId: z.string().min(1),
  variantId: z.string().min(1),
  quantity: z.number().int().min(1).max(10)
});

function enrichedCart(userId) {
  const items = store.carts.get(userId) || [];
  return items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    const variant = product?.variants.find((candidate) => candidate.id === item.variantId);
    return product && variant ? [{ ...item, product, variant }] : [];
  });
}

cartRoutes.get("/", (req, res) => {
  res.json({ success: true, message: "Bag loaded.", data: enrichedCart(req.user.id) });
});

cartRoutes.post("/items", validate(cartItemSchema), (req, res) => {
  const product = products.find((candidate) => candidate.id === req.body.productId);
  const variant = product?.variants.find((candidate) => candidate.id === req.body.variantId);
  if (!product || !variant) throw new ApiError(404, "This product option is no longer available.");
  if (variant.stock < req.body.quantity) throw new ApiError(409, "The requested quantity is not in stock.");

  const items = store.carts.get(req.user.id) || [];
  const existing = items.find((item) => item.productId === req.body.productId && item.variantId === req.body.variantId);
  if (existing) existing.quantity = Math.min(10, existing.quantity + req.body.quantity);
  else items.push(req.body);
  store.carts.set(req.user.id, items);
  res.status(201).json({ success: true, message: `${product.name} added to your bag.`, data: enrichedCart(req.user.id) });
});

cartRoutes.put("/items/:variantId", validate(z.object({ quantity: z.number().int().min(1).max(10) })), (req, res) => {
  const items = store.carts.get(req.user.id) || [];
  const item = items.find((candidate) => candidate.variantId === req.params.variantId);
  if (!item) throw new ApiError(404, "Bag item not found.");
  item.quantity = req.body.quantity;
  res.json({ success: true, message: "Bag updated.", data: enrichedCart(req.user.id) });
});

cartRoutes.delete("/items/:variantId", (req, res) => {
  const items = store.carts.get(req.user.id) || [];
  store.carts.set(req.user.id, items.filter((item) => item.variantId !== req.params.variantId));
  res.json({ success: true, message: "Item removed.", data: enrichedCart(req.user.id) });
});
