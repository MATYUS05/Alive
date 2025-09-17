import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/OpeningAssets/bg.png";
import jendela from "../assets/OpeningAssets/tutup.png";
import "../styles/opening.css";

function Opening() {
  return (
      <div className="relative w-screen h-screen">
        {/* bg */}
        <img 
          src={bg} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* jendela */}
        <img 
          src={jendela} 
          alt="Window" 
          className="absolute inset-0 w-full h-full object-cover z-10"
        />

        {/* welcome */}
        <h1 
          className="absolute inset-x-0 
          top-[25%] md:top-[22%] lg:top-[18%] 
          text-center 
          text-[clamp(95px,12vw,200px)] md:text-[clamp(95px,12vw,200px)] 
          font-extrabold leading-tight
          text-white drop-shadow-[0_0_40px_rgba(0,140,255,1)] z-20 px-4"
        >
          {"WELCOME!".split("").map((char, i) => (
            <span
              key={i}
              className="inline-block animate-wave"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

      <p
        className="absolute top-[67%] left-1/2 -translate-x-1/2 
        inline-block text-center 
        text-[clamp(25px,4vw,60px)] md:text-[clamp(40px,5vw,50px)] font-extrabold 
        bg-blue-400 px-6 md:px-8 py-3 md:py-2 shadow-2xl cursor-pointer text-white
        transition duration-300 hover:bg-blue-500 z-20 subtle-text 
        whitespace-normal md:whitespace-nowrap 
        leading-snug max-w-[95vw] md:max-w-[85vw]"
      >
        Want to know more about ALIVE?
      </p>

      <p
        className="bubble absolute top-[60%] md:top-[58%] left-1/2 -translate-x-7
        bg-blue-500 font-bold 
        text-[clamp(16px,3.5vw,32px)] px-6 md:px-9 py-3 md:py-4 shadow-xl 
        cursor-pointer z-20 relative subtle-text text-white
        whitespace-nowrap
        before:content-[''] before:absolute before:top-full before:left-1/2 
        before:-translate-x-1/2 before:border-8 before:border-transparent 
        before:border-t-blue-500 hover:bg-blue-400"
      >
        Click on the window knobs!
      </p>
      <Link 
        to="/home"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-0 py-2 px-4 rounded-full z-30"
      >
        Click Here AAAAaaaaaaa!
      </Link>
    </div>
  );
}

export default Opening;
