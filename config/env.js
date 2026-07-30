import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

export const {
  PORT,
  NODE_ENV = "development",
  DB_URI,
  JWT_TOKEN,
  JWT_EXPIRIES_IN,
  ARCJET_KEY,
  ARCJET_ENV,
} = process.env;
