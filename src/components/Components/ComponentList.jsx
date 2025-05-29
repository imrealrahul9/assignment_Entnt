export default function ComponentList({ components, shipId, onEdit, onDelete }) {
  const filteredComponents = shipId
    ? components.filter((c) => c.shipId === shipId)
    : components;

  if (filteredComponents.length === 0) {
    return <p className="text-gray-500">No components found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredComponents.map((component) => (
        <div
          key={component.id}
          className="bg-amber-200 shadow-md rounded-xl p-5 hover:shadow-xl  transition-shadow"
        >
          <h2 className="text-xl font-semibold text-indigo-700 mb-2">{component.name}</h2>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Serial:</span> {component.serialNumber}
          </p>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">Installed:</span> {component.installDate}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-medium">Last Maintenance:</span> {component.lastMaintenanceDate}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => onEdit(component)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(component.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
