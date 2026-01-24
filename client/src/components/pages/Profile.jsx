import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../ContextApi";
import { TbMoodEdit } from "react-icons/tb";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { FaCrown ,FaSpinner,FaUserTie} from "react-icons/fa";

import axios from "axios";
import deafault_user_image from "../../assets/default_user_image.svg";
import { toast } from "react-toastify";

const Profile = () => {
  const fileInputRef = useRef(null);
  const { user, theme, profiles, setBar, setOpen, fetchProfiles ,user_name,user_name_get,free_loading,} =useAppContext();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [file, setFile] = useState(null);

  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [userNameLoading, setUserNameLoading] = useState(false);
  const [note, setNote] = useState(true);
  const [free_user_name, setFree_user_name] = useState(true);
 
  
  
  // const [pro_user_name, setPro_user_name] = useState(true);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const profileImage =
    profiles?.length > 0 ? profiles[0]?.image?.url : deafault_user_image;

  const isProfileExists = profiles?.length > 0;
  const profileId = profiles?.[0]?._id;

  // ---------------- IMAGE COMPRESS ----------------
  const compressImage = (file, maxSizeMB = 3) =>
    new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => (img.src = reader.result);
      reader.onerror = reject;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 1200;
        const scale = Math.min(1, MAX_WIDTH / img.width);

        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let quality = 0.9;

        const compress = () => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject();
              if (blob.size / 1024 / 1024 <= maxSizeMB || quality <= 0.4) {
                resolve(new File([blob], file.name, { type: "image/jpeg" }));
              } else {
                quality -= 0.1;
                compress();
              }
            },
            "image/jpeg",
            quality
          );
        };

        compress();
      };
    });

  // ---------------- FILE CHANGE ----------------
  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      return toast.error("Only image files allowed");
    }

    try {
      const compressed = await compressImage(selected, 3);
      setFile(compressed);
      toast.success(
        `Optimized to ${(compressed.size / 1024 / 1024).toFixed(2)} MB`
      );
    } catch {
      toast.error("Image processing failed");
    }
  };

  // ---------------- UPLOAD / UPDATE ----------------
  const submitProfile = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("profile", file);

    try {
      setSaveLoading(true);
      const url = isProfileExists
        ? `/profile/update-profile/${profileId}`
        : "/profile/upload-profile";

      const method = isProfileExists ? "put" : "post";

      await axios[method](`${import.meta.env.VITE_API_URL}${url}`, formData, {
        withCredentials: true,
      });

      toast.success(isProfileExists ? "Profile updated" : "Profile saved");
      setFile(null);
      fetchProfiles();
    } catch {
      toast.error("Profile action failed");
    } finally {
      setSaveLoading(false);
    }
  };

  // ---------------- DELETE ----------------
  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/profile/delete-profile/${deleteId}`,
        { withCredentials: true }
      );
      toast.success("Profile deleted");
      fetchProfiles();
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  // ---------------- CREATE USER NAME (FIXED) ----------------
  useEffect(() => {
  if (user_name?.user_name_exist?.plan) {
    setFree_user_name(false);
  }
}, [user_name]);
const [startCreateUsername, setStartCreateUsername] = useState(false);

const common_plan = free_user_name;
  const create_user_name = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Username is required");
    }
  setStartCreateUsername(true);
    try {
      setUserNameLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/profile/user-name`,
        { name },
        { withCredentials: true }
      );

      if (res.data?.success) {
  toast.success("Username created successfully");
  user_name_get();  
  setFree_user_name(false);
  fetchProfiles();
}
 else {
        toast.error(res.data?.message || "Failed to create username");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setUserNameLoading(false);
     
    }
  };


  return (
    <div
      className={`min-h-screen p-4 sm:p-6 relative ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
          : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
      }`}
      onClick={() => {
        setBar(false);
        // setOpen(false);
      }}
    >
      {/* NOTE */}
      {note && (
        <div className="mx-auto w-[92%] sm:w-[80%] md:w-[60%] lg:w-[45%] flex items-start gap-2 text-[10px] sm:text-[11px] text-amber-400 font-medium tracking-wide bg-amber-400/10 px-3 py-2 rounded-2xl border border-amber-400/30 scale-75 hover:scale-100 transition duration-150 absolute top-[-2rem] left-0 right-0">
          <FaCrown className="text-lg sm:text-xl shrink-0 mt-[2px]" />
          <span className="flex-1">
            Pro users can create and update their username & bio. Free users can
            create a username only once.
          </span>
          <button
            onClick={() => setNote(false)}
            className="w-5 h-5 text-[10px] rounded-full bg-green-700 text-white flex items-center justify-center hover:scale-105 transition"
          >
            ✕
          </button>
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">👤 Profile</h1>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-lg space-y-6 relative">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <img
            src={profileImage}
            alt="profile"
            className="w-24 h-24 rounded-full border object-cover hover:scale-105 transition"
          />

          <div className=" text-center sm:text-left ">
            <h2 className="text-lg font-semibold">{user?.email}</h2>
          <article className="text-sm text-gray-400">
  <p className="w-full flex items-center">
    <FaUserTie
      className={`w-6 h-6 rounded-full p-1 border border-gray-700 ${
        theme === "dark" ? "text-blue-500" : "text-green-200"
      }`}
    />
    <span
      className={`text-sm capitalize font-semibold pl-1 ${
        theme === "dark" ? "text-blue-500" : "text-green-200"
      }`}
    >
      {startCreateUsername && free_loading 
        ? <FaSpinner className="mx-auto animate-spin" />
        : user_name?.user_name_exist?.name || "user"}
    </span>
  </p>

  {user_name?.user_name_exist?.plan && (
    <span className="p-1">
      Plan: {user_name.user_name_exist.plan}
    </span>
  )}
</article>





            {isProfileExists && (
              <button
                onClick={() => {
                  setDeleteId(profileId);
                  setShowDeleteConfirm(true);
                }}
                className="mt-2 px-3 py-1 text-xs bg-red-600 hover:bg-red-700 rounded-lg text-white"
              >
                Delete Profile
              </button>
            )}
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={submitProfile}
          className="space-y-4 border border-gray-700 p-4 rounded-xl"
        >
         {common_plan &&    <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Create username"
              className="flex-1 px-4 py-2 rounded-lg dark:bg-gray-700 outline-none capitalize"
            />
              <button
                onClick={create_user_name}
                disabled={userNameLoading}
                className="sm:w-40 w-full py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                {userNameLoading ? (
                  <LiaSpinnerSolid className="mx-auto animate-spin" />
                ) :free_user_name ? "Create New":'Update'
                }
              </button>
          </div>
            }

          {/* IMAGE */}
          <div className="relative h-32 border border-dashed rounded-xl flex items-center justify-center hover:bg-gray-700/30 transition">
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <p className="text-sm text-blue-700">
              {file ? file.name : "Choose profile image"}
            </p>
          </div>

          <button
            type="submit"
            disabled={saveLoading}
            className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {saveLoading ? (
              <LiaSpinnerSolid className="mx-auto animate-spin" />
            ) : isProfileExists ? (
              "Update Profile"
            ) : (
              "Save Profile"
            )}
          </button>
        </form>

        {/* BIO */}
        <div>
          <label className="block mb-2 text-sm">Bio</label>
          {user?.plan === "pro" ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 rounded-lg dark:bg-gray-700"
            />
          ) : (
            <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900">
              <p>🚀 Bio is a Pro feature</p>
              <Link to="/Dashboard/Billing">
                <TbMoodEdit className="text-xl animate-pulse" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* DELETE MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-5 w-72 text-center">
            <p className="text-red-600 font-semibold mb-4">
              Delete this profile?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                {deleteLoading ? (
                  <LiaSpinnerSolid className="animate-spin mx-auto" />
                ) : (
                  "Yes"
                )}
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-1 bg-gray-700 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
