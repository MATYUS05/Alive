import React from "react";
import { FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa6";
import AliveLogo from "../assets/Logo/AliveLogo.png";

function Footer() {
  return (
    <footer className="bg-[#5D4037] text-white font-josefin pt-12 pb-6">
      {/* Top Section */}
      <div className="font-itim container mx-auto px-8 flex flex-col md:flex-row items-start justify-between gap-10 md:gap-0">
        {/* Address + Media Partner & Sponsor */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 space-y-6">
          {/* Address */}
          <div>
            <span className="font-semibold text-lg tracking-wide mb-2 block">
              Universitas Multimedia Nusantara
            </span>
            <div className="text-center md:text-left space-y-1 text-sm">
              <p>Jl. Scientia Boulevard, Gading Serpong</p>
              <p>Tangerang, Banten - 15811 Indonesia</p>
            </div>
          </div>

          {/* Media Partner + Sponsor pindah ke bawah Address */}
          <div className="flex flex-col md:flex-row md:space-x-6 w-full items-center md:items-start text-center md:text-left">
            {/* Media Partner */}
            <div className="mb-4 md:mb-0 flex-1">
              <span className="font-semibold text-lg tracking-wide mb-2 block">
                Media Partner
              </span>
              <div className="text-sm space-y-1">
                <p>Felicia - 08111392311</p>
                <p>Daffa - 0895363581682</p>
              </div>
            </div>

            {/* Sponsor */}
            <div className="flex-1">
              <span className="font-semibold text-lg tracking-wide mb-2 block">
                Sponsor
              </span>
              <div className="text-sm space-y-1">
                <p>Elshaday - 085182647827</p>
                <p>Bella - 087813942265</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-center w-full md:w-1/3 space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <span className="font-semibold text-lg tracking-wide">
              Connect With Us
            </span>
            <div className="flex space-x-6">
              <a
                href="https://www.instagram.com/alivemedic.umn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B0BEA6] transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-7 h-7" />
              </a>
              <a
                href="https://www.tiktok.com/@alivemedic.umn"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B0BEA6] transition-colors"
                aria-label="TikTok"
              >
                <FaTiktok className="w-7 h-7" />
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=aliveumn@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B0BEA6] transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="w-7 h-7" />
              </a>
            </div>
          </div>
        </div>

        {/* Logo tetap di kanan */}
        <div className="flex justify-center md:justify-end w-full md:w-1/3">
          <a
            href="https://www.instagram.com/alivemedic.umn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={AliveLogo}
              alt="Alive 11.0 Logo"
              className="w-28 h-28 rounded-full object-cover hover:scale-105 hover:opacity-90 transition-transform"
            />
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-white/20 my-8" />

      {/* Bottom Text */}
      <p className="text-center text-sm text-gray-300">
        © {new Date().getFullYear()} ALIVE 11.0
      </p>
    </footer>
  );
}

export default Footer;
