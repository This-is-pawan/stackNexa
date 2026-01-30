const express = require("express");
const router = express.Router();

const {
  Register,
  Login,
  Logout,
  isAuthenticated,
  verifyLoginOtp,
  change_password,
} = require("../controllers/Jwt_Auth_controller");

const Verify = require("../middleware/Jwtmiddleware");

const {
  createOrder,
  verifyPayment,
  payment_receipt,
} = require("../controllers/RazorPay");

// auth
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/authenticated", Verify, isAuthenticated);
router.post("/verify-otp", verifyLoginOtp);

// payment
router.post("/create-order", Verify, createOrder);
router.post("/verify-payment", Verify, verifyPayment);
router.get("/payment-receipt", Verify, payment_receipt);

// password
router.put("/user/change-password", Verify, change_password);

module.exports = router;
