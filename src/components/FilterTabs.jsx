import React from "react";

const FilterTabs = ({ active, setActive }) => {
  const tabs = [
    { id: "cheapest", label: "Cheapest", price: "130.000" },
    { id: "fastest", label: "Fastest", price: "200.000" },
    { id: "best", label: "Best Value", price: "135.000" },
  ];

  return (
    <div className="flex gap-2 my-4">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActive(tab.id)}
          className={`px-6 py-2 rounded-full border ${
            active === tab.id
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {tab.label} <span className="ml-2">{tab.price}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
