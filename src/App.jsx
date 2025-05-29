import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import './App.css'

import { useAuth } from "./contexts/AuthContext";
import Navbar from "./components/Common/Navbar";
import NotificationCenter from "./components/Notifications/NotificationCenter";

import ComponentsPage from "./pages/ComponentsPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ShipsPage from "./pages/ShipsPage";
import ShipDetailPage from "./pages/ShipDetailPage";
import JobsPage from "./pages/JobsPage";
import CalendarPage from "./pages/CalendarPage";

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default function App() {
  const { user, loading } = useAuth();  // grab loading
  const [notification, setNotification] = useState(null);

  if (loading) {
    // show loading spinner or blank screen while loading user
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <NotificationCenter newNotification={notification} />
      {Boolean(user) && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage setNotification={setNotification} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/components"
          element={
            <ProtectedRoute>
              <ComponentsPage setNotification={setNotification} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ships"
          element={
            <ProtectedRoute>
              <ShipsPage setNotification={setNotification} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ships/:shipId"
          element={
            <ProtectedRoute>
              <ShipDetailPage setNotification={setNotification} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <JobsPage setNotification={setNotification} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <CalendarPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </Router>
  );
}
