const { profileModel, UserNameModel } = require("../models/profileModel");
const JWTUser = require("../models/JWT_Auth_model");
const cloudinary = require("cloudinary").v2;

/* ================= IMAGE + LOCATION + USERNAME ================= */
const createBasicProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, location } = req.body;

    if (!req.file || !name?.trim()) {
      return res.status(400).json({ success: false, message: "Image & name required" });
    }

    // IMAGE
    let profile = await profileModel.findOne({ user: userId });
    if (profile?.image?.public_id) {
      await cloudinary.uploader.destroy(profile.image.public_id);
    }

    const imageData = {
      url: req.file.path,
      public_id: req.file.filename,
      location: location || "",
      name:name
    };

    profile
      ? await profileModel.updateOne({ user: userId }, { image: imageData })
      : await profileModel.create({ user: userId, image: imageData }) 

    // USERNAME
   const username= await UserNameModel.findOneAndUpdate(
      { user: userId },
      { name: name.trim() },
      { upsert: true }
    );

    res.status(200).json({ success: true, message: "Basic profile created" ,imageData,username});
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* ================= PROFESSIONAL DETAILS ================= */
const createProfessionalProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const updates = {};
    const unsets = {};

    Object.keys(req.body).forEach((key) => {
      const value = req.body[key];

      if (value === "" || value === null || value === undefined) {
        unsets[key] = "";
      } else {
        updates[key] = value;
      }
    });

    const updateQuery = {};
    if (Object.keys(updates).length) updateQuery.$set = updates;
    if (Object.keys(unsets).length) updateQuery.$unset = unsets;

    const profile = await UserNameModel.findOneAndUpdate(
      { user: userId },
      updateQuery,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Professional profile updated",
      profile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
};

/* ================= DELETE BASIC PROFILE ================= */
const deleteBasicProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await profileModel.findOne({ user: userId });
    if (profile?.image?.public_id) {
      await cloudinary.uploader.destroy(profile.image.public_id);
    }

    await profileModel.deleteOne({ user: userId });
    await UserNameModel.updateOne(
      { user: userId },
      { $unset: { name: "" } }
    );

    res.status(200).json({ success: true, message: "Basic profile deleted" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* ================= DELETE PROFESSIONAL DETAILS ================= */
const deleteProfessionalProfile = async (req, res) => {
  try {
    await UserNameModel.updateOne(
      { user: req.user.userId },
      {
        $unset: {
          bio:"",
          profession: "",
          company: "",
          education: "",
          skills: "",
          website: "",
          github: "",
          linkedin: ""
        }
      }
    );

    res.status(200).json({ success: true, message: "Professional details deleted" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

/* ================= GET FULL PROFILE ================= */
const getFullProfile = async (req, res) => {
  try {
    const userId = req.user.userId;

    const image = await profileModel.findOne({ user: userId });
    const details = await UserNameModel.findOne({ user: userId });

    res.status(200).json({ success: true, image, details });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};
const get_all_user_Profile=async (req,res) => {
  try {
     const userId = req.user.userId;
const All_profiles=await profileModel.find()
    if(!All_profiles){
 res.json({success:false,message:'profile_image not exist'})
    }
    res.json({success:true,message:'all_profiles get success',All_profiles})
  } catch (error) {
    res.json({success:false,message:error})
  }
}
/* ================= DELETE ACCOUNT ================= */
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await profileModel.findOne({ user: userId });
    if (profile?.image?.public_id) {
      await cloudinary.uploader.destroy(profile.image.public_id);
    }

    await profileModel.deleteOne({ user: userId });
    await UserNameModel.deleteOne({ user: userId });
    await JWTUser.findByIdAndDelete(userId);

    res.status(200).json({ success: true, message: "Account deleted" });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

module.exports = {
  createBasicProfile,
  createProfessionalProfile,
  deleteBasicProfile,
  deleteProfessionalProfile,
  getFullProfile,
  deleteAccount,
  get_all_user_Profile
};