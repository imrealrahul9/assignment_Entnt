import { useEffect, useState } from "react";
import React from "react";

export default function NotificationCenter({ newNotification }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (newNotification) {
      const id = Date.now().toString();
      setNotifications((prev) => [
        ...prev,
        { id, message: newNotification.message, type: newNotification.type },
      ]);
    }
  }, [newNotification]);

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const typeColors = {
    info: "bg-blue-100 text-blue-700 border-blue-300",
    success: "bg-green-100 text-green-700 border-green-300",
    warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
    error: "bg-red-100 text-red-700 border-red-300",
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 w-80">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`border rounded px-4 py-3 shadow-sm relative ${typeColors[n.type] || typeColors.info}`}
        >
          <button
            onClick={() => dismissNotification(n.id)}
            className="absolute top-1 right-2 text-sm text-gray-500 hover:text-gray-800"
          >
            ×
          </button>
          <p className="text-sm">{n.message}</p>
        </div>
      ))}
    </div>
  );
}
