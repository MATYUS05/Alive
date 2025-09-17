import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bg from "../assets/Ticket/bg.png"; // background

export default function TicketPage() {
  const eventDate = new Date("2025-10-01T09:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  function getTimeRemaining() {
    const now = new Date();
    const total = eventDate - now;
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const seconds = Math.floor((total / 1000) % 60);
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="w-full min-h-screen flex justify-center items-center font-josefinn p-4"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {timeLeft.total > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl text-center justify-items-center">
          <CountdownBox value={timeLeft.days} label="Days" />
          <CountdownBox value={timeLeft.hours} label="Hours" />
          <CountdownBox value={timeLeft.minutes} label="Minutes" />
          <CountdownBox value={timeLeft.seconds} label="Seconds" />
        </div>
      ) : (
        <p className="text-4xl md:text-6xl font-bold text-white">
          Event Started!
        </p>
      )}
    </div>
  );
}

function CountdownBox({ value, label }) {
  return (
    <div
      className="
        bg-white text-black rounded-2xl shadow-xl
        flex flex-col justify-center items-center
        w-32 h-32 md:w-40 md:h-40
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-2xl
      "
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={value} // supaya tiap value baru di-animate
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="text-4xl md:text-5xl font-bold"
        >
          {value}
        </motion.p>
      </AnimatePresence>
      <span className="text-base md:text-lg font-medium">{label}</span>
    </div>
  );
}
