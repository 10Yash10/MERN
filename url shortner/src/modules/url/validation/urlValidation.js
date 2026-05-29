import { z } from "zod";

const BLOCKED_ALIASES = [
  "admin",
  "login",
  "api",
  "health",
  "metrics",
  "dashboard",
  "root",
];

export const createUrlSchema = z.object({
  url: z
    .string()
    .url()
    .refine(
      (val) => {
        const parsed = new URL(val);

        return ["http:", "https:"].includes(parsed.protocol);
      },
      { message: "Only standard HTTP and HTTPS protocols are allowed" },
    ),

  customAlias: z
    .string()
    .min(4)
    .max(30)
    .regex(/^[a-zA-Z0-9-_]+$/, {
      message:
        "Only alphanumeric characters, hyphens, and underscores are allowed",
    })
    .transform((val) => val.toLowerCase())
    .refine((val) => !BLOCKED_ALIASES.includes(val), {
      message: "This custom identifier is a reserved keyword",
    })
    .optional(),

  expiresInHours: z.number().positive().max(8760).optional(),
});
