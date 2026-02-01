import React, { useState } from "react";
import { useAppContext } from "../ContextApi";
import { Link } from "react-router-dom";

const Offers = () => {
  const { auth, Googleuser } = useAppContext();

  const isLoggedIn =
    auth?.isAuthenticated || Boolean(Googleuser?.isAuthenticated);

  const [show, setShow] = useState(true);
  if (!show) return null;

  return (
    <div className="fixed top-[4rem] left-0 right-0 z-20 px-2">
      <div
        className="
          mx-auto w-[92%] sm:w-[80%] md:w-[60%] lg:w-[45%]
          flex items-start sm:items-center justify-between gap-2
          text-[10px] sm:text-[11px]
          text-amber-400 font-medium tracking-wide
          bg-amber-400/10 px-3 py-2 rounded-2xl
          border border-amber-400/30  scale-75 hover:scale-100 transition duration-150

        "
      >
        {/* Offer Text */}
        <span className="flex-1">
          🚀 <span className="font-semibold">Launch Offer:-StackNexa</span>{" "}
          Free Projects + Premium Plans at{" "}
          <span className="underline font-semibold">₹199 / ₹499</span>
        </span>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={isLoggedIn ? "/more-about" : "/register"}
            className="
              px-3 py-1 rounded-full
              bg-amber-400/20 text-amber-300
              text-[10px] sm:text-[11px]
              hover:bg-amber-400/30 transition
            "
          >
            Get Started
          </Link>

          <button
            onClick={() => setShow(false)}
            aria-label="Close offer"
            className="
              w-5 h-5 text-[10px]
        rounded-full bg-green-700 text-white
        flex items-center justify-center
        hover:scale-105 transition
            "
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default Offers;
