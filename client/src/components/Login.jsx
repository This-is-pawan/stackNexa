import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { LiaSpinnerSolid } from "react-icons/lia";
import { TbLockPassword } from "react-icons/tb";
import { useAppContext } from "./ContextApi";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { theme, setAuth ,setBar, checkAuth,fetchProfiles,profiles, AllUser_reviews, payment_reciept} = useAppContext();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/login`,
        data,
      );

      setAuth({
        user: res?.data?.user,
        isAuthenticated: true,
        loading: false,
      });
await checkAuth();
await fetchProfiles();
await payment_reciept(); 
 await AllUser_reviews()
toast.success("Login successful");

navigate("/dashboard");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = (e) => {
    e.preventDefault();
    window.open(`${import.meta.env.VITE_API_URL}/login-with-google`,"_self");
  };
  return (
    <div className={`min-h-screen flex justify-center items-center px-4  ${
          theme === "dark"
            ? "bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white"
            : "bg-gradient-to-br from-yellow-300 via-blue-200 to-orange-300 text-black"
        }`}
        onClick={()=>{
          
setBar(false)
        }}
        >
      <form onSubmit={
        handleSubmit(onSubmit)

      } className={`${
            theme === "dark"
              ? "bg-white/5 border border-white/10"
              : "bg-white/70 border border-black/10"
          }  w-full max-w-md space-y-5 rounded-2xl p-6  `}>
        <h2 className="text-3xl font-bold text-center">Welcome Back 👋</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border text-black"
          {...register("email", { required: true })}
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
                  {loading ? <LiaSpinnerSolid className="animate-spin mx-auto" /> : "Login"}
                </button>

        <p className="text-center text-sm">
          New user?{" "}
          <Link to="/register" className="text-orange-500 underline">
            Register
          </Link>
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

export default Login;
