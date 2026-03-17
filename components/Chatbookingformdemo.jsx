"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/hu";
import Image from "next/image";
import photoBorito from "../public/restorante.webp";

dayjs.locale("hu");
import {
  Send,
  Calendar,
  Users,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  Check,
  AlertCircle,
  Utensils,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Sparkles,
  FileText,
  CheckCircle,
  Globe,
  ChevronDown,
  Share2,
  Info,
  X,
  Facebook,
  Instagram,
  UtensilsCrossed,
} from "lucide-react";

// ============================================================================
// CONSTANTS & MOCK DATA
// ============================================================================

const TYPING_DELAY = 500;
const MESSAGE_DELAY = 600;

// Mock restaurant data
const MOCK_RESTAURANT = {
  name: "Bukio Demo Étterem",
  areas: [
    { _id: "area-1", name: "Belső tér" },
    { _id: "area-2", name: "Terasz" },
  ],
};

// Mock durations
const MOCK_DURATIONS = [1, 1.5, 2, 2.5, 3];

// Generate mock time slots (11:00 - 21:00, every 30 min)
const generateMockTimes = () => {
  const times = [];
  for (let hour = 11; hour <= 21; hour++) {
    times.push({
      raw: `${hour.toString().padStart(2, "0")}:00`,
      display: `${hour.toString().padStart(2, "0")}:00`,
    });
    if (hour < 21) {
      times.push({
        raw: `${hour.toString().padStart(2, "0")}:30`,
        display: `${hour.toString().padStart(2, "0")}:30`,
      });
    }
  }
  return times;
};

const MOCK_TIMES = generateMockTimes();

// Translations
const translations = {
  hu: {
    hello: "Szia",
    chatWelcome: "Segítek asztalt foglalni.",
    pleaseSelectDate: "Melyik napra szeretnél asztalt foglalni?",
    howManyPeople: "Hány főre szeretnél asztalt foglalni?",
    people: "fő",
    selectArea: "Melyik területen szeretnél ülni?",
    howLongStay: "Mennyi időre szeretnél asztalt foglalni?",
    hours: "óra",
    selectTime: "Melyik időpont lenne jó?",
    almostDone: "Majdnem kész!",
    whatsYourName: "Hogyan szólíthatunk ? :) ",
    whatsYourEmail: "Mi az email címed?",
    whatsYourPhone: "Mi a telefonszámod?",
    anySpecialRequests: "Van valami különleges kérésed? (Opcionális)",
    skip: "Kihagyom",
    pleaseAcceptPolicy: "Kérlek fogadd el az adatkezelési feltételeket.",
    acceptPolicy: "Elfogadom",
    policyText: "A foglalással elfogadod az adatkezelési szabályzatunkat.",
    readPolicy: "Adatkezelési szabályzat",
    hereSummary: "Itt az összefoglaló a foglalásodról:",
    bookingSummary: "Foglalás összegzése",
    confirmBooking: "Véglegesítem",
    modifyBooking: "Módosítom",
    date: "Dátum",
    partySize: "Létszám",
    area: "Terület",
    duration: "Időtartam",
    time: "Időpont",
    name: "Név",
    email: "Email",
    phone: "Telefon",
    specialRequests: "Megjegyzés",
    back: "Vissza",
    progressLabel: "Foglalás folyamata",
    enterYourName: "Add meg a neved...",
    enterYourEmail: "email@pelda.hu",
    enterYourPhone: "+36 20 123 4567",
    specialRequestsPlaceholder: "Pl. ablak melletti asztal...",
    pleaseEnterValidName: "Kérlek add meg a neved! (min. 2 karakter)",
    pleaseEnterValidEmail: "Kérlek adj meg egy érvényes email címet!",
    pleaseEnterValidPhone: "Kérlek adj meg egy érvényes telefonszámot!",
    noSpecialRequests: "Nincs megjegyzés",
    policyAccepted: "Elfogadom az adatkezelési feltételeket",
    yes: "Igen, véglegesítem!",
    demoSuccess: "🎉 Ez egy demo foglalás!",
    demoSuccessDetails: "Valós foglalásokhoz próbáld ki a Bukio-t!",
    tryBukio: "Kipróbálom a Bukio-t",
    restartDemo: "Demo újrakezdése",
    whatToChange: "Mit szeretnél módosítani?",
    changeDate: "Dátum",
    changePartySize: "Létszám",
    changeDuration: "Időtartam",
    tableBooking: "Asztalfoglalás",
    chatMessages: "Chat üzenetek",
    chatSubtitle: "Online asztalfoglalás",
    bookingAssistant: "Foglalási asszisztens",
  },
};

