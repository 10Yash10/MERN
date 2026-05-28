import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "text"])
    .default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("3000"),
  MONGO_URI: z.string().url(),
  APP_BASE_URL: z.string().url(),
  RATE_LIMIT_WINDOW_MS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("900000"),
  RATE_LIMIT_MAX: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("100"),
});

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success) {
  console.error(
    "Invalid Environment Configuration",
    JSON.stringify(envParseResult.error.format(), null, 2),
  );
  process.exit(1);
}

export const config = envParseResult.data;
