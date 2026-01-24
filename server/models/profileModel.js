const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const profileModel=mongoose.model("user_profile_images", profileSchema);
// 
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  plan: {
    type: String,
    enum: ["free", "pro"],
    default: "free",
  },
});
const UserNameModel=mongoose.model("user_name", UserSchema);



module.exports = {profileModel,UserNameModel}