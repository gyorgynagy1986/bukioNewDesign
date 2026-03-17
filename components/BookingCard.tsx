export interface Booking {
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
  
  export interface BookingStatusLabels {
    confirmed: string;
    pending: string;
    arrived: string;
  }
  
  // --- Helpers ---
  
  export const getStatusStyles = (status: Booking["status"]) => {
    switch (status) {
      case "arrived":
        return "bg-indigo-50 border-indigo-200 text-indigo-700";
      case "pending":
        return "bg-amber-50/80 border-amber-200 text-amber-700 dashed-border";
      default:
        return "bg-white border-emerald-200 text-emerald-700 shadow-[0_2px_8px_-2px_rgba(16,185,129,0.15)]";
    }
  };
  
  export const getStatusLabel = (status: Booking["status"], labels: BookingStatusLabels) => {
    switch (status) {
      case "arrived": return labels.arrived;
      case "pending": return labels.pending;
      default: return labels.confirmed;
    }
  };
  
  export const getStatusColor = (status: Booking["status"]) => {
    switch (status) {
      case "arrived": return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "pending": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
  };
  
  export const getStatusBarColor = (status: Booking["status"]) => {
    switch (status) {
      case "arrived": return "bg-indigo-400";
      case "pending": return "bg-amber-400";
      default: return "bg-emerald-400";
    }
  };
  
  export const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  
  // --- Component ---
  
  interface BookingCardProps {
    booking: Booking;
    labels: BookingStatusLabels;
    size?: "sm" | "md";
  }
  
  export default function BookingCard({ booking, labels, size = "sm" }: BookingCardProps) {
    const isMd = size === "md";
  
    return (
      <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
        <div className={`h-1 ${getStatusBarColor(booking.status)}`} />
  
        {/* Name row */}
        <div className={`${isMd ? "px-5 pt-4 pb-3" : "px-3 sm:px-4 pt-2.5 pb-2"} flex items-center gap-3`}>
          <div
            className={`${isMd ? "w-11 h-11 text-sm" : "w-8 h-8 sm:w-10 sm:h-10 text-[10px] sm:text-xs"} rounded-full bg-rose-500 flex items-center justify-center text-white font-bold flex-shrink-0`}
          >
            {getInitials(booking.name)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`${isMd ? "text-base" : "text-xs sm:text-sm"} font-semibold text-gray-900`}>
                {booking.name}
              </span>
              <span
                className={`${isMd ? "text-xs px-2.5" : "text-[9px] sm:text-[10px] px-1.5"} font-medium py-0.5 rounded-full border ${getStatusColor(booking.status)}`}
              >
                {getStatusLabel(booking.status, labels)}
              </span>
            </div>
            {booking.phone && (
              <div className="flex items-center gap-1 mt-0.5">
                <svg
                  className={`${isMd ? "w-3.5 h-3.5" : "w-3 h-3"} text-gray-400 flex-shrink-0`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span className={`${isMd ? "text-sm" : "text-[10px] sm:text-xs"} text-gray-500`}>
                  {booking.phone}
                </span>
              </div>
            )}
          </div>
        </div>
  
        <div className={`${isMd ? "mx-5" : "mx-3 sm:mx-4"} border-t border-gray-100`} />
  
        {/* Details */}
        <div className={`${isMd ? "px-5 py-3 gap-y-2" : "px-3 sm:px-4 py-2 gap-y-1"} grid grid-cols-2`}>
          <div className="flex items-center gap-1.5">
            <svg
              className={`${isMd ? "w-4 h-4" : "w-3 h-3"} text-gray-400 flex-shrink-0`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className={`${isMd ? "text-sm" : "text-[10px] sm:text-xs"} text-gray-700`}>
              {booking.guests} vendég
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg
              className={`${isMd ? "w-4 h-4" : "w-3 h-3"} text-gray-400 flex-shrink-0`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className={`${isMd ? "text-sm" : "text-[10px] sm:text-xs"} text-gray-700`}>
              {booking.time} ({booking.duration}ó)
            </span>
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <svg
              className={`${isMd ? "w-4 h-4" : "w-3 h-3"} text-gray-400 flex-shrink-0`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className={`${isMd ? "text-sm" : "text-[10px] sm:text-xs"} text-gray-700`}>
              asztal(ok): {booking.capacity} fős
            </span>
          </div>
        </div>
      </div>
    );
  }