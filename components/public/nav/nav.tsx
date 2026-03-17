"use client"

import React, { useState, useEffect } from 'react';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Navbar() {
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyNav(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when switching between sticky/inline nav
  useEffect(() => {
    if (!showStickyNav) {
      // Optional: close mobile menu when scrolling back to top
      // setMobileMenuOpen(false);
    }
  }, [showStickyNav]);

  return (
    <>
      {/* Inline Nav - a Hero része, együtt görget */}
      <nav className="relative z-40 bg-transparent">
        <DesktopNav 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <MobileNav isOpen={mobileMenuOpen && !showStickyNav} />
      </nav>

      {/* Sticky Nav - csak görgetés után jelenik meg, felülről becsúszik */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-lg transition-all duration-300 ${
          showStickyNav 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <DesktopNav 
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <MobileNav isOpen={mobileMenuOpen && showStickyNav} />
      </nav>
    </>
  );
}