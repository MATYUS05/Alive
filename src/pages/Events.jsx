import React, { useState } from "react";
import kayu from "../assets/EventsAssets/kayu.png";
import bunga from "../assets/EventsAssets/bunga.png";
import bungaMind from "../assets/EventsAssets/mind.png";
import bungaRest from "../assets/EventsAssets/rest.png";
import "../styles/events.css";

function Events() {
  const [current, setCurrent] = useState(0);

  const cards = [
    {
      title: "R_E_S_T_",
      color: "bg-amber-200",
      date: "01/07/2025",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Praesent vel vulputate lorem, quis mattis nisi. Aenean ac accumsan eros. 
Nullam eu ante ligula. Pellentesque imperdiet tempus diam congue lacinia. 
Fusce tempor dolor at nunc euismod consequat. Fusce vitae facilisis urna, 
ut ultrices ante. Donec viverra magna at enim porttitor porta. 
Maecenas imperdiet feugiat dapibus. Sed eget tortor ipsum. Nunc sed congue ex.`,
      titleColor: "text-yellow-500",
      flower: bungaRest,
    },
    {
      title: "M_I_N_D_",
      color: "bg-lime-200",
      date: "05/07/2025",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Praesent vel vulputate lorem, quis mattis nisi. Aenean ac accumsan eros. 
Nullam eu ante ligula. Pellentesque imperdiet tempus diam congue lacinia. 
Fusce tempor dolor at nunc euismod consequat. Fusce vitae facilisis urna, 
ut ultrices ante. Donec viverra magna at enim porttitor porta. 
Maecenas imperdiet feugiat dapibus. Sed eget tortor ipsum. Nunc sed congue ex.`,
      titleColor: "text-lime-600",
      flower: bungaMind,
    },
  ];

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <div
      className="w-screen min-h-screen relative pb-40 flex items-center justify-center p-4 md:p-10"
      style={{
        backgroundImage: `url(${kayu})`,
        backgroundRepeat: "repeat-y",
        backgroundSize: "100% auto",
      }}
    >
      {/* layout desktop */}
      <div className="hidden md:flex flex-row items-start justify-center gap-6 max-w-7xl mx-auto">
        {/* bunga desktop */}
        <div className="flex-shrink-0 w-[200px] md:w-[450px] lg:w-[550px] flex items-start justify-center">
          <img
            src={bunga}
            alt="Big Flower"
            className="w-full h-auto object-contain fade-slide-in-up"
          />
        </div>

        {/* card container */}
        <div className="flex flex-col gap-40 w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] lg:ml-20 lg:gap-85">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="relative fade-in-up group cursor-pointer"
            >
              <div className="transition-transform duration-500 ease-in-out group-hover:scale-105">
                <h2
                  className={`${card.titleColor} text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-widest text-center mb-8 transition-transform duration-500 ease-in-out group-hover:scale-110`}
                  style={{ transitionDelay: "100ms" }}
                >
                  {card.title}
                </h2>
                <div
                  className={`${card.color} p-6 shadow-md relative transition-transform duration-500 ease-in-out`}
                >
                  <p className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-amber-900 font-bold text-base md:text-xl px-4 py-2 md:px-6 md:py-3 shadow-md">
                    {card.date}
                  </p>
                  {/* scroll teks */}
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

      {/* layout mobile (carousel) */}
      <div className="flex flex-col items-center gap-6 w-full max-w-sm md:hidden">
        {/* bunga mobile */}
        <div className="w-[450px] flex items-center justify-center">
          <img
            key={current}
            src={cards[current].flower}
            alt="Flower"
            className="w-full h-auto object-contain smooth-pop"
          />
        </div>

        {/* carousel */}
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 carousel-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {cards.map((card, idx) => (
                <div key={idx} className="flex-shrink-0 w-full px-2">
                  <h2
                    key={`title-${current}`}
                    className={`${card.titleColor} text-4xl font-extrabold tracking-widest text-center mb-8 pop-in`}
                  >
                    {card.title}
                  </h2>
                  <div
                    key={`card-${current}`}
                    className={`${card.color} p-6 shadow-md relative fade-in-up`}
                  >
                    <p className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-amber-900 font-bold text-base px-4 py-2 shadow-md">
                      {card.date}
                    </p>
                    {/* scroll teks */}
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

          {/* tombol buat next carousel (card container) */}
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
