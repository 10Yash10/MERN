import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(3, "Username must be 3+ characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be 6+ characters"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be 6+ characters"),
});
