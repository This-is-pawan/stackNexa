import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../components/ContextApi";

const ReceiptPage = () => {
  const { theme } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state;

  if (!receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No receipt data found.</p>
      </div>
    );
  }

  const paymentDate = new Date().toLocaleString();

  return (
    <div
      className={`min-h-screen flex justify-center items-start p-4 mt-[4rem]
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
            Stacknexa
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
                  ? "text-green-600 font-bold"
                  : "text-red-600 font-bold"
              }
            >
              {receipt.status}
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

/* Reusable Row Component */
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