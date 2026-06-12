import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("3000"),
  MONGO_URI: z.string().url(),
  WORKER_ID: z
    .string()
    .default(() => `worker-${Math.random().toString(36).substr(2, 9)}`),
  POLL_INTERVAL_MS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("5000"),
  LOCK_DURATION_MS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("300000"),
  MAX_CONCURRENT_JOBS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("10"),
});

const envParseResult = envSchema.safeParse(process.env);

if (!envParseResult.success) {
  console.error(
    "Invalid Environment Configurations",
    JSON.stringify(envParseResult),
  );
  process.exit(1);
}

export const config = envParseResult.data;
