export const FlightFormModal = ({ show, onClose, onSubmit, newFlight, setNewFlight }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[500px]">
        <h2 className="text-xl font-bold mb-4">Add New Flight</h2>
        <div className="grid gap-3">
          {[
            { key: "airline", placeholder: "Airline" },
            { key: "logo", placeholder: "Logo URL" },
            { key: "from", placeholder: "From" },
            { key: "to", placeholder: "To" },
            { key: "price", type: "number", placeholder: "Price" },
            { key: "duration", placeholder: "Duration (e.g. 2h 30m)" },
          ].map(({ key, placeholder, type }) => (
            <input
              key={key}
              className="border p-2 rounded"
              type={type || "text"}
              placeholder={placeholder}
              value={newFlight[key]}
              onChange={(e) => setNewFlight({ ...newFlight, [key]: type === "number" ? Number(e.target.value) : e.target.value })}
            />
          ))}
          <input className="border p-2 rounded" type="datetime-local" value={newFlight.departure} onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })} />
          <input className="border p-2 rounded" type="datetime-local" value={newFlight.arrival} onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })} />
          <input className="border p-2 rounded" placeholder="Stops" type="number" value={newFlight.stops} onChange={(e) => setNewFlight({ ...newFlight, stops: Number(e.target.value) })} />
          <select className="border p-2 rounded" value={newFlight.refundable} onChange={(e) => setNewFlight({ ...newFlight, refundable: e.target.value === "true" })}>
            <option value="true">Refundable</option>
            <option value="false">Non-Refundable</option>
          </select>
          <input className="border p-2 rounded" placeholder="Layover (optional)" value={newFlight.layover || ""} onChange={(e) => setNewFlight({ ...newFlight, layover: e.target.value || null })} />
          <input className="border p-2 rounded" placeholder="Layover Duration (e.g. 1h 20m)" value={newFlight.layoverDuration || ""} onChange={(e) => setNewFlight({ ...newFlight, layoverDuration: e.target.value || null })} />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={onSubmit} className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">Add Flight</button>
        </div>
      </div>
    </div>
  );
};
