import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./components/ContextApi";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import GlobalError from "./components/GlobalError";
import GlobalLoading from "./components/GloblaLoading";
import Overview from "./components/pages/Overview";

const App = () => {
  const { theme, auth, Googleuser, verified } = useAppContext();

  const loading = auth?.loading || Googleuser?.loading;
  if (loading) return <GlobalLoading />;

  const isAuth = auth?.isAuthenticated || Googleuser?.isAuthenticated;

  return (
    <>
      {/* ✅ Toast OUTSIDE layout */}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        pauseOnFocusLoss={false}
      />

      <div className={`${theme === "dark" ? "bg-black text-white" : "bg-white"} pt-16`}>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={verified ? <Login /> : <Register />}
          />

          <Route
            path="/dashboard"
            element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
          >
            <Route index element={<Overview />} />
          </Route>

          <Route path="*" element={<GlobalError />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
