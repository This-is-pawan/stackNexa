import React, { useState } from "react";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useAppContext } from "../ContextApi";
import axios from "axios";
import { toast } from "react-toastify";
import default_user_image from "../../assets/default_user_image.svg";

const ProfileUpdate = () => {
  const { theme, plan, fetchProfiles } = useAppContext();

  /* ================= LOADING ================= */
  const [loading, setLoading] = useState(false);

  /* ================= BASIC STATE ================= */
  const [profile_image, setProfile_image] = useState(null);
  const [imageSize, setImageSize] = useState(null);
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");

  /* ================= PROFESSIONAL STATE ================= */
  const [company, setCompany] = useState("");
  const [education, setEducation] = useState("");
  const [bio, setBio] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [skills, setSkills] = useState("");
  const [profession, setProfession] = useState("");
  const [website, setWebsite] = useState("");

  /* 🔥 TRACK ONLY CHANGED FIELDS */
  const [dirtyFields, setDirtyFields] = useState({});

  const markDirty = (field, setter) => (e) => {
    setter(e.target.value);
    setDirtyFields((prev) => ({ ...prev, [field]: true }));
  };

  /* ================= IMAGE RESIZE ================= */
  const resizeImage = (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const reader = new FileReader();

      reader.onload = (e) => (img.src = e.target.result);

      img.onload = () => {
        const MAX_WIDTH = 500;
        const scale = MAX_WIDTH / img.width;

        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scale;

        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
          (blob) => resolve(new File([blob], file.name, { type: file.type })),
          file.type,
          0.8
        );
      };

      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const resized = await resizeImage(file);
    setProfile_image(resized);
    setImageSize((resized.size / (1024 * 1024)).toFixed(2));
  };

  /* ================= BASIC PROFILE ================= */
  const create_basic_profile = async (e) => {
    e.preventDefault();

    if (!profile_image || !name || !location) {
      return toast.error("All basic fields are required");
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("profile", profile_image);
      formData.append("location", location);
      formData.append("name", name);

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

  /* ================= PROFESSIONAL PROFILE (FIXED) ================= */
  const create_professional_profile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {};

      if (dirtyFields.profession) payload.profession = profession;
      if (dirtyFields.company) payload.company = company;
      if (dirtyFields.education) payload.education = education;
      if (dirtyFields.skills) payload.skills = skills;
      if (dirtyFields.website) payload.website = website;
      if (dirtyFields.github) payload.github = github;
      if (dirtyFields.linkedin) payload.linkedin = linkedin;
      if (dirtyFields.bio) payload.bio = bio;

      if (Object.keys(payload).length === 0) {
        toast.info("No changes to update");
        return;
      }

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
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Username" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <button disabled={loading} className="w-full py-2 rounded-lg bg-blue-600">
              {loading ? <LiaSpinnerSolid className="mx-auto animate-spin" /> : "Save Basic Info"}
            </button>
          </div>
        </form>

        {/* ================= PROFESSIONAL ================= */}
        {plan?.plan && (
          <form onSubmit={create_professional_profile} className="space-y-4">
            <input value={profession} onChange={markDirty("profession", setProfession)} placeholder="Profession" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input value={company} onChange={markDirty("company", setCompany)} placeholder="Company" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input value={education} onChange={markDirty("education", setEducation)} placeholder="Education" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input value={skills} onChange={markDirty("skills", setSkills)} placeholder="Skills" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input value={website} onChange={markDirty("website", setWebsite)} placeholder="Website" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input value={github} onChange={markDirty("github", setGithub)} placeholder="GitHub" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <input value={linkedin} onChange={markDirty("linkedin", setLinkedin)} placeholder="LinkedIn" className="w-full px-4 py-3 rounded-xl bg-gray-800" />
            <textarea value={bio} onChange={markDirty("bio", setBio)} rows="4" placeholder="Write your bio..." className="w-full px-4 py-3 rounded-xl bg-gray-800 resize-none" />
            <button disabled={loading} className="w-full py-2 rounded-lg bg-green-600">
              {loading ? <LiaSpinnerSolid className="mx-auto animate-spin" /> : "Save Profile Details"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfileUpdate;
