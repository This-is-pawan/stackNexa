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
// update username
const UserNameUpdate = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({
      success: false,
      message: "Username is required",
    });
  }

  try {
    const currentUser = await UserNameModel.findById(id);

    if (!currentUser) {
      return res.status(404).json({
        success: false,
        message: "Username not found",
      });
    }

    // ✅ SAME NAME CHECK
    if (currentUser.name === name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username is already updated",
      });
    }

    // ✅ DUPLICATE CHECK
    const existing = await UserNameModel.findOne({ name: name.trim() });
    if (existing && existing._id.toString() !== id) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    currentUser.name = name.trim();
    await currentUser.save();

    res.status(200).json({
      success: true,
      message: "Username updated successfully",
      updatedUser: currentUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
// delete username
const UserNameDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserNameModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.json({ success: false, message: "Username not found" });
    }

    res.json({
      success: true,
      message: "Username deleted successfully",
      deletedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// get username
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

const createBio = async (req, res) => {
  try {
    const { bio } = req.body;

    if (!bio || !bio.trim()) {
      return res.status(400).json({
        success: false,
        message: "Bio is required",
      });
    }

    if (bio.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Bio must be less than 2000 characters",
      });
    }

    const profile = await UserNameModel.create({
      bio: bio.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Bio created successfully",
      bio: profile.bio,
    });
  } catch (error) {
    console.error("CREATE BIO ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create bio",
    });
  }
};

const updateBio = async (req, res) => {
  try {
     const {userId} = req.params; 
    const { bio } = req.body;

    // ✅ validation
    if (!bio || !bio.trim()) {
      return res.status(400).json({
        success: false,
        message: "Bio is required",
      });
    }

    if (bio.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Bio must be less than 2000 characters",
      });
    }

 
    const updatedProfile = await UserNameModel.findByIdAndUpdate(
      userId, 
      { bio: bio.trim() },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Bio not found, create bio first",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bio updated successfully",
      bio: updatedProfile.bio,
    });
  } catch (error) {
    console.error("UPDATE BIO ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update bio",
    });
  }
};
const getBio = async (req, res) => {
  try {
    const profile = await UserNameModel
      .findOne()
      .sort({ _id: -1 });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Bio not found",
      });
    }

    return res.status(200).json({
      success: true,
      bio: profile,
    });
  } catch (error) {
    console.error("GET BIO ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to get bio",
    });
  }
};


module.exports = {
  upload_profile,
  update_profile,
  delete_profile,
  profiles,
  UserName,
  UserNameGet,
  UserNameUpdate,
  UserNameDelete,
  createBio,
  updateBio,
  getBio,
};
