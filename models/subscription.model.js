import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minLength: [3, "Title must be at least 3 characters long"],
      maxLength: [50, "Title must be at most 50 characters long"],
    },
    price: {
      type: Number,
      required: [true, "Email is required"],
      min: [0, "Price must be at least 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "EGP"],
      default: "EGP",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      defualt: "monthly",
    },
    category: {
      type: String,
      enum: [
        "sports",
        "news",
        "education",
        "health",
        "technology",
        "entertainment",
        "finance",
        "other",
      ],
      requried: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit", "debit", "paypal"],
      default: "cash",
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      default: Date.now,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// pre save hook
subscriptionSchema.pre("save", function () {
  const subscription = this;

  if (!subscription.renewalDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    subscription.renewalDate = new Date(subscription.startDate);
    subscription.renewalDate.setDate(
      subscription.renewalDate.getDate() + renewalPeriod[subscription.frequency],
    );
  }

  if (subscription.renewalDate < new Date()) {
    subscription.status = "expired";
  }
});

export default mongoose.model("Subscription", subscriptionSchema);
