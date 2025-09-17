import React, { useState } from "react";
import { divisions } from "../components/Division/card";
import Background from "../assets/DivisionAssets/shelf.png";
import { motion, AnimatePresence } from "framer-motion";
import { DivisionInfoBox } from "../components/Division/DivisionInfoBox";
import { useMediaQuery } from "../components/Division/useMediaQuery";
import Awan from "../assets/DivisionAssets/Awan2.PNG";
import FlowerBlue from "../assets/DivisionAssets/FlowerBlue.png";
import FlowerYellow from "../assets/DivisionAssets/FlowerYellow.png";
import FlowerPurple from "../assets/DivisionAssets/FlowerPurple.png";
import FlowerGreen from "../assets/DivisionAssets/FlowerGreen.png";

const divisionPositions = [
  { top: "21.5%", left: "6.54%" },
  { top: "21.5%", left: "37.8%" },
  { top: "21.5%", left: "69.76%" },
  { top: "42%", left: "6.54%" },
  { top: "42%", left: "37.8%" },
  { top: "42%", left: "69.76%" },
  { top: "62%", left: "6.54%" },
  { top: "62%", left: "37.8%" },
  { top: "62%", left: "69.76%" },
  { top: "81.3%", left: "6.54%" },
  { top: "81.3%", left: "37.8%" },
  { top: "81.3%", left: "69.76%" },
];

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5 } },
  out: { opacity: 0, transition: { duration: 0.3 } },
};
const containerVariants = {
  hidden: { opacity: 1 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const titleVariants = {
  hidden: { y: -30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};
const logoVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 150, damping: 10 },
  },
};

function Divisions() {
  const [hoveredDivisionId, setHoveredDivisionId] = useState(null);
  const [selectedDivision, setSelectedDivision] = useState(null);

  // Ganti jadi cek di atas 1024px
  const isLargeScreen = useMediaQuery("(min-width: 1025px)");

  const handleSelectDivision = (division) => {
    if (selectedDivision?.id === division.id) {
      setSelectedDivision(null);
    } else {
      setSelectedDivision(division);
    }
  };

  return (
    <>
      <motion.div
        key="divisions-page"
        className="font-itim flex flex-col min-h-screen bg-[#382e28] overflow-x-hidden mt-15 md:mt-0"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        <motion.div
          className="relative w-full overflow-x-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Judul utama */}
          <motion.h1
            className="absolute left-1/2 transform -translate-x-1/2 text-brown font-josefin font-bold text-2xl sm:text-4xl md:text-4xl lg:text-6xl top-15 sm:top-25 md:top-30 lg:top-40 text-amber-900 z-30"
            variants={titleVariants}
          >
            Our Divisions
          </motion.h1>

          {/* Sub-teks tambahan */}
          <motion.p
            className="absolute left-1/2 transform -translate-x-1/2 text-amber-900 font-itim text-base sm:text-lg md:text-xl lg:text-2xl top-24 sm:top-36 md:top-44 lg:top-56 z-30"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Try to hover / tap us
          </motion.p>

          {/* Dekorasi bunga */}
          <motion.img
            src={FlowerBlue}
            alt="Blue Flower"
            className="absolute top-[-28%] left-[-3%] w-[75%] h-auto z-20"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
          />
          <motion.img
            src={FlowerGreen}
            alt="Green Flower"
            className="absolute top-[-19.5%] left-[10%] w-[60%] h-auto z-20"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />
          <motion.img
            src={FlowerYellow}
            alt="Yellow Flower"
            className="absolute top-[-28.5%] right-[-10%] w-[75%] h-auto z-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 1.5, ease: "easeOut" }}
          />
          <motion.img
            src={FlowerPurple}
            alt="Purple Flower"
            className="absolute top-[-15.5%] right-[7%] w-[55%] h-auto z-10"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
          />

          {/* Background rak + awan */}
          <div className="relative w-full h-auto">
            <img
              src={Background}
              alt="Rak Divisi"
              className="relative w-full h-auto z-20"
            />
            <img
              src={Awan}
              alt="Latar Belakang Awan"
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          </div>

          {/* Logo divisi */}
          {divisions.map((division, index) => {
            const position = divisionPositions[index];
            if (!position) return null;

            const isHovered = hoveredDivisionId === division.id;
            const isSelected = selectedDivision?.id === division.id;
            const logoPosition = position.left === "69.76%" ? "right" : "left";

            return (
              <motion.div
                key={division.id}
                className={`absolute ${
                  isHovered || isSelected ? "z-30" : "z-20"
                }`}
                style={{ top: position.top, left: position.left, width: "23%" }}
                variants={logoVariants}
                onHoverStart={() =>
                  isLargeScreen && setHoveredDivisionId(division.id)
                }
                onHoverEnd={() => isLargeScreen && setHoveredDivisionId(null)}
              >
                <motion.img
                  src={division.image}
                  alt={division.name}
                  className="w-full h-auto object-contain drop-shadow-[0_10px_8px_rgba(0,0,0,0.4)] cursor-pointer relative z-30"
                  onClick={() =>
                    !isLargeScreen && handleSelectDivision(division)
                  }
                  whileHover={{ scale: 1.1, y: -10 }}
                  whileTap={{ scale: 0.95 }}
                />
                <AnimatePresence>
                  {isLargeScreen && isHovered && (
                    <DivisionInfoBox
                      division={division}
                      logoPosition={logoPosition}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* Modal untuk layar kecil */}
      <AnimatePresence>
        {!isLargeScreen && selectedDivision && (
          <motion.div
            key="modal-backdrop"
            className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedDivision(null)}
          >
            <motion.div
              key="modal-content"
              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 w-full max-w-lg flex flex-col items-center gap-6"
              initial={{ y: 50, scale: 0.9, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 50, scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedDivision.image}
                alt={selectedDivision.name}
                className="w-32 h-32 object-contain drop-shadow-xl"
              />
              <div className="text-center">
                <h3 className="font-bold text-[#5d3f2d] mb-3 text-2xl">
                  {selectedDivision.name}
                </h3>
                <p className="text-gray-700 text-base">
                  {selectedDivision.description ||
                    "Deskripsi untuk divisi ini belum tersedia."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Divisions;
