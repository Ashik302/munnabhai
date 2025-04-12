"use client";

import { motion } from "framer-motion";
import TeamCarousel from "./TeamCarousel";

const AboutUsSection = () => {
  return (
    <section
      className="py-16 px-4 md:px-8 w-full  bg-gradient-to-r from-purple-100 via-white to-yellow-100 "
      id="about"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl w-full md:w-[85%] mx-auto font-bold text-center text-purple-800 mb-8 mt-20"
      >
        About ShearCraft Studio ✂️
      </motion.h2>

      {/* Introduction */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-700 text-lg text-center max-w-3xl mx-auto leading-relaxed"
      >
        ShearCraft Studio is a premier men&apos;s grooming destination with branches in Narayangarh and Gaindakot. 
        We specialize in barbering, beard care, and modern styling, ensuring an exceptional experience for every client.
      </motion.p>

      {/* Locations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-purple-50 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-purple-700 mb-2">16 No. Chowk - Gaindakot 15</h3>
          <p className="text-gray-600">
            Offering premium grooming services with a modern ambiance.
          </p>
        </div>
        <div className="bg-yellow-50 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-yellow-600 mb-2">17 No Chowk - Gaindakot 15</h3>
          <p className="text-gray-600">
            This branch combines premium grooming services with a cozy atmosphere.
          </p>
        </div>
      </motion.div>

      {/* Team Carousel */}
      <TeamCarousel />
    </section>
  );
};

export default AboutUsSection;
