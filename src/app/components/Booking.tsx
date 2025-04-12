"use client";

import { useState, useEffect } from "react";
import Payment from "../utils/payment";

interface BookingItem {
  [key: string]: any;
}

const BookingComponent = ({ selectedServices }: { selectedServices: BookingItem[] }) => {
  const [itemsWithCount, setItemsWithCount] = useState<BookingItem[]>([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState("");
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    const updatedItems = selectedServices.map((item) => {
      const titleKey = item.title ? "title" : item.packageName ? "packageName" : "name";
      const priceKey = "price";
      const countKey = item.numberOfGuests !== undefined ? "numberOfGuests" : "numberOfPersons";

      return {
        ...item,
        [countKey]: item[countKey] || 1,
        titleKey,
        priceKey,
        countKey,
      };
    });

    setItemsWithCount(updatedItems);
  }, [selectedServices]);

  const handleChange = (index: number, value: number) => {
    const updated = [...itemsWithCount];
    updated[index][updated[index].countKey] = value;
    setItemsWithCount(updated);
  };

  const totalPrice = itemsWithCount.reduce(
    (sum, item) => sum + item.price * item[item.countKey],
    0
  );

  const handleProceedToPayment = () => {
    if (!username || !email || !phone || !branch) {
      alert("Please fill in all user details and select branch.");
      return;
    }

    const invoiceData = {
      username,
      email,
      phone,
      branch,
      services: itemsWithCount,
      totalPrice,
      trans_status: "pending",
    };

    localStorage.setItem("invoiceData", JSON.stringify(invoiceData));
    setShowPayment(true);
  };

  return (
    <div className="mt-12 bg-purple-50 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-800 mb-6">Booking Details</h2>

      <div className="space-y-4 mb-6">
        {itemsWithCount.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-gray-800">
                {item.title || item.packageName || "Service"}
              </h3>
              <p className="text-sm text-gray-600">Price: Rs. {item.price}</p>
            </div>
            <input
              type="number"
              min="1"
              value={item[item.countKey]}
              onChange={(e) => handleChange(index, parseInt(e.target.value))}
              className="w-20 border rounded px-2 py-1"
            />
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Username"
          className="w-full border rounded px-4 py-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-4 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Phone"
          className="w-full border rounded px-4 py-2"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className="w-full border rounded px-4 py-2"
        >
          <option value="">Select Branch</option>
          <option value="16 No Chowk, Gaindakot 15">16 No Chowk, Gaindakot 15</option>
          <option value="17 No Chowk, Gaindakot 15">17 No Chowk, Gaindakot 15</option>
        </select>
      </div>

      <div className="text-right mt-6">
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Total Price: Rs. {totalPrice}
        </p>
        {!showPayment ? (
          <button
            onClick={handleProceedToPayment}
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700"
          >
            Proceed to Payment
          </button>
        ) : (
          <Payment totalPrice={totalPrice} />
        )}
      </div>
    </div>
  );
};

export default BookingComponent;
