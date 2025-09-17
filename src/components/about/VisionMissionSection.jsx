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
  const visionText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quaerat a odit velit. Quibusdam nisi quis, +sapiente facilis dolores mollitia corporis tempora, deleniti ut impedit veritatis ex vero molestiae.";
  const missionText = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati quaerat a odit velit. Quibusdam nisi quis, sapiente facilis dolores mollitia corporis tempora, deleniti ut impedit veritatis ex vero molestiae.";

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