const jwt = require("jsonwebtoken");
const JWTUser = require("../models/JWT_Auth_model");

const Verify = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token, authorization denied",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await JWTUser.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // req.user = user;
    req.user = {
userId: decoded.userId,
};
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Token is not valid",
    });
  }
};

module.exports = Verify;
