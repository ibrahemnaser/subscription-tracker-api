import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => res.send({ message: "Get all subscriptions" }));

subscriptionRouter.get("/:id", (req, res) =>
  res.send({ message: "Get one subscription" }),
);

subscriptionRouter.post("/", (req, res) =>
  res.send({ message: "Create a subscription" }),
);

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
