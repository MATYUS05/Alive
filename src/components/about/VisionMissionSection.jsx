import React from 'react';
import { motion } from 'framer-motion';

const MissionCard = ({ title, text, className, initialX, delay }) => {
  return (
    <motion.div
      className={`bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-2xl ${className}`}
      initial={{ x: initialX, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ type: 'spring', stiffness: 50, delay: delay }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5d3f2d] mb-4 md:mb-6">
        {title}
      </h2>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};

const VisionMissionSection = () => {
  const visionText = "Building Resilience, Fostering Hope atau Membangun Ketahanan, Menumbuhkan Harapan. Visi ini bertujuan untuk memberikan nilai kepada seluruh peserta agar terus membangun dan menjaga ketahanan diri, serta menanamkan harapan positif untuk masa depan, khususnya dalam menghadapi tantangan di dunia perkuliahan.";
  const missionText = "Meningkatkan kesadaran dan pengetahuan tentang kesehatan mental bagi mahasiswa Universitas Multimedia Nusantara melalui edukasi pengelolaan stres, pola pikir positif (growth mindset), dan pembangunan self-image yang sehat, serta membangun citra positif UMN dan UMN Medical Center sebagai institusi yang peduli pada kesehatan mental.";

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-32">
      <div className="flex flex-col items-center gap-10 xl:hidden">
        <MissionCard
          title="Visi"
          text={visionText}
          className="w-full sm:w-4/5 md:w-4/5 self-start text-left"
          initialX={-100}
        />
        <MissionCard
          title="Misi"
          text={missionText}
          className="w-full sm:w-4/5 md:w-4/5 self-end text-right"
          initialX={100}
          delay={0.2}
        />
      </div>

      <div className="hidden xl:flex flex-row justify-center items-start gap-10 md:gap-32 lg:gap-24 xl:gap-12">
        <MissionCard
          title="Visi"
          text={visionText}
          className="w-full sm:w-4/5 md:w-[35%] lg:w-[40%] xl:w-[45%] -mt-10 md:-mt-20 text-left"
          initialX={-100}
        />
        <MissionCard
          title="Misi"
          text={missionText}
          className="w-full sm:w-4/5 md:w-[35%] lg:w-[40%] xl:w-[45%] mt-10 md:mt-20 text-right"
          initialX={100}
          delay={0.2}
        />
      </div>
    </div>
  );
};

export default VisionMissionSection;