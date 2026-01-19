const mongoose = require("mongoose");

const GUser = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    photo: {                 
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    googleId: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const GoogleUser = mongoose.model("Google_auth_StackNexa", GUser);

module.exports = { GoogleUser };