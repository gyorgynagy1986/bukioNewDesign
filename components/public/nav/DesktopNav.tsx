"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Globe, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { 
  languages, 
  mainLinks, 
  dropdowns, 
  authLinks,
  type Language,
  type NavDropdown 
} from '@/lib/navigationLinks';

interface DesktopNavProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}

export default function DesktopNav({ mobileMenuOpen, setMobileMenuOpen }: DesktopNavProps) {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const handleLanguageSelect = (lang: Language) => {
    setCurrentLanguage(lang);
    setLanguageOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <span className="text-lg font-bold text-gray-900">Bukio</span>
        </Link>

        {/* Center: Main Navigation */}
        <div className="hidden lg:flex items-center gap-8 flex-1 justify-center">
          {/* Árak link (first main link) */}
          <Link 
            href={mainLinks[0].href}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            {mainLinks[0].label}
          </Link>
          
          {/* Dropdown Menus */}
          {dropdowns.map((dropdown) => (
            <DropdownMenu key={dropdown.label} dropdown={dropdown} />
          ))}

          {/* Kapcsolat link (last main link) */}
          <Link 
            href={mainLinks[1].href}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            {mainLinks[1].label}
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center gap-5">
          <Link 
            href={authLinks.login.href}
            className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            {authLinks.login.label}
          </Link>

          <div className="h-5 w-px bg-gray-400/50" />

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-1.5 text-sm text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="font-medium">{currentLanguage.code.toUpperCase()}</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-4 w-40 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] py-2">
                {languages.map((lang) => (
                  <Link
                    key={lang.code}
                    href={lang.href}
                    onClick={() => handleLanguageSelect(lang)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="h-5 w-px bg-gray-400/50" />

          <Link 
            href={authLinks.register.href}
            className="bg-red-600 hover:bg-red-700 text-white text-[13px] font-semibold px-4 py-2 rounded-3xl transition-all duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            {authLinks.register.label}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-gray-700 hover:text-gray-900 transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}

// Separate component for dropdown menus
function DropdownMenu({ dropdown }: { dropdown: NavDropdown }) {
  const getDropdownWidth = (label: string) => {
    switch (label) {
      case 'Funkciók': return 'w-[480px]';
      case 'Megoldások': return 'w-[440px]';
      case 'Tudásbázis': return 'w-[480px]';
      default: return 'w-[440px]';
    }
  };

  return (
    <div className="group relative">
      <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors py-4">
        {dropdown.label}
        <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
      </button>
      
      <div className={`absolute left-1/2 -translate-x-1/2 top-full ${getDropdownWidth(dropdown.label)} opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}>
        <div className="mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6">
          <div className="grid grid-cols-2 gap-x-6">
            {dropdown.sections.map((section, index) => (
              <div key={section.title}>
                <h3 className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 px-3">
                  {section.title}
                </h3>
                <div className="space-y-0.5">
                  {section.links.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className="block px-3 py-2.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                {/* View All Link - only on second column if exists */}
                {index === 1 && dropdown.viewAllLink && (
                  <Link 
                    href={dropdown.viewAllLink.href}
                    className="flex items-center gap-1 px-3 py-2.5 mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    {dropdown.viewAllLink.label}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}