 require("dotenv").config();
const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// ===== Create Order =====
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.json({ success: false, message: "Amount is required" });

    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.json({ success: false, message: "Missing payment verification data" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.json({ success: true, message: "Payment signature verified successfully" });
  } else {
    res.json({ success: false, message: "Payment signature verification failed!" });
  }
};

// ===== Payment Success =====
const paymentSuccess = async (req, res) => {
  const paymentId = req.query.paymentId;
  res.json({ success: true, message: "Payment success", paymentId });
};



module.exports = {createOrder,verifyPayment,paymentSuccess};