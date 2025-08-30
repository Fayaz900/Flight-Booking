import { useState } from "react";

export const FlightFormModal = ({ show, onClose, onSubmit, newFlight, setNewFlight }) => {
  const [errors, setErrors] = useState({});

  if (!show) return null;

  const validateForm = () => {
    let newErrors = {};
    if (!newFlight.airline) newErrors.airline = "Airline is required";
    if (!newFlight.logo) newErrors.logo = "Logo URL is required";
    if (!newFlight.from) newErrors.from = "From location is required";
    if (!newFlight.to) newErrors.to = "To location is required";
    if (!newFlight.price) newErrors.price = "Price is required";
    if (!newFlight.duration) newErrors.duration = "Duration is required";
    if (!newFlight.departure) newErrors.departure = "Departure time is required";
    if (!newFlight.arrival) newErrors.arrival = "Arrival time is required";
    if (newFlight.stops === undefined || newFlight.stops === null) newErrors.stops = "Stops are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit();
    }
  };

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
            <div key={key}>
              <input
                className="border p-2 rounded w-full"
                type={type || "text"}
                placeholder={placeholder}
                value={newFlight[key] || ""}
                onChange={(e) =>
                  setNewFlight({
                    ...newFlight,
                    [key]: type === "number" ? Number(e.target.value) : e.target.value,
                  })
                }
              />
              {errors[key] && <p className="text-red-500 text-sm">{errors[key]}</p>}
            </div>
          ))}

          <div>
            <input
              className="border p-2 rounded w-full"
              type="datetime-local"
              value={newFlight.departure || ""}
              onChange={(e) => setNewFlight({ ...newFlight, departure: e.target.value })}
            />
            {errors.departure && <p className="text-red-500 text-sm">{errors.departure}</p>}
          </div>

          <div>
            <input
              className="border p-2 rounded w-full"
              type="datetime-local"
              value={newFlight.arrival || ""}
              onChange={(e) => setNewFlight({ ...newFlight, arrival: e.target.value })}
            />
            {errors.arrival && <p className="text-red-500 text-sm">{errors.arrival}</p>}
          </div>

          <div>
            <input
              className="border p-2 rounded w-full"
              placeholder="Stops"
              type="number"
              value={newFlight.stops || ""}
              onChange={(e) => setNewFlight({ ...newFlight, stops: Number(e.target.value) })}
            />
            {errors.stops && <p className="text-red-500 text-sm">{errors.stops}</p>}
          </div>

          <select
            className="border p-2 rounded"
            value={newFlight.refundable}
            onChange={(e) => setNewFlight({ ...newFlight, refundable: e.target.value === "true" })}
          >
            <option value="true">Refundable</option>
            <option value="false">Non-Refundable</option>
          </select>

          <input
            className="border p-2 rounded"
            placeholder="Layover (optional)"
            value={newFlight.layover || ""}
            onChange={(e) => setNewFlight({ ...newFlight, layover: e.target.value || null })}
          />

          <input
            className="border p-2 rounded"
            placeholder="Layover Duration (e.g. 1h 20m)"
            value={newFlight.layoverDuration || ""}
            onChange={(e) => setNewFlight({ ...newFlight, layoverDuration: e.target.value || null })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">
            Add Flight
          </button>
        </div>
      </div>
    </div>
  );
};
