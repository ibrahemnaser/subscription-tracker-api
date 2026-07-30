import { Router } from "express";
// controllers
import {
  createSubscription,
  getUserSubscription,
} from "../controllers/subscription.controller.js";
// middlewares
import ensureOwnership from "../middlewares/authorization/ensureOwnership.js";
import resolveUserId from "../middlewares/authorization/resolveUserId.js";
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

subscriptionRouter.get("/user/me", auth, resolveUserId, getUserSubscription); // only validate
subscriptionRouter.get(
  "/user/:id",
  auth,
  ensureOwnership,
  resolveUserId,
  getUserSubscription,
); // pass id and validate

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ message: "Cancel one subscription" }),
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ message: "Get all upcoming renewals" }),
);

export default subscriptionRouter;
