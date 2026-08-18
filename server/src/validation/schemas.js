import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(8)
});

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(8).max(100)
});

export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.string().min(1),
    variantId: z.string().min(1),
    quantity: z.number().int().min(1).max(10)
  })).min(1),
  shippingAddress: z.object({
    name: z.string().trim().min(2),
    email: z.email(),
    line1: z.string().trim().min(3),
    line2: z.string().trim().optional().default(""),
    city: z.string().trim().min(2),
    region: z.string().trim().min(2),
    postalCode: z.string().trim().min(3),
    country: z.string().trim().min(2)
  })
});

export const orderStatusSchema = z.object({
  status: z.enum(["confirmed", "processing", "shipped", "delivered", "cancelled"])
});
