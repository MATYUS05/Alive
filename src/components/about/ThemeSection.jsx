import React from 'react';
import { motion } from 'framer-motion';

const ThemeSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start 
                    gap-10 md:gap-20 lg:gap-78 px-4 sm:px-8 md:px-12 lg:px-20">
      <motion.div 
        className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl 
                   w-full sm:w-4/5 md:w-[35%] -mt-10 md:-mt-20 text-left"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 50 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5d3f2d] mb-4 md:mb-6">
          Tema
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl italic text-gray-800">
          "Self Image (Stress & Mindset)"
        </p>
      </motion.div>
      
      <motion.div 
        className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl 
                   w-full sm:w-4/5 md:w-[35%] mt-10 md:mt-20 text-right"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: "spring", stiffness: 50, delay: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5d3f2d] mb-4 md:mb-6">
          Tagline
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl italic text-gray-800">
          "Building Resilience, Fostering Hope"
        </p>
      </motion.div>
    </div>
  );
};

export default ThemeSection;
