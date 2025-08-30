import React, { useState } from 'react';
import Seed from '../../assets/AboutAssets/Seed.webp'; 
import Shui from '../../assets/AboutAssets/Shui.webp'; 
import Sol from '../../assets/AboutAssets/Sol.webp'; 
import { motion, AnimatePresence } from 'framer-motion';

const mascotInfo = {
  Shui: {
    name: "Shui",
    description: "Shui adalah maskot yang melambangkan ketenangan dan kejernihan pikiran.",
    img: Shui
  },
  Seed: {
    name: "Seed",
    description: "Seed melambangkan pertumbuhan dan harapan baru bagi setiap individu.",
    img: Seed
  },
  Sol: {
    name: "Sol",
    description: "Sol adalah simbol semangat dan kehangatan dalam perjalanan hidup.",
    img: Sol
  }
};

const MascotSection = () => {
  const [selectedMascot, setSelectedMascot] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 10 } }
  };

  return (
    <>
      <div className="text-center px-4">
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5d3f2d] mb-2 md:mb-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {"Meet our mascots!".split(" ").map((word, i) => (
            <motion.span key={i} variants={itemVariants} className="inline-block mr-1 sm:mr-2">
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p 
          className="text-sm sm:text-base md:text-lg lg:text-xl italic text-gray-600 mb-4 md:mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          {"Click each of us to know more.".split(" ").map((word, i) => (
            <motion.span key={i} variants={itemVariants} className="inline-block mr-1 sm:mr-2">
              {word}
            </motion.span>
          ))}
        </motion.p>
        
        <div className="
          grid grid-cols-3 place-items-center 
          md:flex md:flex-row md:justify-center md:items-end 
          relative z-10 
        ">
          {/* Shui */}
          <div className="relative col-start-1 row-start-2">
            <motion.img
              src={Shui}
              alt="Shui"
              className="relative z-10 w-28 sm:w-36 md:w-56 lg:w-80 h-auto cursor-pointer"
              whileHover={{ scale: 1.1, y: -20 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ y: { duration: 0.2 } }}
              onClick={() => setSelectedMascot('Shui')}
            />
            {/* radial shadow animasi + hover */}
            <motion.div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-12 
                         bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_transparent_80%)] 
                         z-0 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2, opacity: 0.7 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Seed */}
          <div className="relative col-start-2 row-start-1 z-20">
            <motion.img
              src={Seed}
              alt="Seed"
              className="relative z-10 w-32 sm:w-40 md:w-64 lg:w-96 h-auto cursor-pointer"
              whileHover={{ scale: 1.1, y: -20 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ y: { duration: 0.2 } }}
              onClick={() => setSelectedMascot('Seed')}
            />
            <motion.div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-14 
                         bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.55)_0%,_transparent_80%)] 
                         z-0 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2, opacity: 0.7 }}
              transition={{ duration: 0.4 }}
            />
          </div>

          {/* Sol */}
          <div className="relative col-start-3 row-start-2">
            <motion.img
              src={Sol}
              alt="Sol"
              className="relative z-10 w-28 sm:w-36 md:w-56 lg:w-80 h-auto cursor-pointer"
              whileHover={{ scale: 1.1, y: -20 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ y: { duration: 0.2 } }}
              onClick={() => setSelectedMascot('Sol')}
            />
            <motion.div 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-12 
                         bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0.5)_0%,_transparent_80%)] 
                         z-0 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.2, opacity: 0.7 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMascot && (
          <motion.div
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMascot(null)}
          >
            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl hover:shadow-2xl transition-shadow
                         p-4 sm:p-6 md:p-8 
                         w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl 
                         flex flex-col md:flex-row items-center gap-4 md:gap-8 border border-gray-200"
              initial={{ y: 100, scale: 0.9 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 100, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={mascotInfo[selectedMascot]?.img}
                alt={mascotInfo[selectedMascot]?.name}
                className="w-24 sm:w-32 md:w-40 lg:w-56 h-auto drop-shadow-xl"
              />
              <div className="text-center md:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#5d3f2d] mb-2 md:mb-4">
                  {mascotInfo[selectedMascot]?.name}
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  {mascotInfo[selectedMascot]?.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default MascotSection;