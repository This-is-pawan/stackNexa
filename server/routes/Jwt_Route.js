const express = require("express");
const {
  Register,
  Login,
  Logout,
  isAuthenticated,
  verifyLoginOtp,
  GoogleAllUsers,
  delete_user_permanently,
} = require("../controllers/Jwt_Auth_controller");
const  Verify  = require("../middleware/Jwtmiddleware");
const { AllUsers } = require("../controllers/UsersData");
const { createOrder, verifyPayment, paymentSuccess } = require("../controllers/RazorPay");

const router = express.Router();
router.post("/register", Register);
router.post("/login", Login);
router.post("/logout", Logout);
router.get("/authenticated", Verify, isAuthenticated);
router.get("/allusers",Verify, AllUsers);
router.post("/verify-otp", verifyLoginOtp);
router.post('/create-order',createOrder)
router.post('/verify-payment',verifyPayment)
router.get('/payment-success',paymentSuccess)
router.get('/google-all-users',GoogleAllUsers)
router.delete("/delete-user-account/:userId",delete_user_permanently)

module.exports = { router };
