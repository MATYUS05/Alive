import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import AboutSection from '../components/about/AboutSection';
import ThemeSection from '../components/about/ThemeSection';
import VisionMissionSection from '../components/about/VisionMissionSection';
import MascotSection from '../components/about/MascotSection';
import BackgroundWithFlowers from '../assets/AboutAssets/Background.webp'; 

const pageStyle = {
  backgroundImage: `url(${BackgroundWithFlowers})`,
  backgroundSize: 'auto',
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
};

export default function About() {
  const themeRef = useRef(null);
  const visionRef = useRef(null);
  const mascotRef = useRef(null); // Tambahkan ref untuk MascotSection

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full h-full scroll-smooth" style={pageStyle}>
      <section className="min-h-[90vh] flex flex-col justify-center items-center relative">
        <AboutSection />
        <motion.button
          onClick={() => scrollTo(themeRef)}
          className="absolute bottom-8 text-4xl text-[#5d3f2d]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          ↓
        </motion.button>
      </section>

      <section
        ref={themeRef}
        className="min-h-[90vh] flex flex-col justify-center items-center relative"
      >
        <ThemeSection />
        <motion.button
          onClick={() => scrollTo(visionRef)}
          className="absolute bottom-8 text-4xl text-[#5d3f2d]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          ↓
        </motion.button>
      </section>

      <section
        ref={visionRef}
        className="min-h-[60vh] flex flex-col justify-center items-center relative pt-50"
      >
        <VisionMissionSection />
      </section>

      <section 
        ref={mascotRef}
        className="flex flex-col justify-center items-center pt-30 pb-40"
      >
        <MascotSection />
      </section>
    </div>
  );
}