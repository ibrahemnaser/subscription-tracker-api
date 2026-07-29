import jwt from "jsonwebtoken";
import { JWT_EXPIRIES_IN, JWT_TOKEN } from "../config/env.js";

export default function jwtSign(payload) {
  return jwt.sign(payload, JWT_TOKEN, { expiresIn: JWT_EXPIRIES_IN });
}
