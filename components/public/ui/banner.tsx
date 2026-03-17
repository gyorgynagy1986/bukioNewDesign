"use client"

import React from 'react';
import { Inter } from 'next/font/google';
import Image from 'next/image';

import logo1 from '../../../public/ccc.png'
import logo2 from '../../../public/analitics.png'
import logo3 from '../../../public/c.png'
import logo4 from '../../../public/cc.png'
import logo5 from '../../../public/android.png'
import logo6 from '../../../public/pwa-logo.png'
import logo7 from '../../../public/google-logo.png'



const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export default function LogoBanner() {
  const logos = [
    { name: 'ChatGPT', image: logo1, size: 30 },
    { name: 'Google Analytics', image: logo2, size: 130 },
    { name: 'mail Chimp', image: logo3, size: 35 },
    { name: 'Google calendar', image: logo4, size: 30 },
    { name: 'Android', image: logo5, size: 55 },
    { name: 'PWA', image: logo6, size: 50 },
    { name: 'Google', image: logo7, size: 70 },



  ];

  const LogoItem = ({ logo, keyPrefix, index }: { logo: typeof logos[0], keyPrefix: string, index: number }) => (
    <div
      key={`${keyPrefix}-${index}`}
      className="flex items-center justify-center w-40 flex-shrink-0"
    >
      <Image 
        src={logo.image} 
        alt={logo.name} 
        width={logo.size} 
        height={logo.size}
        className="object-contain opacity-30 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer"
      />
    </div>
  );

  return (
    <div className={`w-full my-4 ${inter.className}`}>
      <div className=" w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Relative container for overflow and gradients */}
        <div className="relative overflow-hidden">
          <div className="py-2">
            {/* Infinite scrolling container */}
            <div className="flex animate-scroll items-center">
              {/* First set of logos */}
              {logos.map((logo, index) => (
                <LogoItem key={`first-${index}`} logo={logo} keyPrefix="first" index={index} />
              ))}
              
              {/* Duplicate set for seamless loop */}
              {logos.map((logo, index) => (
                <LogoItem key={`second-${index}`} logo={logo} keyPrefix="second" index={index} />
              ))}
            </div>
          </div>

          {/* Gradient overlays for smooth edges - now inside the container */}
          <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r pointer-events-none z-10"></div>
          <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l  pointer-events-none z-10"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 40s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}