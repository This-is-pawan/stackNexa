const express = require("express");
const {
  Register,
  Login,
  Logout,
  isAuthenticated,
  verifyLoginOtp,
  GoogleAllUsers,
  change_password,
} = require("../controllers/Jwt_Auth_controller");
const  Verify  = require("../middleware/Jwtmiddleware");
const { AllUsers } = require("../controllers/UsersData");
const { createOrder, verifyPayment, paymentSuccess, payment_receipt} = require("../controllers/RazorPay");

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/authenticated", Verify, isAuthenticated);
router.get("/allusers",Verify, AllUsers);
router.post("/verify-otp", verifyLoginOtp);
router.post('/create-order',Verify,createOrder)
router.post('/verify-payment',Verify,verifyPayment)
router.get('/payment-success',Verify,paymentSuccess)
router.get('/payment-success',Verify,paymentSuccess)
router.get('/payment-reciept',Verify,payment_receipt)

router.put('/user/change-password',Verify,change_password)

module.exports = { router };
