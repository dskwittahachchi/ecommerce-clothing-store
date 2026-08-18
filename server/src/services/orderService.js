import crypto from "node:crypto";
import { products } from "../data/products.js";
import { store } from "../data/store.js";
import { ApiError } from "../utils/apiError.js";

export function quoteOrder(items) {
  const snapshots = items.map((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    const variant = product?.variants.find((candidate) => candidate.id === item.variantId);
    if (!product || !variant) throw new ApiError(400, "One of the selected items is no longer available.");
    if (variant.stock < item.quantity) throw new ApiError(409, `${product.name} only has ${variant.stock} left in this option.`);
    return {
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      variant: `${variant.size} / ${variant.color}`,
      sku: variant.sku,
      quantity: item.quantity,
      unitPrice: product.basePrice,
      image: product.image
    };
  });

  const subtotal = Number(snapshots.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0).toFixed(2));
  const shipping = subtotal >= 150 ? 0 : 12;
  const tax = Number((subtotal * 0.08).toFixed(2));
  return { items: snapshots, totals: { subtotal, shipping, tax, total: Number((subtotal + shipping + tax).toFixed(2)) } };
}

export function createOrder({ userId, items, shippingAddress }) {
  const quote = quoteOrder(items);
  for (const item of quote.items) {
    const variant = products.find((product) => product.id === item.productId)?.variants.find((candidate) => candidate.id === item.variantId);
    variant.stock -= item.quantity;
  }

  const order = {
    id: `EL-${crypto.randomInt(11000, 99999)}`,
    userId,
    createdAt: new Date().toISOString(),
    ...quote,
    shippingAddress,
    paymentStatus: "paid",
    orderStatus: "confirmed",
    timeline: [
      { label: "Order confirmed", date: "Today", complete: true },
      { label: "In the atelier", date: "Preparing", complete: false },
      { label: "Shipped", date: "Next", complete: false },
      { label: "Delivered", date: "Estimated 4-6 days", complete: false }
    ]
  };
  store.orders.unshift(order);
  return order;
}