// Theme colors - Blue scheme
const colors = {
  container: "bg-white",
  accent: "bg-gray-50",
  heading: "text-gray-900",
  subheading: "text-blue-600",
  text: "text-gray-700",
  button: {
    bg: "bg-blue-600",
    text: "text-white",
    hover: "hover:bg-blue-700",
  },
  input: {
    bg: "bg-white",
    border: "border-gray-200",
    text: "text-gray-900",
  },
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-700",
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

// Language Switcher
const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={-1}
        className="flex items-center gap-1 px-2 py-1.5 hover:bg-gray-100 rounded-lg transition-all text-sm"
      >
        <span className="text-sm font-semibold text-gray-700">HU</span>
        <ChevronDown
          size={14}
          className={`text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-[120px] py-1">
            {[
              { code: "HU", name: "Magyar", flag: "🇭🇺" },
              { code: "EN", name: "English", flag: "🇬🇧" },
              { code: "DE", name: "Deutsch", flag: "🇩🇪" },
            ].map((lang) => (
              <button
                key={lang.code}
                tabIndex={-1}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  lang.code === "HU"
                    ? "bg-blue-50 text-blue-700 font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span>{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Restaurant Info Panel (Modal)
const RestaurantInfoPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl overflow-hidden border border-blue-200/50 max-w-sm w-full animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-blue-100/50 bg-gradient-to-r from-blue-50/80 to-indigo-50/80">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="w-4 h-4 text-blue-600" />
          <h3 className="text-sm font-bold text-gray-900">
            Étterem információk
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          tabIndex={-1}
          className="w-6 h-6 rounded-full bg-white/60 hover:bg-white flex items-center justify-center transition-colors"
        >
          <X className="w-3.5 h-3.5 text-gray-500" />
        </button>
      </div>

      {/* Restaurant Image */}
      <div className="relative h-30 bg-gradient-to-br ">
        <Image
          priority
          fill
          className="object-cover opacity-60"
          src={photoBorito}
          alt="bukio foglalási rendszer demo étterem borítókép"
        />
        <div className="absolute inset-0 flex items-center justify-center"></div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-2 pb-0 bg-white/40">
        {[
          { id: "contact", label: "Elérhetőség" },
          { id: "hours", label: "Nyitvatartás" },
          { id: "services", label: "Szolgáltatások" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            tabIndex={-1}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:bg-white/60"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Social Links */}
      <div className="px-3 pt-2 bg-white/40">
        <h4 className="text-[10px] font-semibold text-gray-500 mb-1.5">
          Közösségi
        </h4>
        <div className="flex flex-wrap gap-1.5 pb-2">
          <a
            href="#"
            tabIndex={-1}
            className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100/60 hover:bg-blue-200/60 rounded-md border border-blue-200/50"
          >
            <Facebook className="w-3 h-3 text-blue-600" />
            <span className="text-[10px] font-medium text-blue-900">
              Facebook
            </span>
          </a>
          <a
            href="#"
            tabIndex={-1}
            className="inline-flex items-center gap-1 px-2 py-1 bg-pink-100/60 hover:bg-pink-200/60 rounded-md border border-pink-200/50"
          >
            <Instagram className="w-3 h-3 text-pink-600" />
            <span className="text-[10px] font-medium text-pink-900">
              Instagram
            </span>
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 space-y-1.5 max-h-48 overflow-y-auto bg-white/40">
        {activeTab === "contact" && (
          <>
            <div className="flex items-start gap-2 p-2 bg-blue-50/60 rounded-lg border border-blue-100/50">
              <MapPin className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-medium text-gray-500">Cím</p>
                <p className="text-xs text-gray-900">
                  Budapest, Példa utca 12.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-blue-50/60 rounded-lg border border-blue-100/50">
              <Phone className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-medium text-gray-500">Telefon</p>
                <p className="text-xs text-gray-900">+36 30 123 4567</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-blue-50/60 rounded-lg border border-blue-100/50">
              <Mail className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-medium text-gray-500">Email</p>
                <p className="text-xs text-gray-900">info@etterem.hu</p>
              </div>
            </div>
            <div className="flex items-start gap-2 p-2 bg-blue-50/60 rounded-lg border border-blue-100/50">
              <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-[10px] font-medium text-gray-500">
                  Weboldal
                </p>
                <p className="text-xs text-gray-900">www.etterem.hu</p>
              </div>
            </div>
          </>
        )}

        {activeTab === "hours" && (
          <>
            {[
              { day: "Hétfő", hours: "11:00 - 22:00", kitchen: "21:30-ig" },
              { day: "Kedd", hours: "11:00 - 22:00", kitchen: "21:30-ig" },
              { day: "Szerda", hours: "11:00 - 22:00", kitchen: "21:30-ig" },
              { day: "Csütörtök", hours: "11:00 - 22:00", kitchen: "21:30-ig" },
              { day: "Péntek", hours: "11:00 - 23:00", kitchen: "22:30-ig" },
              { day: "Szombat", hours: "12:00 - 23:00", kitchen: "22:30-ig" },
              { day: "Vasárnap", hours: "Zárva", closed: true },
            ].map((item) => (
              <div
                key={item.day}
                className={`p-2 rounded-lg border ${
                  item.closed
                    ? "bg-red-50/60 border-red-200/50"
                    : "bg-blue-50/60 border-blue-200/50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-gray-900">
                    {item.day}
                  </span>
                  <div className="text-right">
                    <p
                      className={`text-xs font-semibold ${
                        item.closed ? "text-red-600" : "text-gray-900"
                      }`}
                    >
                      {item.hours}
                    </p>
                    {item.kitchen && (
                      <p className="text-[10px] text-gray-500">
                        Konyha: {item.kitchen}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "services" && (
          <div className="grid grid-cols-2 gap-1">
            {[
              "Kutyabarát",
              "Vegán opciók",
              "WiFi",
              "Parkolás",
              "Terasz",
              "Gyerekbarát",
            ].map((service) => (
              <div
                key={service}
                className="flex items-center gap-1.5 p-1.5 bg-blue-50/60 rounded-md border border-blue-100/50"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span className="text-[10px] font-medium text-gray-900">
                  {service}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Chat Header
const ChatHeader = ({ t, showInfoPanel, setShowInfoPanel }) => {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Bukio Demo Étterem",
          text: "Foglalj asztalt online!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link másolva!");
      }
    } catch (err) {
      console.log("Share cancelled");
    }
  };

  return (
    <>
      <div className="mb-3 pb-3 border-b border-gray-100">
        {/* Top row */}
        <div className="flex items-center gap-2">
          {/* Restaurant image */}
          <div className="w-15 h-15 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 shadow-md flex-shrink-0 overflow-hidden border-2 border-white relative">
            <Image
              src={photoBorito}
              alt="Étterem logó"
              fill
              className="object-cover"
            />
          </div>

          {/* Name and subtitle */}
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-gray-900 leading-tight">
              {MOCK_RESTAURANT.name}
            </h2>
            <p className="text-xs text-gray-500">{t.chatSubtitle}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1">
            <LanguageSwitcher />

            <button
              type="button"
              onClick={() => setShowInfoPanel(true)}
              tabIndex={-1}
              className="w-8 h-8 rounded-full bg-teal-100 hover:bg-teal-200 flex items-center justify-center transition-colors"
            >
              <Info className="w-4 h-4 text-teal-700" />
            </button>

            <button
              type="button"
              onClick={handleShare}
              tabIndex={-1}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Social media row */}
        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-400">Kövess minket:</span>
          <a
            href="#"
            tabIndex={-1}
            className="w-7 h-7 rounded-lg bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors"
          >
            <Facebook className="w-3.5 h-3.5 text-blue-600" />
          </a>
          <a
            href="#"
            tabIndex={-1}
            className="w-7 h-7 rounded-lg bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-pink-600" />
          </a>
        </div>
      </div>

      {/* Info Panel Modal */}
      {showInfoPanel && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            onClick={() => setShowInfoPanel(false)}
          />
          <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <RestaurantInfoPanel onClose={() => setShowInfoPanel(false)} />
          </div>
        </>
      )}
    </>
  );
};

// Progress Bar
const ProgressBar = ({ currentStep, t }) => {
  const mainSteps = [
    "date",
    "partySize",
    "duration",
    "time",
    "name",
    "summary",
  ];
  const currentIndex = mainSteps.findIndex((s) => s === currentStep);
  const progress =
    currentIndex >= 0 ? ((currentIndex + 1) / mainSteps.length) * 100 : 0;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs text-gray-500 mb-1">
        <span>{t.progressLabel}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className={`h-1.5 rounded-full ${colors.accent} overflow-hidden`}>
        <div
          className={`h-full ${colors.button.bg} transition-all duration-500 ease-out rounded-full`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

// Message Bubble
const MessageBubble = ({ message, isBot }) => {
  return (
    <div
      className={`flex ${
        isBot ? "justify-start" : "justify-end"
      } mb-2 animate-fadeIn`}
    >
      {isBot && (
        <div
          className={`w-6 h-6 rounded-full overflow-hidden mr-1.5 flex-shrink-0 relative ${
            !photoBorito ? colors.button.bg : ""
          }`}
        >
          {photoBorito ? (
            <Image
              src={photoBorito}
              alt="Étterem logó"
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Utensils className={`w-3 h-3 ${colors.button.text}`} />
            </div>
          )}
        </div>
      )}
      <div
        className={`max-w-[85%] rounded-2xl px-3 py-2 ${
          isBot
            ? `${colors.container} border ${colors.input.border} shadow-sm`
            : `${colors.button.bg} ${colors.button.text}`
        }`}
      >
        <div className="text-xs whitespace-pre-wrap leading-relaxed">
          {message.text}
        </div>
      </div>
    </div>
  );
};

// Typing Indicator
const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-2">
      <div
        className={`w-6 h-6 rounded-full ${colors.button.bg} flex items-center justify-center mr-1.5 flex-shrink-0`}
      >
        <Utensils className={`w-3 h-3 ${colors.button.text}`} />
      </div>
      <div
        className={`${colors.container} border ${colors.input.border} rounded-2xl px-3 py-2 shadow-sm`}
      >
        <div className="flex gap-1">
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
          <div
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.15s" }}
          />
          <div
            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}
          />
        </div>
      </div>
    </div>
  );
};

// Quick Reply Chips
const QuickReplies = ({ options, onSelect, disabled }) => {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((option, index) => (
        <button
          key={option.value ?? index}
          type="button"
          onClick={() => onSelect(option.value)}
          disabled={disabled}
          tabIndex={-1}
          className={`
            px-3 py-1.5 rounded-full text-xs font-medium
            transition-all duration-200
            ${colors.button.bg} ${colors.button.text}
            hover:opacity-90 active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

// Chat Input
const ChatInput = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  type = "text",
  error,
  inputId,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex gap-1.5">
        <input
          id={inputId}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          tabIndex={-1}
          className={`
            flex-1 px-3 py-2 rounded-full border text-xs
            ${
              error
                ? "border-red-400 bg-red-50"
                : `${colors.input.border} ${colors.input.bg}`
            }
            ${colors.input.text}
            focus:outline-none focus:ring-2 focus:ring-blue-500/30
            transition-all
          `}
          style={{ fontSize: "16px" }}
        />
        <button
          type="button"
          onClick={onSubmit}
          disabled={!value.trim()}
          tabIndex={-1}
          className={`
            p-2 rounded-full ${colors.button.bg} ${colors.button.text}
            hover:opacity-90 active:scale-95 transition-all
            disabled:opacity-50 disabled:cursor-not-allowed
            shadow-sm
          `}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-600 ml-3 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
};

// Custom Calendar Component with Popup
const DatePicker = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const today = dayjs();
  const maxDate = today.add(30, "days");

  const daysInMonth = currentMonth.daysInMonth();
  const firstDayOfMonth = currentMonth.startOf("month").day(); // 0 = Sunday
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; // Monday = 0

  const dayNames = ["H", "K", "Sze", "Cs", "P", "Szo", "V"];

  const canGoPrev = currentMonth
    .startOf("month")
    .isAfter(today.startOf("month").subtract(1, "day"));
  const canGoNext = currentMonth
    .startOf("month")
    .isBefore(maxDate.startOf("month"));

  const handlePrevMonth = () => {
    if (canGoPrev) setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    if (canGoNext) setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleDayClick = (day) => {
    const selectedDate = currentMonth.date(day);
    const dateStr = selectedDate.format("YYYY-MM-DD");
    onChange(dateStr);
    setIsOpen(false);
  };

  const isDayDisabled = (day) => {
    const date = currentMonth.date(day);
    return date.isBefore(today, "day") || date.isAfter(maxDate, "day");
  };

  const isDaySelected = (day) => {
    if (!value) return false;
    const date = currentMonth.date(day);
    return date.format("YYYY-MM-DD") === value;
  };

  const isToday = (day) => {
    const date = currentMonth.date(day);
    return date.format("YYYY-MM-DD") === today.format("YYYY-MM-DD");
  };

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        tabIndex={-1}
        className={`
          w-full px-4 py-3 rounded-xl border ${colors.input.border} ${colors.container}
          flex items-center justify-center gap-2
          text-sm font-medium ${colors.heading}
          hover:bg-gray-50 transition-all
          shadow-sm
        `}
      >
        <Calendar className="w-4 h-4 text-gray-500" />
        {value
          ? dayjs(value).format("YYYY. MMMM D. (dddd)")
          : "Válassz dátumot..."}
      </button>

      {/* Popup calendar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Calendar popup with glassmorphism - positioned higher */}
          <div
            className={`
            absolute bottom-full left-0 right-0 mb-2 z-20
            rounded-2xl overflow-hidden
            bg-white/80 backdrop-blur-xl
            border border-white/50
            shadow-[0_8px_32px_rgba(0,0,0,0.12)]
            animate-fadeIn
          `}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-3 py-2.5 bg-white/50 border-b border-white/30`}
            >
              <button
                type="button"
                onClick={handlePrevMonth}
                disabled={!canGoPrev}
                tabIndex={-1}
                className={`p-1.5 rounded-lg hover:bg-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              <span className={`text-sm font-semibold ${colors.heading}`}>
                {currentMonth.format("YYYY. MMMM")}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                disabled={!canGoNext}
                tabIndex={-1}
                className={`p-1.5 rounded-lg hover:bg-white/60 transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-0.5 px-2 pt-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="text-center text-[10px] font-semibold text-gray-400 py-1"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 p-2">
              {/* Empty cells for offset */}
              {Array.from({ length: adjustedFirstDay }).map((_, i) => (
                <div key={`empty-${i}`} className="aspect-square" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const disabled = isDayDisabled(day);
                  const selected = isDaySelected(day);
                  const todayMark = isToday(day);

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => !disabled && handleDayClick(day)}
                      disabled={disabled}
                      tabIndex={-1}
                      className={`
                      aspect-square rounded-xl text-xs font-medium
                      flex items-center justify-center
                      transition-all duration-150
                      ${
                        disabled
                          ? "text-gray-300 cursor-not-allowed"
                          : selected
                          ? `${colors.button.bg} ${colors.button.text} shadow-md scale-105`
                          : todayMark
                          ? "bg-blue-100/80 text-blue-600 hover:bg-blue-200/80 ring-1 ring-blue-200"
                          : "text-gray-700 hover:bg-white/80 hover:shadow-sm"
                      }
                    `}
                    >
                      {day}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Summary Card
const SummaryCard = ({ formData, selectedArea, t }) => {
  const items = [
    {
      icon: <Calendar className="w-3 h-3" />,
      label: t.date,
      value: dayjs(formData.reservationDate).format("YYYY. MM. DD."),
    },
    {
      icon: <Users className="w-3 h-3" />,
      label: t.partySize,
      value: `${formData.partySize} ${t.people}`,
    },
    selectedArea && {
      icon: <MapPin className="w-3 h-3" />,
      label: t.area,
      value: selectedArea.name,
    },
    {
      icon: <Clock className="w-3 h-3" />,
      label: t.duration,
      value: `${formData.duration} ${t.hours}`,
    },
    {
      icon: <Clock className="w-3 h-3" />,
      label: t.time,
      value: formData.selectedTime,
    },
    {
      icon: <User className="w-3 h-3" />,
      label: t.name,
      value: formData.customerName,
    },
    {
      icon: <Mail className="w-3 h-3" />,
      label: t.email,
      value: formData.email,
    },
    {
      icon: <Phone className="w-3 h-3" />,
      label: t.phone,
      value: formData.phone,
    },
    formData.specialRequests && {
      icon: <FileText className="w-3 h-3" />,
      label: t.specialRequests,
      value: formData.specialRequests,
    },
  ].filter(Boolean);

  return (
    <div
      className={`rounded-xl ${colors.accent} border ${colors.input.border} overflow-hidden shadow-sm`}
    >
      <div className={`px-3 py-2 ${colors.button.bg} ${colors.button.text}`}>
        <h4 className="font-semibold text-xs flex items-center gap-1.5">
          <Sparkles className="w-3 h-3" />
          {t.bookingSummary}
        </h4>
      </div>
      <div className="p-2 space-y-1.5">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`p-1 rounded ${colors.container} ${colors.text}`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] text-gray-500">{item.label}: </span>
              <span className={`text-xs font-medium ${colors.heading}`}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Back Button
const BackButton = ({ onClick, t, canGoBack }) => {
  if (!canGoBack) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      tabIndex={-1}
      className={`flex items-center gap-0.5 text-xs ${colors.text} opacity-70 hover:opacity-100 transition-opacity mb-2`}
    >
      <ChevronLeft className="w-3 h-3" />
      {t.back}
    </button>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function ChatBookingFormDemo() {
  const t = translations.hu;

  // Refs
  const messagesEndRef = useRef(null);
  const initializedRef = useRef(false);
  const timeoutRefs = useRef([]);

  // Core State
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState("welcome");
  const [stepHistory, setStepHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Form Data
  const [formData, setFormData] = useState({
    reservationDate: "",
    partySize: "",
    area: null,
    duration: "",
    selectedTime: "",
    customerName: "",
    email: "",
    phone: "",
    specialRequests: "",
    policyAccepted: false,
  });

  // UI States
  const [selectedArea, setSelectedArea] = useState(null);
  const [tempInput, setTempInput] = useState("");
  const [inputError, setInputError] = useState("");
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  // ============================================================================
  // HELPERS
  // ============================================================================

  const safeSetTimeout = useCallback((callback, delay) => {
    const timeoutId = setTimeout(callback, delay);
    timeoutRefs.current.push(timeoutId);
    return timeoutId;
  }, []);

  useEffect(() => {
    return () => {
      timeoutRefs.current.forEach(clearTimeout);
      timeoutRefs.current = [];
      initializedRef.current = false;
    };
  }, []);

  // Scroll only inside chat container, not the whole page
  const scrollToBottom = useCallback(() => {
    safeSetTimeout(() => {
      if (messagesEndRef.current) {
        const container = messagesEndRef.current.parentElement;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }
    }, 50);
  }, [safeSetTimeout]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  const addBotMessage = useCallback(
    (text, step) => {
      setIsTyping(true);
      safeSetTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), text, isBot: true, step },
        ]);
        setIsTyping(false);
      }, TYPING_DELAY);
    },
    [safeSetTimeout]
  );

  const addUserMessage = useCallback((text) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, isBot: false }]);
  }, []);

  const goToStep = useCallback(
    (step) => {
      setStepHistory((prev) => [...prev, currentStep]);
      setCurrentStep(step);
    },
    [currentStep]
  );

  const goBack = useCallback(() => {
    setStepHistory((prev) => {
      if (prev.length === 0) return prev;
      const newHistory = [...prev];
      const previousStep = newHistory.pop();
      setCurrentStep(previousStep);
      return newHistory;
    });
  }, []);

  // ============================================================================
  // MEMOIZED OPTIONS
  // ============================================================================

  const partySizeOptions = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `${i + 1} ${t.people}`,
      })),
    [t.people]
  );

  const areaOptions = useMemo(
    () =>
      MOCK_RESTAURANT.areas.map((area) => ({ value: area, label: area.name })),
    []
  );

  const durationOptions = useMemo(
    () =>
      MOCK_DURATIONS.map((dur) => ({ value: dur, label: `${dur} ${t.hours}` })),
    [t.hours]
  );

  // ============================================================================
  // INITIALIZATION
  // ============================================================================

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    safeSetTimeout(() => {
      setIsTyping(true);
      safeSetTimeout(() => {
        setMessages([
          {
            id: Date.now(),
            text: `${t.hello}! 👋\n\n${t.chatWelcome}\n\n🍽️ ${MOCK_RESTAURANT.name}`,
            isBot: true,
            step: "welcome",
          },
        ]);
        setIsTyping(false);

        safeSetTimeout(() => {
          addBotMessage(t.pleaseSelectDate, "date");
          setCurrentStep("date");
        }, MESSAGE_DELAY);
      }, TYPING_DELAY);
    }, 300);
  }, [t, addBotMessage, safeSetTimeout]);

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleDateSelect = useCallback(
    (date) => {
      addUserMessage(dayjs(date).format("YYYY. MM. DD."));
      setFormData((prev) => ({ ...prev, reservationDate: date }));

      safeSetTimeout(() => {
        addBotMessage(t.howManyPeople, "partySize");
        goToStep("partySize");
      }, MESSAGE_DELAY);
    },
    [t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]
  );

  const handlePartySizeSelect = useCallback(
    (size) => {
      addUserMessage(`${size} ${t.people}`);
      setFormData((prev) => ({ ...prev, partySize: size }));

      safeSetTimeout(() => {
        addBotMessage(t.selectArea, "area");
        goToStep("area");
      }, MESSAGE_DELAY);
    },
    [t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]
  );

  const handleAreaSelect = useCallback(
    (area) => {
      setSelectedArea(area);
      setFormData((prev) => ({ ...prev, area: area._id }));
      addUserMessage(area.name);

      safeSetTimeout(() => {
        addBotMessage(t.howLongStay, "duration");
        goToStep("duration");
      }, MESSAGE_DELAY);
    },
    [t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]
  );

  const handleDurationSelect = useCallback(
    (duration) => {
      setFormData((prev) => ({ ...prev, duration }));
      addUserMessage(`${duration} ${t.hours}`);

      safeSetTimeout(() => {
        addBotMessage(t.selectTime, "time");
        goToStep("time");
      }, MESSAGE_DELAY);
    },
    [t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]
  );

  const handleTimeSelect = useCallback(
    (timeObj) => {
      setFormData((prev) => ({ ...prev, selectedTime: timeObj.display }));
      addUserMessage(timeObj.display);

      safeSetTimeout(() => {
        addBotMessage(`${t.almostDone} 🎉\n\n${t.whatsYourName}`, "name");
        goToStep("name");
      }, MESSAGE_DELAY);
    },
    [t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]
  );

  const handleNameSubmit = useCallback(() => {
    setInputError("");
    if (!tempInput || tempInput.trim().length < 2) {
      setInputError(t.pleaseEnterValidName);
      return;
    }

    setFormData((prev) => ({ ...prev, customerName: tempInput.trim() }));
    addUserMessage(tempInput.trim());
    setTempInput("");

    safeSetTimeout(() => {
      addBotMessage(t.whatsYourEmail, "email");
      goToStep("email");
    }, MESSAGE_DELAY);
  }, [tempInput, t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]);

  const handleEmailSubmit = useCallback(() => {
    setInputError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tempInput)) {
      setInputError(t.pleaseEnterValidEmail);
      return;
    }

    setFormData((prev) => ({ ...prev, email: tempInput.trim() }));
    addUserMessage(tempInput.trim());
    setTempInput("");

    safeSetTimeout(() => {
      addBotMessage(t.whatsYourPhone, "phone");
      goToStep("phone");
    }, MESSAGE_DELAY);
  }, [tempInput, t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]);

  const handlePhoneSubmit = useCallback(() => {
    setInputError("");
    const digitsOnly = tempInput.replace(/\D/g, "");
    if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      setInputError(t.pleaseEnterValidPhone);
      return;
    }

    setFormData((prev) => ({ ...prev, phone: tempInput.trim() }));
    addUserMessage(tempInput.trim());
    setTempInput("");

    safeSetTimeout(() => {
      addBotMessage(t.anySpecialRequests, "specialRequests");
      goToStep("specialRequests");
    }, MESSAGE_DELAY);
  }, [tempInput, t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]);

  const handleSpecialRequestsSubmit = useCallback(
    (skip = false) => {
      if (!skip && tempInput.trim()) {
        setFormData((prev) => ({ ...prev, specialRequests: tempInput.trim() }));
        addUserMessage(tempInput.trim());
      } else {
        addUserMessage(t.noSpecialRequests);
      }
      setTempInput("");

      safeSetTimeout(() => {
        addBotMessage(t.pleaseAcceptPolicy, "policy");
        goToStep("policy");
      }, MESSAGE_DELAY);
    },
    [tempInput, t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]
  );

  const handlePolicyAccept = useCallback(() => {
    setFormData((prev) => ({ ...prev, policyAccepted: true }));
    addUserMessage(t.policyAccepted);

    safeSetTimeout(() => {
      addBotMessage(t.hereSummary, "summary");
      goToStep("summary");
    }, MESSAGE_DELAY);
  }, [t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]);

  const handleConfirmBooking = useCallback(() => {
    addUserMessage(t.yes);
    setIsTyping(true);

    safeSetTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: t.demoSuccess + "\n\n" + t.demoSuccessDetails,
          isBot: true,
          step: "success",
        },
      ]);
      setIsTyping(false);
      goToStep("success");
    }, 1000);
  }, [t, addUserMessage, goToStep, safeSetTimeout]);

  const handleRejectBooking = useCallback(() => {
    addUserMessage(t.modifyBooking);

    safeSetTimeout(() => {
      addBotMessage(t.whatToChange, "changeOptions");
      goToStep("changeOptions");
    }, MESSAGE_DELAY);
  }, [t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]);

  const handleChangeOption = useCallback(
    (option) => {
      if (option === "changeDate") {
        addUserMessage(t.changeDate);
        setFormData((prev) => ({ ...prev, reservationDate: "" }));
        safeSetTimeout(() => {
          addBotMessage(t.pleaseSelectDate, "date");
          setStepHistory([]);
          setCurrentStep("date");
        }, MESSAGE_DELAY);
      } else if (option === "changePartySize") {
        addUserMessage(t.changePartySize);
        safeSetTimeout(() => {
          addBotMessage(t.howManyPeople, "partySize");
          goToStep("partySize");
        }, MESSAGE_DELAY);
      } else if (option === "changeDuration") {
        addUserMessage(t.changeDuration);
        safeSetTimeout(() => {
          addBotMessage(t.howLongStay, "duration");
          goToStep("duration");
        }, MESSAGE_DELAY);
      }
    },
    [t, addBotMessage, addUserMessage, goToStep, safeSetTimeout]
  );

  const handleRestart = useCallback(() => {
    setStepHistory([]);
    setFormData({
      reservationDate: "",
      partySize: "",
      area: null,
      duration: "",
      selectedTime: "",
      customerName: "",
      email: "",
      phone: "",
      specialRequests: "",
      policyAccepted: false,
    });
    setSelectedArea(null);
    setMessages([]);
    setTempInput("");
    setInputError("");
    initializedRef.current = false;

    safeSetTimeout(() => {
      initializedRef.current = true;
      setMessages([
        {
          id: Date.now(),
          text: `${t.hello}! 👋\n\n${t.chatWelcome}\n\n🍽️ ${MOCK_RESTAURANT.name}`,
          isBot: true,
          step: "welcome",
        },
      ]);

      safeSetTimeout(() => {
        addBotMessage(t.pleaseSelectDate, "date");
        setCurrentStep("date");
      }, MESSAGE_DELAY);
    }, 300);
  }, [t, addBotMessage, safeSetTimeout]);

  // ============================================================================
  // RENDER STEP INPUT
  // ============================================================================

  const renderStepInput = () => {
    switch (currentStep) {
      case "date":
        return (
          <DatePicker
            value={formData.reservationDate}
            onChange={handleDateSelect}
          />
        );

      case "partySize":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <QuickReplies
              options={partySizeOptions}
              onSelect={handlePartySizeSelect}
            />
          </div>
        );

      case "area":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <QuickReplies options={areaOptions} onSelect={handleAreaSelect} />
          </div>
        );

      case "duration":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <QuickReplies
              options={durationOptions}
              onSelect={handleDurationSelect}
            />
          </div>
        );

      case "time":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {MOCK_TIMES.map((time, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleTimeSelect(time)}
                  tabIndex={-1}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${colors.button.bg} ${colors.button.text} hover:opacity-90 active:scale-95 shadow-sm`}
                >
                  {time.display}
                </button>
              ))}
            </div>
          </div>
        );

      case "name":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <ChatInput
              inputId="demo-name"
              value={tempInput}
              onChange={setTempInput}
              onSubmit={handleNameSubmit}
              placeholder={t.enterYourName}
              error={inputError}
            />
          </div>
        );

      case "email":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <ChatInput
              inputId="demo-email"
              value={tempInput}
              onChange={setTempInput}
              onSubmit={handleEmailSubmit}
              placeholder={t.enterYourEmail}
              type="email"
              error={inputError}
            />
          </div>
        );

      case "phone":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <ChatInput
              inputId="demo-phone"
              value={tempInput}
              onChange={setTempInput}
              onSubmit={handlePhoneSubmit}
              placeholder={t.enterYourPhone}
              type="tel"
              error={inputError}
            />
          </div>
        );

      case "specialRequests":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <ChatInput
              inputId="demo-requests"
              value={tempInput}
              onChange={setTempInput}
              onSubmit={() => handleSpecialRequestsSubmit(false)}
              placeholder={t.specialRequestsPlaceholder}
            />
            <button
              type="button"
              onClick={() => handleSpecialRequestsSubmit(true)}
              tabIndex={-1}
              className={`text-xs ${colors.text} opacity-70 hover:opacity-100`}
            >
              {t.skip} →
            </button>
          </div>
        );

      case "policy":
        return (
          <div className="space-y-2">
            <BackButton
              onClick={goBack}
              t={t}
              canGoBack={stepHistory.length > 0}
            />
            <div
              className={`p-2 rounded-xl ${colors.accent} border ${colors.input.border}`}
            >
              <p className={`text-xs ${colors.text} mb-2`}>{t.policyText}</p>
              <a
                href="https://www.bukio.hu/dokumentumok/adatkezeles"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={-1}
                className={`text-xs ${colors.subheading} underline hover:opacity-80`}
              >
                {t.readPolicy} →
              </a>
            </div>
            <QuickReplies
              options={[{ value: "accept", label: `✓ ${t.acceptPolicy}` }]}
              onSelect={handlePolicyAccept}
            />
          </div>
        );

      case "summary":
        return (
          <div className="space-y-2">
            <SummaryCard
              formData={formData}
              selectedArea={selectedArea}
              t={t}
            />
            <QuickReplies
              options={[
                { value: "confirm", label: `✓ ${t.confirmBooking}` },
                { value: "reject", label: `✗ ${t.modifyBooking}` },
              ]}
              onSelect={(value) =>
                value === "confirm"
                  ? handleConfirmBooking()
                  : handleRejectBooking()
              }
            />
          </div>
        );

      case "changeOptions":
        return (
          <QuickReplies
            options={[
              { value: "changeDate", label: `📅 ${t.changeDate}` },
              { value: "changePartySize", label: `👥 ${t.changePartySize}` },
              { value: "changeDuration", label: `⏱️ ${t.changeDuration}` },
            ]}
            onSelect={handleChangeOption}
          />
        );

      case "success":
        return (
          <div className="space-y-2">
            <a
              href="https://www.bukio.hu/regisztracio"
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              className={`block w-full text-center px-4 py-2.5 rounded-xl ${colors.button.bg} ${colors.button.text} font-semibold text-sm hover:opacity-90 transition-all shadow-md`}
            >
              {t.tryBukio} →
            </a>
            <button
              type="button"
              onClick={handleRestart}
              tabIndex={-1}
              className={`w-full text-center px-4 py-2 rounded-xl border ${colors.input.border} ${colors.text} text-xs font-medium hover:bg-gray-50 transition-all`}
            >
              {t.restartDemo}
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  // ============================================================================
  // MAIN RENDER
  // ============================================================================

  return (
    <div
      className={`${colors.container} p-4 w-full max-w-md mx-auto rounded-2xl shadow-xl border border-gray-100 flex flex-col`}
      style={{ height: "520px" }}
    >
      {/* Header */}
      <ChatHeader
        t={t}
        showInfoPanel={showInfoPanel}
        setShowInfoPanel={setShowInfoPanel}
      />

      {/* Progress Bar */}
      {!["welcome", "success"].includes(currentStep) && (
        <ProgressBar currentStep={currentStep} t={t} />
      )}

      {/* Chat Messages */}
      <div
        className="flex-1 overflow-y-auto mb-3 pr-1 scroll-smooth"
        style={{ minHeight: 0 }}
      >
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isBot={message.isBot}
          />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {currentStep !== "welcome" && (
        <div className="mt-auto pt-2 border-t border-gray-100">
          {renderStepInput()}
        </div>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
