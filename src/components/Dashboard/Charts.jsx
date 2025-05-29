import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { JobsContext } from "../../contexts/JobsContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Charts() {
  const { jobs } = useContext(JobsContext);

  const statusCount = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCount),
    datasets: [
      {
        label: "Jobs by Status",
        data: Object.values(statusCount),
        backgroundColor: ["#3b82f6", "#f59e0b", "#10b981"],
        borderRadius: 5,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2">Jobs Status Overview</h3>
      <Bar data={chartData} />
    </div>
  );
}
