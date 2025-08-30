import { useState } from "react";
import flightsData from "../../data/flights";

export const useFlights = () => {
  const [flights, setFlights] = useState(flightsData);
  const [activeTab, setActiveTab] = useState("priceLow");
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

  // Filtering
  const filteredFlights = flights.filter((f) => {
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

    if (filters.layoverAirports.length > 0 && (!f.layover || !filters.layoverAirports.some((ap) => f.layover.includes(ap)))) {
      return false;
    }

    if (filters.layoverRange) {
      let layoverHours = 0;
      if (f.layoverDuration) {
        const match = f.layoverDuration.match(/(\d+)h\s*(\d+)?m?/);
        if (match) {
          layoverHours = parseInt(match[1]) + (match[2] ? parseInt(match[2]) / 60 : 0);
        }
      }
      const [min, max] = filters.layoverRange === "12+" ? [12, Infinity] : filters.layoverRange.split("-").map(Number);
      if (layoverHours < min || layoverHours > max) return false;
    }
    return true;
  });

  // Sorting
  const sortedFlights = [...filteredFlights];
  if (activeTab === "priceLow") sortedFlights.sort((a, b) => a.price - b.price);
  else if (activeTab === "priceHigh") sortedFlights.sort((a, b) => b.price - a.price);
  else if (activeTab === "time") sortedFlights.sort((a, b) => new Date(a.departure) - new Date(b.departure));
  else if (activeTab === "duration") {
    const parseDuration = (d) => {
      const [h, m] = d.replace("h", "").replace("m", "").split(" ");
      return parseInt(h || 0) * 60 + parseInt(m || 0);
    };
    sortedFlights.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
  }

  return { flights, setFlights, filters, setFilters, activeTab, setActiveTab, sortedFlights };
};
