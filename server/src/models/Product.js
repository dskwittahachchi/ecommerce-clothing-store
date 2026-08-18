import mongoose from "mongoose";

const variantSchema = new mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  stock: { type: Number, required: true, min: 0 }
}, { _id: true });

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: "text" },
  slug: { type: String, required: true, unique: true, index: true },
  description: { type: String, required: true },
  category: { type: String, required: true, index: true },
  collection: String,
  images: [{ url: String, alt: String }],
  basePrice: { type: Number, required: true, min: 0 },
  variants: [variantSchema],
  active: { type: Boolean, default: true, index: true }
}, { timestamps: true });

productSchema.index({ name: "text", description: "text" });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
