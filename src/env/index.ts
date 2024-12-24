import { config } from "dotenv";
import z from "zod";

const envPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
config({ path: envPath });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(`❌ Invalid environment variables`, _env.error.format);

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
