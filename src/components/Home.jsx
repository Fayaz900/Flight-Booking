import { useState } from "react";
import { Navbar } from "./Navbar";
import { FlightFormModal } from "./FlightFormModal";
import { useFlights } from "../components/hooks/useFlights";
import FlightCard from "./FlightCard";
import SidebarFilters from "./SidebarFilters";
import {
  Button,
  Select,
  Option,
  Card,
  Typography,
  IconButton,
  Drawer,
} from "@material-tailwind/react";
import { MdAddCircleOutline, MdFilterList } from "react-icons/md";
import { FaSort } from "react-icons/fa";

export const Home = () => {
  const {
    flights,
    setFlights,
    filters,
    setFilters,
    activeTab,
    setActiveTab,
    sortedFlights,
  } = useFlights();

  const [showModal, setShowModal] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [newFlight, setNewFlight] = useState({
    id: Date.now(),
    airline: "",
    logo: "",
    from: "",
    to: "",
    price: 0,
    duration: "",
    departure: "",
    arrival: "",
    stops: 0,
    refundable: false,
    layover: null,
    layoverDuration: null,
  });

  const handleAddFlight = () => {
    setFlights([...flights, { ...newFlight, id: Date.now() }]);
    setShowModal(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-montserrat">
      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="mt-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 px-4">
        {/* Sidebar */}
        <div className="hidden lg:block">
          <SidebarFilters
            filters={filters}
            setFilters={setFilters}
            flights={flights}
          />
        </div>

        {/* Right Section */}
        <Card className="p-4 sm:p-6 shadow-lg rounded-2xl w-full">
          {/* Top Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            {/* Sort Dropdown */}
            <div className="w-full md:w-1/3">
              <Select
                label="Sort Flights"
                icon={<FaSort className="h-5 w-5" />}
                onChange={(val) => setActiveTab(val)}
                value={activeTab}
              >
                <Option value="priceLow">💸 Price Low → High</Option>
                <Option value="priceHigh">💰 Price High → Low</Option>
                <Option value="time">🕑 Departure Time</Option>
                <Option value="duration">⏳ Duration</Option>
              </Select>
            </div>

            {/* Add Flight Button */}
            <Button
              color="cyan"
              size="md"
              className="flex items-center gap-2 w-full md:w-auto justify-center"
              onClick={() => setShowModal(true)}
            >
              <MdAddCircleOutline size={20} />
              Schedule Flight
            </Button>
          </div>

          {/* Flight Cards */}
          {sortedFlights.length > 0 ? (
            <div className="grid gap-4 mt-4">
              {sortedFlights.map((f) => (
                <FlightCard key={f.id} flight={f} />
              ))}
            </div>
          ) : (
            <Typography
              variant="paragraph"
              color="gray"
              className="text-center mt-6"
            >
              No flights match your filters.
            </Typography>
          )}
        </Card>
      </div>

      {/* Filter Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <IconButton
          size="lg"
          color="blue"
          className="rounded-full shadow-xl"
          onClick={() => setFilterOpen(true)}
        >
          <MdFilterList size={24} />
        </IconButton>
      </div>

      {/* Mobile Drawer */}
      <Drawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        placement="left"
        size={320}
        className="p-4 bg-white"
      >
        <SidebarFilters
          filters={filters}
          setFilters={setFilters}
          flights={flights}
        />
      </Drawer>

      <FlightFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddFlight}
        newFlight={newFlight}
        setNewFlight={setNewFlight}
      />
    </div>
  );
};
