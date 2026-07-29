import mongoose from "mongoose";
import bcrypt from "bcryptjs";
//
import User from "../models/user.model.js";
import jwtSign from "../utils/jwtSign.js";

// apply atomic transaction
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession(); // this locks the database to perform a transaction
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    // hash password
    const salt = await bcrypt.genSalt(10); // default 10
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create([{ name, email, password: hashedPassword }], {
      session,
    });

    // create token
    const token = jwtSign({ userId: user[0]._id, email: email });

    // commit the transaction
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Email or password is incorrect");
      error.statusCode = 401; // unauthorized
      throw error;
    }

    const token = jwtSign({ userId: user._id, email: email });

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error); // pass error to the error middleware
  }
};

export const signOut = async (req, res, next) => {
  try {
    const { userId } = req.user;

    res.status(200).json({
      success: true,
      message: "User signed out successfully",
      data: {
        userId,
      },
    });
  } catch (error) {
    next(error);
  }
};
