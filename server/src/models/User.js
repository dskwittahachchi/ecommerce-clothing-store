import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  label: String,
  line1: String,
  line2: String,
  city: String,
  postalCode: String,
  country: String
}, { _id: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  role: { type: String, enum: ["customer", "admin"], default: "customer", index: true },
  addresses: [addressSchema]
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
