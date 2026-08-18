import { Router } from "express";
import { store } from "../data/store.js";
import { validate } from "../middleware/validate.js";
import { createOrder } from "../services/orderService.js";
import { orderSchema } from "../validation/schemas.js";

export const orderRoutes = Router();

orderRoutes.get("/my", (req, res) => {
  const orders = store.orders.filter((order) => order.userId === req.user.id);
  res.json({ success: true, message: "Orders loaded.", data: orders });
});

orderRoutes.post("/", validate(orderSchema), (req, res) => {
  const order = createOrder({ userId: req.user.id, ...req.body });
  res.status(201).json({ success: true, message: "Your order is confirmed.", data: order });
});
