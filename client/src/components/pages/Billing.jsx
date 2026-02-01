import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../ContextApi";
import { LiaSpinnerSolid } from "react-icons/lia";
const Billing = () => {
  const { user, theme ,setBar,setOpen,plan,plan_loading} = useAppContext();
  const navigate = useNavigate();

  const plans = [
    {
      name: "Free",
      price: 0,
      displayPrice: "₹0",
      tag: "Starter",
      features: [
        "Access to basic projects",
        "Community support",
        "Limited downloads",
      ],
      disabled: true,
    },
    {
      name: "Pro",
      price: 199,
      displayPrice: "₹199 / month",
      tag: "Most Popular 🚀",
      features: [
        "All Free features",
        "Advanced real-world projects",
        "Source code access",
        "Priority support",
        "intership opertunity"
      ],
      highlight: true,
    },
    {
      name: "Premium",
      price: 499,
      displayPrice: "₹499 / month",
      tag: "For Professionals 💎",
      features: [
        "All Pro features",
        "1-on-1 mentorship",
        "Project reviews",
        "Early access to new content",
        "intership opportunity(performance-based)",
        "project completion certificate"
      
      ],
    },
  ];

  const handleUpgrade = (plan) => {
    navigate("/razorpaypayment", {
      state: {
        planName: plan.name,
        amount: plan.price,
      },
    });
  };

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
      }`}
       onClick={()=>{
        setBar(false)
        setOpen(false)
      }}
    >
      <h1 className="text-3xl font-bold mb-2">💳 Billing & Plans</h1>
      <p className="text-sm text-gray-400 mb-8">
        Choose the plan that fits your learning goals
      </p>

      <div className="mb-8 p-4 rounded-xl bg-gray-800 shadow max-w-4xl mx-auto">
        <p>
          Current Plan:
          <span className="ml-2 font-semibold text-blue-500">
          {plan_loading ? (
  <LiaSpinnerSolid className="animate-spin mx-auto" />
) : (
  plan?.plan || "free"
)}
          </span>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {plans.map((plan, index) => {
          const isActive =
            user?.plan?.toLowerCase() === plan.name.toLowerCase();

          return (
            <div
              key={index}
              className={`rounded-2xl p-6 shadow-lg border transition ${
                plan.highlight
                  ? "border-blue-600 scale-105"
                  : "border-gray-700"
              } bg-gray-800`}
            >
              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <p className="text-sm text-gray-400 mb-3">{plan.tag}</p>

              <p className="text-3xl font-bold mb-4">{plan.displayPrice}</p>

              <ul className="mb-6 space-y-3 text-sm">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-green-400 font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                disabled={plan.disabled || isActive}
                onClick={() => handleUpgrade(plan)}
                className={`w-full py-2 rounded-xl font-semibold transition ${
                  plan.disabled || isActive
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isActive
                  ? "Active Plan"
                  : plan.name === "Free"
                  ? "Current Plan"
                  : `Upgrade to ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400 mt-10">
        🔒 Secure payments powered by Razorpay • Cancel anytime
      </p>
    </div>
  );
};

export default Billing;