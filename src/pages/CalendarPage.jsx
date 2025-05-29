import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import { useJobs } from "../contexts/JobsContext";
import { useComponents } from "../contexts/ComponentsContext";
import { useShips } from "../contexts/ShipsContext";

export default function CalendarPage() {
  const { jobs } = useJobs();
  const { components } = useComponents();
  const { ships } = useShips();

  const [selectedJobs, setSelectedJobs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const getShipName = (id) => ships.find((s) => s.id === id)?.name || "Unknown";
  const getComponentName = (id) => components.find((c) => c.id === id)?.name || "Unknown";

  const events = jobs.map((job) => ({
    id: job.id,
    title: `${getComponentName(job.componentId)} (${job.type})`,
    date: job.scheduledDate,
  }));

  const handleDateClick = (arg) => {
    const clickedDate = dayjs(arg.dateStr).format("YYYY-MM-DD");
    const jobsOnDate = jobs.filter((job) => job.scheduledDate === clickedDate);
    setSelectedDate(clickedDate);
    setSelectedJobs(jobsOnDate);
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <h1 className="text-3xl text-white font-bold mb-4">Maintenance Calendar</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="auto"
        />
      </div>

      {selectedDate && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2">
            Jobs on {dayjs(selectedDate).format("MMMM D, YYYY")}
          </h2>
          {selectedJobs.length === 0 ? (
            <p className="text-gray-500">No jobs scheduled.</p>
          ) : (
            <ul className="space-y-2">
              {selectedJobs.map((job) => (
                <li
                  key={job.id}
                  className="border rounded-md p-3 hover:shadow transition"
                >
                  <p className="font-medium">{job.type}</p>
                  <p className="text-sm text-gray-600">
                    Ship: {getShipName(job.shipId)} | Component: {getComponentName(job.componentId)}
                  </p>
                  <p className="text-sm text-gray-600">
                    Priority: {job.priority} | Status: {job.status}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
