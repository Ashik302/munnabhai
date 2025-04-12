"use client";

import { useState } from "react";
import serviceData from "@/app/data/data.json";
import BookingComponent from "@/app/components/Booking";

const ServicesPage = () => {
  const [selected, setSelected] = useState<any[]>([]);
  const [showBooking, setShowBooking] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showOptionSelect, setShowOptionSelect] = useState<any | null>(null); // service needing option selection

  const services = serviceData.menu_items;

  const emojis: Record<string, string> = {
    cleaning: "🧹",
    laundry: "👕",
    cooking: "👩‍🍳",
    gardening: "🌿",
    babysitting: "👶",
    security: "🛡️",
    plumbing: "🔧",
    electrician: "💡",
    painting: "🎨",
  };

  const filteredServices = services.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleServiceClick = (item: any) => {
    const alreadySelected = selected.find((s) => s.title === item.title);
    if (alreadySelected) {
      setSelected(selected.filter((s) => s.title !== item.title));
    } else {
      if (item.premium) {
        setShowOptionSelect(item); // ask which option
      } else {
        setSelected([
          ...selected,
          {
            title: item.title,
            price: item.common,
            plan: "Common",
            numberOfPersons: 1,
          },
        ]);
      }
    }
  };

  const selectPlan = (plan: "Common" | "Premium") => {
    if (!showOptionSelect) return;
    const price = plan === "Common" ? showOptionSelect.common : showOptionSelect.premium;
    setSelected([
      ...selected,
      {
        title: showOptionSelect.title,
        price,
        plan,
        numberOfPersons: 1,
      },
    ]);
    setShowOptionSelect(null);
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto mt-20">
      <h1 className="text-4xl font-bold text-center mb-12 text-purple-800">
        🛠️ Our Services
      </h1>

      {/* Search + Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        <input
          type="text"
          placeholder="🔍 Search for a service..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          onClick={() => setShowBooking(true)}
          disabled={selected.length === 0}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            selected.length > 0
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          📦 Book Selected Services
        </button>
      </div>

      {/* Booking Component */}
      {showBooking && selected.length > 0 && (
        <div className="mb-10">
          <BookingComponent selectedServices={selected} />
        </div>
      )}

      {/* Option Selector */}
      {showOptionSelect && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm">
            <h2 className="text-lg font-semibold mb-4">
              Select a plan for <span className="text-purple-700">{showOptionSelect.title}</span>
            </h2>
            <div className="space-x-4">
              <button
                onClick={() => selectPlan("Common")}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full"
              >
                Common (Rs. {showOptionSelect.common})
              </button>
              <button
                onClick={() => selectPlan("Premium")}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-full"
              >
                Premium (Rs. {showOptionSelect.premium})
              </button>
            </div>
            <button
              onClick={() => setShowOptionSelect(null)}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredServices.length > 0 ? (
          filteredServices.map((item, index) => {
            const emoji =
              emojis[item.title.toLowerCase()] || "🛎️";
            const isSelected = selected.find((s) => s.title === item.title);

            return (
              <div
                key={index}
                className={`p-6 rounded-xl border shadow-sm transition cursor-pointer ${
                  isSelected
                    ? "bg-purple-100 border-purple-500"
                    : "bg-white"
                }`}
                onClick={() => handleServiceClick(item)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {emoji} {item.title}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                      Common: Rs. {item.common}
                      {item.premium && ` | Premium: Rs. ${item.premium}`}
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={!!isSelected}
                    readOnly
                    className="mt-1 accent-purple-600"
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No services found.
          </p>
        )}
      </div>
    </section>
  );
};

export default ServicesPage;
