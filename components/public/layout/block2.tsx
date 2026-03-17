"use client";

import { useState } from "react";
import FeatureTabNav, { type Tab } from "../../../components/public/featurestab/FeatureTabNav";
import TabBooking  from "../../../components/public/featurestab/TabBooking";
import TabTableMap from "../../../components/public/featurestab/TabTableMap";
import TabPlaceholder from "../../../components/public/featurestab/TabPlaceholder";
import TabCRM from "../../../components/public/featurestab/TabCRM";


const tabs: Tab[] = [
  {
    id: "booking",
    label: "Online Foglalás",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    id: "reminders",
    label: "Emlékeztetők",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    id: "tablemap",
    label: "Asztaltérkép",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    id: "crm",
    label: "Vendégkezelés",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: "stats",
    label: "Statisztikák",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];
 
const tabContent: Record<string, React.ReactNode> = {
  booking: <TabBooking />,
  tablemap: <TabTableMap />,
  reminders: (
    <TabPlaceholder
      title="Automatikus Emlékeztetők"
      description="SMS és email emlékeztetők automatikus küldése a foglalás előtt. Csökkentse a no-show arányt akár 70%-kal, és tartsa vendégeit informálva a közelgő látogatásukról."
      linkText="Emlékeztetők testreszabása"
      linkHref="/funkciok/emlekeztetok"
    />
  ),
  crm: <TabCRM />,
  stats: (
    <TabPlaceholder
      title="Statisztikák & Riportok"
      description="Részletes elemzések a foglalásokról, népszerű időpontokról és vendégszokásokról. Hozzon adatalapú döntéseket étterme fejlesztéséhez."
      linkText="Statisztikák megtekintése"
      linkHref="/funkciok/statisztikak"
    />
  ),
};
 
export default function FeaturesTabs() {
  const [activeTab, setActiveTab] = useState("booking");
 
  return (
    <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-right blue blob */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-100/30 blur-[100px]" />
        {/* Bottom-left emerald blob */}
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-50/40 to-teal-100/20 blur-[120px]" />
        {/* Center-right small accent */}
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-bl from-violet-100/20 to-blue-50/20 blur-[80px]" />
      </div>
 
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Milyen funkciókat kínál a Bukio?
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Minden eszköz egy helyen az éttermi foglalások professzionális kezeléséhez
          </p>
        </div>
 
        {/* Tab Nav */}
        <div className="mb-10">
          <FeatureTabNav tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        </div>
 
        {/* Tab Content */}
        <div className="min-h-[500px]">
          <div key={activeTab} className="animate-fadeIn">
            {tabContent[activeTab]}
          </div>
        </div>
      </div>
 
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
      `}</style>
    </section>
  );
}
 