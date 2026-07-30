import { Router } from "express";
// controllers
import {
  createSubscription,
  getUserSubscription,
} from "../controllers/subscription.controller.js";
// middlewares
import auth from "../middlewares/auth.middleware.js";

// temp
const getUserDetailsMiddleware = (controller) => {
  return (req, res, next) => {
    try {
      if (req.params?.id && req.user.id !== req.params.id) {
        const error = new Error("Unauthorized!!!");
        error.statusCode = 401;
        throw error;
      }

      req.userId = req.user.id;
      controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

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

subscriptionRouter.get("/user/me", auth, getUserDetailsMiddleware(getUserSubscription)); // only validate
subscriptionRouter.get("/user/:id", auth, getUserDetailsMiddleware(getUserSubscription)); // pass id and validate

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ message: "Cancel one subscription" }),
);

subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ message: "Get all upcoming renewals" }),
);

export default subscriptionRouter;
