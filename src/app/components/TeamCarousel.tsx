"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { MapPin } from "lucide-react"; // Using MapPin icon instead of LocationMarker
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

const team = [
  {
    name: "Munna",
    role: "CEO & Founder",
    image: "munna.jpg",
    bio: "Visionary behind ShearCraft Studio, blending creativity with business excellence.",
    phone: "+977 9867492088",
    branch: "15 No. Chowk Gaindakot", // Added branch
  },
  {
    name: "Staff No.1",
    role: "Senior Barber",
    image: "staff1.jpg",
    bio: "Expert in men’s grooming with 10+ years of experience in modern styles.",
    phone: "+977 9702304148",
    branch: "16 No. Chowk Gaindakot", // Added branch
  },
  {
    name: "Staff No.2",
    role: "Beard & Fade Specialist",
    image: "staff2.jpg",
    bio: "Precision artist with deep knowledge in beard design and fades.",
    phone: "+977 9702304148",
    branch: "16 No. Chowk Gaindakot", // Added branch
  },
  // Add more staff as needed
];

const TeamCarousel = () => {
  return (
    <div className="mt-12">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl font-semibold text-purple-700 mb-6 text-center"
      >
        Meet Our Team
      </motion.h3>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full max-w-6xl mx-auto"
      >
        {team.map((person, index) => (
          <SwiperSlide key={index}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white shadow-xl rounded-xl p-6 text-center transition-all"
            >
              <Image
                src={person.image}
                alt={person.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h4 className="text-lg font-bold text-gray-800">{person.name}</h4>
              <p className="text-sm text-purple-600 font-medium">{person.role}</p>
              <p className="text-sm text-gray-600 mt-2">{person.bio}</p>

              {/* Branch Tag with MapPin Icon */}
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                <MapPin size={16} className="text-purple-600" />
                <span>{person.branch}</span>
              </div>

              {/* Phone Number */}
              <div className="mt-2 text-sm text-gray-600">
                <a href={`tel:${person.phone}`} className="hover:text-purple-700">
                  {person.phone}
                </a>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TeamCarousel;
