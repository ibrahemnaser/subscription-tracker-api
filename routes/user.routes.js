import { Router } from "express";
// controllers
import { getUser, getUsers } from "../controllers/user.controller.js";
// middlewares
import auth from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", auth, getUser);
userRouter.post("/", (req, res) => res.send("create user"));
userRouter.put("/:id", (req, res) => res.send("Update user"));
userRouter.delete("/:id", (req, res) => res.send("Delete user"));

export default userRouter;
