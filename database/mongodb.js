import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error("Database URI is not defined");
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Database connected on ${NODE_ENV} mode`);
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1);
  }
};

export default connectDB;
