"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const featuredPackage = {
  name: "Gentleman's Grooming Combo",
  services: [
    "Hair Cutting",
    "Beard Grooving",
    "Face Wash",
    "Head Massage",
    "Hair Styling"
  ],
  price: 750,
};

const PackageSection = () => {
  return (
    <section id="packages" className="py-16 px-4 bg-gradient-to-b from-yellow-50 to-purple-50">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-purple-700 mb-8 font-playfair"
        >
          Featured Grooming Package 💈
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto border"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            {featuredPackage.name}
          </h3>

          <ul className="text-left list-disc list-inside text-gray-700 mb-6 space-y-1">
            {featuredPackage.services.map((service, i) => (
              <li key={i}>{service}</li>
            ))}
          </ul>

          <p className="text-xl font-semibold text-purple-600 mb-4">
            Total Price: Rs. {featuredPackage.price}
          </p>

          <Link
            href="/booking/packages"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition"
          >
            View More Packages
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PackageSection;
