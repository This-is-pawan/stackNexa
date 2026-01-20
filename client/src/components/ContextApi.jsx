import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

axios.defaults.withCredentials = true;

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

const ContextApi = ({ children }) => {
  const navigate = useNavigate();

  /* ================= THEME ================= */
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  const handleDarkMode = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ================= AUTH ================= */
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  const checkAuth = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/project/authenticated`
      );

      if (data?.success) {
        setAuth({
          user: data.user,
          isAuthenticated: true,
          loading: false,
        });
      } else {
        setAuth({ user: null, isAuthenticated: false, loading: false });
      }
    } catch {
      setAuth({ user: null, isAuthenticated: false, loading: false });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  /* ================= UI ================= */
  const [bar, setBar] = useState(false);
  const [open, setOpen] = useState(false);

  /* ================= OTP ================= */
  const [loading, setLoading] = useState(false);
  const [otpExpire_time, setOtpExpire_time] = useState(() =>
    localStorage.getItem("otpExpireTime")
  );

  useEffect(() => {
    if (otpExpire_time) {
      localStorage.setItem("otpExpireTime", otpExpire_time);
    }
  }, [otpExpire_time]);
const [verified, setVeified] = useState(() => {
  return localStorage.getItem("verified") === "true";
});

  const Handle_verified = async (otp) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/project/verify-otp`,
        { otp }
      );

      if (data?.success) {
        toast.success("OTP verified successfully, please login");
        localStorage.setItem("verified", "true"); 
        localStorage.removeItem("otpExpireTime");
        setOtpExpire_time(null);
        setVeified(true)
        navigate("/login");
      } else {
        toast.error(data?.message || "Verification failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  }; 
 
  /* ================= JWT USERS ================= */
  const [registerUsers, setRegisterUsers] = useState([]); 

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/project/allusers`
      );

      if (data?.success) {
        setRegisterUsers(data.users || []);
      }  
    } catch (error) {
      console.error("Fetch users error:", error);
      setRegisterUsers([]);
    }
  };

  
  useEffect(() => {
    if (auth.isAuthenticated) {
      fetchUsers();
    }
  }, [auth.isAuthenticated]);

  /* ================= GOOGLE AUTH ================= */
  const [Googleuser, setGoogleUser] = useState({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  const googleAllUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/project/google-all-users`
      );

      if (data?.success) {
        setRegisterUsers(data.users || []);
      }
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  useEffect(() => {
    const getGoogleUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/user`
        );

        if (data?.success) {
          setGoogleUser({
            user: data.user,
            isAuthenticated: true,
            loading: false,
          });
        } else {
          setGoogleUser({
            user: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      } catch {
        setGoogleUser({
          user: null,
          isAuthenticated: false,
          loading: false,
        });
      }
    };

    getGoogleUser();
    googleAllUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        handleDarkMode,
        auth,
        setAuth,
        bar,
        setBar,
        open,
        setOpen,
        Handle_verified,
        loading,
        otpExpire_time,
        setOtpExpire_time,
        registerUsers,
        setRegisterUsers,
        Googleuser,
        setGoogleUser,
        verified,
        setVeified
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextApi;
