import React from "react";
import { useAppContext } from "../../components/ContextApi";
import {
  MdPeopleAlt,
  MdWorkOutline,
  MdTrendingUp,
  MdFeedback,
  MdRocketLaunch,
} from "react-icons/md";
import { ImSpinner3 } from "react-icons/im";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Overview = () => {
  const {
    auth,
    theme,
    registerUsers,
    setOpen,
    open,
    setBar,
    Googleuser,
  } = useAppContext();

  /* ================= CURRENT USER ================= */
  const currentUser = auth?.user || Googleuser?.user;
  const userName =
    currentUser?.name || currentUser?.email || "User";

  /* ================= LOADING ================= */
  const loading = auth?.loading;

  /* ================= USERS COUNT ================= */
  const usersList =
    registerUsers || registerUsers || [];



  const totalUsers = Array.isArray(usersList)
    ? usersList.length
    : 0;

  /* ================= CHART DATA ================= */
  const visitData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Platform Visits",
        data: [20, 35, 50, 40, 60, 80, 75],
        backgroundColor:
          theme === "dark" ? "#2b82f6" : "#22c55e",
        borderRadius: 5,
        barThickness: 30,
      },
    ],
  };

  return (
    <section
      className="p-6 space-y-10"
      onClick={() => {
        setOpen(false);
        setBar(false);
      }}
    >
      {/* HEADER */}
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">
          Welcome back, {userName} 👋
        </h1>
        <p className="opacity-80 max-w-2xl">
          Monitor users, projects, and growth metrics while we
          continuously improve the platform.
        </p>
      </header>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Registered Users"
          value={totalUsers}
          icon={<MdPeopleAlt />}
          loading={loading}
        />
        <StatCard
          title="Active Projects"
          value="9"
          icon={<MdWorkOutline />}
          loading={loading}
        />
        <StatCard
          title="Weekly Visits"
          value="360"
          icon={<MdTrendingUp />}
          loading={loading}
        />
        <StatCard
          title="User Feedbacks"
          value={totalUsers}
          icon={<MdFeedback />}
          loading={loading}
        />
      </div>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-4">
            Weekly Platform Traffic
          </h3>
          <Bar data={visitData} />
        </div>

        <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-4">
            Current Growth Status
          </h3>
          <ul className="space-y-3 text-sm opacity-90">
            <li>✔ MVP successfully launched</li>
            <li>✔ Early users onboarding</li>
            <li>✔ Internship module in testing</li>
            <li>⏳ Payment & subscription coming soon</li>
            <li>⏳ Company tie-ups (future phase)</li>
          </ul>
        </div>
      </div>

      {/* USER REVIEWS */}
      {usersList.length > 0 && (
        <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-900">
          <h3 className="text-lg font-semibold mb-6">
            What Early Users Say 💬
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {usersList.map((u, i) => (
              <Review
                key={i}
                name={u?.name || "Anonymous"}
                role={u?.role || "User"}
                review={
                  u?.review ||
                  "No review provided yet."
                }
                plan={u?.plan || "Free"}
              />
            ))}
          </div>
        </div>
      )}

      {/* FUTURE TIE-UPS */}
      <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-900">
        <h3 className="text-lg font-semibold mb-4">
          Future Company Tie-ups 🤝
        </h3>
        <p className="text-sm opacity-80 max-w-3xl">
          Company partnerships will be added in the next
          growth phase.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Tag label="Startups" />
          <Tag label="Local Companies" />
          <Tag label="Remote Internships" />
          <Tag label="Skill-Based Hiring" />
        </div>
      </div>

      {/* PLATFORM VISION */}
      <div className="p-6 rounded-xl shadow bg-white dark:bg-gray-900">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <MdRocketLaunch /> Platform Vision
        </h3>
        <p className="text-sm opacity-80 max-w-4xl leading-relaxed">
          Build a practical learning & job-ready platform
          with honesty and strong fundamentals.
        </p>
      </div>
    </section>
  );
};

/* ================= SMALL COMPONENTS ================= */

const StatCard = ({ title, value, icon, loading }) => (
  <div className="p-5 rounded-xl shadow bg-white dark:bg-gray-900 flex items-center gap-4">
    <div className="text-3xl text-blue-500">
      {icon}
    </div>
    <div>
      <p className="text-sm opacity-70">{title}</p>
      {!loading ? (
        <h2 className="text-2xl font-bold">
          {value}
        </h2>
      ) : (
        <ImSpinner3 className="animate-spin" />
      )}
    </div>
  </div>
);

const Review = ({ name, role, review, plan }) => (
  <div className="p-4 rounded-lg border space-y-2">
    <p className="text-sm opacity-80">
      “{review}”
    </p>
    <p className="text-xs text-blue-500 font-semibold">
      Plan: {plan}
    </p>
    <div className="text-xs opacity-70">
      — {name}, {role}
    </div>
  </div>
);

const Tag = ({ label }) => (
  <span className="px-3 py-1 rounded-full border text-xs">
    {label}
  </span>
);

export default Overview;
