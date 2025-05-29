import { useComponents } from "../../contexts/ComponentsContext";
import { useShips } from "../../contexts/ShipsContext";

export default function JobForm({ job, onSubmit, onCancel }) {
  const { components } = useComponents();
  const { ships } = useShips();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      id: job?.id || "",
      type: form.type.value,
      priority: form.priority.value,
      status: form.status.value,
      componentId: form.componentId.value,
      shipId: form.shipId.value,
      assignedEngineerId: form.assignedEngineerId.value,
      scheduledDate: form.scheduledDate.value,
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="shipId" defaultValue={job?.shipId || ""} required className="border p-2 rounded">
          <option value="">Select Ship</option>
          {ships.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select name="componentId" defaultValue={job?.componentId || ""} required className="border p-2 rounded">
          <option value="">Select Component</option>
          {components.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <input name="type" placeholder="Job Type" defaultValue={job?.type || ""} required className="border p-2 rounded" />
        <select name="priority" defaultValue={job?.priority || "Medium"} required className="border p-2 rounded">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select name="status" defaultValue={job?.status || "Open"} required className="border p-2 rounded">
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input name="assignedEngineerId" placeholder="Engineer ID" defaultValue={job?.assignedEngineerId || ""} required className="border p-2 rounded" />

        <input name="scheduledDate" type="date" defaultValue={job?.scheduledDate || ""} required className="border p-2 rounded" />
      </div>

      <div className="mt-4 flex gap-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
      </div>
    </form>
  );
}
