const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jwt_Authentication",
      required: true,
      index: true,
    },

    paymentId: { type: String, required: true },
    orderId: { type: String, required: true, unique: true },
    signature: { type: String, required: true },

    amount: { type: Number, required: true },

    status: {
      type: String,
      enum: ["Success", "Failed"],
      default: "Success",
    },

    plan: {
      type: String,
      enum: ["free", "pro", "premium"],
      required: true,
    },

    duration: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    month: String,
    year: Number,
  },
  { timestamps: true }
);

const Payments = mongoose.model("payments", paymentSchema);
module.exports = Payments;
