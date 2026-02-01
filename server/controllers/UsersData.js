const JWTUser = require("../models/JWT_Auth_model");

const AllUsers = async (req, res) => {
  try {
    const users = await JWTUser.find();

    if (!users || users.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }

    return res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });

  } catch (error) {
    console.error("AllUsers error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { AllUsers };
