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
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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
        `${import.meta.env.VITE_API_URL}/api/project/authenticated`,
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
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  /* ================= OTP ================= */
  const [loading, setLoading] = useState(false);
  const [otpExpire_time, setOtpExpire_time] = useState(() =>
    localStorage.getItem("otpExpireTime"),
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
        { otp },
      );

      if (data?.success) {
        toast.success("OTP verified successfully, please login");
        localStorage.setItem("verified", "true");
        localStorage.removeItem("otpExpireTime");
        setOtpExpire_time(null);
        setVeified(true);
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
        `${import.meta.env.VITE_API_URL}/api/project/allusers`,
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
  // reviews,comment
const [review_comment, setReview_comment] = useState([]);
const [review_loading, setReview_loading] = useState(false);

const fetch_comment = async () => {
  try {
    setReview_loading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/project/auth-reviews`,
      { withCredentials: true }
    );
    setReview_comment(res?.data?.reviews || res?.data || []);
  } finally {
    setReview_loading(false);
  }
};

/* 🌍 ALL USERS */
const [users_reviews, setUsers_reviews] = useState([]);
const [usersReviewsLoading, setUsersReviewsLoading] = useState(false);

const AllUser_reviews = async () => {
  try {
    setUsersReviewsLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/project/all-reviews`
    );
    setUsers_reviews(res?.data?.reviews || res?.data || []);
  } finally {
    setUsersReviewsLoading(false);
  }
};



  /* ================= GOOGLE AUTH ================= */
  const [Googleuser, setGoogleUser] = useState({
    user: null,
    isAuthenticated: false,
    loading: true,
  });

  const googleAllUser = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/project/google-all-users`,
      );

      if (data?.success) {
        setRegisterUsers(data.users || []);
      }
    } catch (error) {
      console.log(error.message || "google auth fail");
    }
  };

  useEffect(() => {
    const getGoogleUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/user`,
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

  // ########
  const [plan, setPlan] = useState(null);
  const [plan_loading, setPlan_loading] = useState(true);
  const payment_reciept = async () => {
    setPlan_loading(true);
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/project/payment-receipt`,
        { withCredentials: true },
      );
     
      
      if (result?.data?.success) {
        setPlan(result?.data?.result);
      } else {
        console.log("failed reciept data");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setPlan_loading(false);
    }
  };
  //
useEffect(() => {
  if (auth?.isAuthenticated) {
    payment_reciept();
  } else {
    setPlan(null);
    setPlan_loading(false);
  }
}, [auth?.isAuthenticated]);

  /* ================= PROFILE ================= */
  const [profiles, setProfiles] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // FETCH PROFILE (IMAGE)
  const fetchProfiles = async () => {
    try {
      setProfileLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/project/profiles`,
        { withCredentials: true },
      );
      setProfiles(res?.data);
      return res.data;
    } catch (err) {
      console.error("Profile fetch error", err);
    } finally {
      setProfileLoading(false);
    }
  };
  // 
  const [all_profiles, setAll_Profiles] = useState(null);
  const [all_profileLoading, setAll_ProfileLoading] = useState(true);

const allusers_profile=async () => {
   try {
    setAll_ProfileLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/project/get_all_profiles`,
        { withCredentials: true },
      );
     setAll_Profiles(res?.data);
    
    } catch (err) {
      console.error("Profile fetch error", err);
    } finally {
     setAll_ProfileLoading(false);
    }
}
  /* ================= INIT ================= */
  
  useEffect(() => {
    fetchProfiles();
    fetch_comment();
    allusers_profile();
    AllUser_reviews();
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
        setLoading,
        otpExpire_time,
        setOtpExpire_time,
        registerUsers,
        setRegisterUsers,
        Googleuser,
        setGoogleUser,
        verified,
        setVeified,
        checkAuth,
        plan,
        plan_loading, 
        payment_reciept,
        fetchProfiles,
        profileLoading,
        profiles,
        all_profiles,
        all_profileLoading,
        review_comment,
        setReview_comment,
        review_loading,
        users_reviews,
        setUsers_reviews,
         AllUser_reviews,
          setUsersReviewsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default ContextApi;

   
  