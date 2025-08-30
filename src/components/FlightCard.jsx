import React, { useState } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import { MdFlight } from "react-icons/md";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const FlightCard = ({ flight }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  const depTime = new Date(flight.departure).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const arrTime = new Date(flight.arrival).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const depDate = new Date(flight.departure).toDateString();
  const arrDate = new Date(flight.arrival).toDateString();

  return (
    <>
      {/* Flight Card */}
      <div className="bg-white rounded-2xl shadow-md border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col lg:flex-row justify-between overflow-hidden">
        {/* Left - Flight Info */}
        <div className="p-4 flex-1">
          {/* Airline Info */}
          <div className="flex gap-4 items-center flex-wrap">
            <img
              src={flight.logo}
              alt={flight.airline}
              className="w-12 h-12 object-contain"
            />
            <div>
              <p className="font-semibold text-gray-800">{flight.airline}</p>
              <p className="text-gray-500 text-sm">
                {flight.code || "ET652"} | Economy
              </p>
            </div>
          </div>

          {/* Timing */}
          <div className="flex justify-between items-center mt-6 px-2 flex-col sm:flex-row gap-4">
            {/* Departure */}
            <div className="text-center sm:text-left">
              <p className="text-xl font-bold">{depTime}</p>
              <p className="text-gray-500 text-sm flex items-center gap-1 justify-center sm:justify-start">
                <FaPlaneDeparture className="text-blue-600" /> {flight.from}
              </p>
            </div>

            {/* Flight Path */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2">
                <span className="h-[2px] w-12 sm:w-16 bg-gray-300"></span>
                <MdFlight className="text-blue-600 text-xl rotate-90" />
                <span className="h-[2px] w-12 sm:w-16 bg-gray-300"></span>
              </div>
              <p className="text-gray-500 text-xs mt-1">
                Total Time: {flight.duration}
              </p>
            </div>

            {/* Arrival */}
            <div className="text-center sm:text-right">
              <p className="text-xl font-bold">{arrTime}</p>
              <p className="text-gray-500 text-sm flex items-center gap-1 justify-center sm:justify-end">
                {flight.to} <FaPlaneArrival className="text-blue-600" />
              </p>
            </div>
          </div>
        </div>

        {/* Right - Price & Actions */}
        <div className="bg-gray-50 border-t lg:border-t-0 lg:border-l rounded-b-2xl lg:rounded-r-2xl p-4 sm:p-6 w-full lg:w-72 flex flex-col justify-center text-center">
          <p className="line-through text-gray-400 text-sm">
            {flight.currency || "INR"} {flight.oldPrice}
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {flight.currency || "INR"} {flight.price}
          </p>
          <p
            className={`${
              flight.refundable ? "text-green-600" : "text-red-500"
            } text-sm font-medium`}
          >
            {flight.refundable ? "Refundable" : "Non-refundable"}
          </p>

          <button className="mt-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white py-2 rounded-xl font-medium hover:scale-105 transition">
            SELECT +
          </button>
          <button
            onClick={handleOpen}
            className="mt-3 bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 hover:scale-105 transition"
          >
            Flight Details
          </button>
        </div>
      </div>

      {/* Modal */}
      <Dialog open={open} handler={handleOpen} size="lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <img
              src={flight.logo}
              alt={flight.airline}
              className="w-12 h-12 object-contain"
            />
            <div>
              <h3 className="text-lg font-bold">{flight.airline}</h3>
              <p className="text-sm text-gray-500">
                {flight.code || "ET652"} | Economy
              </p>
            </div>
          </div>
        </DialogHeader>
        <DialogBody divider className="space-y-4">
          {/* Departure & Arrival */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <p className="text-lg font-semibold">{depTime}</p>
              <p className="text-gray-500 text-sm">{depDate}</p>
              <p className="text-gray-600">{flight.from}</p>
            </div>
            <div className="text-center">
              <MdFlight className="text-blue-600 text-2xl rotate-90 mx-auto" />
              <p className="text-sm text-gray-500">{flight.duration}</p>
            </div>
            <div>
              <p className="text-lg font-semibold">{arrTime}</p>
              <p className="text-gray-500 text-sm">{arrDate}</p>
              <p className="text-gray-600">{flight.to}</p>
            </div>
          </div>

          {/* Stops / Layover */}
          {flight.stops > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-700">
                Stops: <span className="font-semibold">{flight.stops}</span>
              </p>
              <p className="text-sm text-gray-700">
                Layover:{" "}
                <span className="font-semibold">{flight.layover}</span> (
                {flight.layoverDuration})
              </p>
            </div>
          )}

          {/* Refund Info */}
          <p
            className={`font-medium ${
              flight.refundable ? "text-green-600" : "text-red-500"
            }`}
          >
            {flight.refundable ? "Refundable ticket" : "Non-refundable ticket"}
          </p>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="outlined"
            color="red"
            onClick={handleOpen}
            className="rounded-xl"
          >
            Close
          </Button>
          <Button
            variant="gradient"
            color="green"
            className="rounded-xl"
            onClick={() => alert("Flight booked successfully!")}
          >
            Book Now
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default FlightCard;
