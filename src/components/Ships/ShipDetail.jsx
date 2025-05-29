export default function ShipDetail({ ship, components }) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{ship.name} - Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p><span className="font-medium">IMO:</span> {ship.imo}</p>
            <p><span className="font-medium">Flag:</span> {ship.flag}</p>
            <p><span className="font-medium">Status:</span> {ship.status}</p>
          </div>
        </div>
  
        <h3 className="text-xl font-semibold mt-6 mb-2">Installed Components</h3>
        {components.length === 0 ? (
          <p className="text-gray-500">No components installed on this ship.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-sm text-left bg-gray-50">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Serial Number</th>
                  <th className="px-4 py-2">Install Date</th>
                  <th className="px-4 py-2">Last Maintenance</th>
                </tr>
              </thead>
              <tbody>
                {components.map((c) => (
                  <tr key={c.id} className="border-t">
                    <td className="px-4 py-2">{c.name}</td>
                    <td className="px-4 py-2">{c.serialNumber}</td>
                    <td className="px-4 py-2">{c.installDate}</td>
                    <td className="px-4 py-2">{c.lastMaintenanceDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
  