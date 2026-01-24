const express=require('express');
const routers=express.Router()
const cloudinary=require('cloudinary').v2
const {CloudinaryStorage} =require('multer-storage-cloudinary');
const multer=require('multer');
const { upload_profile, update_profile, delete_profile, profiles,UserName, UserNameGet } = require('../controllers/profile');
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
 api_key:process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const storage=new CloudinaryStorage({
  cloudinary:cloudinary,
  params:{
    folder:'pofiles',
    allowed_formates:['jpg','jpeg','png','webp'],
    public_id:()=>`profile_${Date.now()}`,
     overwrite: true,
  }
});
const upload=multer({storage, limits: {
    fileSize: 3 * 1024 * 1024, // 5MB
  },})
  routers.post("/upload-profile",upload.single("profile"),upload_profile);
  routers.put("/update-profile/:id", upload.single("profile"),update_profile)
  routers.delete("/delete-profile/:id",delete_profile)
  routers.get("/profiles",profiles)
  routers.post("/user-name",UserName)
  routers.get("/user-name-get",UserNameGet)
  module.exports={routers}