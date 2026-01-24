const dotenv = require("dotenv");
const { profileModel, UserNameModel } = require("../models/profileModel");

// upload
const cloudinary = require("cloudinary").v2;
const upload_profile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file received",
      });
    }

    const data = await profileModel.create({
      image: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded & saved",
      data,
    });
  } catch (error) {
    // rollback cloudinary if DB fails
    if (req.file?.filename) {
      await cloudinary.uploader.destroy(req.file.filename);
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update
const update_profile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const profile = await profileModel.findById(req.params.id);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    if (profile.image?.public_id) {
      await cloudinary.uploader.destroy(profile.image.public_id);
    }

    profile.image = {
      url: req.file.path,
      public_id: req.file.filename,
    };

    await profile.save();

    res.json({ success: true, message: "Image updated", data: profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// delete
const delete_profile = async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Data not found" });
    }

    if (profile.image?.public_id) {
      await cloudinary.uploader.destroy(profile.image.public_id);
    }

    await profile.deleteOne();

    res.json({
      success: true,
      message: "Image deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// profile data
const profiles = async (req, res) => {
  const data = await profileModel.find();
  res.json({ success: true, data });
};

const UserName = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.json({ success: false, message: "name is required" });
  }
  try {
    const user = await UserNameModel.findOne({ name });

    if (user) {
      res.json({ success: false, message: "user-name already exist" });
    }
    const creating_user = await UserNameModel.create({ name });
    res.json({
      success: true,
      message: "create username successfully",
      creating_user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const UserNameGet=async (req,res) => {
 
  try {
   const user_name_exist = await UserNameModel.findOne();
    if (user_name_exist) {
      res.json({ success: true, message: "get user name successfully",user_name_exist });
    }
  } catch (error) {
    res.json({ success: false, message:error });
  }
}

module.exports = {
  upload_profile,
  update_profile,
  delete_profile,
  profiles,
  UserName,
  UserNameGet,
};
