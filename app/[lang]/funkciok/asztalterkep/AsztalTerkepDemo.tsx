"use client";

import { Clock, Bell, QrCode, Check } from "lucide-react";

interface Booking {
  id: number;
  name: string;
  guests: number;
  time: string;
  duration: number;
  table: string;
  capacity: number;
  status: "confirmed" | "arrived" | "pending";
}

interface AsztalTerkepDemoProps {
  dict: {
    title: string;
    subtitle: string;
    liveUpdate: string;
    scrollHint: string;
    legend: {
      confirmed: string;
      pending: string;
      arrived: string;
    };
    notifications: {
      newBooking: string;
      checkIn: string;
    };
  };
}

export default function AsztalTerkepDemo({ dict }: AsztalTerkepDemoProps) {
  const bookings: Booking[] = [
    { id: 1, name: "Tóth Eszter", guests: 2, time: "14:00", duration: 1.5, table: "1. asztal", capacity: 2, status: "confirmed" },
    { id: 2, name: "Varga Bence", guests: 2, time: "19:00", duration: 1.5, table: "1. asztal", capacity: 2, status: "confirmed" },
    { id: 3, name: "Molnár Ádám", guests: 2, time: "12:30", duration: 2, table: "2. asztal", capacity: 2, status: "arrived" },
    { id: 4, name: "Kiss Petra", guests: 2, time: "15:00", duration: 1.5, table: "2. asztal", capacity: 2, status: "confirmed" },
    { id: 5, name: "Nagy Zsófia", guests: 4, time: "12:00", duration: 2, table: "1. asztal", capacity: 4, status: "confirmed" },
    { id: 6, name: "Kovács Máté", guests: 4, time: "19:00", duration: 2, table: "1. asztal", capacity: 4, status: "pending" },
    { id: 7, name: "Szabó Dániel", guests: 3, time: "13:00", duration: 1.5, table: "2. asztal", capacity: 4, status: "arrived" },
    { id: 8, name: "Farkas Família", guests: 6, time: "14:30", duration: 2.5, table: "1. asztal", capacity: 6, status: "confirmed" },
  ];

  const tables = [
    { name: "1. asztal", capacity: 2, usage: 35 },
    { name: "2. asztal", capacity: 2, usage: 42 },
    { name: "1. asztal", capacity: 4, usage: 28 },
    { name: "2. asztal", capacity: 4, usage: 15 },
    { name: "1. asztal", capacity: 6, usage: 22 },
  ];

  const timeSlots = ["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

  const getTimePosition = (time: string) => {
    const [h, m] = time.split(":").map(Number);
    return Math.max(0, Math.min(((h - 12 + m / 60) / 9) * 100, 100));
  };

  const getBookingWidth = (duration: number) => (duration / 9) * 100;

  const getStatusStyles = (status: Booking["status"]) => {
    switch (status) {
      case "arrived":
        return "bg-indigo-50 border-indigo-200 text-indigo-700";
      case "pending":
        return "bg-amber-50/80 border-amber-200 text-amber-700 dashed-border";
      default:
        return "bg-white border-emerald-200 text-emerald-700 shadow-[0_2px_8px_-2px_rgba(16,185,129,0.15)]";
    }
  };

  return (
    <div className="relative w-full bg-white flex flex-col h-full">
        {/* Header - Simább, beleolvad a háttérbe */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-800">
              <span className="text-sm font-semibold tracking-tight">
                {dict.title}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-xs text-gray-500 font-medium">
                {dict.subtitle}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50/50 rounded-full border border-emerald-100/50">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-medium text-emerald-700 uppercase tracking-wide">
              {dict.liveUpdate}
            </span>
          </div>
        </div>

        {/* Scroll Area */}
        <div className="overflow-x-auto custom-scrollbar bg-white">
          <div className="p-6 min-w-[700px]">
            {/* Timeline Header */}
            <div className="flex mb-3 relative">
              <div className="w-24 shrink-0"></div>
              <div className="flex-1 flex pl-2">
                {timeSlots.map((time, i) => (
                  <div key={i} className="flex-1 text-[10px] text-gray-400 font-medium border-l border-gray-100 pl-2">
                    {time}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {tables.map((table, idx) => (
                <div key={idx} className="flex items-center group relative h-12">
                  {/* Table Info */}
                  <div className="w-24 shrink-0 pr-4 sticky left-0 z-20 bg-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-700">{table.name}</span>
                      <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{table.capacity} fő</span>
                    </div>
                  </div>

                  {/* Timeline Track */}
                  <div className="flex-1 h-full bg-gray-50/30 rounded-lg relative group-hover:bg-gray-50/80 transition-colors">
                    <div className="absolute inset-0 flex pointer-events-none">
                      {timeSlots.map((_, i) => (
                        <div key={i} className="flex-1 border-l border-dashed border-gray-100 first:border-l-0"></div>
                      ))}
                    </div>

                    {bookings
                      .filter((b) => b.table === table.name && b.capacity === table.capacity)
                      .map((booking) => (
                        <div
                          key={booking.id}
                          className={`absolute top-1.5 bottom-1.5 rounded-[6px] border flex items-center px-3 text-[11px] font-medium overflow-hidden cursor-pointer hover:shadow-md transition-all z-[5] hover:z-10 hover:-translate-y-0.5 ${getStatusStyles(booking.status)}`}
                          style={{
                            left: `${getTimePosition(booking.time)}%`,
                            width: `${getBookingWidth(booking.duration)}%`,
                          }}
                        >
                          <span className="truncate">{booking.name}</span>
                        </div>
                      ))}

                    {/* Current Time Line */}
                    <div className="absolute top-[-8px] bottom-[-8px] w-[1px] bg-red-400 z-10 pointer-events-none opacity-40" style={{ left: "33%" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="flex items-center gap-6 px-6 py-4 border-t border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-[2px] bg-white border border-emerald-300" />
            <span className="text-[10px] text-gray-500">{dict.legend.confirmed}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-[2px] bg-amber-50 border border-amber-300" />
            <span className="text-[10px] text-gray-500">{dict.legend.pending}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-[2px] bg-indigo-50 border border-indigo-300" />
            <span className="text-[10px] text-gray-500">{dict.legend.arrived}</span>
          </div>
        </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}