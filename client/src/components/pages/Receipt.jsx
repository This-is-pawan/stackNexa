import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../components/ContextApi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const ReceiptPage = () => {
  const { theme } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  // 1️⃣ State-based receipt (for refresh safety)
  const [receipt, setReceipt] = useState(location.state || null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH FROM DB IF NOT FOUND ================= */
  useEffect(() => {
    if (receipt) return;

    const fetchReceipt = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/project/payment-receipt`,
          { withCredentials: true }
        );

        if (res.data?.success && res.data.result) {
          setReceipt(res.data.result);
        }
      } catch (err) {
        console.error("Receipt fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [receipt]);

  /* ================= NO DATA ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading receipt...
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No receipt data found.</p>
      </div>
    );
  }

  const paymentDate = new Date(receipt.createdAt || Date.now()).toLocaleString();

  return (
    <div
      className={`min-h-screen flex justify-center items-start p-4 
        ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white"
            : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
        }`}
    >
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col gap-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-300 dark:border-gray-700 pb-4">
          <span className="text-2xl md:text-3xl font-bold text-blue-600">
            Stack<span className="text-white">Nexa</span>
          </span>
          <span className="text-lg md:text-xl font-semibold text-green-600">
            Razorpay
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-white mt-4">
          Payment Receipt
        </h2>

        {/* Details */}
        <div className="flex flex-col gap-3 mt-4 text-sm md:text-base">
          <Row label="Status">
            <span
              className={
                receipt.status === "Success"
                  ? "text-green-600 font-bold flex items-center"
                  : "text-red-600 font-bold flex items-center"
              }
            >
              {receipt.status}
              {receipt.status === "Success" ? (
                <FaCheckCircle className="text-xs ml-1" />
              ) : (
                <FaTimesCircle className="text-xs ml-1" />
              )}
            </span>
          </Row>

          <Row label="Amount">
            <span className="font-semibold">₹{receipt.amount}</span>
          </Row>

          <Row label="Transaction ID">
            <span className="break-all text-xs md:text-sm">
              {receipt.paymentId}
            </span>
          </Row>

          <Row label="Order ID">
            <span className="break-all text-xs md:text-sm">
              {receipt.orderId}
            </span>
          </Row>

          <Row label="Payment Method">
            <span>Online (Razorpay)</span>
          </Row>

          <Row label="Date">
            <span>{paymentDate}</span>
          </Row>

          <Row label="Month">
            <span>{receipt.month || "—"}</span>
          </Row>

          <Row label="Year">
            <span>{receipt.year || "—"}</span>
          </Row>
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs md:text-sm text-gray-500 border-t pt-4 flex flex-col gap-1 text-center">
          <p>Support: support@stacknexa.com</p>
          <p>Payments powered by Razorpay</p>
          <p className="font-semibold">
            This is a computer-generated receipt.
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/billing")}
          className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-xl hover:scale-105 transition-all shadow-lg"
        >
          Make Another Payment
        </button>
      </div>
    </div>
  );
};

/* ================= ROW COMPONENT ================= */
const Row = ({ label, children }) => (
  <div className="flex justify-between items-start gap-4">
    <span className="font-semibold text-gray-600 dark:text-gray-300">
      {label}:
    </span>
    <span className="text-right text-gray-800 dark:text-white">
      {children}
    </span>
  </div>
);

export default ReceiptPage;
