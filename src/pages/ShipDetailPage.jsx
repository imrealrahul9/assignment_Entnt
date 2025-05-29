import { useParams } from "react-router-dom";
import { useShips } from "../contexts/ShipsContext";
import { useComponents } from "../contexts/ComponentsContext";
import ShipDetail from "../components/Ships/ShipDetail";

export default function ShipDetailPage() {
  const { shipId } = useParams();
  const { ships } = useShips();
  const { components } = useComponents();

  const ship = ships.find((s) => s.id === shipId);
  const shipComponents = components.filter((c) => c.shipId === shipId);

  if (!ship) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-red-600 text-xl font-semibold">
          Ship not found or has been deleted.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <ShipDetail ship={ship} components={shipComponents} />
      </div>
    </div>
  );
}
