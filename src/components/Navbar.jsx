import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "react-feather";
import navLinks from "../data/navlinks";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const renderNavLinks = (isMobile = false) =>
    navLinks.map((link) => (
      <li key={link.text} className={isMobile ? "w-full text-center" : ""}>
        <NavLink
          to={link.to}
          onClick={() => setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            "font-josefin font-bold text-lg tracking-wider transition-colors duration-300 " +
            (isMobile ? "py-4 block " : "") +
            (isActive ? "text-[#B0BEA6]" : "text-white hover:text-[#B0BEA6]")
          }
        >
          {link.text}
        </NavLink>
      </li>
    ));

  return (
    <>
      <nav className="fixed top-0 inset-x-0 h-16 bg-[#5D4037] shadow-md z-40">
        <div className="container mx-auto h-full px-4 sm:px-8 flex items-center justify-end">
          <ul className="hidden md:flex items-center space-x-10">
            {renderNavLinks()}
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Buka menu"
            >
              <Menu className="w-8 h-8 text-white" />
            </button>
          </div>
        </div>
      </nav>
      <div className="h-16" />
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden={!isMobileMenuOpen}
      />

      <div
        className={`fixed inset-y-0 right-0 h-full w-4/5 max-w-sm bg-[#4E342E] shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Tutup menu"
          >
            <X className="w-8 h-8 text-white" />
          </button>
        </div>

        <ul className="flex flex-col items-center justify-center mt-8 space-y-4">
          {renderNavLinks(true)}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
