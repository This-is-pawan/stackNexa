import React from "react";
import { useAppContext } from "../ContextApi";

const PrivacyPolicy = () => {
  const { theme,setBar,setOpen } = useAppContext();

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
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated: January 2026
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p className="text-sm leading-relaxed">
            We collect personal information such as name, email address,
            profile details, and payment information when you register or
            upgrade to Pro on StackNexa.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Data</h2>
          <p className="text-sm leading-relaxed">
            Your data is used to provide access to projects, manage your
            account, process payments, and improve platform performance.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
          <p className="text-sm leading-relaxed">
            We use industry-standard security practices to protect your
            personal information. Passwords are encrypted and never stored
            in plain text.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Third-Party Services</h2>
          <p className="text-sm leading-relaxed">
            We may use third-party tools such as payment gateways and analytics
            services. These services follow their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">5. Contact Us</h2>
          <p className="text-sm leading-relaxed">
            If you have any questions about this Privacy Policy, contact us at
            <span className="font-semibold"> support@stacknexa.com</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;