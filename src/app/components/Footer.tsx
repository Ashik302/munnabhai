"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-100 to-yellow-200 text-gray-800 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Studio Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-purple-700 mb-4">ShearCraft Studio ✂️</h3>
          <p className="text-sm">
            Premium grooming for the modern gentleman. Crafted with precision, delivered with care.
          </p>
        </motion.div>

        {/* Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h4 className="text-lg font-semibold mb-3 text-purple-600">Our Locations</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-purple-500" />
              16 No Chowk, Gaindakot 15
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-purple-500" />
              15 No Chowk, Gaindakot 15
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h4 className="text-lg font-semibold mb-3 text-purple-600">Contact Us</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-purple-500" /> +977 9867492088
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-purple-500" /> munna@gmail.com
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm text-gray-600 mt-12">
        © {new Date().getFullYear()} ShearCraft Studio. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
