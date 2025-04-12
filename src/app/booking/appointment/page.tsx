"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const allServices = [
  { name: "Hair Cut", price: 300 },
  { name: "Beard Grooming", price: 200 },
  { name: "Hair Coloring", price: 1000 },
  { name: "Hair Wash", price: 150 },
  { name: "Shave", price: 150 },
  { name: "Head Massage", price: 400 },
  { name: "Massage", price: 500 },
  { name: "Facial", price: 600 },
  { name: "Hair Spa", price: 700 },
  { name: "Detan", price: 350 },
];

// Categorize: immediate services vs others
const immediateServicesNames = [
  "Hair Cut",
  "Beard Grooming",
  "Hair Coloring",
  "Hair Wash",
  "Shave",
];

const BookingForm = () => {
  const [selected, setSelected] = useState<typeof allServices>([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [time, setTime] = useState("");
  const [homeVisit, setHomeVisit] = useState(false);
  const [location, setLocation] = useState("");
  const [showMore, setShowMore] = useState(false);

  const toggleService = (
    service: { name: string; price: number },
    isSelected: boolean
  ) => {
    if (isSelected) {
      setSelected(selected.filter((s) => s.name !== service.name));
    } else {
      setSelected([...selected, service]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name,
      number,
      time,
      homeVisit,
      location,
      selectedServices: selected,
      totalPrice: selected.reduce((acc, curr) => acc + curr.price, 0),
    });
  };

  const immediateServices = allServices.filter((s) =>
    immediateServicesNames.includes(s.name)
  );
  const moreServices = allServices.filter(
    (s) => !immediateServicesNames.includes(s.name)
  );

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto mt-30">
      <h2 className="text-3xl font-bold text-center mb-6">Book an Appointment</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and Number */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-semibold" htmlFor="number">
              Phone Number
            </label>
            <input
              type="text"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        {/* Appointment Time */}
        <div>
          <label className="block text-gray-700 font-semibold" htmlFor="time">
            Preferred Time
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Home Visit */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="homeVisit"
            checked={homeVisit}
            onChange={(e) => setHomeVisit(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="homeVisit" className="text-gray-700">
            Request Home Visit
          </label>
        </div>

        {/* Location */}
        {homeVisit && (
          <div>
            <label className="block text-gray-700 font-semibold" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
        )}

        {/* Services */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Select Services</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...immediateServices, ...(showMore ? moreServices : [])].map((service) => {
              const isSelected = selected.some((s) => s.name === service.name);
              return (
                <button
                  key={service.name}
                  type="button"
                  onClick={() => toggleService(service, isSelected)}
                  className={`px-4 py-2 border rounded-full text-sm font-bold transition ${isSelected
                      ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                      : "border-purple-300 hover:bg-purple-50"
                    }`}
                >
                  {service.name} – Rs. {service.price}
                </button>
              );
            })}
          </div>

          {/* Toggle Button for More */}
          <div className="mt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="text-purple-600 underline font-medium"
            >
              {showMore ? "Show Less Services" : "Show More Services"}
            </button>

            <Link
              href="/services"
              className="text-purple-600 underline font-medium"
            >
              View All Services
            </Link>
          </div>
        </div>
        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/services"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full shadow hover:bg-purple-700 transition"
          >
            View More Services
          </Link>
        </motion.div>
        {/* Total Price */}
        {selected.length > 0 && (
          <div className="pt-6 border-t">
            <p className="text-md font-semibold text-gray-800">
              Total Price: Rs.{" "}
              {selected.reduce((acc, curr) => acc + curr.price, 0)}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-full text-lg font-semibold hover:bg-purple-700 transition"
          >
            Book Appointment
          </button>
        </div>
      </form>
    </section>
  );
};

export default BookingForm;
