const express=require('express');
const routers=express.Router()

const { upload_profile, update_profile, delete_profile, profiles,UserName, UserNameGet } = require('../controllers/profile');
const { upload } = require('../config/cloudinary');


  routers.post("/upload-profile",upload.single("profile"),upload_profile);
  routers.put("/update-profile/:id", upload.single("profile"),update_profile)
  routers.delete("/delete-profile/:id",delete_profile)
  routers.get("/profiles",profiles)
  routers.post("/user-name",UserName)
  routers.get("/user-name-get",UserNameGet)
  module.exports={routers}