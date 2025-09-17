import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import AliveLogo from "../assets/Logo/AliveLogo.png";

function Footer() {
  return (
    <footer className="bg-[#5D4037] text-white font-josefin pt-12 pb-6">
      {/* Top Section */}
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-start justify-between gap-10 md:gap-0">
        {/* Quick Links */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
          <span className="font-semibold text-lg tracking-wide mb-3">
            Quick Links
          </span>
          <div className="grid grid-cols-3 gap-x-6 gap-y-2 text-center md:text-left">
            <Link to="/Home" className="hover:text-[#B0BEA6] transition-colors">
              Home
            </Link>
            <Link to="/About" className="hover:text-[#B0BEA6] transition-colors">
              About
            </Link>
            <Link to="/Events" className="hover:text-[#B0BEA6] transition-colors">
              Events
            </Link>
            <Link to="/Divisions" className="hover:text-[#B0BEA6] transition-colors">
              Divisions
            </Link>
            <Link to="/Tickets" className="hover:text-[#B0BEA6] transition-colors">
              Tickets
            </Link>
            <Link to="/Games" className="hover:text-[#B0BEA6] transition-colors">
              Games
            </Link>
            
          </div>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-center w-full md:w-1/3 space-y-4">
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
          </div>
        </div>

        {/* Logo (Klik = IG) */}
        <div className="flex justify-center md:justify-end w-full md:w-1/3">
          <a
            href="https://www.instagram.com/alivemedic.umn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={AliveLogo}
              alt="Alive 11.0 Logo"
              className="w-28 h-28 rounded-full object-cover hover:scale-105 hover:opacity-90 transition-transform transition-opacity"
            />
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-white/20 my-8" />

      {/* Bottom Text */}
      <p className="text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Alive 11.0 — Universitas Multimedia Nusantara
      </p>
    </footer>
  );
}

export default Footer;
