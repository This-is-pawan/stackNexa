import React from "react";
import { useAppContext } from "../ContextApi";
import { stackNexaServices } from "../../components/pages/data";

const MoreAbout = () => {
  const { theme,auth,Googleuser } = useAppContext();
const isLoggedIn = auth?.isAuthenticated || Boolean(Googleuser?.isAuthenticated)
  return (
    <div
      className={`w-full min-h-screen py-12 px-4 transition-all
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-tl from-yellow-400 via-blue-200 to-orange-300 text-black"
        }`}
    >
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          Welcome to <span className={`${theme === "dark" ? "text-yellow-500" : "text-blue-600"}`}>Stack<span className="text-white">Nexa</span>
          
          </span>
        </h1>
        <p className="text-center text-lg md:text-xl max-w-3xl mx-auto">
          StackNexa is a startup focused on providing full-stack development projects from <strong>basic HTML to advanced MERN stack</strong>, complete with source code, step-by-step explanations, and future career support including internships and job opportunities.
        </p>

        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stackNexaServices.map((service, index) => (
            <div
              key={index}
              className="bg-white/20 dark:bg-black/30 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <span className="text-pink-500">🚀</span> {service.title}
              </h2>
              <p className="text-base md:text-lg">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
          <a
            href={isLoggedIn ? "/dashboard/billing" : "/register"}
            className="w-[260px] text-center bg-blue-600 hover:bg-blue-700 text-white 
            font-semibold py-3 rounded-full shadow-xl transition-all duration-300 
            hover:scale-105"
          >
            Get Started 🚀
          </a>

          <a
            href={isLoggedIn ? "/dashboard" : "/register"}
            className={`w-[260px] text-center py-3 rounded-full border font-semibold
            transition-all duration-300 hover:scale-105
            ${
              theme === "dark"
                ? "border-white text-white hover:bg-white hover:text-black"
                : "border-black text-black hover:bg-black hover:text-white"
            }`}
          >
            Explore Projects 📘
          </a>
        </div>
      </div>
    </div>
  );
};

export default MoreAbout;
