import React from "react";
import {
  FaUserTie,
  FaCrown,
  FaMapMarkerAlt,
  FaBriefcase,
  FaGraduationCap,
  FaTools,
  FaGithub,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";
import default_user_image from "../../assets/default_user_image.svg";
import { useAppContext } from "../ContextApi";

const Profile = () => {
  const { theme, profiles, auth,plan } = useAppContext();
  const website = profiles?.details?.website;
  const github = profiles?.details?.github;
  const linkedin = profiles?.details?.linkedin;
  const bio = profiles?.details?.bio;
  const Plan= plan?.plan;
  const education = profiles?.details?.education;
  const skills = profiles?.details?.skills;
  const company = profiles?.details?.company;
  const profession = profiles?.details?.profession;
  const location = profiles?.image?.image?.location;

  const user_email = auth?.user?.email;
  const user_name = profiles?.image?.image?.name;
  const profileImage = profiles?.image?.image?.url || default_user_image;

  const pageBg =
    theme === "dark"
      ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
      : "bg-gradient-to-tr from-black via-gray-900 to-black text-white";

  const cardBg =
    theme === "dark"
      ? "bg-gray-900 border border-gray-700"
      : "bg-gray-950 border border-gray-800";

  const sectionBg =
    theme === "dark" ? "bg-gray-800 text-yellow-200" : "bg-black text-gray-200";

  return (
    <div className={`min-h-screen p-2 sm:p-6 ${pageBg}`}>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        👤 My Profile
      </h1>

      <div
        className={`max-w-4xl mx-auto rounded-2xl shadow-xl p-5 sm:p-6 space-y-6 ${cardBg}`}
      >
        {/* ================= HEADER ================= */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={profileImage}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border-4 border-gray-600 shadow-md"
          />

         <div className=" text-center sm:text-left space-y-1">
  <h2 className="text-[12px] tracking-wider  ">
    {user_email}
  </h2>

  <p className="flex justify-center sm:justify-start items-center gap-2 text-sm">
    <FaUserTie />
    <span className="capitalize font-semibold">{user_name}</span>
  </p>

  <p className="flex justify-center sm:justify-start items-center gap-2 text-xs">
    <FaCrown className="text-yellow-400" />
    <span>Plan: {Plan || "free"}</span>
  </p>
</div>

        </div>

        <div className="border-t border-gray-700" />

        {/* ================= BASIC INFO ================= */}
        <div className={`rounded-xl p-4 space-y-2 text-sm ${sectionBg}`}>
          <h3 className="font-semibold text-base mb-2">📌 Basic Info</h3>

          <p className="flex items-center gap-2">
            <FaMapMarkerAlt />
            <span>{location || "Location not added"}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaBriefcase />
            <span>{profession || "Profession not added"}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaBriefcase />
            <span>{company || "Company not added"}</span>
          </p>
        </div>

        {/* ================= EDUCATION & SKILLS ================= */}
        <div className={`rounded-xl p-4 space-y-2 text-sm ${sectionBg}`}>
          <h3 className="font-semibold text-base mb-2">
            🎓 Education & Skills
          </h3>

          <p className="flex items-center gap-2">
            <FaGraduationCap />
            <span>{education || "Education not added"}</span>
          </p>

          <p className="flex items-center gap-2">
            <FaTools />
            <span>{skills || "Skills not added"}</span>
          </p>
        </div>

        {/* ================= BIO ================= */}
        {plan?.plan &&
        <div>
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 text-wrap">
            📝 Bio
          </h3>

          <div
            className={`rounded-xl p-4 text-sm leading-relaxed ${sectionBg}`}
          >
            {bio || "No bio added yet"}
          </div>
        </div>
}
        {/* ================= LINKS ================= */}
         {plan?.plan &&
        <div className={`rounded-xl p-4 space-y-2 text-sm ${sectionBg}`}>
          <h3 className="font-semibold text-base mb-2">🔗 Links</h3>

          <p className="flex items-center gap-2">
            <FaGlobe />
            {website ? (
              <a
                href={website}
                target="_blank"
                className="text-blue-400 underline"
              >
                {website}
              </a>
            ) : (
              "Website not added"
            )}
          </p>

          <p className="flex items-center gap-2">
            <FaGithub />
            {github ? (
              <a
                href={github}
                target="_blank"
                className="text-blue-400 underline"
              >
                {github}
              </a>
            ) : (
              "GitHub not added"
            )}
          </p>

          <p className="flex items-center gap-2">
            <FaLinkedin />
            {linkedin ? (
              <a
                href={linkedin}
                target="_blank"
                className="text-blue-400 underline"
              >
                {linkedin}
              </a>
            ) : (
              "LinkedIn not added"
            )}
          </p>
        </div>}
      </div>
    </div>
  );
};

export default Profile;
