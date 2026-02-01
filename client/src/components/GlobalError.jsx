import React from "react";
import img from "../assets/globalErrorimage.svg";
import { Link } from "react-router-dom";
import { useAppContext } from "../components/ContextApi";
const GlobalError = () => {
  const { theme } = useAppContext();

  return (
    <div
      className={`${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
          : "bg-black text-white transition-all duration-300"
      } flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center max-[900px]:text-sm`}
    >
      <img
        src={img}
        alt="Page not found"
        className={`w-full h-[50vh] max-xl:h-[30vh] ${
          theme === "dark"
            ? " text-yellow-300"
            : " text-white transition-all duration-300"
        } max-[900px]:w-[50%]`}
      />
      <h4
        className={`text-white text-xl mt-4 font-thin leading-10 tracking-wider`}
      >
        Oops! page not found
      </h4>
      <p className="font-thin leading-10 tracking-wider ">
        we can't seem to find the page you are looking for
      </p>
      <button className="mt-9  text-blue-900 hover:text-white">
        <Link to="/"> ← Back to Home</Link>
      </button>
    </div>
  );
};

export default GlobalError;