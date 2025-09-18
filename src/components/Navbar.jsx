import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "react-feather";
import { motion, AnimatePresence } from "framer-motion";
import navLinks from "../data/navlinks";
import "../styles/Navbar.css";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Lock scroll saat mobile menu dibuka
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderNavLinks = () =>
    navLinks.map((link) => (
      <li key={link.text} className="w-full text-center lg:w-auto">
        <NavLink
          to={link.to}
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            `relative font-josefin font-bold text-lg tracking-wider py-2 block
           transition-colors duration-300
           ${isActive ? "text-[#B0BEA6]" : "text-white hover:text-[#617850]"}
           lg:after:content-[''] lg:after:absolute lg:after:left-0 lg:after:bottom-0
           lg:after:w-full lg:after:h-[2px] lg:after:bg-[#B0BEA6]
           lg:after:scale-x-0 lg:after:origin-center
           lg:after:transition-transform lg:after:duration-300
           ${isActive ? "lg:after:scale-x-100" : "lg:hover:after:scale-x-100"}`
          }
        >
          {link.text}
        </NavLink>
      </li>
    ));

  return (
    <>
      {/* Navbar */}
      <nav
        className={`
    fixed z-99 w-full top-0 transition-all duration-500
    ${
      isScrolled
        ? "backdrop-blur-md shadow-lg nav-gradient-animate"
        : "nav-gradient-animate"
    }
    lg:top-4 lg:left-1/2 lg:-translate-x-1/2 lg:w-[80%] lg:rounded-2xl
  `}
      >
        <div className="container mx-auto h-16 px-4 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <NavLink
            to="/"
            className="font-josefin font-bold text-xl tracking-wide text-white transition-transform duration-300 hover:scale-105"
          >
            ALIVE 11.0
          </NavLink>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-6">
            {renderNavLinks()}
          </ul>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Buka menu"
            className="p-2 lg:hidden"
          >
            <Menu className="w-8 h-8 text-white" />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-99 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 h-full w-4/5 max-w-sm bg-gradient-to-b from-[#4E342E] via-[#6D4C41] to-[#4E342E] shadow-lg z-99"
          >
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Tutup menu"
                className="p-2"
              >
                <X className="w-8 h-8 text-white" />
              </button>
            </div>
            <ul className="flex flex-col items-center justify-center mt-8 space-y-4">
              {renderNavLinks()}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
