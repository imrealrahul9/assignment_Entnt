export default function ShipList({ ships, onEdit, onDelete }) {
  if (ships.length === 0) {
    return <p className="text-gray-500">No ships available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {ships.map((ship) => (
        <div
          key={ship.id}
          className="bg-amber-200 shadow-md rounded-xl p-5 hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold text-blue-700 mb-2">{ship.name}</h2>
          <p className="text-gray-600 mb-4">IMO Number: {ship.imo}</p>
          <p className="text-gray-600 mb-4">Flag: {ship.flag}</p>
          <p className="text-gray-600 mb-4">Status: {ship.status}</p>

          <div className="flex gap-3">
            <button
              onClick={() => onEdit(ship)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(ship.id)}
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

