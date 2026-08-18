import crypto from "node:crypto";
import { Router } from "express";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { publicUser, store } from "../data/store.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../validation/schemas.js";
import { ApiError } from "../utils/apiError.js";

export const authRoutes = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: { success: false, message: "Too many sign-in attempts. Please try again shortly.", errors: [] }
});

function issueToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "7d" });
}

authRoutes.post("/register", authLimiter, validate(registerSchema), async (req, res) => {
  const exists = store.users.some((user) => user.email === req.body.email);
  if (exists) throw new ApiError(409, "An account already exists for this email.");

  const user = {
    id: `usr-${crypto.randomUUID()}`,
    name: req.body.name,
    email: req.body.email,
    passwordHash: await bcrypt.hash(req.body.password, 10),
    role: "customer",
    addresses: []
  };
  store.users.push(user);
  res.status(201).json({ success: true, message: "Welcome to Élan Atelier.", data: { user: publicUser(user), token: issueToken(user) } });
});

authRoutes.post("/login", authLimiter, validate(loginSchema), async (req, res) => {
  const user = store.users.find((candidate) => candidate.email === req.body.email);
  if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
    throw new ApiError(401, "Email or password is incorrect.");
  }
  res.json({ success: true, message: "Welcome back.", data: { user: publicUser(user), token: issueToken(user) } });
});
