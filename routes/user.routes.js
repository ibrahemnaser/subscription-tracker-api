import { Router } from "express";
// controllers
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", (req, res) => res.send("create user"));
userRouter.put("/:id", (req, res) => res.send("Update user"));
userRouter.delete("/:id", (req, res) => res.send("Delete user"));

export default userRouter;
