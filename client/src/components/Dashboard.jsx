import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  MdOutlineDashboardCustomize,
  MdWorkspacePremium,
} from "react-icons/md";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { useAppContext } from "./ContextApi";
import {
  data,
  projects as pro,
  sidebarfooter,
  sidebarSmall,
} from "../components/data";

const SIDEBAR_OPEN = "300px";
const SIDEBAR_CLOSE = "29px";

const Dashboard = () => {
  const { theme, auth, Googleuser } = useAppContext();
  const isLoggedIn =
    auth?.isAuthenticated || Boolean(Googleuser?.isAuthenticated);
  // const currentUser = auth?.user || Googleuser?.user
  const [sideBar, setSideBar] = useState(window.innerWidth >= 900);
  const [projectsOpen, setProjectsOpen] = useState(true);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);

  /* ================= RESPONSIVE CONTROL ================= */
  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 900;
      setIsDesktop(desktop);
      setSideBar(desktop); // hide sidebar automatically on small screen
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className={`h-screen w-full overflow-hidden ${
        theme === "dark"
          ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
          : "bg-black text-white"
      }`}
    >
      {/* ================= GRID ================= */}
      <div
        className="h-full  grid transition-all duration-300 w-full"
        style={{
          gridTemplateColumns: isDesktop
            ? sideBar
              ? `${SIDEBAR_OPEN} 1fr`
              : `${SIDEBAR_CLOSE} 1fr`
            : "1fr",
        }}
      >
        {/* ================= SIDEBAR (DESKTOP ONLY) ================= */}
        {isDesktop && (
          <aside
            className={`w-full relative h-full overflow-hidden ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-950"
            }`}
          >
            {/* TOGGLE ICON */}
            <button
              onClick={() => {setSideBar(!sideBar)
                
              }
              }
              className="absolute top-0 right-1 z-0 p-1 "
            >
              {sideBar ? (
                <GoSidebarCollapse className="text-white" />
              ) : (
                <GoSidebarExpand className="text-white" />
              )}
            </button>

            {/* FULL SIDEBAR */}
            {sideBar ? (
              <div className="h-full overflow-y-auto p-4">
                <div className="flex items-center gap-2 mb-4">
                  <MdOutlineDashboardCustomize />
                  <h1 className="text-lg">Dashboard</h1>
                </div>

                {/* PROJECT HEADER */}
                <div className="flex justify-between items-center border p-2 rounded">
                  <span className="text-xs uppercase text-green-300">
                    Projects
                  </span>
                  {projectsOpen ? (
                    <IoIosArrowDropdownCircle
                      onClick={() => setProjectsOpen(false)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <IoIosArrowDropupCircle
                      onClick={() => setProjectsOpen(true)}
                      className="cursor-pointer"
                    />
                  )}
                </div>

                {projectsOpen && (
                  <>
                    <h2 className="text-center text-sm mt-4 border-b border-green-400/40 pb-2">
                      Basic & Advanced
                    </h2>

                    <ul className="mt-4 space-y-2">
                      {data.map(({ id, title, route, style }) => (
                        <li key={id}>
                          <Link
                           
                            to={isLoggedIn ? `/dashboard/${route}` : "/login"}
                            className={style}
                          >
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <h2 className="flex justify-center items-center gap-2 mt-6 border-b border-blue-400/40 pb-2 text-blue-400">
                      Pro <MdWorkspacePremium className="text-blue-400  animate-pulse" />
                    </h2>

                    <ul className="mt-3 space-y-2">
                      {pro.map(({ id, title, route, style }) => (
                        <li key={id} className={style}>
                          <Link
                            to={isLoggedIn ? `/dashboard/${route}` : "/login"}
                          >
                            {title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* FOOTER */}
                <ul className="mt-3 space-y-2">
                  {sidebarfooter.map(
                    ({ id, text, icon: Icon, route, style }) => (
                      <li key={id}>
                        <Link
                          to={isLoggedIn ? `/dashboard/${route}` : "/login"}
                          className={style}
                        >
                          {Icon && <Icon className="text-lg " />}
                          <span>{text}</span>
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            ) : (
              /* COLLAPSED SIDEBAR (DESKTOP ONLY) */
              <ul
                className={`h-full flex flex-col items-center gap-6 pt-14 ${
                  theme === "dark"
                    ? "bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-yellow-300"
                    : "bg-black text-white"
                }`}
              >
                {sidebarSmall.map(({ id, icon: Icon, title, route }) => (
                  <li key={id} title={title}>
                    <Link to={isLoggedIn ? `/dashboard/${route}` : "/login"}>
                      {Icon && <Icon />}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}

        {/* ================= MAIN CONTENT (ALWAYS VISIBLE) ================= */}
        <main className="h-full overflow-y-auto w-full ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
