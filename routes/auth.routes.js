import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send({
    message: "User created",
  });
});

authRouter.post("/sign-in", (req, res) => {
  res.send({
    message: "User signed in",
  });
});

authRouter.post("/sign-out", (req, res) => {
  res.send({
    message: "User signed out",
  });
});

export default authRouter;
