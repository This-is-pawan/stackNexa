const  mongoose =require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentId: { type: String, required: true },
    orderId: { type: String, required: true },
    signature: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Success", "Failed"], default: "Success" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
   plan: {
  type: String,
  enum: ["free", "pro"],
  required: true,
},
duration: {
  type: String,
  enum: ["monthly", "yearly"],
}


  },
  { timestamps: true }
);

const Payments= mongoose.model("payments", paymentSchema);
module.exports={Payments}
