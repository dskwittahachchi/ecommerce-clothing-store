import { Router } from "express";
import { products } from "../data/products.js";
import { store } from "../data/store.js";
import { validate } from "../middleware/validate.js";
import { orderStatusSchema } from "../validation/schemas.js";
import { ApiError } from "../utils/apiError.js";

export const adminRoutes = Router();

adminRoutes.get("/dashboard", (_req, res) => {
  const revenue = store.orders.filter((order) => order.paymentStatus === "paid").reduce((sum, order) => sum + order.totals.total, 0);
  const units = store.orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
  const lowStock = products.flatMap((product) => product.variants.filter((variant) => variant.stock <= 5).map((variant) => ({ product: product.name, ...variant })));
  res.json({
    success: true,
    message: "Dashboard loaded.",
    data: {
      metrics: { revenue: Number(revenue.toFixed(2)), orders: store.orders.length, units, conversion: 3.84 },
      orders: store.orders,
      lowStock,
      monthlyRevenue: [
        { month: "Mar", value: 12800 }, { month: "Apr", value: 16100 }, { month: "May", value: 14850 },
        { month: "Jun", value: 20300 }, { month: "Jul", value: 22400 }, { month: "Aug", value: 26840 }
      ]
    }
  });
});

adminRoutes.get("/products", (_req, res) => {
  res.json({ success: true, message: "Inventory loaded.", data: products });
});

adminRoutes.put("/orders/:id/status", validate(orderStatusSchema), (req, res) => {
  const order = store.orders.find((candidate) => candidate.id === req.params.id);
  if (!order) throw new ApiError(404, "Order not found.");
  order.orderStatus = req.body.status;
  res.json({ success: true, message: "Order status updated.", data: order });
});
