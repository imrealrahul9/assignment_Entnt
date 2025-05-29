import { useState, useEffect } from "react";

export default function ComponentForm({ component, ships = [], onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    serialNumber: "",
    installDate: "",
    lastMaintenanceDate: "",
    shipId: ships[0]?.id || "",
  });

  useEffect(() => {
    if (component) {
      setFormData({
        id: component.id || null,
        name: component.name || "",
        serialNumber: component.serialNumber || "",
        installDate: component.installDate || "",
        lastMaintenanceDate: component.lastMaintenanceDate || "",
        shipId: component.shipId || ships[0]?.id || "",
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        shipId: ships[0]?.id || "",
      }));
    }
  }, [component, ships]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">
        {formData.id ? "Edit Component" : "Add Component"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          placeholder="Component Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <input
          name="serialNumber"
          type="text"
          placeholder="Serial Number"
          value={formData.serialNumber}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <input
          name="installDate"
          type="date"
          value={formData.installDate}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <input
          name="lastMaintenanceDate"
          type="date"
          value={formData.lastMaintenanceDate}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <select
          name="shipId"
          value={formData.shipId}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          {ships.map((ship) => (
            <option key={ship.id} value={ship.id}>
              {ship.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          {formData.id ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
