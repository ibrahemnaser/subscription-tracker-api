import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "../config/env.js";
import User from "../models/user.model.js";

const auth = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw new Error("No token passed!!");

    const decoded = jwt.verify(token, JWT_TOKEN);
    const user = await User.findById(decoded.userId);

    if (!user) throw new Error("Token not valid!!");

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};

export default auth;
