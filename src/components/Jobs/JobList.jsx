import { useState } from "react";

export default function JobList({ jobs, components, ships, onEdit, onDelete, onStatusUpdate }) {
  const [filters, setFilters] = useState({ shipId: "", status: "", priority: "" });

  const filteredJobs = jobs.filter((job) => {
    return (
      (!filters.shipId || job.shipId === filters.shipId) &&
      (!filters.status || job.status === filters.status) &&
      (!filters.priority || job.priority === filters.priority)
    );
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const getComponentName = (id) => components.find((c) => c.id === id)?.name || "N/A";
  const getShipName = (id) => ships.find((s) => s.id === id)?.name || "N/A";

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white mb-4">
        <select name="shipId" onChange={handleChange} value={filters.shipId} className="p-2 rounded border">
          <option value="">All Ships</option>
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>{ship.name}</option>
          ))}
        </select>
        <select name="status" onChange={handleChange} value={filters.status} className="p-2 rounded border">
          <option value="">All Statuses</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <select name="priority" onChange={handleChange} value={filters.priority} className="p-2 rounded border">
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="grid gap-4 ">
        {filteredJobs.map((job) => (
          <div key={job.id} className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold text-lg mb-2">{job.type} - {getComponentName(job.componentId)}</h2>
            <p><strong>Ship:</strong> {getShipName(job.shipId)}</p>
            <p><strong>Priority:</strong> {job.priority}</p>
            <p><strong>Status:</strong> {job.status}</p>
            <p><strong>Scheduled Date:</strong> {job.scheduledDate}</p>

            <div className="mt-4 flex gap-2">
              <select
                value={job.status}
                onChange={(e) => onStatusUpdate({ ...job, status: e.target.value })}
                className="p-1 rounded border"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
              <button onClick={() => onEdit(job)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                Edit
              </button>
              <button onClick={() => onDelete(job.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
