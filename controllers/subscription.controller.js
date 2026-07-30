import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subs = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: subs,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscription = async (req, res, next) => {
  try {
    const userSubs = await Subscription.find({ user: req.userId });

    res.status(200).json({
      success: true,
      data: userSubs,
    });
  } catch (error) {
    next(error);
  }
};
