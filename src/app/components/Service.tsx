"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  { title: "Hair Cutting", price: 150 },
  { title: "Beard Grooving", price: 100 },
  { title: "Face Cleansing", price: 350 },
  { title: "Hair Straight (Common)", price: 1500 },
  { title: "Hair Color (Black - Premium)", price: 350 },
  { title: "Facial (Special - Common)", price: 1500 },
  // more can be added in /services page
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-purple-700 mb-8 font-playfair"
        >
          Our Signature Services ✂️
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-6 border rounded-xl shadow-sm bg-gradient-to-tr from-yellow-50 to-purple-50 hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-lg font-bold text-purple-600">Rs. {service.price}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/booking/services"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-full shadow hover:bg-purple-700 transition"
          >
            View More Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
