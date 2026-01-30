import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAppContext } from "../ContextApi";
import { LiaSpinnerSolid } from "react-icons/lia";
import axios from "axios";
import { toast } from "react-toastify";

const Setting = () => {
  const { theme, user, setBar,setOpen, auth ,setAuth,plan,  plan_loading} = useAppContext();
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [showSecurityCheck, setShowSecurityCheck] = useState(false);
  const [name, setName] = useState("");
  const [danger_loading, setDangerLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
const navigate=useNavigate()
const [dangerUserId, setDangerUserId] = useState(null);
 const isExactUserIdMatch =name.trim() === dangerUserId;
  const [dangerUserName, setDangerUserName] = useState(null);
useEffect(() => {
  if (auth?.user?._id && auth?.user?.name) {
    setDangerUserId(auth.user._id);
    setDangerUserName(auth.user.name)
  }
}, [auth]);


  const delete_user_permanently = async () => {
    try {
      setDangerLoading(true);

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/project/profile/delete-account`,
        { withCredentials: true }
      );

      toast.success("Account deleted successfully");
     
      setAuth({
      user: null,
      isAuthenticated: false,
      loading: false,
    });
      navigate('/register')
      setDeleteAccount(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setDangerLoading(false);
    }
  };

  const deleteAccountQuestions = [
    "Are you sure you want to permanently delete your account?",
    "Do you understand that all your data will be erased?",
    "This action cannot be undone. Do you agree?",
    "Have you backed up important information?",
    "Are you deleting this account by your own choice?",
  ];

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const allChecked = checkedItems.length === deleteAccountQuestions.length;

  return (
    <div
      className={`min-h-screen transition-all duration-300
        ${
          theme === "dark"
            ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
            : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
        }`}
      onClick={() => {
        setBar(false)
        setOpen(false)
      }
      }
    >
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">⚙️ Settings</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
            <h2 className="text-xl font-semibold mb-3">Account</h2>
<Link to="profile" className="block py-2 hover:underline">
              Profile
            </Link>
            <Link to="profile-update" className="block py-2 hover:underline">
              Edit Profile
            </Link>

            <Link to="change-password" className="block py-2 hover:underline">
              Change Password
            </Link>
          </div>

          <div className="md:col-span-2 space-y-4">
            <Outlet />

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
              <h2 className="text-xl font-semibold mb-3">Subscription</h2>
             {plan_loading?(<LiaSpinnerSolid/>):
             (<p>
                Current Plan:
                <span className="ml-2 font-bold text-blue-600">
                  {plan?.plan || "Free"}
                </span>
              </p>)}

              <Link
                to="/dashboard/billing"
                className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg animate-pulse transition-all duration-300"
              >
                Upgrade to Pro 🚀
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
              <h2 className="text-xl font-semibold mb-3">Preferences</h2>
              <p>Project Level: {user?.plan === "pro" ? "Advanced" : "Basic"}</p>
              <p>Theme: {theme}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow">
              <h2 className="text-xl font-semibold mb-3">Notifications</h2>
              <p>Email Alerts</p>
              <p>New Project Notifications</p>
            </div>

            <div className="bg-red-50 dark:bg-red-900 rounded-xl p-5 shadow">
              <h2 className="text-xl font-semibold text-red-600 mb-3">
                Danger Zone
              </h2>

              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  setCheckedItems([]);
                  setShowSecurityCheck(true);
                }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSecurityCheck && (
        <div className="w-full max-[900px]:max-w-[80%] bg-yellow-50 dark:bg-yellow-900 rounded-xl p-5 shadow mt-4 max-w-3xl mx-auto absolute left-1/2 -translate-x-1/2 top-[12rem]">
          <h3 className="text-lg font-semibold mb-3 text-yellow-700">
            ⚠️ Before you delete your account
          </h3>

          <ul className="space-y-3 text-sm">
            {deleteAccountQuestions.map((q, i) => (
              <li key={i} className="flex gap-3">
                <input
                  type="checkbox"
                  checked={checkedItems.includes(i)}
                  onChange={() => handleCheckboxChange(i)}
                />
                <span>{q}</span>
              </li>
            ))}
          </ul>

          <div className="flex justify-end gap-3 mt-4">
            <button
              className="px-4 py-2 bg-gray-600 rounded-lg max-[900px]:text-[9px]"
              onClick={() => setShowSecurityCheck(false)}
            >
              Cancel
            </button>

            <button
              disabled={!allChecked}
              className={`px-4 py-2 rounded-lg text-white max-[900px]:text-[9px] ${
                allChecked ? "bg-red-600" : "bg-red-400 cursor-not-allowed"
              }`}
              onClick={() => {
                setShowSecurityCheck(false);
                setDeleteAccount(true);
              }}
            >
              I Understand, Continue
            </button>
          </div>
        </div>
      )}

      {deleteAccount && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setDeleteAccount(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md p-6 rounded-xl shadow-xl ${
              theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
            }`}
          >
            <h2 className="text-xl font-bold text-red-600 mb-4">
              Confirm Account Deletion
            </h2>

            <div className=" w-full text-center mb-3 flex items-center justify-center ">
              <p>This-is-{dangerUserName}</p><p className="select-text">"{dangerUserId}"</p>
            </div>


            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your full name"
              className="w-full px-4 py-2 rounded-lg border mb-4 text-black"
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 rounded-lg"
                disabled={danger_loading}
                onClick={() => setDeleteAccount(false)}
              >
                Cancel
              </button>

             <button
  disabled={danger_loading || !isExactUserIdMatch}
  onClick={() => delete_user_permanently()}
  className={`px-4 py-2 rounded-lg flex gap-2 text-white
    ${
      danger_loading || !isExactUserIdMatch
        ? "bg-red-400 cursor-not-allowed"
        : "bg-red-600"
    }`}
>
  {danger_loading ? (
    <LiaSpinnerSolid className="animate-spin" />
  ) : (
    "Permanently Delete"
  )}
</button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
