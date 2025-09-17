import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import kayu from "../assets/EventsAssets/kayu.png";
import bunga from "../assets/EventsAssets/bunga.png";
import "../styles/events.css";

import { cardsData } from "../data/eventsData";

const SlotDate = ({ finalDate, startAnimation, onComplete }) => {
  const [displayDate, setDisplayDate] = useState("00/00/0000");

  useEffect(() => {
    if (startAnimation) {
      const animationInterval = setInterval(() => {
        const animated = finalDate
          .split("")
          .map((char) =>
            /\d/.test(char) ? Math.floor(Math.random() * 10) : char
          )
          .join("");
        setDisplayDate(animated);
      }, 60);

      const stopAnimationTimeout = setTimeout(() => {
        clearInterval(animationInterval);
        setDisplayDate(finalDate);
        if (onComplete) onComplete();
      }, 2000);

      return () => {
        clearInterval(animationInterval);
        clearTimeout(stopAnimationTimeout);
      };
    }
  }, [startAnimation, finalDate, onComplete]);

  return <>{displayDate}</>;
};

function Events() {
  const [current, setCurrent] = useState(0);
  const [animatedUptoIndex, setAnimatedUptoIndex] = useState(-1);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedUptoIndex(0), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    if (animatedUptoIndex < cardsData.length - 1) {
      setAnimatedUptoIndex((prev) => prev + 1);
    }
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % cardsData.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + cardsData.length) % cardsData.length);
  };

  return (
    <div
      className="font-itim w-screen min-h-screen relative pb-40 flex items-center justify-center p-4 md:p-10 overflow-hidden"
      style={{
        backgroundImage: `url(${kayu})`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
      }}
    >
      {/* Layout Desktop */}
      <div className="hidden md:flex flex-row items-start justify-center gap-12 max-w-7xl mx-auto">
        {/* Big Flower */}
        <div className="flex-shrink-0 flex items-start justify-center md:mt-24">
          <img
            src={bunga}
            alt="Big Flower"
            className="w-[450px] h-auto object-contain fade-slide-in-up"
          />
        </div>

        {/* Cards */}
        <div className="flex flex-col w-[350px] md:w-[400px] lg:w-[450px]">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className={`relative group cursor-pointer transition-opacity duration-1000 ${
                idx <= animatedUptoIndex
                  ? "opacity-100"
                  : "opacity-0 translate-y-5"
              } ${idx > 0 ? (card.title === "M_I_N_D_" ? "md:mt-20" : "md:mt-40") : ""}`}
            >
              <div className="transition-transform duration-500 ease-in-out group-hover:scale-105">
                <h2
                  className={`${card.titleColor} text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-center mb-8 md:mt-24`}
                >
                  {card.title === "R_E_S_T_" ? (
                    <span className="typing-effect-rest">{card.title}</span>
                  ) : (
                    <span className="typing-effect-mind">{card.title}</span>
                  )}
                </h2>
                <div
                  className={`${card.color} p-6 shadow-md relative transition-transform duration-500 ease-in-out`}
                >
                  <p className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-amber-900 font-bold text-base md:text-xl px-4 py-2 md:px-6 md:py-3 shadow-md tabular-nums">
                    <SlotDate
                      finalDate={card.date}
                      startAnimation={idx === animatedUptoIndex}
                      onComplete={handleAnimationComplete}
                    />
                  </p>
                  <div className="mt-6 max-h-60 overflow-y-auto pr-2">
                    <p className="text-center text-amber-950 whitespace-pre-line">
                      {card.text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Layout Mobile (Carousel) */}
      <div className="flex flex-col items-center gap-6 w-full max-w-sm md:hidden">
        <div className="w-[450px] flex items-center justify-center mt-15 md:mt-24 overflow-x-hidden">
          <img
            key={current}
            src={cardsData[current].flower}
            alt="Flower"
            className="w-full h-auto object-contain smooth-pop"
          />
        </div>

        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 carousel-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {cardsData.map((card, idx) => (
                <div key={idx} className="flex-shrink-0 w-full px-2">
                  <h2
                    className={`${card.titleColor} text-4xl font-extrabold tracking-widest text-center mb-8 md:mt-24`}
                  >
                    {card.title === "R_E_S_T_" ? (
                      <span className="typing-effect-rest">{card.title}</span>
                    ) : (
                      <span className="typing-effect-mind">{card.title}</span>
                    )}
                  </h2>
                  <div
                    className={`${card.color} p-6 shadow-md relative fade-in-up`}
                  >
                    <p className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-amber-900 font-bold text-base px-4 py-2 shadow-md tabular-nums">
                      <SlotDate finalDate={card.date} startAnimation={true} />
                    </p>
                    <div className="mt-4 max-h-60 overflow-y-auto pr-2">
                      <p className="text-center text-amber-950 whitespace-pre-line">
                        {card.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 -left-3 -translate-y-1/2 bg-white rounded-full shadow p-2"
          >
            ◀
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -right-3 -translate-y-1/2 bg-white rounded-full shadow p-2"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
}

export default Events;
