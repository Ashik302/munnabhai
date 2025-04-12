"use client";

import { useState } from "react";
import data from "@/app/data/Packages.json";
import BookingComponent from "@/app/components/Booking"; // Adjust the path

const GroomingPackagesPage = () => {
    const packages = data.grooming_packages;
    const [selected, setSelected] = useState<any[]>([]);
    const [showBooking, setShowBooking] = useState(false);

    const handleSelect = (pkg: any) => {
        const alreadySelected = selected.some((s) => s.name === pkg.name);
        if (!alreadySelected) {
            setSelected([
                ...selected,
                {
                    title: pkg.name,
                    price: pkg.package_price,
                    numberOfPersons: 1,
                },
            ]);
        }
    };

    return (
        <section className="py-16 px-4 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
                Grooming Packages
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-lg transition"
                    >
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            {pkg.name}
                        </h2>
                        <ul className="text-sm text-gray-600 list-disc ml-4 mb-3">
                            {pkg.services.map((service: string, idx: number) => (
                                <li key={idx}>{service}</li>
                            ))}
                        </ul>
                        <p className="text-gray-700">
                            <strong>Individual Total:</strong> Rs. {pkg.individual_total}
                        </p>
                        <p className="text-purple-700 font-semibold mb-4">
                            <strong>Package Price:</strong> Rs. {pkg.package_price}
                        </p>

                        <button
                            onClick={() => handleSelect(pkg)}
                            className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700"
                        >
                            Select Package
                        </button>
                    </div>
                ))}
            </div>

            {selected.length > 0 && (
                <div className="text-center mt-10">
                    <button
                        onClick={() => setShowBooking(true)}
                        className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700"
                    >
                        Proceed to Booking
                    </button>
                </div>
            )}

            {showBooking && <BookingComponent selectedServices={selected} />}
        </section>
    );
};

export default GroomingPackagesPage;
