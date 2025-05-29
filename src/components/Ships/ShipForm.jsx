import { useState } from "react";

export default function ShipForm({ ship = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: ship.name || "",
    imo: ship.imo || "",
    flag: ship.flag || "",
    status: ship.status || "Active",
    id: ship.id || null,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">{ship.id ? "Edit Ship" : "Add Ship"}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          placeholder="Ship Name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <input
          name="imo"
          type="text"
          placeholder="IMO Number"
          value={formData.imo}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <input
          name="flag"
          type="text"
          placeholder="Flag"
          value={formData.flag}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
        >
          <option value="Active">Active</option>
          <option value="Under Maintenance">Under Maintenance</option>
          <option value="Docked">Docked</option>
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
          {ship.id ? "Update Ship" : "Create Ship"}
        </button>
      </div>
    </form>
  );
}
