import React from "react";
import { motion } from "framer-motion";

export const DivisionInfoBox = ({ division, logoPosition }) => {
  const variants = {
    initial: { x: logoPosition === "right" ? 20 : -20, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 250, damping: 20 },
    },
    exit: {
      x: logoPosition === "right" ? 20 : -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className={`absolute top-1/2 -translate-y-1/2 z-10 
                 bg-white/90 backdrop-blur-md rounded-full shadow-xl 
                 p-2 sm:p-3 md:p-4
                 w-[80%] sm:w-[231%] md:w-[232%] lg:w-[232%]
                 h-auto sm:h-[94%] md:h-[94%]
                 flex items-center
                 ${
                   logoPosition === "right"
                     ? "flex-row-reverse text-right tooltip-right"
                     : "flex-row text-left tooltip-left"
                 }`}
      style={logoPosition === "right" ? { right: "4%" } : { left: "4%" }}
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <img
        src={division.image}
        alt={division.name}
        className={`object-contain h-[35px] sm:h-[50px] md:h-full w-auto 
                   ${
                     logoPosition === "right"
                       ? "ml-3 sm:ml-6 md:ml-16"
                       : "mr-3 sm:mr-6 md:mr-16"
                   }`}
      />

      <div className="overflow-hidden max-w-full">
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-[#5d3f2d] mb-1 break-words">
          {division.name}
        </h3>
        <p className="text-[11px] sm:text-xs md:text-xs lg:text-lg text-gray-700 leading-snug break-words max-w-[95%]">
          {division.description || "Deskripsi untuk divisi ini belum tersedia."}
        </p>
      </div>
    </motion.div>
  );
};
