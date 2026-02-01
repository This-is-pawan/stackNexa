import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../ContextApi";
import axios from "axios";
import { LiaSpinnerSolid } from "react-icons/lia";
import { TbLockPassword } from "react-icons/tb";

const Password = () => {
  const { theme, setBar } = useAppContext();

  const [password, setPassword] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!password || !new_password || !confirm_password) {
      return toast.error("All fields are required");
    }

    if (new_password !== confirm_password) {
      return toast.error("New password and confirm password do not match");
    }

    try {
      setLoading(true);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/project/user/change-password`,
        {
          password,
          new_password,
          confirm_password,
        },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Password changed successfully");

      setPassword("");
      setNew_password("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-lg mx-auto p-6 rounded-lg shadow ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
      }`}
      onClick={() => setBar(false)}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        🔒 Change Password
      </h2>

      {/* Current Password */}
      <div className="mb-3 relative">
        <label className="block mb-1">Current Password</label>
        <input
          type={showPass ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded border text-black focus:outline-none"
        />
        <TbLockPassword
          onClick={() => setShowPass(!showPass)}
          className="absolute right-3 top-9 cursor-pointer text-black"
        />
      </div>

      {/* New Password */}
      <div className="mb-3 relative">
        <label className="block mb-1">New Password</label>
        <input
          type={showNewPass ? "text" : "password"}
          value={new_password}
          onChange={(e) => setNew_password(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded border text-black focus:outline-none"
        />
        <TbLockPassword
          onClick={() => setShowNewPass(!showNewPass)}
          className="absolute right-3 top-9 cursor-pointer text-black"
        />
      </div>

      {/* Confirm Password */}
      <div className="mb-3 relative">
        <label className="block mb-1">Confirm New Password</label>
        <input
          type={showConfirmPass ? "text" : "password"}
          value={confirm_password}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded border text-black focus:outline-none"
        />
        <TbLockPassword
          onClick={() => setShowConfirmPass(!showConfirmPass)}
          className="absolute right-3 top-9 cursor-pointer text-black"
        />
      </div>

      <button
        onClick={handlePasswordChange}
        disabled={loading}
        className={`w-full py-2 rounded-lg mt-4 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? (
          <LiaSpinnerSolid className="animate-spin mx-auto" />
        ) : (
          "Save Changes"
        )}
      </button>
    </div>
  );
};

export default Password;