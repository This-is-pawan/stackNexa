import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./components/ContextApi";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserVerified from "./components/UserVerified";
import GlobalError from "./components/GlobalError";
import GlobalLoading from "./components/GloblaLoading";
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
import Password from "./components/pages/Password";
import Setting from "./components/pages/Setting";
import Help from "./components/pages/Help";
import Privacy from "./components/pages/Privacy";
import TermCondition from "./components/pages/TermCondition";
import Billing from "./components/pages/Billing";
import RazorpayPayment from "./components/pages/RazorpayPayment";
import ReceiptPage from "./components/pages/Receipt";

const App = () => {
  const { theme, auth, Googleuser, verified } = useAppContext();

  const currentLoading =
    auth?.loading || Boolean(Googleuser?.loading);

  if (currentLoading) return <GlobalLoading />;

  const currentUser =
    auth?.isAuthenticated || Boolean(Googleuser?.isAuthenticated);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />
    <div className={theme === "dark" ? "bg-black text-white" : "bg-white"}>
      
    
    
      <Navbar />


      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={verified ? <Login /> : <Register />}
        />
        <Route path="/user-verified" element={<UserVerified />} />
        <Route path="/razorpaypayment" element={<RazorpayPayment />} />
        <Route path="/receipt" element={<ReceiptPage />} />

        {/* ================= PROTECTED DASHBOARD ================= */}
        <Route
          path="/dashboard"
          element={
            currentUser ? <Dashboard /> : <Navigate to="/login" />
          }
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
            <Route path="change-password" element={<Password />} />
          </Route>

          <Route path="help" element={<Help />} />
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
