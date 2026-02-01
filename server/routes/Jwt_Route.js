const express = require("express");
const router = express.Router();

const {
  Register,
  Login,
  Logout,
  isAuthenticated,
  verifyLoginOtp,
  change_password,
  allusers,
  createReview,
  updateReview,
  deleteReview,
  getAllReviews,
  getMyReviews,
  getSingleReview,
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
router.get("/authenticated", Verify, isAuthenticated);
router.get("/allusers", Verify, allusers);
router.post("/verify-otp", verifyLoginOtp);

// ================= REVIEWS ROUTES =================
// CREATE review (authenticated user)
router.post("/create-reviews", Verify, createReview);

// UPDATE review (owner only)
router.put("/update-reviews/:id", Verify, updateReview);

// DELETE review (owner only)
router.delete("/delete-reviews/:id",Verify,deleteReview);

// GET all reviews (public)
router.get("/all-reviews", getAllReviews);

// GET logged-in user's reviews
router.get("/auth-reviews", Verify, getMyReviews);

// GET single review by ID (public)
router.get("/single-reviews/:id", getSingleReview);


// payment
router.post("/create-order", Verify, createOrder);
router.post("/verify-payment", Verify, verifyPayment);
router.get("/payment-receipt", Verify, payment_receipt);

// password
router.put("/user/change-password", Verify, change_password);

module.exports = router;
