"use client"

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { 
  languages, 
  mainLinks, 
  dropdowns, 
  authLinks,
  getDropdownFlatLinks,
  type Language 
} from '@/lib/navigationLinks';

interface MobileNavProps {
  isOpen: boolean;
}

export default function MobileNav({ isOpen }: MobileNavProps) {
  // Dynamic state for each dropdown
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]);

  const toggleDropdown = (label: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
        {/* First main link - Árak */}
        <Link 
          href={mainLinks[0].href}
          className="block text-sm text-gray-700 hover:text-gray-900 font-medium py-2"
        >
          {mainLinks[0].label}
        </Link>

        {/* Dropdown Menus */}
        {dropdowns.map((dropdown) => (
          <div key={dropdown.label} className="border-b border-gray-100 pb-2">
            <button
              onClick={() => toggleDropdown(dropdown.label)}
              className="flex items-center justify-between w-full text-sm text-gray-700 hover:text-gray-900 font-medium py-2"
            >
              {dropdown.label}
              <ChevronDown 
                className={`w-4 h-4 transition-transform ${
                  openDropdowns[dropdown.label] ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {openDropdowns[dropdown.label] && (
              <div className="pl-4 space-y-1 pb-2">
                {getDropdownFlatLinks(dropdown).map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className="block text-sm text-gray-600 hover:text-gray-900 py-1.5"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Last main link - Kapcsolat */}
        <Link 
          href={mainLinks[1].href}
          className="block text-sm text-gray-700 hover:text-gray-900 font-medium py-2"
        >
          {mainLinks[1].label}
        </Link>

        {/* Divider */}
        <div className="pt-4 border-t border-gray-200 mt-4">
          <Link 
            href={authLinks.login.href}
            className="block text-sm text-gray-700 hover:text-gray-900 font-medium py-2"
          >
            {authLinks.login.label}
          </Link>

          {/* Mobile Language Selector */}
          <div className="py-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Nyelv
            </p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <Link
                  key={lang.code}
                  href={lang.href}
                  onClick={() => setCurrentLanguage(lang)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentLanguage.code === lang.code
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Link 
            href={authLinks.register.href}
            className="block w-full text-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-3 rounded-3xl transition-all duration-200 mt-3"
          >
            {authLinks.register.label}
          </Link>
        </div>
      </div>
    </div>
  );
}