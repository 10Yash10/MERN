import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().transform((val) => parseInt(val, 10)),
  APP_BASE_URL: z.string().url(),
  MONGO_URI: z.string().url(),
  JWT_SECRET: z.string(),
  SESSION_SECRET: z.string(),
});

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success)
  console.error(
    "Invalid envionment configurations",
    JSON.stringify(envParseResult.error.format(), null, 2),
  );

export const config = envParseResult.data;
