import { useJobs } from "../contexts/JobsContext";
import { useComponents } from "../contexts/ComponentsContext";
import { useShips } from "../contexts/ShipsContext";
import { useState } from "react";
import JobForm from "../components/Jobs/JobForm";
import JobList from "../components/Jobs/JobList";

export default function JobsPage() {
  const { jobs, addJob, updateJob, deleteJob } = useJobs();
  const { components } = useComponents();
  const { ships } = useShips();
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingJob(null);
    setShowForm(true);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    setShowForm(true);
  };

  const handleFormSubmit = (jobData) => {
    if (editingJob) {
      updateJob(jobData);
    } else {
      addJob({ ...jobData, id: `j${Date.now()}` });
    }
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-white font-bold">Maintenance Jobs</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Add Job
        </button>
      </div>
      {showForm && (
        <JobForm
          job={editingJob}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      <JobList
        jobs={jobs}
        components={components}
        ships={ships}
        onEdit={handleEdit}
        onDelete={deleteJob}
        onStatusUpdate={updateJob}
      />
    </div>
  );
}
