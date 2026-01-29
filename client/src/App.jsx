import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./components/ContextApi";

// Components
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserVerified from "./components/UserVerified";
import GlobalError from "./components/GlobalError";
import GlobalLoading from "./components/GloblaLoading";

// Dashboard Pages
import Overview from "./components/pages/Overview";
import FirstCourse from "./components/pages/FirstCourse";
import SecondCourse from "./components/pages/SecondCourse";
import ThirdCourse from "./components/pages/ThirdCourse";
import FourthCourse from "./components/pages/FourthCourse";
import MERNSTACK from "./components/pages/MERNSTACK";
import PaymentIntergration from "./components/pages/PaymentIntergation";
import Ecommerce from "./components/pages/Ecommerce";
import SassDashboard from "./components/pages/SaasDashboard";
import BusinessApp from "./components/pages/BusinessApp";
import Profile from "./components/pages/Profile";
import ProfileUpdate from './components/pages/ProfileUpdate'
import Password from "./components/pages/Password";
import Setting from "./components/pages/Setting";
import Help from "./components/pages/Help";
import Privacy from "./components/pages/Privacy";
import TermCondition from "./components/pages/TermCondition";
import Billing from "./components/pages/Billing";
import RazorpayPayment from "./components/pages/RazorpayPayment";
import ReceiptPage from "./components/pages/Receipt";
import MoreAbout from "./components/pages/MoreAbout";
import Offers from "./components/pages/Offers";
import Certificate from "./components/pages/Certificate"
const App = () => {
  const { theme, auth, Googleuser, verified } = useAppContext();

  const loading = auth?.loading || Googleuser?.loading;
  if (loading) return <GlobalLoading />;

  const isAuth = auth?.isAuthenticated || Googleuser?.isAuthenticated;

  return (
    <>
      {/* ✅ ToastContainer outside layout */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        pauseOnFocusLoss={false}
      />

      
      <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white"} pt-16 transition-all`}>
        {/* Navbar */}
        <Navbar />
        <Offers />
        <Routes>
         
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={verified ? <Login /> : <Register />} />
         <Route path="/more-about" element={ <MoreAbout/>}/>
          <Route path="/user-verified" element={<UserVerified />} />
          <Route path="/razorpaypayment" element={<RazorpayPayment />} />
          <Route path="/receipt" element={<ReceiptPage />} />

          {/* ================= PROTECTED DASHBOARD ================= */}
          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
          >
            <Route index element={<Overview />} />
            <Route path="first-course" element={<FirstCourse />} />
            <Route path="second-course" element={<SecondCourse />} />
            <Route path="third-course" element={<ThirdCourse />} />
            <Route path="fourth-course" element={<FourthCourse />} />
            <Route path="mern-stack" element={<MERNSTACK />} />
            <Route path="payment-integration" element={<PaymentIntergration />} />
            <Route path="ecommerce" element={<Ecommerce />} />
            <Route path="saas-dashboard" element={<SassDashboard />} />
            <Route path="business-application" element={<BusinessApp />} />

            <Route path="setting" element={<Setting />}>
              <Route path="profile" element={<Profile />} />
              <Route path="profile-update" element={<ProfileUpdate />} />
              <Route path="change-password" element={<Password />} />
            </Route>

            <Route path="help" element={<Help />} />
            <Route path="certificate" element={<Certificate />} />
            <Route path="privacy-policy" element={<Privacy />} />
            <Route path="term-condition" element={<TermCondition />} />
            <Route path="billing" element={<Billing />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<GlobalError />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
