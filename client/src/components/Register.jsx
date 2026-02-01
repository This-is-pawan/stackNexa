import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { LiaSpinnerSolid } from "react-icons/lia";
import { TbLockPassword } from "react-icons/tb";
import { useAppContext } from "./ContextApi";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { theme, setOtpExpire_time,setBar,verified } = useAppContext();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/register`,
        data
      );

      if (res.data?.success) {
        toast.success("Registration successful, verify OTP");
        
        setOtpExpire_time(res.data.user.otpExpire);
localStorage.setItem("otpExpireTime", res.data.user.otpExpire);
        navigate("/user-verified");
        reset();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
   const googleLogin = (e) => {
    e.preventDefault();
    window.open(`${import.meta.env.VITE_API_URL}/login-with-google`,"_self");
  };
const handleVerified=()=>{
 toast.error("Verify OTP after registration to login");
 
}
  return (
    <div
      className={`min-h-screen w-full flex items-center justify-center px-4
        ${
          theme === "dark"
            ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-br from-yellow-300 via-blue-200 to-orange-300 text-black"
        }`}
       onClick={()=>{
        setBar(false)
          
       }}
    >
      <form
        onSubmit={
          handleSubmit(onSubmit)
          
        }
        className={`w-full max-w-md rounded-2xl p-6 space-y-5 shadow-2xl 
          ${
            theme === "dark"
              ? "bg-white/5 border border-white/10"
              : "bg-white/70 border border-black/10"
          }`}
      >
        <h2 className="text-3xl font-bold text-center">
          Create Your Account 
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full px-4 py-3 rounded-lg border text-black"
          {...register("name", { required: "Name is required" })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border text-black"
          {...register("email", { required: "Email is required" })}
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg border text-black"
            {...register("password", { required: true })}
          />
          <TbLockPassword
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black"
          />
        </div>

        <button
          disabled={loading}
          className="w-full py-3 rounded-lg font-semibold text-white
          bg-gradient-to-r from-orange-500 to-red-500"
        >
          {loading ? <LiaSpinnerSolid className="animate-spin mx-auto" /> : "Register"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
     {verified ? <Link to="/login" className="text-orange-500 underline font-semibold">
            Login
          </Link> :<Link to="/register" className="text-orange-500 underline font-semibold" onClick={()=>{handleVerified()}}>
            Login
          </Link>}
        </p>
        <p className="text-center">OR</p>
        {/* GOOGLE */}
        <button
          type="button"
          onClick={googleLogin}
          className="w-full flex items-center justify-center gap-3 py-3
          bg-white border border-gray-300 rounded-lg
          text-gray-700 font-medium hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default Register;
