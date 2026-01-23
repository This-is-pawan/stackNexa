import React, { useState, useRef } from "react";
import { useAppContext } from "../ContextApi";
import { TbMoodEdit } from "react-icons/tb";
import { LiaSpinnerSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import axios from "axios";
import deafault_user_image from "../../assets/default_user_image.svg";
import { toast } from "react-toastify";

const Profile = () => {
  const fileInputRef = useRef(null);
  const { user, theme, profiles, setBar, setOpen, fetchProfiles } =
    useAppContext();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [file, setFile] = useState(null);

  const [saveLoading, setSaveLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // 🔥 delete confirm states
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const profile_image =
    profiles?.length > 0 ? profiles[0]?.image?.url : deafault_user_image;

  const isProfileExists = profiles.length > 0;
  const profile_id = profiles?.[0]?._id;

  // ---------------- FILE CHANGE ----------------
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
  };

  // ---------------- UPLOAD ----------------
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Select an image");

    const formData = new FormData();
    formData.append("profile", file);

    try {
      setSaveLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/upload-profile`,
        formData,
        { withCredentials: true }
      );
      toast.success("Profile saved successfully");
      setFile(null);
      fetchProfiles();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save profile");
    } finally {
      setSaveLoading(false);
    }
  };

  // ---------------- UPDATE ----------------
  const handleUpdate = async (e, id) => {
    e.preventDefault();
    if (!file) return toast.error("Select an image");

    const formData = new FormData();
    formData.append("profile", file);

    try {
      setSaveLoading(true);
      await axios.put(
        `${import.meta.env.VITE_API_URL}/update-profile/${id}`,
        formData,
        { withCredentials: true }
      );
      toast.success("Profile updated successfully");
      setFile(null);
      fetchProfiles();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    } finally {
      setSaveLoading(false);
    }
  };

  // ---------------- DELETE FLOW ----------------
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      setDeleteLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/delete-profile/${deleteId}`,
        { withCredentials: true }
      );
      toast.success("Profile deleted successfully");
      fetchProfiles();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete profile");
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <div
      className={`p-6 ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
          : "bg-gradient-to-tr from-black via-gray-900 to-black text-white"
      }`}
      onClick={() => {
        setBar(false);
        setOpen(false);
      }}
    >
      <h1 className="text-3xl font-bold mb-6">👤 Profile</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        {/* PROFILE HEADER */}
        <div className="flex items-center gap-4">
          <img
            src={profile_image}
            alt="profile"
            className="w-20 h-20 rounded-full border hover:scale-150 transition cursor-pointer"
          />

          <div>
            <h2 className="text-xl font-semibold">{user?.email}</h2>
            <p className="text-sm text-gray-500">
              Plan: <b>{user?.plan || "Free"}</b>
            </p>

            {isProfileExists && (
              <button
                type="button"
                onClick={() => handleDeleteClick(profile_id)}
                className="w-full mt-2 p-2 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
              >
                Delete Profile
              </button>
            )}
          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) =>
            isProfileExists
              ? handleUpdate(e, profile_id)
              : handleUpload(e)
          }
          className="max-w-md mx-auto p-4 mt-6"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full px-4 py-2 rounded-lg border mb-4 dark:bg-gray-700"
          />

          <div className="relative w-full h-32 border-2 border-dashed rounded-xl flex flex-col items-center justify-center">
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleFileChange}
            />
            <p className="text-sm">
              {file ? file.name : "Choose profile image"}
            </p>
          </div>

          <button
            type="submit"
            disabled={saveLoading}
            className={`w-full py-2 mt-3 rounded-lg text-white transition
              ${
                saveLoading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {saveLoading ? (
              <LiaSpinnerSolid className="animate-spin mx-auto" />
            ) : isProfileExists ? (
              "Update Profile"
            ) : (
              "Save Profile"
            )}
          </button>
        </form>

        {/* BIO */}
        <label className="block mt-4 mb-2 text-sm">Bio</label>
        {user?.plan === "pro" ? (
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:bg-gray-700"
            rows="3"
          />
        ) : (
          <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900 flex justify-between">
            <p>🚀 Bio is a Pro feature</p>
            <Link to="/Dashboard/Billing">
              <TbMoodEdit className="text-xl animate-pulse" />
            </Link>
          </div>
        )}
      </div>

      {/* 🔥 DELETE CONFIRM MODAL */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-72 text-center">
            <p className="text-red-700 font-semibold mb-4">
              Are you sure you want to delete?
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={confirmDelete}
                className="px-4 py-1 bg-red-600 text-white rounded"
              >
                {deleteLoading ? (
                  <LiaSpinnerSolid className="animate-spin mx-auto" />
                ) : (
                  "Yes, Delete"
                )}
              </button>

              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-1 bg-gray-700 rounded"
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
