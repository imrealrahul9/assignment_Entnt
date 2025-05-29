import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from "date-fns";

export default function JobCalendar({ jobs }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const days = [];
  let date = startDate;

  while (date <= endDate) {
    days.push(date);
    date = addDays(date, 1);
  }

  const getJobsForDate = (day) =>
    jobs.filter((job) => isSameDay(new Date(job.date), day));

  const handlePrevMonth = () =>
    setCurrentMonth((prev) => addDays(prev, -30));
  const handleNextMonth = () =>
    setCurrentMonth((prev) => addDays(prev, 30));

  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ◀
        </button>
        <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-sm text-center text-gray-600 font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2 mt-1">
        {days.map((day, idx) => {
          const isToday = isSameDay(day, new Date());
          const jobList = getJobsForDate(day);

          return (
            <div
              key={idx}
              onClick={() => setSelectedDate(day)}
              className={`rounded p-2 h-24 overflow-hidden cursor-pointer border ${
                isSameMonth(day, currentMonth)
                  ? "bg-gray-50 hover:bg-gray-100"
                  : "bg-gray-100 text-gray-400"
              } ${isToday ? "border-indigo-500" : "border-gray-200"}`}
            >
              <div className="text-xs font-bold">{format(day, "d")}</div>
              <ul className="mt-1 space-y-1 overflow-auto max-h-14">
                {jobList.slice(0, 2).map((job) => (
                  <li key={job.id} className="text-xs truncate text-indigo-700">
                    {job.type}
                  </li>
                ))}
                {jobList.length > 2 && (
                  <li className="text-xs text-gray-500">+{jobList.length - 2} more</li>
                )}
              </ul>
            </div>
          );
        })}
      </div>

      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">
            Jobs on {format(selectedDate, "PPP")}
          </h3>
          <ul className="list-disc list-inside text-sm space-y-1">
            {getJobsForDate(selectedDate).length === 0 ? (
              <li>No jobs scheduled.</li>
            ) : (
              getJobsForDate(selectedDate).map((job) => (
                <li key={job.id}>
                  <span className="font-medium">{job.type}</span> — {job.status} ({job.priority})
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
