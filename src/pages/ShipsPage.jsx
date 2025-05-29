import { useShips } from "../contexts/ShipsContext";
import { useState } from "react";
import ShipList from "../components/Ships/ShipList";
import ShipForm from "../components/Ships/ShipForm";

export default function ShipsPage() {
  const { ships, addShip, updateShip, deleteShip } = useShips();
  const [editingShip, setEditingShip] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setEditingShip(null);
    setShowForm(true);
  };

  const handleEdit = (ship) => {
    setEditingShip(ship);
    setShowForm(true);
  };

  const handleFormSubmit = (shipData) => {
    if (editingShip) {
      updateShip(shipData);
    } else {
      addShip({ ...shipData, id: `s${Date.now()}` });
    }
    setShowForm(false);
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Ships Management</h1>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          + Add Ship
        </button>
      </div>
      {showForm && (
        <ShipForm
          ship={editingShip}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}
      <ShipList ships={ships} onEdit={handleEdit} onDelete={deleteShip} />
    </div>
  );
}
