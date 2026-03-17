"use client";

import { Check, Shield, Dot } from "lucide-react";
import { Inter } from "next/font/google";
import Navbar from "../nav/nav";
import ChatBookingFormDemo from "../../Chatbookingformdemo";


const inter = Inter({ subsets: ["latin", "latin-ext"] });

export default function Hero() {
  return (
    <section
      className={`relative bg-gradient-to-br from-blue-50 via-indigo-50 to-white-20 overflow-hidden ${inter.className}`}
    >
      {/* Navbar a hero része - együtt görget */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <h1 className="text-3xl sm:text-[45px] font-semibold text-gray-800 leading-tight">
              Online Asztalfoglalási Rendszer
            </h1>

            {/* Feature List */}
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                <span className="text-[15px] text-gray-700">
                  Automata Értesítések - böngésző + SMS + Email
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                <span className="text-[15px] text-gray-700">
                  3 foglalási űrlap - több mint 20 színskála
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                <span className="text-[15px] text-gray-700">
                  Teljes testreszabhatóság - 50 + beállítható szabály{" "}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-4 h-4 text-gray-700 flex-shrink-0 mt-0.5" />
                <span className="text-[15px] text-gray-700">
                  Support - valódi segítség, gyorsan
                </span>
              </li>
            </ul>

            {/* Promo Box */}
            <div className="flex items-center">
              <p className="text-xl font-semibold text-gray-900">
                Ai vezérelt folyamatok: túlfoglalás
                <span className="text-red-600"> védelem</span>, asztal és
                időpont kiosztás a legoptimálisabb módon
              </p>
            </div>

            {/* CTA Button */}
            {/* CTA Button */}
            <div className="space-y-3">
              <button className="bg-red-600 hover:bg-red-700 text-white font-semibold text-base px-7 py-3 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                Kipróbálom ingyen
              </button>

              <div className="flex flex-wrap mt-10 items-center gap-2 text-sm text-gray-500">
                {[
                  "Éttermeknek",
                  "Kávézóknak",
                  "Bisztróknak",
                  "Bároknak",
                  "Cukrászdáknak",
                  "Rendezvényhelyszíneknek",
                ].map((item) => (
                  <div
                    key={item}
                    className="bg-white/70 flex justify-center items-center backdrop-blur-sm border border-gray-200 px-2 py-1 rounded-full"
                  >
                   
                    
                    <p>{item}</p> 
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right - Interactive Demo */}
          <div className="relative hidden lg:block">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-indigo-200/40 to-purple-200/40 rounded-3xl blur-3xl transform scale-110"></div>

              {/* Chat Demo */}
              <div className="relative z-10">
                <ChatBookingFormDemo />
              </div>

            </div>
          </div>

          {/* Mobile Demo - shows below content on mobile */}
          <div className="lg:hidden">
            <ChatBookingFormDemo />
          </div>
        </div>
      </div>

    </section>
  );
}
