import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { LiaSpinnerSolid } from "react-icons/lia";
import { LuSunMoon } from "react-icons/lu";
import { TiWeatherSunny } from "react-icons/ti";
import { FaBarsStaggered } from "react-icons/fa6";
import stackNexaLogo from "../assets/stackNexaLogo.png"; 
import default_user_image from '../assets/default_user_image.svg'
import { TbLogout2 } from "react-icons/tb";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { useAppContext } from "./ContextApi";
import NavLinks from "./pages/NavLinks";

import { FaSpinner } from "react-icons/fa";
import Profile from "./pages/Profile";
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
    setGoogleUser,
    setVeified,
    profiles,
  } = useAppContext();
const profileImage = profiles?.image?.image?.url || default_user_image;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const isLoggedIn = auth?.isAuthenticated || Googleuser?.isAuthenticated;
  const currentUser = auth?.user || Googleuser?.user;
 

// const [startCreateUsername, setStartCreateUsername] = useState(false);
  /* ================= LOGOUT ================= */
  const logout = async () => {
    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/logout`,
        {},
        { withCredentials: true }
      );

      setAuth({ user: null, isAuthenticated: false, loading: false });
      setVeified(true);
      setOpen(false);

      toast.success("Logged out successfully");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const GoogleLogout = () => {
    window.open(`${import.meta.env.VITE_API_URL}/logout`, "_self");
    setGoogleUser({ user: null, isAuthenticated: false, loading: false });
    setOpen(false);
  };

  const commonLogout = async () => {
    if (auth?.isAuthenticated) await logout();
    if (Googleuser?.isAuthenticated) GoogleLogout();
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50
      h-16 min-h-16 max-h-16
      flex items-center justify-between px-8
      ${theme === "dark" ? "bg-yellow-500" : "bg-gray-900 text-white"}`}
    >
      {/* Logo */}
      <div className="hidden min-[900px]:block">
        <img
                     src={stackNexaLogo}
                     alt="StackNexa"
                     className="mx-auto w-36 sm:w-48 object-cover "
                   />
      </div>

      {/* Mobile Menu */}
      <FaBarsStaggered
        className={`min-[900px]:hidden cursor-pointer ${
          theme === "dark" ? "text-black" : "text-yellow-300"
        }`}
        onClick={() => setBar(!bar)}
      />

      <NavLinks />

      {/* Right Section */}
      <div className="flex items-center gap-6">
        {/* Notification */}
        <div className="relative">
          <span className="absolute -top-2 -right-1 w-4 h-4 text-[10px] rounded-full bg-pink-400 text-black flex items-center justify-center">
            0
          </span>
          <IoNotificationsCircleSharp className="text-xl" />
        </div>

        {/* Theme Toggle */}
        <button onClick={handleDarkMode}>
          {theme === "dark" ? (
            <LuSunMoon className="text-black text-lg" />
          ) : (
            <TiWeatherSunny className="text-yellow-300 text-lg" />
          )}
        </button>

        {/* Auth */}
        {isLoggedIn ? (
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center font-bold cursor-pointer capitalize "
            >
              {currentUser?.name?.charAt(0)}
            </div>

            {open && (
              <div className="absolute right-0 top-10 w-48 bg-pink-100 rounded-lg shadow-lg z-50">
                <div className="p-3 border-b text-center ">
                  <div className="flex justify-center">
              <img
  src={profileImage }
  alt="profile_image"
  className="w-10 h-10 rounded-full border border-black 
             transition-transform duration-300 
             hover:scale-150 cursor-pointer"
/>

                  
                    </div>
                  <p className="font-semibold text-black capitalize">
                 
                    
                     {loading
                            ? <FaSpinner className="mx-auto animate-spin" />
                            :profiles?.image?.image?.name|| currentUser?.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {currentUser?.email}
                   
                  </p>
                </div>

                <ul className="text-black text-sm">
                  <li className="px-3 py-2 hover:bg-pink-300">
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-pink-300">
                    <Link to="/dashboard/setting/profile">Profile</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-pink-300">
                    <Link to="/dashboard/setting">Settings</Link>
                  </li>
                  <li className="px-3 py-2 hover:bg-pink-300">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="px-3 py-2">
                    <button
                      disabled={loading}
                      onClick={commonLogout}
                      className="w-full bg-red-500 text-white rounded py-1 flex items-center justify-center gap-2"
                    >
                      <TbLogout2 />
                      {loading ? (
                        <LiaSpinnerSolid className="animate-spin" />
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/register"
            className="px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-300 to-yellow-200 text-black  text-sm "
          >
            SignUp / Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
