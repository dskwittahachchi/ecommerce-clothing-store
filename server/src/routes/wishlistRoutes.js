import { Router } from "express";
import { products } from "../data/products.js";
import { store } from "../data/store.js";
import { ApiError } from "../utils/apiError.js";

export const wishlistRoutes = Router();

wishlistRoutes.get("/", (req, res) => {
  const ids = store.wishlists.get(req.user.id) || [];
  res.json({ success: true, message: "Wishlist loaded.", data: products.filter((product) => ids.includes(product.id)) });
});

wishlistRoutes.post("/:productId", (req, res) => {
  if (!products.some((product) => product.id === req.params.productId)) throw new ApiError(404, "Product not found.");
  const ids = store.wishlists.get(req.user.id) || [];
  const active = ids.includes(req.params.productId);
  store.wishlists.set(req.user.id, active ? ids.filter((id) => id !== req.params.productId) : [...ids, req.params.productId]);
  res.json({ success: true, message: active ? "Removed from your edit." : "Saved to your edit.", data: { active: !active } });
});
