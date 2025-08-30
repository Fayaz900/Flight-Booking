import { useState } from "react";
import FlightCard from "./FlightCard";
import flights from "../data/flights";
import FilterTabs from "./FilterTabs";
import SidebarFilters from "./SidebarFilters";


export const Home = () => {
  const [activeTab, setActiveTab] = useState("cheapest");
  const [filters, setFilters] = useState({
    trip: "oneway",
    direct: false,
    oneStop: false,
    twoStop: false,
    departureRange: "",
    refundable: false,
    nonRefundable: false,
    airlines: [],
    layoverRange: "",
    layoverAirports: [],
    priceRange: [0, 10000],
  });


  // Filter Logic
  const filteredFlights = flights.filter(f => {
    if (filters.refundable && !f.refundable) return false;
    if (filters.nonRefundable && f.refundable) return false;
    if (filters.airlines.length > 0 && !filters.airlines.includes(f.airline)) return false;
    if (f.price < filters.priceRange[0] || f.price > filters.priceRange[1]) return false; // ✅ Price filter
    return true;
  });

  let sortedFlights = [...filteredFlights];

  if (activeTab === "priceLow") {
    sortedFlights.sort((a, b) => a.price - b.price);
  } else if (activeTab === "priceHigh") {
    sortedFlights.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Header */}
        <header className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 rounded-xl flex justify-between items-center">
          <h1 className="text-xl font-bold">ALMUSAFER</h1>
          <nav className="flex gap-6">
            <a href="#">Home</a>
            <a href="#">My Booking</a>
            <a href="#">Register</a>
            <a href="#">Login</a>
            <a href="#">Contact</a>
          </nav>
        </header>

        <div className="mt-6 max-w-7xl mx-auto grid grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <SidebarFilters filters={filters} setFilters={setFilters} flights={flights} />

          {/* Main */}
          <div>
            {/* Sort + Tabs */}
            <div className="flex justify-between items-center mb-4">
              <select
                className="border px-3 py-2 rounded"
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="priceLow">Sort: Price Low → High</option>
                <option value="priceHigh">Sort: Price High → Low</option>
                <option value="time">Sort: Time</option>
                <option value="duration">Sort: Duration</option>
              </select>

            </div>
            <FilterTabs active={activeTab} setActive={setActiveTab} />

            {/* Flights */}
            {filteredFlights.length > 0 ? (
              filteredFlights.map(f => <FlightCard key={f.id} flight={f} />)
            ) : (
              <p className="text-gray-600 mt-6">No flights match your filters.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
