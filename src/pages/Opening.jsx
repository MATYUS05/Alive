import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bg from "../assets/OpeningAssets/bg.png";
import jendela from "../assets/OpeningAssets/tutup.png";
import "../styles/opening.css";

function Opening() {
  return (
    <motion.div
      className="relative w-screen h-screen overflow-hidden"
      // Kontainer utama mengendalikan animasi fade-in dan scale up
      initial={{ opacity: 0, scale: 1.05 }} // Dimulai agak besar dan transparan
      animate={{ opacity: 1, scale: 1 }}    // Bergerak ke ukuran normal dan muncul penuh
      transition={{ duration: 1.5, ease: "easeOut" }} // Animasi smooth selama 1.5 detik
    >
      {/* 🔹 Background sky - sekarang menjadi bagian dari efek background utama */}
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-[100vh] object-cover 
                   min-w-[200%] min-h-[100%] sm:min-w-full z-0"
        // Tidak ada motion di sini, karena parent motion.div yang mengontrol
      />

      {/* 🔹 Lapisan jendela - tidak ada animasi pergerakan individual */}
      <img
        src={jendela}
        alt="Window"
        className="absolute inset-0 w-full h-full object-cover z-10"
        // Tidak ada motion di sini, karena parent motion.div yang mengontrol
      />

      {/* 🔹 Judul WELCOME! - muncul bersamaan dengan fade-in utama */}
      <h1
        className="font-josefin absolute inset-x-0 
                   top-[25%] md:top-[22%] lg:top-[18%] 
                   text-center 
                   text-[clamp(60px,10vw,120px)]  
                   font-extrabold leading-tight
                   text-white                       
                   drop-shadow-[0_0_40px_#617850]   
                   z-20 px-4"
        // Hapus motion, karena parent motion.div yang mengontrol opacity
      >
        {"WELCOME!".split("").map((char, i) => (
          <span
            key={i}
            className="inline-block animate-wave" // Tetap pakai animasi wave jika diinginkan
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* 🔹 Tombol bubble utama - muncul bersamaan dengan fade-in utama */}
      <p
        className="font-itim absolute top-[67%] left-1/2 -translate-x-1/2 
                   inline-block text-center 
                   text-[clamp(18px,3vw,36px)]   
                   md:text-[clamp(22px,3.5vw,40px)] 
                   font-extrabold 
                   bg-[#617850] px-6 md:px-8 py-3 md:py-2 
                   shadow-2xl cursor-pointer text-white
                   transition duration-300 hover:bg-[#4e6240]   
                   z-20 subtle-text 
                   whitespace-normal md:whitespace-nowrap 
                   leading-snug max-w-[95vw] md:max-w-[85vw]"
        // Hapus motion, karena parent motion.div yang mengontrol opacity
      >
        Want to know more about ALIVE?
      </p>

      {/* 🔹 Hint bubble - muncul bersamaan dengan fade-in utama */}
      <p
        className="font-itim bubble absolute top-[60%] md:top-[58%] left-1/2 -translate-x-7
                   bg-[#617850] font-bold 
                   text-[clamp(16px,3.5vw,32px)] 
                   px-6 md:px-9 py-3 md:py-4 
                   shadow-xl cursor-pointer z-20 
                   subtle-text text-white
                   whitespace-nowrap
                   before:content-[''] before:absolute before:top-full before:left-1/2 
                   before:-translate-x-1/2 before:border-8 before:border-transparent 
                   before:border-t-[#617850] hover:bg-[#4e6240]"
        // Hapus motion, karena parent motion.div yang mengontrol opacity
      >
        Click on the window knobs!
      </p>

      {/* 🔹 Area klik transparan */}
      <Link
        to="/home"
        className="absolute left-1/2 top-1/2 
                   -translate-x-1/2 -translate-y-1/2 
                   bg-transparent opacity-0 
                   py-2 px-4 rounded-full z-30"
      >
        Click Here AAAAaaaaaaa!
      </Link>
    </motion.div>
  );
}

export default Opening;