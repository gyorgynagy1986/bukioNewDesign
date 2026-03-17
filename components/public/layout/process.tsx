import React from 'react';
import { Inter } from 'next/font/google';
import { ClipboardList, Mail, MonitorSmartphone, CheckCircle } from 'lucide-react';

const inter = Inter({ subsets: ['latin', 'latin-ext'] });

export default function BookingProcess() {
  const steps = [
    {
      number: '1',
      icon: ClipboardList,
      title: 'Adatok megadása',
      description: 'Rendszer automatikusan ajánlja a helyeket',
    },
    {
      number: '2',
      icon: Mail,
      title: 'Email a vendégnek',
      description: 'Beküldés után azonnali visszaigazolás',
    },
    {
      number: '3',
      icon: MonitorSmartphone,
      title: 'Vendégfelület',
      description: 'Átirányítás ahol látja a foglalását',
    },
    {
      number: '4',
      icon: CheckCircle,
      title: 'Jóváhagyás',
      description: 'Étterem azonnal megkapja a foglalást',
    },
  ];

  return (
    <section className={`w-full bg-white py-24 ${inter.className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Foglalás menete
          </h2>
          <p className="text-gray-500 text-sm">
            4 lépésben a foglalástól a jóváhagyásig
          </p>
        </div>

        {/* Abstract Layout */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            {/* Dotted connecting paths */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              <path
                d="M 200 100 Q 350 150, 500 100"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray="8,8"
                fill="none"
              />
              <path
                d="M 500 100 Q 650 50, 800 100"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray="8,8"
                fill="none"
              />
              <path
                d="M 800 100 Q 950 150, 1100 100"
                stroke="#e5e7eb"
                strokeWidth="2"
                strokeDasharray="8,8"
                fill="none"
              />
            </svg>

            <div className="grid grid-cols-4 gap-12 relative" style={{ zIndex: 1 }}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div
                    key={index}
                    className={`relative ${isEven ? 'mt-0' : 'mt-16'}`}
                  >
                    {/* Minimal Card */}
                    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-400 transition-all duration-300 hover:shadow-sm">
                      {/* Number */}
                      <div className="text-6xl font-light text-gray-200 mb-4">
                        {step.number}
                      </div>

                      {/* Icon */}
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
                      </div>

                      {/* Content */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div key={index} className="relative">
                  {/* Connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-20 bottom-0 w-px border-l-2 border-dashed border-gray-200"></div>
                  )}

                  <div className="flex gap-4 relative z-10">
                    {/* Number Circle */}
                    <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-700">{step.number}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-4 h-4 text-gray-600" strokeWidth={1.5} />
                        <h3 className="text-base font-semibold text-gray-900">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}