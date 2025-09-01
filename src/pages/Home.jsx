import React, { useState, useEffect, useRef } from "react";
import Window from "../assets/HomeAssets/OpenWindow.png";

export default function Home() {
  const slides = [Window, Window, Window];
  const [current, setCurrent] = useState(0);

  const carouselRef = useRef(null);

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
    <div className="relative w-full flex justify-center">
      {/* Background */}
      <img
        src={Window}
        alt="Background Window"
        className="w-auto h-auto max-w-full max-h-full"
      />

      <main className="absolute top-0 left-0 flex flex-col items-center w-full px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
        {/* Section 1 - Hero */}
        <section className="flex flex-col justify-center items-center w-full text-center max-w-5xl">
          <h2
            className="m-0 font-bold italic font-josefin text-[#617850] drop-shadow-lg leading-tight
            text-3xl sm:text-5xl md:text-[64px] lg:text-[72px] xl:text-[80px]"
          >
            What Is <br />
            <span
              className="block mt-[-4px] sm:mt-[-6px] md:mt-[-8px] text-[#5C3C38]
              text-4xl sm:text-6xl md:text-[88px] lg:text-[110px] xl:text-[128px]"
            >
              ALIVE?
            </span>
          </h2>
          <p
            className="max-w-2xl mt-3 sm:mt-4 md:mt-6 
            text-sm sm:text-base md:text-lg [@media(min-width:1025px)]:text-xl 
            font-itim leading-relaxed text-[#6B725A]"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            quaerat a odit velit. Quibusdam nisi quis, sapiente facilis dolores
            mollitia corporis tempora, deleniti ut impedit veritatis ex vero
            molestiae. Nihil sint aperiam magni incidunt vero nam accusamus
            alias ad corrupti expedita enim aspernatur similique blanditiis
            eligendi sunt inventore, explicabo reiciendis.
          </p>

          {/* Arrow Button Kebawah*/}
          <button
            onClick={scrollToCarousel}
            className="mt-8 p-3 rounded-full bg-[#B0BEA6] text-[#47553D] hover:scale-110 transition-transform hidden lg:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
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
          </button>
        </section>

        {/* Section 2 - Carousel */}
        <section
          ref={carouselRef}
          className="flex flex-col items-center w-full mt-12 sm:mt-14 md:mt-16 lg:mt-60"
        >
          {/* Carousel */}
          <div className="w-full max-w-[280px] sm:max-w-[380px] md:max-w-[500px] lg:max-w-[640px] px-2 sm:px-4">
            <div className="relative w-full aspect-[2/1] overflow-hidden rounded-lg shadow-xl outline-2 sm:outline-4 md:outline-[0.5rem] outline-[#62514F]">
              {slides.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Alive slide ${idx + 1}`}
                  className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    idx === current ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bubble Text */}
          <div
            className="mt-4 sm:mt-6 px-3 sm:px-6 py-2 
            bg-[#B0BEA6] font-josefin text-[#47553D] 
            text-sm sm:text-base md:text-lg 
            rounded-lg font-bold z-10 text-center"
          >
            Get to know more about Alive 11.0
          </div>

          {/* CTA Button */}
          <button
            className="mt-3 sm:mt-4 px-5 sm:px-8 py-2 sm:py-3 
            bg-[#B0BEA6] font-josefin text-[#47553D] 
            text-sm sm:text-lg rounded-lg font-bold 
            hover:scale-105 hover:bg-opacity-90 transition-transform z-10"
          >
            Click Here!
          </button>
        </section>
      </main>
    </div>
  );
}
