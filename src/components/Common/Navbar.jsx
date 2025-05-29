import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getRoleLabel } from "../../utils/roleUtils";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Left side - Brand and nav links */}
        <div className="flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            ShipManager
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link
              to="/ships"
              className="px-3 py-2 rounded-md hover:bg-blue-100 transition"
            >
              Ships
            </Link>
            <Link
              to="/components"
              className="px-3 py-2 rounded-md hover:bg-blue-100 transition"
            >
              Components
            </Link>
            <Link
              to="/jobs"
              className="px-3 py-2 rounded-md hover:bg-blue-100 transition"
            >
              Jobs
            </Link>
            <Link
              to="/calendar"
              className="px-3 py-2 rounded-md hover:bg-blue-100 transition"
            >
              Calendar
            </Link>
          </nav>
        </div>

        {/* Right side - User info and logout */}
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm text-gray-600">
              Logged in as:{" "}
              <span className="font-semibold">{getRoleLabel(user.role)}</span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
