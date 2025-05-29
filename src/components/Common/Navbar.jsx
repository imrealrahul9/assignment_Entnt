import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { getRoleLabel } from "../../utils/roleUtils";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white text-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-xl font-bold hover:underline">
            ShipManager
          </Link>
          <button
            className="md:hidden text-black focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        <div className="hidden md:flex items-center text-black gap-6">
        <Link to="/ships" className="hover:bg-blue-300 px-2 py-1 rounded">Ships</Link>
          <Link to="/components" className="hover:bg-blue-300 px-2 py-1 rounded">Components</Link>
          <Link to="/jobs" className="hover:bg-blue-300 px-2 py-1 rounded">Jobs</Link>
          <Link to="/calendar" className="hover:bg-blue-300 px-2 py-1 rounded">Calendar</Link>
          {user && (
            <span className="text-sm">
              Logged in as: <span className="font-semibold">{getRoleLabel(user.role)}</span>
            </span>
          )}
          <button
            onClick={handleLogout}
            className="bg-white text-red-600 font-semibold px-3 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white-500 px-4 pb-3 space-y-2">
          <Link to="/ships" className="block hover:bg-blue-300 px-2 py-1 rounded">Ships</Link>
          <Link to="/components" className="block hover:bg-blue-300 px-2 py-1 rounded">Components</Link>
          <Link to="/jobs" className="block hover:bg-blue-300 px-2 py-1 rounded">Jobs</Link>
          <Link to="/calendar" className="block hover:bg-blue-300 px-2 py-1 rounded">Calendar</Link>
          {user && (
            <p className="text-sm">
              Logged in as: <span className="font-semibold">{getRoleLabel(user.role)}</span>
            </p>
          )}
          <button
            onClick={handleLogout}
            className="mt-2 bg-blue text-red-600 font-semibold px-3 py-1 rounded hover:bg-gray-200"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
