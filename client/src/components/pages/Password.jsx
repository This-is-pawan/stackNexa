import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../ContextApi";
import axios from "axios";

const Password = () => {
  const { authToken, theme,setBar } = useAppContext(); // Assuming auth token for API
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match");
    }

    try {
      setLoading(true);
      // Replace with your backend API
      const response = await axios.put(
        "/api/user/change-password",
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      toast.success(response.data.message || "Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error(error);
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
      onClick={() =>{

      setBar(false)
    }
    }
    >
      <h2 className={`${ theme === "dark"?'text-yellow-300':'text-white'} text-2xl font-bold mb-4 text-center`}>🔒 Change Password</h2>

      <div className="mb-3">
        <label className="block mb-1">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full px-4 py-2 rounded border focus:outline-none dark:bg-gray-700"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 rounded border focus:outline-none dark:bg-gray-700"
        />
      </div>

      <div className="mb-3">
        <label className="block mb-1">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 rounded border focus:outline-none  dark:bg-gray-700 "
        />
        
      </div>

      <button
        onClick={handlePasswordChange}
        disabled={loading}
        className={` w-full py-2 rounded-lg mt-4 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default Password;