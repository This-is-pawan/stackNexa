const JWTUser = require("../models/JWT_Auth_model");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cookie = require("cookie-parser");
const sendOtpMail = require("../utils/mail");
const { GoogleUser } = require("../models/Google_model");


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

   
    await sendOtpMail(user.email, user.name || "User", user.otp)
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

module.exports = Login;

//
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

module.exports = verifyLoginOtp;

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

const isAuthenticated = (req, res) => {
  const userAuth = req.user;
  try {
    return res.status(200).json({
      success: true,
      isAuthenticated: true,
      user: userAuth,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
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



module.exports = { Register, Login, Logout, isAuthenticated, verifyLoginOtp,GoogleAllUsers };
