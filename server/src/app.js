import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { authMiddleware, requireRole } from "./middleware/auth.js";
import { errorHandler, notFoundMiddleware } from "./middleware/errors.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { cartRoutes } from "./routes/cartRoutes.js";
import { orderRoutes } from "./routes/orderRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { wishlistRoutes } from "./routes/wishlistRoutes.js";

export const app = express();

app.disable("x-powered-by");
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin(origin, callback) {
    const allowed = !origin || origin === env.clientUrl || /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
    callback(allowed ? null : new Error("Origin is not allowed by CORS."), allowed);
  },
  credentials: true
}));
app.use(express.json({ limit: "100kb" }));

app.get("/api/health", (_req, res) => {
  res.json({ success: true, message: "Élan Atelier API is ready.", data: { mode: env.mongoUri ? "mongodb" : "seeded-demo", timestamp: new Date().toISOString() } });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", authMiddleware, cartRoutes);
app.use("/api/wishlist", authMiddleware, wishlistRoutes);
app.use("/api/orders", authMiddleware, orderRoutes);
app.use("/api/admin", authMiddleware, requireRole("admin"), adminRoutes);

app.use(notFoundMiddleware);
app.use(errorHandler);
