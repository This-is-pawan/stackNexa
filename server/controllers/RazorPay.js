require("dotenv").config();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const Payments = require("../models/paymentModel");

/* ================= RAZORPAY INSTANCE ================= */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ================= CREATE ORDER ================= */
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0)
      return res.status(400).json({ success: false, message: "Invalid amount" });

    const order = await razorpay.orders.create({
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= VERIFY PAYMENT ================= */
const verifyPayment = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      plan,
      duration,
      testMode // optional flag for Postman testing
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !amount || !plan || !duration) {
      return res.status(400).json({ success: false, message: "All payment fields are required" });
    }


    // ==== GENERATE SIGNATURE ====
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // ==== TEST MODE OVERRIDE ====
    const isValid = testMode ? true : generatedSignature === razorpay_signature;

    const now = new Date();

    const payment = await Payments.create({
      user: userId,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      amount,
      plan,
      duration,
      status: isValid ? "Success" : "Failed",
      month: now.toLocaleString("default", { month: "long" }),
      year: now.getFullYear(),
    });

    if (!isValid)
      return res.status(400).json({
        success: false,
        message: "Payment verification failed (signature mismatch)",
        payment
      });

    return res.status(200).json({ success: true, payment });
  } catch (err) {
    console.error("Verify Payment Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

/* ================= GET LATEST PAYMENT ================= */
const payment_receipt = async (req, res) => {
  try {
    const userId = req.user.userId;
    const latestPayment = await Payments.findOne({ user: userId }).sort({ createdAt: -1 });

    if (!latestPayment)
      return res.status(404).json({ success: false, message: "No payment found" });

   
    return res.status(200).json({ success: true, result: latestPayment });
  } catch (err) {
    console.error("Payment Receipt Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { createOrder, verifyPayment, payment_receipt };
