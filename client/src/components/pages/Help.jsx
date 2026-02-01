import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../ContextApi";

const Help = () => {
  const { theme ,setBar,setOpen} = useAppContext();

  const faqs = [
    {
      question: "What is StackNexa?",
      answer:
        "StackNexa is a learning platform providing free and pro-level real-world projects for developers.",
    },
    {
      question: "What is the difference between Free and Pro?",
      answer:
        "Free users can access basic projects. Pro users unlock advanced projects, premium support, and extra features.",
    },
    {
      question: "How do I upgrade to Pro?",
      answer:
        "Go to Dashboard → Settings → Billing and choose a Pro plan.",
    },
    {
      question: "I forgot my password. What should I do?",
      answer:
        "Use the 'Forgot Password' option on the login page to reset your password.",
    },
  ];

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
      <h1 className="text-3xl font-bold mb-6">❓ Help & Support</h1>

      {/* FAQ Section */}
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="mb-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow"
          >
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="max-w-3xl mx-auto mb-10">
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>

        <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
          <p className="mb-2">
            📧 Email:
            <a
              href="mailto:support@stacknexa.com"
              className="text-blue-600 ml-1"
            >
              support@stacknexa.com
            </a>
          </p>

          <p className="mb-2">⏱️ Response Time: 24–48 hours</p>

          <p className="text-sm text-gray-400 animate-pulse tansition-all duration-300">
            Pro users get priority support 🚀
          </p>
        </div>
      </div>

      {/* Useful Links */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Useful Links</h2>

        <div className="flex gap-4 flex-wrap">
          <Link
            to="/dashboard/Billing"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white animate-pulse tansition-all duration-300"
          >
            Billing
          </Link>

          <Link
            to="/dashboard/privacy-policy"
            className="px-4 py-2 rounded-lg bg-gray-700 text-white"
          >
            Privacy Policy
          </Link>

          <Link
            to="/dashboard/term-condition"
            className="px-4 py-2 rounded-lg bg-gray-700 text-white"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Help;