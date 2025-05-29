import React, { createContext, useContext, useState, useEffect } from "react";

const JobsContext = createContext();

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const localJobs = localStorage.getItem("jobs");
    if (localJobs) {
      setJobs(JSON.parse(localJobs));
    } else {
      fetch("/data/jobs.json")
        .then((res) => res.json())
        .then((data) => {
          setJobs(data);
          localStorage.setItem("jobs", JSON.stringify(data));
        })
        .catch(() => setJobs([]));
    }

    const localNotifs = localStorage.getItem("notifications");
    if (localNotifs) {
      setNotifications(JSON.parse(localNotifs));
    } else {
      setNotifications([]);
    }
  }, []);

  const addJob = (job) => {
    const updated = [...jobs, job];
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));
    addNotification({
      id: crypto.randomUUID(),
      type: "Job Created",
      message: `Job "${job.jobType}" created for component ${job.componentId}`,
      date: new Date().toISOString(),
    });
  };

  const updateJob = (updatedJob) => {
    const updated = jobs.map((j) => (j.id === updatedJob.id ? updatedJob : j));
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));

    addNotification({
      id: crypto.randomUUID(),
      type: "Job Updated",
      message: `Job "${updatedJob.jobType}" updated`,
      date: new Date().toISOString(),
    });
  };

  const deleteJob = (id) => {
    const updated = jobs.filter((j) => j.id !== id);
    setJobs(updated);
    localStorage.setItem("jobs", JSON.stringify(updated));

    addNotification({
      id: crypto.randomUUID(),
      type: "Job Deleted",
      message: `Job deleted`,
      date: new Date().toISOString(),
    });
  };

  const addNotification = (notification) => {
    setNotifications((prev) => {
      const updated = [notification, ...prev];
      localStorage.setItem("notifications", JSON.stringify(updated));
      return updated;
    });
  };

  const dismissNotification = (id) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  return (
    <JobsContext.Provider
      value={{
        jobs,
        addJob,
        updateJob,
        deleteJob,
        notifications,
        dismissNotification,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  return useContext(JobsContext);
}
export { JobsContext };
