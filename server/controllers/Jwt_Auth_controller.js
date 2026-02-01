const JWTUser = require("../models/JWT_Auth_model");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cookie = require("cookie-parser");
const Review=require('../models/reviewsModel')
const { GoogleUser } = require("../models/Google_model");
const sendOtpMail = require("../utils/mail");

const mongoose = require("mongoose");

dotenv.config();

const Register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Something missing" });
  }

  try {
    const isExist = await JWTUser.findOne({ email });
    if (isExist) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists" });
    }

    const hash = await bcryptjs.hash(password, 10);
    const otpExpire = Date.now() + 10 * 60 * 1000;
    const otp = Math.floor(1000 + Math.random() * 9000);

    const user = await JWTUser.create({
      name,
      email,
      password: hash,
      otpExpire,
      otp,
      verifyUser: false,
    });

   
    sendOtpMail(user.email, user.name || "User", user.otp)
      .catch(err => console.error("OTP MAIL ERROR:", err));

    return res.status(201).json({
      success: true,
      message: "Register successful, OTP sent",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        otpExpire: user.otpExpire,
        verifyUser: user.verifyUser,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res
      .status(500)
      .json({ success: false, message: "Registration failed" });
  }
};
const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await JWTUser.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User email does not exist",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // 🔐 Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        verifiyUser: user.verifiyUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const verifyLoginOtp = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({
      success: false,
      message: " OTP are required",
    });
  }

  try {
    const user = await JWTUser.findOne({ otp });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // OTP check
    if (user.otp !== Number(otp)) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Expiry check
    if (user.otpExpire < Date.now()) {
      user.otp = null;
      user.otpExpire = null;
      return res.status(401).json({
        success: false,
        message: "OTP expired",
      });
    }

    user.otp = null;
    user.verifiyUser = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      verifiyUser: user.verifiyUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({ success: true, message: "Logout successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
const isAuthenticated = async (req, res) => {
  const id=req.user.userId
  try {
    const user = await JWTUser
      .findById(id)
      

    if (!user) {
      return res.status(401).json({
        success: false,
        isAuthenticated: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      isAuthenticated: false,
      message: error.message,
    });
  }
};
const GoogleAllUsers = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const users = await GoogleUser
      .find({})
      .select("name email photo");

    res.status(200).json({
      success: true,
      userAuth: req.user,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
const allusers = async (req, res) => {
  try {

    const users = await JWTUser.find().select("-password");

    return res.status(200).json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
const change_password = async (req, res) => {
  const { password, new_password, confirm_password } = req.body;


  if (!password || !new_password || !confirm_password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

 
  if (new_password !== confirm_password) {
    return res.status(400).json({
      success: false,
      message: "New password and confirm password do not match",
    });
  }

  try {
    
    const user = await JWTUser.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

 
    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }
    const hashedPassword = await bcryptjs.hash(new_password, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

/* ================= CREATE REVIEW ================= */
const createReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { rating, comment } = req.body;

    const review = await Review.create({
      user: userId,
      rating,
      comment,
    });

    return res.status(201).json({
      success: true,
      message: "Review created",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


/* ================= UPDATE REVIEW ================= */
const updateReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: reviewId, user: userId },
      { $set: { rating, comment } },
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/// ================= DELETE REVIEW =================


const deleteReview = async (req, res) => {
  try {
    // Ensure user is authenticated
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const reviewId = req.params.id;
    const userId = req.user.userId;

    // Convert both IDs to ObjectId to avoid type mismatch
    const review = await Review.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(reviewId),
      user: new mongoose.Types.ObjectId(userId),
    });

    if (!review) {
      return res.status(404).json({ success: false, message: "Review not found or unauthorized" });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
















const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email image") // ✅ works now
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyReviews = async (req, res) => {
  try {
    const userId = req.user.userId;

    const reviews = await Review.find({ user: userId })
      .populate("user", "name image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const getSingleReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid review ID",
      });
    }

    const review = await Review.findById(id)
      .populate("user", "name image");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






module.exports = { Register, Login, Logout, isAuthenticated, verifyLoginOtp,GoogleAllUsers,change_password ,allusers,createReview,
  updateReview,
  deleteReview,getAllReviews,getSingleReview,getMyReviews};
