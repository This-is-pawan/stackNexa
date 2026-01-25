const cloudinary=require('cloudinary').v2
const {CloudinaryStorage} =require('multer-storage-cloudinary');
const multer=require('multer');
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
  module.exports={upload}