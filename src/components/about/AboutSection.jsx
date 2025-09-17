import React from 'react';
import AliveLogo from '../../assets/Logo/AliveLogo.png'; 
import { motion } from 'framer-motion';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-20">
      <motion.h2
        className="text-4xl lg:text-5xl font-josefin font-bold mb-6 sm:mb-8 mt-24
                   text-[#5d3f2d]"
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        About Alive 11.0
      </motion.h2>

      <motion.div
        className="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl
                   w-full sm:w-[95%] md:w-[85%] lg:w-[80%] xl:w-[90%] max-w-7xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <motion.div
          className="flex flex-col xl:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-justify text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed"
            variants={itemVariants}
          >
            Pada tahun ini Alive 11.0 mengangkat tema kesehatan mental yaitu self-image yang berfokus pada stress dan mindset. Alive 11.0 sendiri akan dilaksanakan pada tanggal 10-12 November 2025. Alive 11.0 sendiri akan memiliki 2 rangkaian yaitu REST Station dan MIND

            
          </motion.p>

          <motion.img
            src={AliveLogo}
            alt="Alive 11.0 logo"
            className="w-28 sm:w-40 md:w-56 h-auto mx-auto"
            variants={itemVariants}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AboutSection;
