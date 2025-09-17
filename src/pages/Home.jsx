import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import OpenWindow from "../assets/HomeAssets/Window.png";
import Sky from "../assets/HomeAssets/Sky.png";
import slide1 from "../assets/Logo/Home/car1.JPG";
import slide2 from "../assets/Logo/Home/car2.JPG";
import slide3 from "../assets/Logo/Home/car3.JPG";

export default function Home() {
  const slides = [slide1, slide2, slide3];
  const [current, setCurrent] = useState(0);
  const carouselRef = useRef(null);
  const MotionLink = motion(Link);

  // auto Carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const scrollToCarousel = () => {
    carouselRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full min-h-screen flex justify-center overflow-hidden">
      {/* Layer Sky (animated) */}
      <motion.img
        src={Sky}
        alt="Sky background"
        className="absolute inset-0 w-full h-[100vh] object-cover
             min-w-[200%] min-h-[100%] sm:min-w-full"
        animate={{
          x: [0, 20, 0],
          scale: [1.05, 1.08, 1.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Open Window bg */}
      <motion.img
        src={OpenWindow}
        alt="Open Window"
        className="hidden sm:block absolute inset-0 mt-10 w-full min-h-screen h-full object-cover md:object-fill pointer-events-none z-90"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: 0.3,
          ease: "easeOut",
        }}
      />

      <main className="relative z-10 flex flex-col items-center w-full mt-6 md:mt-8 lg:mt-0 px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 md:pt-16 lg:pt-20">
        {/* Section 1 - Hero */}
        <section className="mt-10 flex flex-col justify-center items-center w-full text-center max-w-6xl h-screen">
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
            className="bg-white/70 backdrop-blur-lg mt-4 p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl
             w-full sm:w-[90%] md:w-[70%] lg:w-[55%] xl:w-[65%] max-w-5xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p
              className="text-base sm:text-lg md:text-xl
              leading-relaxed text-[#444B35] text-justify"
            >
              Alive sendiri merupakan kegiatan tahunan yang mengangkat mengenai
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
          className="flex flex-col items-center w-full mt-22 sm:mt-26 md:mt-4 lg:mt-6 xl:mt-54"
        >
          {/* Carousel */}
          <div className="w-full max-w-[260px] sm:max-w-[360px] md:max-w-[360px] lg:max-w-[480px] xl:max-w-[640px] mx-auto px-2 sm:px-4">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-xl outline outline-1 sm:outline-2 md:outline-4 outline-[#62514F]">
              {slides.map((src, idx) => (
                <motion.img
                  key={idx}
                  src={src}
                  alt={`Alive slide ${idx + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    idx === current ? "opacity-100" : "opacity-0"
                  }`}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: idx === current ? 1 : 1.05 }}
                  transition={{ duration: 1 }}
                />
              ))}
            </div>
          </motion.div>

          {/* Bubble Text */}
          <div
            className="mt-4 sm:mt-4 px-3 sm:px-6 py-2 
            bg-[#B0BEA6] font-josefin text-[#47553D] 
            text-xs sm:text-sm md:text-sm lg:text-xl 
            rounded-lg font-bold z-10 text-center"
          >
            Get to know more about{" "}
            <span className="text-[#5C3C38]">Alive 11.0</span>
          </motion.div>

          {/* CTA Button */}
          <button
            className="mt-2 sm:mt-2 px-4 sm:px-6 md:px-4 py-2 sm:py-2.5 md:py-2 lg:py-3
            bg-[#B0BEA6] font-josefin text-[#47553D] 
            text-sm sm:text-sm md:text-sm lg:text-lg rounded-lg font-bold 
            hover:scale-105 hover:bg-opacity-90 transition-transform z-10"
          >
            Click Here!
          </MotionLink>
        </motion.section>
      </main>
    </div>
  );
}
