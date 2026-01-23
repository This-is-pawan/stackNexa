const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const jwt=require('jsonwebtoken')
dotenv.config();
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const connection = require('./config/DBFile');
const { router } = require('./routes/Jwt_Route');

require('./config/GoogleAuth');
const multer=require('multer');

const cloudinary=require('cloudinary').v2;
const {CloudinaryStorage} =require('multer-storage-cloudinary');
const profileModel = require('./models/profilModel');
const app = express();
connection();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
// cloudinary
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
const storage=new CloudinaryStorage({
  cloudinary,
  params:{
    folder:'pofiles',
    allowed_formates:['jpg','jpeg','png','webp'],
    public_id:()=>`profile_${Date.now()}`,
  }
});
const upload=multer({storage, limits: {
    fileSize: 3 * 1024 * 1024, // 5MB
  },})
app.post("/upload-profile",upload.single("profile"),async (req,res) => {
  try {
    if(!req.file){
      return res.status(400).json({success:false,message:'no file received'});
    }
    const data=await profileModel.create({
      image:{
        url:req.file.path,
        public_id:req.file.filename,
      },
    });
      res.status(201).json({
      success: true,
      message: "Image uploaded & saved",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
})

app.put("/update-profile/:id", upload.single("profile"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const profile = await profileModel.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Data not found" });
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
});


app.delete("/delete-profile/:id", async (req, res) => {
  try {
    const profile = await profileModel.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ success: false, message: "Data not found" });
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
});

// get all profiles 
app.get("/profiles", async (req, res) => {
  const data = await profileModel.find();
  res.json({ success: true, data });
});















// 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/login-with-google",
  passport.authenticate("google", {
    scope: ["profile", "email" ]
  })
);

// google callback
app.get(
  "/login-with-google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL); 
  }
);

// failed login
app.get("/failed", (req, res) => {
  res.json({ success: false, message: "Google authentication failed" });
  
});
app.get("/api/auth/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message:'' });
  }
  const u = req.user; 
  res.json({
    success: true,
    user: {
      id: u._id,
      name: u.name,
      email: u.email,
      photo: u.photo,
    },
  });
});





app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect(process.env.FRONTEND_URL);
  });
});




// API routes
app.use('/api/project', router);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Home route is run successfully' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});