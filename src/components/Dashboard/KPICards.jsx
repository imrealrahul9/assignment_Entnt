import React, { useContext } from "react";
import { ShipsContext } from "../../contexts/ShipsContext";
import { ComponentsContext } from "../../contexts/ComponentsContext";
import { JobsContext } from "../../contexts/JobsContext";
import dayjs from "dayjs";

export default function KPICards() {
  const { ships } = useContext(ShipsContext);
  const { components } = useContext(ComponentsContext);
  const { jobs } = useContext(JobsContext);

  const overdueComponents = components.filter((comp) => {
    const lastDate = dayjs(comp.lastMaintenanceDate);
    return lastDate.isBefore(dayjs().subtract(6, "months"));
  });

  const inProgressJobs = jobs.filter((j) => j.status === "In Progress");
  const completedJobs = jobs.filter((j) => j.status === "Completed");

  const cards = [
    { title: "Total Ships", value: ships.length },
    { title: "Components with Overdue Maintenance", value: overdueComponents.length },
    { title: "Jobs Currently In Progress", value: inProgressJobs.length },
    { title: "Completed Maintenance Jobs", value: completedJobs.length },
  ];

  return (
    <>
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-amber-200 rounded-xl shadow-lg p-6 min-h-[140px] min-w-[220px] flex flex-col justify-between hover:shadow-blue-400 transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-800 whitespace-normal">
            {card.title}
          </h3>
          <p className="text-4xl font-bold text-blue-600">{card.value}</p>
        </div>
      ))}
    </>
  );
}
