"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "About us", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Packages", href: "#packages" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-gradient-to-r from-purple-200 via-white to-yellow-100 shadow-md px-4 py-5 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between md:justify-evenly items-center">
        {/* Logo / Brand Title */}
        <motion.h1
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-yellow-500 font-playfair"
        >
          <Link href="/">
            ShearCraft Studio ✂️
          </Link>
        </motion.h1>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-lg font-semibold text-gray-800">
          {navLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-purple-700 transition cursor-pointer"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden flex items-center">
          {isOpen ? (
            <X
              size={28}
              onClick={() => setIsOpen(false)}
              className="text-purple-800 cursor-pointer"
            />
          ) : (
            <Menu
              size={28}
              onClick={() => setIsOpen(true)}
              className="text-purple-800 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="md:hidden mt-3 flex flex-col gap-3 bg-gradient-to-r from-purple-100 via-white to-yellow-100 rounded-lg px-4 py-4"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={i}
                href={link.href}
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.05 }}
                className="text-lg text-gray-800 font-semibold cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
