import React, { useState, useEffect, useRef } from "react";
import Window from "../assets/Logo/Home/open_window_bg.png";
import slide1 from "../assets/Logo/Home/car1.JPG";
import slide2 from "../assets/Logo/Home/car2.JPG";
import slide3 from "../assets/Logo/Home/car3.JPG";

export default function Home() {
  const slides = [slide1, slide2, slide3];
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
        className="w-full h-auto object-contain"
      />

      <main className="absolute top-0 left-0 flex flex-col items-center w-full px-4 sm:px-6 md:px-8 pt-8 sm:pt-12 md:pt-16 lg:pt-20">

        {/* Section 1 - Hero */}
        <section className="flex flex-col justify-center items-center w-full text-center max-w-6xl">
          <h2
            className="m-0 font-bold italic font-josefin text-[#617850] drop-shadow-lg leading-tight
            text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
          >
            What Is <br />
            <span
              className="block mt-[-4px] sm:mt-[-6px] md:mt-[-8px] text-[#5C3C38]
              text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
            >
              ALIVE?
            </span>
          </h2>
          <p
            className="max-w-[230px] mt-0 sm:max-w-[200px] sm:mt-4 md:max-w-[420px] md:mt-3 lg:max-w-[550px] xl:max-w-3xl
            text-[9px] sm:text-sm md:text-sm lg:text-lg xl:text-2xl
            font-itim leading-relaxed text-[#6B725A] text-justify"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
            quaerat a odit velit. Quibusdam nisi quis, sapiente facilis dolores
            mollitia corporis tempsora, deleniti ut impedit veritatis ex vero
            molestiae. Nihil sint aperiam magni incidunt vero nam accusamus
            alias ad corrupti expedita enim aspernatur similique blanditiis
            eligendi sunt inventore, explicabo reiciendis.
          </p>


          {/* Arrow Button */}
          <button
            onClick={scrollToCarousel}
            className="mt-6 sm:mt-4 p-2 md:p-1 rounded-full bg-[#B0BEA6] text-[#47553D] hover:scale-110 transition-transform hidden md:flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 sm:w-8 sm:h-8"
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
          className="flex flex-col items-center w-full mt-2 sm:mt-26 md:mt-4 lg:mt-16 xl:mt-54"
        >
          {/* Carousel */}
          <div className="w-full max-w-[180px] sm:max-w-[360px] md:max-w-[360px] lg:max-w-[480px] xl:max-w-[640px] mx-auto px-2 sm:px-4">
            <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl shadow-xl outline outline-1 sm:outline-2 md:outline-4 outline-[#62514F]">
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
            className="mt-1 px-1 sm:mt-4 px-3 sm:px-6 py-2 
            bg-[#B0BEA6] font-josefin text-[#47553D] 
            text-[8px] sm:text-sm md:text-sm lg:text-xl 
            rounded-lg font-bold z-10 text-center"
          >
            Get to know more about Alive 11.0
          </div>

          {/* CTA Button */}
          <button
            className="mt-1 px-2 sm:mt-2 px-4 sm:px-6 md:px-4 py-2 sm:py-2.5 md:py-2 lg:py-3
            bg-[#B0BEA6] font-josefin text-[#47553D] 
            text-[8px] sm:text-sm md:text-sm lg:text-lg rounded-lg font-bold 
            hover:scale-105 hover:bg-opacity-90 transition-transform z-10"
          >
            Click Here!
          </button>
        </section>
      </main>
    </div>
  );
}