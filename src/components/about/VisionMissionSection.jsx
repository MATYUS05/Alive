import React from 'react';
import { motion } from 'framer-motion';

const VisionMissionSection = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-start 
                    gap-10 md:gap-32 lg:gap-48 px-4 sm:px-10 md:px-20 lg:px-32">
      <motion.div 
        className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl 
                   w-full sm:w-4/5 md:w-[35%] lg:w-[30%] -mt-10 md:-mt-20 text-left"
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5d3f2d] mb-4 md:mb-6">
          Visi
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quaerat a odit velit.
          Quibusdam nisi quis, sapiente facilis dolores mollitia corporis tempora, deleniti ut impedit
          veritatis ex vero molestiae.
        </p>
      </motion.div>

      <motion.div 
        className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl 
                   w-full sm:w-4/5 md:w-[35%] lg:w-[30%] mt-10 md:mt-20 text-right"
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ type: 'spring', stiffness: 50, delay: 0.2 }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5d3f2d] mb-4 md:mb-6">
          Misi
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quaerat a odit velit.
          Quibusdam nisi quis, sapiente facilis dolores mollitia corporis tempora, deleniti ut impedit
          veritatis ex vero molestiae.
        </p>
      </motion.div>
    </div>
  );
};

export default VisionMissionSection;
