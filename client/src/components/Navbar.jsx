import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LiaSpinnerSolid } from "react-icons/lia";
// Icons
import { LuSunMoon } from "react-icons/lu";
import { TiWeatherSunny } from "react-icons/ti";
import { FaBarsStaggered } from "react-icons/fa6";
import { TbLogout2 } from "react-icons/tb";
import { IoNotificationsCircleSharp } from "react-icons/io5";
// Context
import { useAppContext } from "./ContextApi";

// Components
import NavLinks from "./pages/NavLinks";

const Navbar = () => {
  const {
    theme,
    handleDarkMode,
    auth,
    setAuth,
    bar,
    setBar,
    open,
    setOpen,
    Googleuser,
    verified,
    setVeified,
    setGoogleUser
  } = useAppContext();
console.log(auth);

  const navigate = useNavigate();
  const isLoggedIn = auth?.isAuthenticated ||Googleuser?.user;
  const currentUser = auth?.user || Googleuser?.user


  const [loading, setLoading] = useState(false);
  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/logout`,
        { withCredentials: true }
      );

      setAuth({
        user: null,
        isAuthenticated: false,
        loading: false,
      });
 setVeified(true)
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
  
    }
  };

  const GoogleLogout = () => {
    window.open(`${import.meta.env.VITE_API_URL}/logout`, "_self");
    setGoogleUser({
      Guser: null,
      isAuthenticated: false,
      Gloading: false,
    });
  };

  const commonLogout = async () => {
    if (auth?.isAuthenticated) await logout();
    if (Googleuser?.isAuthenticated) GoogleLogout();
  };
  return (
    <div
      className={`${
        theme === "dark" ? "bg-yellow-500" : "bg-gray-900 text-white"
      } fixed top-0 left-0 right-0 h-16 flex justify-between  items-center pl-8 pr-10 z-50`}
    >
      {/* Logo */}
      <div className="max-[900px]:hidden">
        <p className="text-4xl font-extrabold tracking-wide bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
          Stack<span className="text-white">Nexa</span>
        </p>
      </div>

      {/* Mobile Menu */}
      <FaBarsStaggered
        className={`min-[900px]:hidden cursor-pointer ${
          theme === "dark" ? "text-gray-900" : "text-yellow-300"
        }`}
        onClick={() => setBar(!bar)}
      />

      {/* Nav Links */}
      <NavLinks />
    
      {/* Right Section */}
      
      <div className="transition-all duration-500  flex items-center gap-8 relative ">
        {/* Theme Toggle */}

         <div className="relative ">
          <p className={` absolute bottom-[0.7rem] left-[0.5rem] w-3.5 h-3.5 text-center leading-4 text-[0.6rem] rounded-full ${theme === "dark" ? " text-black bg-pink-200":"bg-pink-300 text-pink-900"}`}>0</p>
         <IoNotificationsCircleSharp className={`text-xl ${
        theme === "dark" ? " text-black" : " text-white"
      }`} />
        </div>
        <div onClick={handleDarkMode} className="cursor-pointer">
          {theme === "dark" ? (
            <LuSunMoon className="text-black text-lg" />
          ) : (
            <TiWeatherSunny className="text-yellow-300 text-lg" />
          )}
        </div>
        

        
        {isLoggedIn ? (
          <div className="relative">
            {/* Avatar */}
            <div
              onClick={() => setOpen(!open)}
              className="w-8 h-8 flex items-center justify-center uppercase border rounded-full cursor-pointer bg-white text-black font-bold"
            >
              {currentUser?.name?.charAt(0)}
            </div>
            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 top-10 w-48 bg-pink-100 rounded-lg shadow-lg">
                <div className="p-3 border-b text-center">
                  <p className="font-semibold capitalize text-black">
                    {currentUser?.name}
                  </p>
                  <p className="text-xs truncate text-gray-600">
                    {currentUser?.email}
                  </p>
                </div>

                <ul className="text-sm text-black">
                  <li className="px-3 py-2 hover:bg-pink-300">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-pink-300">
                    <Link to="/dashboard/setting/profile">Profile</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-pink-300">
                    <Link to="/dashboard/setting">Settings</Link>
                  </li>
                  <li className="px-3 py-2">
                    <button
                    disabled={loading}
                      onClick={commonLogout}
                      type="submit"
                      className="w-full flex justify-center items-center gap-2 bg-red-500 text-white py-1 rounded"
                    >
                      <TbLogout2/>
                      {loading ? <LiaSpinnerSolid  className="animate-spin mx-auto" /> :  "Logout"}
                      
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) :  (
          <Link
            to="/register"
            className={`rounded-full px-4 py-2 font-semibold transition-all hover:scale-105 max-[900px]:text-[0.6rem]
            ${
              theme === "dark"
                ? "text-black bg-gradient-to-r from-yellow-200 to-blue-300"
                : "text-white bg-gradient-to-r from-blue-300 to-yellow-200"
            }`}
          >
            SignUp / Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
