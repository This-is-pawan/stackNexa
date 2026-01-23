import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "./ContextApi";

const Home = () => {
  const { theme, auth,setBar ,setOpen,Googleuser, setGoogleUser} = useAppContext();

  const isLoggedIn = auth?.isAuthenticated || Boolean(Googleuser?.isAuthenticated)
  const userName = auth?.user?.name
  const GoogleAuth=Googleuser?.user?.name?.trim()?.split(/\s+/)[0];
  const currentAuth=userName || GoogleAuth 
 
  
  return (
    <div
      className={`w-full min-h-screen flex items-center justify-center px-4 transition-all
      ${
        theme === "dark"
          ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
          : "bg-gradient-to-tl from-yellow-400 via-blue-200 to-orange-300 text-black"
      }`}
      onClick={()=>{setBar(false)
        setOpen(false)
      }}
    >
      <div className="max-w-4xl text-center space-y-8 mt-8">
        <p className="inline-block px-4 py-2 bg-blue-100 text-blue-800 font-semibold rounded-full shadow-md hover:bg-blue-200 transition-all duration-300 md:text-[1.4rem]">
          👋🏻 Hello, {currentAuth ||'user'}
        </p>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">
          Welcome to{" "}
          <span
            className={`${
              theme === "dark" ? "text-yellow-500" : "text-blue-600"
            }`}
          >
             StackNexa
          </span>
        </h1>

        <p className="max-w-[700px] mx-auto text-lg leading-relaxed">
          We provide{" "}
          <span className="font-semibold">
            basic to advanced MERN stack projects
          </span>{" "}
         designed especially for upcoming developers. Each project includes
          complete source code and step-by-step explanations, helping you
          understand how real-world applications are built using MongoDB,
          Express, React, and Node.js.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            to={isLoggedIn ? "/dashboard" : "/register"}
            className="w-[260px] text-center bg-blue-600 hover:bg-blue-700 text-white 
            font-semibold py-3 rounded-full shadow-xl transition-all duration-300 
            hover:scale-105"
          >
            Explore Projects 🚀
          </Link>

          <Link
            to={isLoggedIn ? "/more-about" : "/register"}
            className={`w-[260px] text-center py-3 rounded-full border font-semibold
            transition-all duration-300 hover:scale-105
            ${
              theme === "dark"
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Learn More 📘
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
