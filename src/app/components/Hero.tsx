"use client";

import { motion } from "framer-motion";
import { CalendarDays, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";


const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative w-full  min-h-screen overflow-hidden bg-gradient-to-r from-purple-100 via-white to-yellow-100 pb-10">
      <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-center px-6 md:px-20 gap-10 md:gap-20 mt-30 md:mt-40">

        {/* Text Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-black text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            Where Style Meets Precision <br />
            <span className="text-primary">Your Perfect Cut Awaits</span>
          </motion.h1>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => router.push("/booking/appointment")}
              className="bg-black/10 text-black px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:bg-black/20 transition cursor-pointer">
              <CalendarDays size={20} />
              Book an Appointment
            </button>
            <button
              onClick={() => router.push("/booking/packages")}
              className="bg-black/5 text-black px-6 py-3 rounded-full flex items-center gap-2 font-semibold hover:bg-black/15 transition cursor-pointer">
              <UserPlus size={20} />
              Become a Member
            </button>
          </motion.div>


        </div>

        {/* Animation Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="w-4/5 md:w-1/4 max-w-[500px] rounded-xl overflow-hidden shadow-lg"
        >
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="animation.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
