import React from "react";
import { useAppContext } from "../ContextApi";

const TermCondition = () => {
  const { theme,setOpen,setBar } = useAppContext();

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
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-6">
          Last updated: January 2026
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
          <p className="text-sm leading-relaxed">
            By accessing or using StackNexa, you agree to be bound by these
            Terms & Conditions.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. User Accounts</h2>
          <p className="text-sm leading-relaxed">
            You are responsible for maintaining the confidentiality of your
            account credentials. Any activity under your account is your
            responsibility.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Free & Pro Plans</h2>
          <p className="text-sm leading-relaxed">
            StackNexa offers both free and paid (Pro) plans. Pro features are
            accessible only after successful payment.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Prohibited Activities</h2>
          <p className="text-sm leading-relaxed">
            Users must not misuse the platform, attempt unauthorized access,
            or redistribute paid content without permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Termination</h2>
          <p className="text-sm leading-relaxed">
            We reserve the right to suspend or terminate accounts that violate
            these terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">6. Changes to Terms</h2>
          <p className="text-sm leading-relaxed">
            StackNexa may update these Terms at any time. Continued use of the
            platform means acceptance of updated terms.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermCondition;