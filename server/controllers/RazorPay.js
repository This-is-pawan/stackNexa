require("dotenv").config();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { Payments } = require("../models/paymentModel");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// ===== Create Order =====
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount)
      return res.json({ success: false, message: "Amount is required" });

    const order = await razorpay.orders.create({
      amount: amount * 100, 
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });



    res.json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ===== Verify Payment =====
const verifyPayment = async (req, res) => {
  const userId = req.user.userId;
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
    plan,
    duration,
  } = req.body;


  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.json({
      success: false,
      message: "Missing payment verification data",
    });
  }
if (!amount || !plan) {
return res.json({
success: false,
message: "Amount and plan are required",
});
}
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const payment = await Payments.create({
      userId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id || "temp_" + Date.now(),
      signature: razorpay_signature,
      amount: amount,
      status: "Success",
      plan: plan.toLowerCase(), 
duration: duration === "month" ? "monthly" : "yearly",
    });

    res.json({
      success: true,
      message: "Payment signature verified successfully",
      payment,
    });
  } else {
    res.json({
      success: false,
      message: "Payment signature verification failed!",
    });
  }
};

// ===== Payment Success =====
const paymentSuccess = async (req, res) => {
  const paymentId = req.query.paymentId;
  res.json({ success: true, message: "Payment success", paymentId });
};
const payment_receipt = async (req, res) => {
 const userId = req.user.userId;
  try {
    const result = await Payments.findOne({userId })
      .sort({ createdAt: -1 }); 

    if (!result) {
      return res.json({
        success: false,
        message: "No payment record found for this user",
      });
    }

    res.json({
      success: true,
      message: "Payment receipt fetched successfully",
      result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Payment receipt failed",
      error: error.message,
    });
  }
};
module.exports = { createOrder, verifyPayment, paymentSuccess,payment_receipt };
