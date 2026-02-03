import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAppContext } from "../ContextApi";

/* =========================
   Load Razorpay SDK
========================= */
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const RazorpayPayment = () => {
  const { theme, payment_reciept } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  const amount = Number(location.state?.amount || 0);

  // ✅ FORCE LOWERCASE (ENUM SAFE)
  const planName = (location.state?.planName || "pro").toLowerCase();

  // 🔥 FIX: useState instead of useRef
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = async () => {
    if (!amount || amount <= 0) {
      toast.error("Invalid amount");
      return;
    }

    if (isProcessing) return;
    setIsProcessing(true);

    try {
      /* 1️⃣ Load Razorpay */
      const loaded = await loadRazorpay();
      if (!loaded) {
        toast.error("Razorpay SDK failed to load");
        setIsProcessing(false);
        return;
      }

      /* 2️⃣ Create Order */
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/create-order`,
        { amount },
        { withCredentials: true }
      );

      if (!data?.success || !data?.order) {
        toast.error("Order creation failed");
        setIsProcessing(false);
        return;
      }

      const order = data.order;

      /* 3️⃣ Razorpay Options */
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Stacknexa",
        description: `${planName} plan`,
        order_id: order.id,

        handler: async (response) => {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/project/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount,
                plan: planName,
                duration: "monthly",
              },
              { withCredentials: true }
            );

            const payment = verifyRes?.data?.payment;

            if (!payment) {
              toast.error("Payment verified but receipt missing");
              return;
            }

            await payment_reciept();
            toast.success("Payment Successful 🎉");
            navigate("/receipt", { state: payment });
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed");
          } finally {
            setIsProcessing(false);
          }
        },

        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },

        theme: {
          color: "#6366F1",
        },
      };

      /* 4️⃣ Open Razorpay */
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
          : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
      }`}
    >
      <div
        className={`rounded-2xl shadow-xl p-8 max-w-md w-full ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-900 via-gray-700 to-gray-700"
            : "bg-gradient-to-tr from-black via-gray-900 to-black"
        }`}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          {planName.toUpperCase()} Plan Payment
        </h2>

        <div className="text-center text-lg font-semibold mb-6">
          Pay ₹{amount}
        </div>

        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {isProcessing ? "Processing..." : `Pay ₹${amount}`}
        </button>

        <Link to="/dashboard/billing">
          <span className="flex justify-center p-6 underline text-blue-700">
            Change the plan
          </span>
        </Link>
      </div>
    </div>
  );
};

export default RazorpayPayment;
