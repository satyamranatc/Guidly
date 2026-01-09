import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserData";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  User,
  Mail,
  LogOut,
  Map,
  Calendar,
  ChevronRight,
  Settings,
  LayoutDashboard,
} from "lucide-react";

export default function Profile() {
  const api = import.meta.env.VITE_API_URL;
  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    avatar: "",
  });

  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Fetch user data
  useEffect(() => {
    async function getUserData() {
      try {
        if (!token?.refresh_token) return;

        const res = await axios.get(`${api}/api/auth/userDetails`, {
          headers: {
            Authorization: `Bearer ${token.refresh_token}`,
          },
        });

        setUser({
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          avatar: res.data.avatar,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getUserData();
  }, []);

  // 2️⃣ Fetch roadmaps AFTER user is set
  useEffect(() => {
    async function getUserRoadMaps() {
      try {
        if (!user.id) return;

        const res = await axios.get(
          `${api}/api/roadmap/myPlans?userId=${user.id}`
        );

        setRoadmaps(res.data.data);
      } catch (err) {
        console.error(err);
      }
    }

    getUserRoadMaps();
  }, [user.id]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Banner */}
      <div className="h-48 bg-linear-to-r from-indigo-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar / Profile Card */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 relative overflow-hidden group">
              <div className="relative z-10 text-center">
                <div className="relative inline-block mb-6">
                  <img
                    src={
                      user.avatar ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    }
                    alt="avatar"
                    className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                    <Settings size={20} />
                  </div>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-1">
                  {user.name}
                </h2>
                <p className="text-slate-500 text-sm mb-6 flex items-center justify-center gap-2">
                  <Mail size={16} />
                  {user.email}
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleLogout}
                    className="w-full py-3 bg-slate-900 text-white rounded-2xl font-semibold hover:bg-slate-800 transition flex items-center justify-center gap-2 group"
                  >
                    Logout
                    <LogOut
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-50 pb-4 flex items-center gap-2">
                <LayoutDashboard size={20} className="text-indigo-600" />
                Activity Overview
              </h3>
              <div className="space-y-6">
                <StatItem
                  label="Active Roadmaps"
                  value={roadmaps.length}
                  color="indigo"
                />
                <StatItem label="Skills Learned" value="0" color="purple" />
                <StatItem label="Profile Strength" value="65%" color="pink" />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    Welcome Back, {user.name.split(" ")[0]}!
                  </h1>
                  <p className="text-slate-500">
                    Pick up exactly where you left off in your career journey.
                  </p>
                </div>
                <Link
                  to="/roadmap"
                  className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-bold hover:bg-indigo-100 transition flex items-center gap-2 shrink-0"
                >
                  <Map size={20} />
                  New Roadmap
                </Link>
              </div>
            </div>

            {/* Roadmaps List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900">
                  Your Learning Paths
                </h2>
                <span className="text-sm font-semibold text-slate-400">
                  {roadmaps.length} active
                </span>
              </div>

              {roadmaps.length === 0 ? (
                <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mx-auto mb-4">
                    <Map size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    No roadmaps generated yet
                  </h3>
                  <p className="text-slate-500 mb-6">
                    Start by creating your first career path using our AI
                    generator.
                  </p>
                  <Link
                    to="/roadmap"
                    className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all"
                  >
                    Generate Now <ChevronRight size={20} />
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roadmaps.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 hover:border-indigo-200 hover:shadow-md transition group"
                    >
                      <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Map size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 truncate group-hover:text-indigo-600 transition-colors">
                        {item.roadmapTitle}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                        <Calendar size={16} />
                        Saved Recently
                      </div>
                      <div className="mt-6 pt-6 border-t border-slate-50">
                        <Link
                          to="/roadmap"
                          className="flex items-center justify-between text-indigo-600 font-bold text-sm"
                        >
                          Continue Path
                          <ChevronRight size={18} />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value, color }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    pink: "bg-pink-50 text-pink-600 border-pink-100",
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-50 hover:bg-slate-50 transition-colors">
      <span className="text-slate-500 font-medium">{label}</span>
      <span
        className={`px-3 py-1 rounded-lg font-bold text-sm border ${colors[color]}`}
      >
        {value}
      </span>
    </div>
  );
}
