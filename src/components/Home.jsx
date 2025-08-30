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
  const filteredFlights = flights.filter((f) => {
    //Refundable / Non-refundable
    if (filters.refundable && !f.refundable) return false;
    if (filters.nonRefundable && f.refundable) return false;

    if (filters.airlines.length > 0 && !filters.airlines.includes(f.airline)) return false;

    if (f.price < filters.priceRange[0] || f.price > filters.priceRange[1]) return false;

    if (filters.direct && f.stops !== 0) return false;
    if (filters.oneStop && f.stops !== 1) return false;
    if (filters.twoStop && f.stops < 2) return false;

    if (filters.departureRange) {
      const depHour = new Date(f.departure).getHours();
      const [start, end] = filters.departureRange.split("-").map(Number);
      if (depHour < start || depHour >= end) return false;
    }

    if (filters.layoverAirports.length > 0) {
      if (!f.layover || !filters.layoverAirports.some((ap) => f.layover.includes(ap))) {
        return false;
      }
    }

    if (filters.layoverRange) {
      let layoverHours = 0;

      if (f.layoverDuration) {
        // f.layoverDuration = "5h 30m"
        const match = f.layoverDuration.match(/(\d+)h\s*(\d+)?m?/);
        if (match) {
          layoverHours = parseInt(match[1]) + (match[2] ? parseInt(match[2]) / 60 : 0);
        }
      }

      const [min, max] =
        filters.layoverRange === "12+"
          ? [12, Infinity]
          : filters.layoverRange.split("-").map(Number);

      if (layoverHours < min || layoverHours > max) return false;
    }

    return true;
  });

  let sortedFlights = [...filteredFlights];

  if (activeTab === "priceLow") {
    sortedFlights.sort((a, b) => a.price - b.price);
  } else if (activeTab === "priceHigh") {
    sortedFlights.sort((a, b) => b.price - a.price);
  } else if (activeTab === "time") {
    sortedFlights.sort((a, b) => new Date(a.departure) - new Date(b.departure));
  } else if (activeTab === "duration") {
    const parseDuration = (d) => {
      const [h, m] = d.replace("h", "").replace("m", "").split(" ");
      return parseInt(h || 0) * 60 + parseInt(m || 0);
    };
    sortedFlights.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Header */}
        <header className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-4 rounded-xl flex justify-between items-center">
          <h1 className="text-xl font-bold">AEROLINK</h1>
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
            {sortedFlights.length > 0 ? (
              sortedFlights.map(f => <FlightCard key={f.id} flight={f} />)
            ) : (
              <p className="text-gray-600 mt-6">No flights match your filters.</p>
            )}

          </div>
        </div>
      </div>
    </>
  );
};
