import React, { useState } from "react";
import { useAppContext } from "../ContextApi";
import { TbMoodEdit } from "react-icons/tb";
import {Link} from 'react-router-dom'
const Profile = () => {
  const { user, theme } = useAppContext();
  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");

  const handleUpdate = () => {
    // API call here
    console.log({ name, bio });
  };

  return (
    <div
      className={` p-6  ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
          : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

      {/* Profile Card */}
      <div className=" bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        {/* Avatar */}
        <div className="flex items-center gap-4 m-">
          <img
            src={user?.avatar || "https://i.pravatar.cc/150"}
            alt="profile"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-xl font-semibold">{user?.email}</h2>
            <p className="text-sm text-gray-500">
              Plan: <span className="font-bold">{user?.plan || "Free"}</span>
            </p>
          </div>
        </div>

        {/* Name */}
        <form className="max-w-md mx-auto p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
  {/* Full Name */}
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">Full Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter your full name"
      className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
    />
  </div>

  {/* Profile Photo */}
  <div className="w-full">
  <label className="block text-sm font-medium mb-2">
    Upload a file
  </label>

  <div className="relative flex flex-col items-center justify-center w-full h-40
    border-2 border-dashed rounded-xl cursor-pointer
    border-gray-300 dark:border-gray-600
    hover:border-blue-500 transition
    bg-gray-50 dark:bg-gray-800">

    <input
      type="file"
      accept="image/png, image/jpeg, "
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer "
      onChange={(e) => setPhoto(e.target.files[0])}
    />

    
    <p className="text-sm text-gray-600 dark:text-gray-300">
      <span className="font-semibold text-blue-600">Upload a file</span> or drag and drop
    </p>
    <p className="text-xs text-gray-400 mt-1">
      PNG, JPG, GIF up to 2MB
    </p>
  </div>
</div>

 
  {/* Submit Button */}
  <button
    type="submit"
    className="w-full py-2 mt-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  >
    Save Changes
  </button>
</form>


        {/* Bio (Pro feature) */}
        <label className="block mt-4 mb-2 text-sm">Bio</label>

        {user?.plan === "pro" ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700"
            rows="3"
          />
        ) : (
          <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900 text-sm flex items-center justify-around ">
           <p>🚀Bio editing is a <b>Pro feature</b></p>   
          <Link to='/Dashboard/Billing'> <TbMoodEdit className="text-[1.4rem] text-white animate-pulse tansition-all duration-300"/></Link>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleUpdate}
          className="mt-6 w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;