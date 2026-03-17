"use client";

import { useRef, useEffect, useState } from "react";

export interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FeatureTabNavProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
}

export default function FeatureTabNav({ tabs, activeTab, onChange }: FeatureTabNavProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    const container = containerRef.current;
    if (el && container) {
      const cRect = container.getBoundingClientRect();
      const tRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: tRect.left - cRect.left,
        width: tRect.width,
      });
    }
  }, [activeTab]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex overflow-x-auto gap-1 p-1 bg-gray-100 rounded-xl no-scrollbar"
      >
        {/* Sliding indicator */}
        <div
          className="absolute top-1 bottom-1 bg-white rounded-lg shadow-sm transition-all duration-300 ease-out z-0"
          style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
        />

        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { tabRefs.current[tab.id] = el; }}
            onClick={() => onChange(tab.id)}
            className={`relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 flex-1 justify-center min-w-0 ${
              activeTab === tab.id ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className={`transition-colors duration-200 ${activeTab === tab.id ? "text-blue-600" : "text-gray-400"}`}>
              {tab.icon}
            </span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}