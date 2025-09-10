import React, { useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import AboutSection from '../components/about/AboutSection';
import ThemeSection from '../components/about/ThemeSection';
import VisionMissionSection from '../components/about/VisionMissionSection';
import MascotSection from '../components/about/MascotSection';
import BackgroundWithFlowers from '../assets/AboutAssets/Background.webp';
import Cloud1 from '../assets/AboutAssets/Cloud1.webp'; 
import Cloud2 from '../assets/AboutAssets/Cloud2.webp'; 
import Cloud3 from '../assets/AboutAssets/Cloud3.webp'; 
import Cloud4 from '../assets/AboutAssets/Cloud2.webp';
import '../components/about/css/style.css'; 

const pageStyle = {
  backgroundImage: `url(${BackgroundWithFlowers})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
};

export default function About() {
  const themeRef = useRef(null);
  const visionRef = useRef(null);
  const mascotRef = useRef(null);
  const aboutSectionRef = useRef(null);

  const cloudLeftControls = useAnimation();
  const cloudRightControls = useAnimation();
  const cloudLeftBackControls = useAnimation();
  const cloudRightBackControls = useAnimation();

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    cloudLeftControls.start({ x: '-50%', transition: { type: "spring", stiffness: 50, duration: 1 } });
    cloudRightControls.start({ x: '50%', transition: { type: "spring", stiffness: 50, duration: 1 } });

    cloudLeftBackControls.start({ x: '-50%', transition: { type: "spring", stiffness: 40, duration: 1.2, delay: 0.2 } });
    cloudRightBackControls.start({ x: '50%', transition: { type: "spring", stiffness: 40, duration: 1.2, delay: 0.2 } });

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const frontParallaxFactor = 1;
      const backParallaxFactor = 1.5;

      cloudLeftControls.set({ x: `calc(-50% - ${scrollY * frontParallaxFactor}px)` });
      cloudRightControls.set({ x: `calc(50% + ${scrollY * frontParallaxFactor}px)` });

      cloudLeftBackControls.set({ x: `calc(-50% - ${scrollY * backParallaxFactor}px)` });
      cloudRightBackControls.set({ x: `calc(50% + ${scrollY * backParallaxFactor}px)` });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cloudLeftControls, cloudRightControls, cloudLeftBackControls, cloudRightBackControls]);

  return (
    <div className="w-full h-full scroll-smooth relative" style={pageStyle}>
      <motion.img
        src={Cloud3}
        alt="Back Cloud Left" 
        className="cloud-left-back" 
        initial={{ x: '-100%' }} 
        animate={cloudLeftBackControls} 
      />
      
      <motion.img
        src={Cloud4}
        alt="Back Cloud Right" 
        className="cloud-right-back" 
        initial={{ x: '100%' }} 
        animate={cloudRightBackControls} 
      />

      <motion.img
        src={Cloud2}
        alt="Front Cloud Left" 
        className="cloud-left" 
        initial={{ x: '-100%' }} 
        animate={cloudLeftControls} 
      />
      
      <motion.img
        src={Cloud1}
        alt="Front Cloud Right" 
        className="cloud-right" 
        initial={{ x: '100%' }} 
        animate={cloudRightControls} 
      />

      <section ref={aboutSectionRef} className="min-h-[90vh] flex flex-col justify-center items-center relative z-10">
        <AboutSection />
        <motion.button
          onClick={() => scrollTo(themeRef)}
          className="absolute bottom-5 text-4xl text-[#5d3f2d]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
        >
          ↓
        </motion.button>
      </section>
    
      <section
        ref={themeRef}
        className="min-h-[90vh] xl:min-h-[100vh] flex flex-col justify-center items-center relative z-10"
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
        className="min-h-[80vh] xl:min-h-[120vh] flex flex-col justify-center items-center relative z-10"
      >
        <VisionMissionSection />
      </section>

      <section 
        ref={mascotRef}
        className="flex flex-col justify-center items-center pt-30 pb-40 z-10"
      >
        <MascotSection />
      </section>
    </div>
  );
}