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
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5d3f2d] mb-6 sm:mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nunc ligula, consectetur at magna non, malesuada rhoncus odio.
            Phasellus id lacus suscipit, placerat sem ut, placerat erat. Aliquam erat volutpat. Proin sit amet dui vel dui lacinia placerat.
            Pellentesque non magna urna. Morbi eu eros volutpat, condimentum quam eu, ultricies erat. Suspendisse sit amet porta nibh, in varius urna.
            Sed et dapibus nisi. Phasellus blandit nisi sit amet purus varius suscipit.
            <br /><br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla gravida, mauris sit amet luctus efficitur, nisi metus tristique nibh,
            eu consectetur justo diam et lorem. Ut quam lacus, porttitor eget congue vitae, scelerisque eu eros.
            Ut a fermentum mi. Etiam vestibulum mi urna, at interdum arcu vestibulum ut. Cras at eros mollis, vestibulum diam quis, posuere leo.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
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