const mongoose = require("mongoose");

const JWTAuthSchema = new mongoose.Schema(
  {
       
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    password: {
    type: String,
    required: true,
    minlength: 8,
    
  },
  image:{
      type: String,
      default: "",
    },
 otp: {
  type: Number,
  default: null
},

verifiyUser: {
  type: Boolean,
  default: false
},
otpExpire:{
type:Date
}

  },

  { timestamps: true }
);


const JWTUser = mongoose.model("Jwt_Authentication", JWTAuthSchema);

module.exports = JWTUser;
