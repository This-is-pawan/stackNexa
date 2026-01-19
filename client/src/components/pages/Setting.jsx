import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAppContext } from "../ContextApi";

const Setting = () => {
  const { theme, user, setBar,
 setOpen } = useAppContext();

  const [deleteAccount, setDeleteAccount] = useState(false);
  const [name, setName] = useState("");

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
          : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
      }`}
      onClick={()=>{
    setBar(false)
//  setOpen(false)
   }} 
    >
      <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT MENU */}
        <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
          <h2 className="text-xl font-semibold mb-3">Account</h2>

          <Link to="profile" className="block py-2 hover:underline">
            Edit Profile
          </Link>

          <Link to="change-password" className="block py-2 hover:underline">
            Change Password
          </Link>
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 space-y-4">
          <Outlet />

          {/* Subscription */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold mb-3">Subscription</h2>
            <p>
              Current Plan:
              <span className="ml-2 font-bold text-blue-600">
                {user?.plan || "Free"}
              </span>
            </p>

            <Link
              to="/dashboard/billing"
              className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg animate-pulse tansition-all duration-300"
            >
              Upgrade to Pro 🚀
            </Link>
          </div>

          {/* Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold mb-3">Preferences</h2>
            <p>Project Level: {user?.plan === "pro" ? "Advanced" : "Basic"}</p>
            <p>Theme: {theme}</p>
          </div>

          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold mb-3">Notifications</h2>
            <p>Email Alerts</p>
            <p>New Project Notifications</p>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 dark:bg-red-900 rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold text-red-600 mb-3 ">
              Danger Zone
            </h2>

            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
              onClick={() => setDeleteAccount(true)}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* delete */}
      {deleteAccount && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div
            className={`w-full max-w-md p-6 rounded-xl shadow-xl ${
              theme === "dark"
                ? "bg-gray-900 text-white"
                : "bg-white text-black"
            }`}
          >
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Confirm Account Deletion
            </h2>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your full name"
              className="w-full px-4 py-2 rounded-lg border mb-4 text-black"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteAccount(false)}
                className="px-4 py-2 bg-gray-400 rounded-lg"
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;