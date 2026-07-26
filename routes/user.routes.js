import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => res.send("Gett all users"));
userRouter.get("/:id", (req, res) => res.send("Gett user by id"));
userRouter.post("/", (req, res) => res.send("create user"));
userRouter.put("/:id", (req, res) => res.send("Update user"));
userRouter.delete("/:id", (req, res) => res.send("Delete user"));

export default userRouter;
