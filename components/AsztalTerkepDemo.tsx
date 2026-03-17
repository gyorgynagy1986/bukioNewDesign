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
  phone?: string;
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

const HIGHLIGHTED_BOOKING_ID = 1;

export default function AsztalTerkepDemo({ dict }: AsztalTerkepDemoProps) {
  const bookings: Booking[] = [
    { id: 1, name: "Tóth Eszter", guests: 2, time: "14:00", duration: 1.5, table: "1. asztal", capacity: 2, status: "confirmed", phone: "+36 30 123 4567" },
    { id: 2, name: "Varga Bence", guests: 2, time: "19:00", duration: 1.5, table: "1. asztal", capacity: 2, status: "confirmed" },
    { id: 3, name: "Molnár Ádám", guests: 2, time: "12:30", duration: 2, table: "2. asztal", capacity: 2, status: "arrived", phone: "+36 70 987 6543" },
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

  const getStatusLabel = (status: Booking["status"]) => {
    switch (status) {
      case "arrived": return dict.legend.arrived;
      case "pending": return dict.legend.pending;
      default: return dict.legend.confirmed;
    }
  };

  const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "arrived": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const getStatusBarColor = (status: Booking["status"]) => {
    switch (status) {
      case "arrived": return "bg-indigo-400";
      case "pending": return "bg-amber-400";
      default: return "bg-emerald-400";
    }
  };

  return (
    <div className="relative w-full bg-white flex flex-col h-full">
      {/* Header - solid bg, high z-index, always on top */}
      <div className="sticky top-0 z-30 flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-2 text-gray-800">
          <span className="text-xs sm:text-sm font-semibold tracking-tight">
            {dict.title}
          </span>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <span className="text-[10px] sm:text-xs text-gray-500 font-medium hidden sm:inline">
            {dict.subtitle}
          </span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50/50 rounded-full border border-emerald-100/50">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-[9px] sm:text-[10px] font-medium text-emerald-700 uppercase tracking-wide">
            {dict.liveUpdate}
          </span>
        </div>
      </div>

      {/* Scroll Area */}
      <div className="overflow-x-auto custom-scrollbar bg-white">
        <div className="p-3 sm:p-6 min-w-[600px]">
          {/* Timeline Header */}
          <div className="flex mb-2 sm:mb-3">
            <div className="w-[88px] sm:w-24 shrink-0"></div>
            <div className="flex-1 flex pl-2">
              {timeSlots.map((time, i) => (
                <div key={i} className="flex-1 text-[9px] sm:text-[10px] text-gray-400 font-medium border-l border-gray-100 pl-1.5 sm:pl-2">
                  {time}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            {tables.map((table, idx) => {
              const rowHasHighlight = bookings.some(
                (b) => b.table === table.name && b.capacity === table.capacity && b.id === HIGHLIGHTED_BOOKING_ID
              );

              return (
                <div
                  key={idx}
                  className={`flex items-start group relative ${rowHasHighlight ? "z-[40]" : ""}`}
                >
                  {/* Table label - sticky left, solid bg with right shadow */}
                  <div className={`w-[88px] sm:w-24 shrink-0 pr-2 sm:pr-4 sticky left-0 bg-white h-10 sm:h-12 flex items-center table-label-col ${rowHasHighlight ? "z-[45]" : "z-20"}`}>
                    <div className="flex items-center justify-between gap-1 w-full">
                      <span className="text-[10px] sm:text-xs font-medium text-gray-700 whitespace-nowrap">
                        {table.name}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-gray-400 bg-gray-50 px-1 sm:px-1.5 py-0.5 rounded border border-gray-100 whitespace-nowrap">
                        {table.capacity} fő
                      </span>
                    </div>
                  </div>

                  {/* Timeline Track */}
                  <div className="flex-1 h-10 sm:h-12 bg-gray-50/30 rounded-lg relative group-hover:bg-gray-50/80 transition-colors">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex pointer-events-none">
                      {timeSlots.map((_, i) => (
                        <div key={i} className="flex-1 border-l border-dashed border-gray-100 first:border-l-0"></div>
                      ))}
                    </div>

                    {/* Bookings */}
                    {bookings
                      .filter((b) => b.table === table.name && b.capacity === table.capacity)
                      .map((booking) => {
                        const isHighlighted = booking.id === HIGHLIGHTED_BOOKING_ID;

                        return (
                          <div
                            key={booking.id}
                            className={`absolute top-1 sm:top-1.5 h-8 sm:h-9 ${isHighlighted ? "z-[25]" : "z-[5]"}`}
                            style={{
                              left: `${getTimePosition(booking.time)}%`,
                              width: `${getBookingWidth(booking.duration)}%`,
                            }}
                          >
                            {/* Booking bar */}
                            <div
                              className={`w-full h-full rounded-[6px] border flex items-center px-2 sm:px-3 text-[10px] sm:text-[11px] font-medium overflow-hidden cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5 ${getStatusStyles(booking.status)} ${
                                isHighlighted ? "ring-2 ring-emerald-300 shadow-md" : ""
                              }`}
                            >
                              <span className="truncate">{booking.name}</span>
                            </div>

                            {/* Popover - opens BELOW */}
                            {isHighlighted && (
                              <div className="absolute left-0 top-full mt-2 z-[50] pointer-events-none">
                                {/* Arrow up */}
                                <div className="ml-6 sm:ml-8">
                                  <div className="w-3 h-3 bg-white border-t border-l border-gray-200 transform rotate-45 -mb-1.5 relative z-[1]"></div>
                                </div>

                                {/* Card */}
                                <div className="w-[220px] sm:w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden relative">
                                  <div className={`h-1 ${getStatusBarColor(booking.status)}`} />

                                  {/* Name row */}
                                  <div className="px-3 sm:px-4 pt-2.5 pb-2 flex items-center gap-2.5">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-500 flex items-center justify-center text-white text-[10px] sm:text-xs font-bold flex-shrink-0">
                                      {getInitials(booking.name)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-center gap-1.5 flex-wrap">
                                        <span className="text-xs sm:text-sm font-semibold text-gray-900">
                                          {booking.name}
                                        </span>
                                        <span className={`text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-full border ${getStatusColor(booking.status)}`}>
                                          {getStatusLabel(booking.status)}
                                        </span>
                                      </div>
                                      {booking.phone && (
                                        <div className="flex items-center gap-1 mt-0.5">
                                          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                          </svg>
                                          <span className="text-[10px] sm:text-xs text-gray-500">{booking.phone}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="mx-3 sm:mx-4 border-t border-gray-100" />

                                  {/* Details */}
                                  <div className="px-3 sm:px-4 py-2 grid grid-cols-2 gap-y-1">
                                    <div className="flex items-center gap-1.5">
                                      <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      <span className="text-[10px] sm:text-xs text-gray-700">{booking.guests} vendég</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      </svg>
                                      <span className="text-[10px] sm:text-xs text-gray-700">{booking.time} ({booking.duration}ó)</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 col-span-2">
                                      <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                      </svg>
                                      <span className="text-[10px] sm:text-xs text-gray-700">asztal(ok): {booking.capacity} fős</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}

                    {/* Current Time Line */}
                    <div className="absolute top-[-8px] bottom-[-8px] w-[1px] bg-red-400 z-10 pointer-events-none opacity-40" style={{ left: "33%" }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-3 border-t border-gray-100 bg-gray-50/30">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-[2px] bg-white border border-emerald-300" />
          <span className="text-[9px] sm:text-[10px] text-gray-500">{dict.legend.confirmed}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-[2px] bg-amber-50 border border-amber-300" />
          <span className="text-[9px] sm:text-[10px] text-gray-500">{dict.legend.pending}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-[2px] bg-indigo-50 border border-indigo-300" />
          <span className="text-[9px] sm:text-[10px] text-gray-500">{dict.legend.arrived}</span>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .table-label-col {
          box-shadow: 6px 0 12px -4px rgba(0, 0, 0, 0.08);
        }
      `}</style>
    </div>
  );
}