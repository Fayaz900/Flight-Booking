import React from "react";
import { Card, Typography, Checkbox, Radio, Button } from "@material-tailwind/react";
import { MdFlight, MdAttachMoney, MdAirlines, MdAccessTime } from "react-icons/md";

const SidebarFilters = ({ filters, setFilters, flights }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Price min/max
  const prices = flights.map((f) => f.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  return (
    <Card className="w-72 bg-white p-5 rounded-2xl shadow-lg space-y-8">
      {/* Price Range */}
      <div>
        <Typography variant="h6" className="flex items-center gap-2 text-gray-800 mb-3">
          <MdAttachMoney className="text-green-600 text-xl" /> Price Range
        </Typography>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="100"
          value={filters.priceRange[0]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [Number(e.target.value), prev.priceRange[1]],
            }))
          }
          className="w-full accent-blue-600"
        />
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step="100"
          value={filters.priceRange[1]}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              priceRange: [prev.priceRange[0], Number(e.target.value)],
            }))
          }
          className="w-full accent-blue-600 mt-2"
        />
        <p className="text-sm text-gray-600 mt-1">
          ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
        </p>
      </div>

      {/* Trip Type */}
      <div>
        <Typography variant="h6" className="flex items-center gap-2 text-gray-800 mb-3">
          <MdFlight className="text-blue-600 text-xl" /> Trip Type
        </Typography>
        <div className="flex gap-3">
          <Button
            size="sm"
            variant={filters.trip === "oneway" ? "filled" : "outlined"}
            color="blue"
            onClick={() => setFilters((f) => ({ ...f, trip: "oneway" }))}
          >
            Oneway
          </Button>
          <Button
            size="sm"
            variant={filters.trip === "return" ? "filled" : "outlined"}
            color="blue"
            onClick={() => setFilters((f) => ({ ...f, trip: "return" }))}
          >
            Return
          </Button>
        </div>
      </div>

      {/* Stops */}
      <div>
        <Typography variant="h6" className="text-gray-800 mb-3">Stops</Typography>
        {["Direct", "1 Stop", "2+ Stops"].map((stop, i) => {
          const key = ["direct", "oneStop", "twoStop"][i];
          return (
            <Checkbox
              key={stop}
              label={stop}
              color="blue"
              checked={filters[key]}
              onChange={handleChange}
              name={key}
              ripple={true}
              className="text-sm"
            />
          );
        })}
      </div>

      {/* Departure Time */}
      <div>
        <Typography variant="h6" className="flex items-center gap-2 text-gray-800 mb-3">
          <MdAccessTime className="text-orange-600 text-xl" /> Departure Time
        </Typography>
        {["00-06", "06-12", "12-18", "18-24"].map((range) => (
          <Radio
            key={range}
            name="departureRange"
            value={range}
            label={range}
            color="blue"
            checked={filters.departureRange === range}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* Fare Type */}
      <div>
        <Typography variant="h6" className="text-gray-800 mb-3">Fare Type</Typography>
        <Checkbox
          label="Refundable"
          color="green"
          checked={filters.refundable}
          onChange={handleChange}
          name="refundable"
        />
        <Checkbox
          label="Non-Refundable"
          color="red"
          checked={filters.nonRefundable}
          onChange={handleChange}
          name="nonRefundable"
        />
      </div>

      {/* Airlines */}
      <div>
        <Typography variant="h6" className="flex items-center gap-2 text-gray-800 mb-3">
          <MdAirlines className="text-purple-600 text-xl" /> Airlines
        </Typography>
        {["Etihad Airways", "Qatar Airways", "IndiGo"].map((airline) => (
          <Checkbox
            key={airline}
            label={airline}
            color="blue"
            checked={filters.airlines.includes(airline)}
            onChange={(e) => {
              if (e.target.checked) {
                setFilters((prev) => ({
                  ...prev,
                  airlines: [...prev.airlines, airline],
                }));
              } else {
                setFilters((prev) => ({
                  ...prev,
                  airlines: prev.airlines.filter((a) => a !== airline),
                }));
              }
            }}
          />
        ))}
      </div>

      {/* Layover Time */}
      <div>
        <Typography variant="h6" className="text-gray-800 mb-3">Layover Time (Hours)</Typography>
        {["0-4", "4-8", "8-12", "12+"].map((range) => (
          <Radio
            key={range}
            name="layoverRange"
            value={range}
            label={range}
            color="blue"
            checked={filters.layoverRange === range}
            onChange={handleChange}
          />
        ))}
      </div>

      {/* Layover Airports */}
      <div>
        <Typography variant="h6" className="text-gray-800 mb-3">Layover Airports</Typography>
        {["Dubai", "Doha", "Hyderabad"].map((ap) => (
          <Checkbox
            key={ap}
            label={ap}
            color="blue"
            checked={filters.layoverAirports.includes(ap)}
            onChange={(e) => {
              if (e.target.checked) {
                setFilters((prev) => ({
                  ...prev,
                  layoverAirports: [...prev.layoverAirports, ap],
                }));
              } else {
                setFilters((prev) => ({
                  ...prev,
                  layoverAirports: prev.layoverAirports.filter((x) => x !== ap),
                }));
              }
            }}
          />
        ))}
      </div>
    </Card>
  );
};

export default SidebarFilters;
