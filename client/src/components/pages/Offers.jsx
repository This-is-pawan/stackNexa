import React, { useState } from "react";
import { useAppContext } from "../ContextApi";
import { Link } from "react-router-dom";

const Offers = () => {

    const { theme, auth,setBar ,setOpen,Googleuser, setGoogleUser} = useAppContext();
      const isLoggedIn = auth?.isAuthenticated || Boolean(Googleuser?.isAuthenticated)
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <div
      className={`w-full justify-center fixed top-[4rem] left-0 right-0  px-4 p-1 animate-pulse z-20
      ${
        theme === "dark"
          ? "bg-gradient-to-r from-pink-600 to-purple-700 text-white"
          : "bg-gradient-to-r from-yellow-400 to-orange-500 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center  sm:text-left ">
        
        {/* Offer Text */}
        <p className=" text-sm sm:text-base font-semibold">
          🚀 <span className="font-bold">Launch Offer – StackNexa</span> |
          Free Projects + Premium Plans at{" "}
          <span className="underline font-bold">₹199 / ₹499</span>
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            to={isLoggedIn ? "/more-about" : "/register"}
            className="px-4 py-1.5 rounded-full bg-black text-white text-sm font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>

          <button
            onClick={() => setShow(false)}
            className="text-lg font-bold px-2 hover:opacity-70"
            aria-label="Close offer"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;
