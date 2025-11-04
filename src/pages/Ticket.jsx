import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import canvas from "../assets/Ticket/banner.png";
import bg from "../assets/Ticket/bg.png";
import poster from "../assets/Ticket/poster.png";

export default function TicketPage() {
  const eventDate = new Date("2025-10-05T09:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopupEnabled, setIsPopupEnabled] = useState(false);

  function getTimeRemaining() {
    const now = new Date();
    const total = eventDate - now;
    const days = Math.max(0, Math.floor(total / (1000 * 60 * 60 * 24)));
    const hours = Math.max(0, Math.floor((total / (1000 * 60 * 60)) % 24));
    const minutes = Math.max(0, Math.floor((total / 1000 / 60) % 60));
    const seconds = Math.max(0, Math.floor((total / 1000) % 60));
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkPopupBreakpoint = () => {
      setIsPopupEnabled(window.innerWidth <= 1000);
    };

    checkPopupBreakpoint();
    window.addEventListener("resize", checkPopupBreakpoint);
    return () => window.removeEventListener("resize", checkPopupBreakpoint);
  }, []);

  const handlePosterClick = () => {
    if (isPopupEnabled) {
      setIsModalOpen(true);
    }
  };

  const eventStarted = timeLeft.total <= 0;

  return (
    <div
      // --- PERUBAHAN ADA DI SINI ---
      className="w-full min-h-screen flex justify-center items-start font-josefinn overflow-hidden"
      // -----------------------------
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        className="relative w-full max-w-[1200px] mt-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {!eventStarted ? (
          <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <p
              className="font-bold text-center mb-8"
              style={{
                fontSize: "clamp(16px, 3vw, 36px)",
                color: "#47553D",
              }}
            >
              Event Starts In
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-4xl text-center justify-items-center">
              <CountdownBox value={timeLeft.days} label="Days" />
              <CountdownBox value={timeLeft.hours} label="Hours" />
              <CountdownBox value={timeLeft.minutes} label="Minutes" />
              <CountdownBox value={timeLeft.seconds} label="Seconds" />
            </div>
          </div>
        ) : (
          <>
            <img src={canvas} alt="Poster Banner" className="w-full h-auto" />

            <p
              className="font-itim absolute font-bold text-center text-amber-900"
              style={{
                top: "20%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "clamp(12px, 4vw, 48px)",
              }}
            >
              Pemesanan tiket
              <br />
              Talk Show Alive 11.0
              <br />
              "MIND"
            </p>

            <div
              className="absolute flex flex-col items-center"
              style={{
                top: "27%",
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(100px, 40vw, 500px)",
              }}
            >
              <img
                src={poster}
                alt="Poster Element"
                className={`w-full h-auto ${
                  isPopupEnabled ? "cursor-zoom-in" : "cursor-default"
                }`}
                onClick={handlePosterClick}
              />

              <div
                className="text-left text-[#47553D] w-full"
                style={{
                  fontSize: "clamp(8px, 2vw, 24px)",
                  marginTop: 0,
                }}
              >
                <motion.div
                  className="font-itim text-center mt-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <motion.p
                    className="font-bold mb-1 text-[#47553D]"
                    style={{
                      fontSize: "clamp(14px, 2.5vw, 38px)",
                      textShadow: "0px 2px 4px rgba(0,0,0,0.15)",
                    }}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 2,
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    Save A Seat Now!
                  </motion.p>

                  <motion.a
                    href="https://forms.gle/3z4L84AScmKcsVBR6"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0px 0px 20px rgba(176,190,166,0.7)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.button
                      className="px-6 py-3 rounded-2xl shadow-md text-[#47553D] bg-gradient-to-r from-[#B0BEA6] to-[#98AA8F] hover:from-[#A5B79C] hover:to-[#8FA68E] font-semibold"
                      style={{
                        fontSize: "clamp(12px, 2.5vw, 28px)",
                        letterSpacing: "1px",
                      }}
                      whileHover={{ y: -3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      🎟️ Click Here
                    </motion.button>
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <ImageModal src={poster} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function CountdownBox({ value, label }) {
  return (
    <div
      className="
        bg-white text-black rounded-2xl shadow-xl
        flex flex-col justify-center items-center
        w-24 h-24 md:w-36 md:h-36
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-2xl
      "
    >
      <AnimatePresence mode="wait">
        <motion.p
          key={value}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring" }}
          className="text-3xl md:text-4xl font-bold"
        >
          {value}
        </motion.p>
      </AnimatePresence>
      <span className="text-sm md:text-lg font-medium">{label}</span>
    </div>
  );
}

function ImageModal({ src, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/80 p-8 pt-24"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.img
        src={src}
        alt="Poster Pop-up"
        className="max-w-[90vw] max-h-[calc(100vh_-_8rem)] object-contain"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.3, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </motion.div>
  );
}