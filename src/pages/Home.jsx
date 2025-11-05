import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import OpenWindow from "../assets/HomeAssets/Window.webp";
import Sky from "../assets/HomeAssets/Sky.webp";
import slide1 from "../assets/Logo/Home/car1.webp";
import slide2 from "../assets/Logo/Home/car2.webp";
import slide3 from "../assets/Logo/Home/car3.webp";
import slide4 from "../assets/Logo/Home/car4.webp"
import slide5 from "../assets/Logo/Home/car5.webp"

export default function Home() {
  const slides = [slide1, slide2, slide3, slide4, slide5];
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const MotionLink = motion(Link);

  const slideVariants = {
    enter: {
      x: "100%", 
      opacity: 0,
    },
    center: {
      x: 0, 
      opacity: 1,
    },
    exit: {
      x: "-100%", 
      opacity: 0,
    },
  };

  // Logika untuk auto-carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Fungsi untuk scroll ke section carousel
  const scrollToCarousel = () => {
    carouselRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center overflow-hidden">
      {/* Layer 1: Animated Sky Background (Fixed for mobile) */}
      <motion.img
        src={Sky}
        alt="Sky background"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover 
                   min-w-[210%] left-[-5%] sm:min-w-full sm:left-0 animated-bg"
        animate={{
          x: [0, 15, 0],
          scale: [1.02, 1.05, 1.02],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Layer 2: Open Window Image */}
      <motion.img
        src={OpenWindow}
        alt="Open Window"
        loading="lazy"
        className="hidden sm:block absolute inset-0 mt-10 w-full min-h-screen h-full object-cover lg:object-fill pointer-events-none z-50"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: "easeOut",
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center w-full md:mt-8 lg:mt-0 px-4 sm:px-6 md:px-8 sm:pt-12 md:pt-16 lg:pt-20">
        {/* Section 1 - Hero */}
        <section className="mt-10 flex flex-col justify-center items-center w-full text-center max-w-6xl min-h-screen">
          <motion.h2
            className="font-bold italic font-josefin text-[#617850] drop-shadow-lg leading-tight
                       text-6xl lg:text-7xl xl:text-8xl"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            What Is <br />
            <span
              className="block mt-[-4px] sm:mt-[-6px] md:mt-[-8px] text-[#5C3C38]
                         text-7xl lg:text-8xl xl:text-9xl"
            >
              ALIVE?
            </span>
          </motion.h2>

          {/* Glassmorphism container */}
          <motion.div
            className="font-itim bg-white/80 mt-4 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl
                       w-full sm:w-[90%] md:w-[70%] lg:w-[55%] xl:w-[65%] max-w-5xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-base sm:text-lg md:text-xl leading-relaxed text-[#444B35] text-justify">
              ALIVE sendiri merupakan kegiatan tahunan yang mengangkat mengenai
              isu-isu kesehatan. Kegiatan ini sendiri berisi edukasi kesehatan
              yang dapat menjadi sarana menyebarkan dan meningkatkan kesadaran
              mengenai pentingnya menjaga kesehatan diri masing-masing.
            </p>
          </motion.div>

          {/* Arrow Button */}
          <motion.button
            onClick={scrollToCarousel}
            className="mt-6 sm:mt-4 p-3 rounded-full 
                       shadow-lg hover:shadow-2xl 
                       transition-all duration-300 flex items-center justify-center
                       border border-gray-300 dark:bg-gray-800"
            whileHover={{ scale: 1.15, y: 4 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 sm:w-7 sm:h-7 animate-bounce text-gray-700 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        </section>

        {/* Section 2 - Carousel */}
        <motion.section
          ref={carouselRef}
          className="scroll-mt-24 flex flex-col items-center w-full h-full sm:min-h-screen 
                     mt-28 sm:mt-16 md:mt-20 lg:mt-24 z-10"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Carousel */}
          <motion.div
            className="w-full max-w-[380px] sm:max-w-[360px] md:max-w-[480px] xl:max-w-[550px] mx-auto px-2 sm:px-4"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg shadow-2xl border-4 border-[#6D4C41]/70">
              <AnimatePresence>
                <motion.img
                  key={current}
                  src={slides[current]}
                  alt={`Alive slide ${current + 1}`}
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    type: "tween",
                    duration: 1.2,
                    ease: "easeInOut",
                  }}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Caption Card */}
          <motion.div
            className="relative mt-4 px-6 py-3
                       bg-white/80 shadow-lg 
                       rounded-xl font-itim text-[#47553D] 
                       text-lg md:text-xl font-semibold
                       text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Get to know more about{" "}
            <span className="text-[#5C3C38]">ALIVE 11.0</span>
          </motion.div>

          {/* CTA Button */}
          <MotionLink
            to="/About"
            className="mt-3 mb-10 px-6 md:px-8 py-3 
                       bg-gradient-to-r from-[#B0BEA6] to-[#94A890]
                       font-itim text-[#47553D] 
                       text-lg md:text-xl rounded-xl font-bold shadow-md  
                       hover:scale-110 hover:shadow-xl transition-transform
                       flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Click Here!
          </MotionLink>
        </motion.section>
      </main>
    </div>
  );
}
