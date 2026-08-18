import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  variantId: { type: mongoose.Schema.Types.ObjectId, required: true },
  nameSnapshot: { type: String, required: true },
  skuSnapshot: { type: String, required: true },
  priceSnapshot: { type: Number, required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  items: { type: [orderItemSchema], required: true },
  totals: {
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number
  },
  shippingAddress: { type: mongoose.Schema.Types.Mixed, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid", "failed", "refunded"], default: "pending", index: true },
  orderStatus: { type: String, enum: ["confirmed", "processing", "shipped", "delivered", "cancelled"], default: "confirmed", index: true }
}, { timestamps: true });

export const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
