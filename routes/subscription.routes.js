import { Router } from "express";
// controllers
import { createSubscription } from "../controllers/subscription.controller.js";
// middlewares
import auth from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ message: "Get all subscriptions" }));

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ message: "Get one subscription" }),
);

subscriptionRouter.post("/", auth, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ message: "Update one subscription" }),
);

subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ message: "Delete one subscription" }),
);

subscriptionRouter.get("/user/:id", (req, res) =>
  res.send({ message: "Get user subscriptions" }),
);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ message: "Cancel one subscription" }),
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ message: "Get all upcoming renewals" }),
);

export default subscriptionRouter;
