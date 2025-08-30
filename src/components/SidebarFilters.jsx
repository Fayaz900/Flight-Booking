import React, { useState } from "react";

const SidebarFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <aside className="w-72 bg-white p-4 rounded-xl shadow-md space-y-6">
      {/* Trip */}
      <div>
        <h3 className="font-bold mb-2">Trip</h3>
        <div className="flex gap-2">
          <button className={`px-4 py-1 rounded-full ${filters.trip === "oneway" ? "bg-blue-600 text-white" : "border"}`} onClick={() => setFilters(f => ({...f, trip: "oneway"}))}>Oneway</button>
          <button className={`px-4 py-1 rounded-full ${filters.trip === "return" ? "bg-blue-600 text-white" : "border"}`} onClick={() => setFilters(f => ({...f, trip: "return"}))}>Return</button>
        </div>
      </div>

      {/* Stops */}
      <div>
        <h3 className="font-bold mb-2">Stops</h3>
        <label className="flex items-center gap-2"><input type="checkbox" name="direct" checked={filters.direct} onChange={handleChange}/> Direct</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="oneStop" checked={filters.oneStop} onChange={handleChange}/> 1 Stop</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="twoStop" checked={filters.twoStop} onChange={handleChange}/> 2+ Stops</label>
      </div>

      {/* Departure Time */}
      <div>
        <h3 className="font-bold mb-2">Departure Time</h3>
        {["00-06", "06-12", "12-18", "18-24"].map(range => (
          <label key={range} className="flex items-center gap-2">
            <input type="radio" name="departureRange" value={range} checked={filters.departureRange === range} onChange={handleChange}/>
            {range}
          </label>
        ))}
      </div>

      {/* Fare Type */}
      <div>
        <h3 className="font-bold mb-2">Fare Type</h3>
        <label className="flex items-center gap-2"><input type="checkbox" name="refundable" checked={filters.refundable} onChange={handleChange}/> Refundable</label>
        <label className="flex items-center gap-2"><input type="checkbox" name="nonRefundable" checked={filters.nonRefundable} onChange={handleChange}/> Non-Refundable</label>
      </div>

      {/* Airlines */}
      <div>
        <h3 className="font-bold mb-2">Airlines</h3>
        {["Etihad Airways", "Qatar Airways", "IndiGo"].map(airline => (
          <label key={airline} className="flex items-center gap-2">
            <input type="checkbox" name={airline} checked={filters.airlines.includes(airline)} onChange={(e) => {
              if(e.target.checked){
                setFilters(prev => ({...prev, airlines: [...prev.airlines, airline]}));
              } else {
                setFilters(prev => ({...prev, airlines: prev.airlines.filter(a => a!== airline)}));
              }
            }}/>
            {airline}
          </label>
        ))}
      </div>

      {/* Layover Time */}
      <div>
        <h3 className="font-bold mb-2">Layover Time (Hours)</h3>
        {["0-4","4-8","8-12","12+"].map(range => (
          <label key={range} className="flex items-center gap-2">
            <input type="radio" name="layoverRange" value={range} checked={filters.layoverRange === range} onChange={handleChange}/>
            {range}
          </label>
        ))}
      </div>

      {/* Layover Airports */}
      <div>
        <h3 className="font-bold mb-2">Layover Airport</h3>
        {["Dubai", "Doha", "Hyderabad"].map(ap => (
          <label key={ap} className="flex items-center gap-2">
            <input type="checkbox" name={ap} checked={filters.layoverAirports.includes(ap)} onChange={(e)=>{
              if(e.target.checked){
                setFilters(prev => ({...prev, layoverAirports:[...prev.layoverAirports, ap]}));
              } else {
                setFilters(prev => ({...prev, layoverAirports: prev.layoverAirports.filter(x=>x!==ap)}));
              }
            }}/>
            {ap}
          </label>
        ))}
      </div>
    </aside>
  );
};

export default SidebarFilters;
