import React from "react";
import { Link } from "react-router-dom";
import bg from "../assets/OpeningAssets/bg.png";
import jendela from "../assets/OpeningAssets/tutup.png";

function Opening() {
  return (
      <div className="relative w-screen h-screen">
      {/* Background full screen */}
      <img 
        src={bg} 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Gambar jendela di atas background */}
      <img 
        src={jendela} 
        alt="Window" 
        className="absolute inset-0 w-full h-full object-cover z-10"
      />

      {/* Teks welcome di atas knobs */}
      <h1 className="italic absolute inset-x-0 top-[24%] text-center text-8xl font-bold text-white drop-shadow-lg z-20">
        WELCOME
      </h1>

      <p className="absolute top-[64%] left-1/2 -translate-x-1/2 inline-block text-center text-2xl font-semibold bg-blue-300 px-3 py-2 text-white drop-shadow-md z-20">
        Want to know more about ALIVE?
      </p>

      <p className="absolute top-[53%] left-[60%] inline-block bg-blue-300 text-white text-lg font-semibold px-4 py-2 shadow-md z-20
        before:content-[''] before:absolute before:top-full before:left-6 before:border-8 before:border-transparent before:border-t-blue-300">
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
