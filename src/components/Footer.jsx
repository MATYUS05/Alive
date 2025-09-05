import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa6";
import AliveLogo from "../assets/Logo/AliveLogo.png";

function Footer() {
  return (
    <footer className="bg-[#5D4037] text-white font-josefin py-8 mt-0">
      <div className="container mx-auto px-8 flex justify-between items-center">
        <div className="flex flex-col space-y-4">
          <a
            href="https://www.instagram.com/alivemedic.umn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3"
          >
            <FaInstagram className="w-7 h-7 text-white" />
            <span className="hover:text-[#B0BEA6] transition-colors">
              @alivemedic.umn
            </span>
          </a>
          <a
            href="https://www.tiktok.com/@alivemedic.umn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-3"
          >
            <FaTiktok className="w-7 h-7 text-white" />
            <span className="hover:text-[#B0BEA6] transition-colors">
              @alivemedic.umn
            </span>
          </a>
        </div>
        <div>
          <Link to="/">
            <img
              src={AliveLogo}
              alt="Alive 11.0 Logo"
              className="w-24 h-24 rounded-full object-cover hover:opacity-90 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
