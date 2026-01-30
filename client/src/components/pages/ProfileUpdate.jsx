import React, { useState, useMemo } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useAppContext } from "../ContextApi";
import axios from "axios";
import { toast } from "react-toastify";

const ProfileUpdate = () => {
  const { theme, plan, fetchProfiles } = useAppContext();

  /* ================= LOADING ================= */
  const [loading, setLoading] = useState(false);

  /* ================= BASIC ================= */
  const [profile_image, setProfile_image] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  /* ================= PROFESSIONAL ================= */
  const [profession, setProfession] = useState("");
  const [company, setCompany] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bio, setBio] = useState("");

  /* ================= DIRTY TRACK ================= */
  const [dirtyFields, setDirtyFields] = useState({});

  const markDirty = (field, setter) => (e) => {
    const value = e.target.value;
    setter(value);
    setDirtyFields((prev) => ({ ...prev, [field]: value.trim() }));
  };

  /* ================= ENABLE CHECK ================= */
  const isProfessionalEnabled = useMemo(() => {
    return Object.values(dirtyFields).some(Boolean);
  }, [dirtyFields]);

  /* ================= IMAGE HANDLER ================= */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfile_image(file);
    setImageSize((file.size / (1024 * 1024)).toFixed(2));
  };

  /* ================= BASIC SUBMIT ================= */
  const create_basic_profile = async (e) => {
    e.preventDefault();

    if (!profile_image || !name || !location) {
      return toast.error("All basic fields are required");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("profile", profile_image);
      formData.append("name", name);
      formData.append("location", location);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/profile/basic`,
        formData,
        { withCredentials: true }
      );

      toast.success(res.data?.message || "Basic profile updated");
      fetchProfiles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= PROFESSIONAL SUBMIT ================= */
  const create_professional_profile = async (e) => {
    e.preventDefault();

    if (!isProfessionalEnabled) {
      return toast.info("Fill at least one field");
    }

    try {
      setLoading(true);

      const payload = {};
      Object.entries(dirtyFields).forEach(([key, val]) => {
        if (val) payload[key] = val;
      });

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/profile/professional`,
        payload,
        { withCredentials: true }
      );

      toast.success(res.data?.message || "Profile updated");
      setDirtyFields({});
      fetchProfiles();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= STYLES ================= */
  const pageBg =
    theme === "dark"
      ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
      : "bg-gradient-to-tr from-black via-gray-900 to-black text-white";

  const cardBg =
    theme === "dark"
      ? "bg-gray-900 border border-gray-700"
      : "bg-gray-950 border border-gray-800";

  /* ================= UI ================= */
  return (
    <div className={`min-h-screen p-4 sm:p-6 ${pageBg}`}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        ✏️ Update Profile
      </h1>

      <div className={`max-w-4xl mx-auto rounded-2xl shadow-xl p-5 sm:p-8 space-y-10 ${cardBg}`}>
        {/* ================= BASIC ================= */}
        <form onSubmit={create_basic_profile}>
          <h3 className="font-semibold mb-3">Profile Image</h3>

          {/* 🔥 SAME CHOOSE FILE BOX */}
          <div className="relative h-36 border-2 border-dashed rounded-xl flex flex-col items-center justify-center hover:bg-gray-700/30 transition cursor-pointer">
            <input
              type="file"
              accept="image/png,image/jpeg"
              className="absolute inset-0 opacity-0 cursor-pointer"
              onChange={handleImageChange}
            />
            <p className="text-sm text-blue-400 font-medium">
              Choose profile image (Max 5MB)
            </p>
            {imageSize && (
              <p className="text-xs text-green-400 mt-1">
                Image size: {imageSize} MB ✅
              </p>
            )}
          </div>

          <div className="space-y-4 mt-6">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-xl bg-gray-800"
            />

            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="w-full px-4 py-3 rounded-xl bg-gray-800"
            />

            <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-600">
              {loading ? (
                <LiaSpinnerSolid className="mx-auto animate-spin" />
              ) : (
                "Save Basic Info"
              )}
            </button>
          </div>
        </form>

        {/* ================= PROFESSIONAL ================= */}
        {plan?.plan && (
          <form onSubmit={create_professional_profile} className="space-y-4">
            <input onChange={markDirty("profession", setProfession)} placeholder="Profession" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input onChange={markDirty("company", setCompany)} placeholder="Company" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input onChange={markDirty("education", setEducation)} placeholder="Education" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input onChange={markDirty("skills", setSkills)} placeholder="Skills" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input onChange={markDirty("website", setWebsite)} placeholder="Website" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input onChange={markDirty("github", setGithub)} placeholder="GitHub" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input onChange={markDirty("linkedin", setLinkedin)} placeholder="LinkedIn" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <textarea onChange={markDirty("bio", setBio)} rows="4" placeholder="Write your bio..." className="w-full px-4 py-3 rounded-xl bg-gray-800 resize-none" />

            <button
              disabled={loading || !isProfessionalEnabled}
              className={`w-full py-2 rounded-lg ${
                isProfessionalEnabled
                  ? "bg-blue-600"
                  : "bg-gray-600 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <LiaSpinnerSolid className="mx-auto animate-spin" />
              ) : (
                "Save Profile Details"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileUpdate;
