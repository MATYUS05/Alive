import React from 'react';
import { motion } from 'framer-motion';

const ThemeCard = ({ title, tagline, className, initialX, delay = 0 }) => {
  return (
    <motion.div
      className={`bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl ${className}`}
      initial={{ x: initialX, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: "spring", stiffness: 50, delay: delay }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5d3f2d] mb-4 md:mb-6">
        {title}
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl italic text-gray-800">
        "{tagline}"
      </p>
    </motion.div>
  );
};

const ThemeSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start 
                     gap-10 md:gap-20 lg:gap-36 xl:gap-80 px-4 sm:px-8 md:px-12 lg:px-20">
                      
      <ThemeCard
        title="Tema"
        tagline="Self Image (Stress & Mindset)"
        className="w-full sm:w-4/5 md:w-[35%] -mt-10 md:-mt-20 text-left"
        initialX={-100}
      />

      <ThemeCard
        title="Tagline"
        tagline="Building Resilience, Fostering Hope"
        className="w-full sm:w-4/5 md:w-[35%] mt-10 md:mt-20 text-right"
        initialX={100}
        delay={0.2}
      />
    </div>
  );
};

export default ThemeSection;