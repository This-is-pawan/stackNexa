const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const MongoStore=require('connect-mongo').default;
const connection = require("./config/DBFile");
const  router  = require("./routes/Jwt_Route");
const profileRoutes = require("./routes/profile_route");

require("./config/GoogleAuth");
const app = express();
connection();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);


app.use(
  session({
    name: "stacknexa.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: "sessions",
    }),

    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    },
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/login-with-google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

// google callback
app.get(
  "/login-with-google/callback",
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
  },
);

// failed login
app.get("/failed", (req, res) => {
  res.json({ success: false, message: "Google authentication failed" });
});
app.get("/api/auth/user", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ success: false, message: "" });
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
app.use("/api/project", router);
app.use('/api/project',profileRoutes)
app.get("/", (req, res) => {
  res.json({ success: true, message: "Home route is run successfully" });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
