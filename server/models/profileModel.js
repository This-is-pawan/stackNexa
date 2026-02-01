const mongoose = require("mongoose");

/* ===================== PROFILE IMAGE SCHEMA ===================== */
const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jwt_Authentication",
      required: true,
      unique: true,
      index: true
    },

    image: {
      url: {
        type: String,
        default: ""
      },
      public_id: {
        type: String,
        default: ""
      },
      name: {
      type: String,
      trim: true,
      default: ""
    },
      location: {
      type: String,
      trim: true,
      default: ""
    },
    }
  },
  { timestamps: true }
);

const profileModel = mongoose.model(
  "user_profile_images",
  profileSchema
);

/* ===================== USER PROFILE DETAILS SCHEMA ===================== */
const UserSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Jwt_Authentication",
      required: true,
      unique: true,
      index: true
    },
    bio: {
      type: String,
      maxlength: 2000,
      default: ""
    },

    // -------- Real-life profile fields --------
  

    profession: {
      type: String,
      trim: true,
      default: ""
    },

    company: {
      type: String,
      trim: true,
      default: ""
    },

    education: {
      type: String,
      trim: true,
      default: ""
    },

    skills: {
      type: String,
      trim: true,
      default: ""
    },

    website: {
      type: String,
      trim: true,
      default: ""
    },

    github: {
      type: String,
      trim: true,
      default: ""
    },

    linkedin: {
      type: String,
      trim: true,
      default: ""
    },

    plan: {
      type: String,
      enum: ["free", "pro"],
      default: "free"
    }
  },
  { timestamps: true }
);

const UserNameModel = mongoose.model("user_name", UserSchema);

module.exports = {
  profileModel,
  UserNameModel
};