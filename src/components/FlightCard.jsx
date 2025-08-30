import React from "react";

const FlightCard = ({ flight }) => {
  const depTime = new Date(flight.departure).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const arrTime = new Date(flight.arrival).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="bg-white rounded-xl shadow-md border mb-6 flex justify-between">
      {/* Left - Flight Info */}
      <div className="p-4 flex-1">
        <div className="flex gap-4">
          <img src={flight.logo} alt={flight.airline} className="w-12 h-12 object-contain" />
          <div>
            <p className="font-semibold">{flight.airline}</p>
            <p className="text-gray-500">{flight.code} | Economy</p>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <div>
            <p className="text-xl font-bold">{depTime}</p>
            <p className="text-gray-500">{flight.from}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Total Time: {flight.duration}</p>
          </div>
          <div>
            <p className="text-xl font-bold">{arrTime}</p>
            <p className="text-gray-500">{flight.to}</p>
          </div>
        </div>
      </div>

      {/* Right - Price & Actions */}
      <div className="bg-gray-50 rounded-r-xl p-6 w-64 flex flex-col justify-center text-center">
        <p className="line-through text-gray-400 text-sm">{flight.currency} {flight.oldPrice}.000</p>
        <p className="text-2xl font-bold text-gray-800">
          {flight.currency} {flight.price}.000
        </p>
        <p className="text-blue-600 text-sm">{flight.refundable ? "Refundable" : "Non-refundable"}</p>

        <button className="mt-4 bg-purple-600 text-white py-2 rounded-lg font-medium hover:bg-purple-700">SELECT +</button>
        <button className="mt-2 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700">Flight Details</button>
      </div>
    </div>
  );
};

export default FlightCard;
