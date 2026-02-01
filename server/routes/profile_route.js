const express = require("express");
const router = express.Router();

const {
  createBasicProfile,
  createProfessionalProfile,
  deleteBasicProfile,
  deleteProfessionalProfile,
  getFullProfile,
  deleteAccount,
  get_all_user_Profile,
} = require("../controllers/profile");

const Verify = require("../middleware/Jwtmiddleware");
const { upload } = require("../config/cloudinary");

/* ================= BASIC PROFILE ================= */
/* image + location + username (ONE CLICK) */
router.post(
  "/profile/basic",
  Verify,
  upload.single("profile"),
  createBasicProfile
);

router.delete("/profile/basic", Verify, deleteBasicProfile);

/* ================= PROFESSIONAL PROFILE ================= */
/* profession, company, education, skills, links (ONE CLICK) */
router.post("/profile/professional", Verify, createProfessionalProfile);

router.delete("/profile/delete-professional", Verify, deleteProfessionalProfile);

/* ================= GET FULL PROFILE ================= */
router.get("/profiles", Verify, getFullProfile);

/* ================= DELETE ACCOUNT ================= */
router.delete("/profile/delete-account", Verify, deleteAccount);
router.get('/get_all_profiles',Verify,get_all_user_Profile)

module.exports = router;