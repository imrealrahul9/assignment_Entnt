import React from "react";
import KPICards from "../components/Dashboard/KPICards";
import Charts from "../components/Dashboard/Charts";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-black px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h1>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICards />
        </div>

        {/* Charts Section */}
        <div className="mt-10 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Maintenance Activity Trends
          </h2>
          <Charts />
        </div>
      </div>
    </div>
  );
}
