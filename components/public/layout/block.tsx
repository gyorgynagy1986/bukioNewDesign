"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import {
  BarChart3,
  Clock,
  Users,
  X,
  Zap,
  Database,
  Globe,
  Server,
  Shield,
  Bell,
  CalendarCheck,
  Settings,
  Mail,
  MapPin,
  Star,
  UserCheck,
  FileText,
  PaintBucket,
  LayoutGrid,
  Ban,
  MessageSquare,
  Download,
  ChefHat,
  Eye,
  MousePointerClick,
  ThumbsUp,
  Map,
} from "lucide-react";
import photoPeople from "../../../public/photo2.png";
import { useState, useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin", "latin-ext"] });

/* ===== Scrolling feature items — Kinyerve a Bukio sémákból ===== */
const scrollingFeatures = [
  { icon: CalendarCheck, label: "Automata vagy kézi elfogadás" },
  { icon: Globe, label: "Többnyelvű űrlapok (HU, EN, DE, ES)" },
  { icon: Shield, label: "No-show védelem és blokkolás" },
  { icon: LayoutGrid, label: "Vizuális asztaltérkép (Drag & Drop)" },
  { icon: MapPin, label: "Több terület: terasz, belső, privát" },
  { icon: Server, label: "Felszereltség (kutyabarát, fűtés)" },
  { icon: Settings, label: "Rugalmas nyitvatartás és konyha zárás" },
  { icon: Star, label: "20+ vizuális foglalási űrlap téma" },
  { icon: UserCheck, label: "Vendég adatbázis és előzmények" },
  { icon: MessageSquare, label: "Belső megjegyzések és VIP kezelés" },
  { icon: Mail, label: "Személyre szabható e-mail sablonok" },
  { icon: Eye, label: "E-mail megnyitások követése" },
  { icon: MousePointerClick, label: "E-mail kattintások és visszapattanások" },
  { icon: FileText, label: "ÁSZF és házirend verziókövetés" },
  { icon: Ban, label: "Lemondási szabályok testreszabása" },
  { icon: Download, label: "Napi vendéglista exportálása" },
  { icon: PaintBucket, label: "Standard, kompakt vagy lépéses nézet" },
  { icon: ChefHat, label: "Kivételes napok és szezonális nyitvatartás" },
  { icon: Clock, label: "Időtartam szabályok vendégszám alapján" },
  { icon: BarChart3, label: "Valós idejű foglalási statisztikák" },
  { icon: Users, label: "Asztalkombináció nagy társaságoknak" },
  { icon: Bell, label: "Automatikus emlékeztetők kiküldése" },
  { icon: ThumbsUp, label: "Automatikus visszajelzés (Feedback) kérés" },
  { icon: Database, label: "Külső platform integrációk" },
  { icon: Map, label: "Asztal formák és forgatások kezelése" },
];

export default function FeaturesSection() {
  const [modal, setModal] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (modal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [modal]);

  return (
    <>
      {/* ===== MODAL ===== */}
      {modal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={closeModal}
        >
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]" />

          <div
            className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-xl shadow-indigo-100/50 animate-[slideUp_0.25s_ease-out] overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 shrink-0" />

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-800 cursor-pointer"
              aria-label="Bezárás"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content - Scrollable on small screens */}
            <div className="overflow-y-auto overflow-x-hidden custom-scrollbar">
              <div className="px-6 sm:px-8 pt-7 pb-1">
                <div className="inline-flex items-center gap-1.5 text-indigo-600 text-xs font-bold uppercase tracking-wide mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  Sebesség = Konverzió
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Miért nem fordulnak vissza a vendégek?
                </h3>
                <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">
                  Mert nem kell várniuk. Átlagosan{" "}
                  <span className="font-semibold text-gray-700">50ms</span>{" "}
                  válaszidővel a Bukio azonnali sikerélményt ad.
                </p>
              </div>

              <div className="mx-6 sm:mx-8 mt-5 mb-5 h-px bg-gray-100" />

              <div className="px-6 sm:px-8 space-y-5">
                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Globe className="w-[18px] h-[18px] text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Globális elérés (Edge Network)
                    </h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      A rendszer fizikailag ott fut, ahol a vendéged van. Legyen
                      Londonban vagy Budapesten, az oldal azonnal betölt.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Database className="w-[18px] h-[18px] text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Nulla várakozás
                    </h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Intelligens adatbázis-cache technológia biztosítja, hogy a
                      szabad időpontok villámgyorsan megjelenjenek.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3.5 items-start">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Server className="w-[18px] h-[18px] text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      Soha nem áll le
                    </h4>
                    <p className="text-gray-500 text-xs mt-1 leading-relaxed">
                      Skálázható Serverless architektúra: Valentin-napon vagy
                      Szilveszterkor sem lassul be a roham alatt.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mx-6 sm:mx-8 mt-7 flex items-center justify-between bg-gradient-to-br from-gray-50 via-white to-gray-50 border border-gray-100 rounded-2xl p-4">
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-indigo-600">50ms</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">
                    válaszidő
                  </p>
                </div>
                <div className="w-px h-7 bg-gray-200" />
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-indigo-600">99.9%</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">
                    üzemidő
                  </p>
                </div>
                <div className="w-px h-7 bg-gray-200" />
                <div className="text-center flex-1">
                  <p className="text-lg font-bold text-indigo-600">Stabil</p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 font-medium">
                    nagy terhelésnél
                  </p>
                </div>
              </div>

              <div className="px-6 sm:px-8 pt-6 pb-7 shrink-0">
                <button
                  onClick={closeModal}
                  className="w-full py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-xl transition-all shadow-lg shadow-gray-200 hover:shadow-xl cursor-pointer active:scale-[0.98]"
                >
                  Értem, ez meggyőző
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== FEATURES SECTION ===== */}
      <section
        className={`w-full bg-gray-50/50 py-16 md:py-20 lg:py-24 ${inter.className}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 md:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4 sm:mb-5 tracking-tight">
              A vendégélmény a foglalásnál kezdődik
            </h2>
            <p className="text-gray-500 text-md max-w-2xl leading-relaxed">
              Cseréld le az elavult űrlapokat egy modern rendszerre, ami nemcsak
              beszedi a foglalásokat, de építi az éttermed márkáját is.
            </p>
          </div>

          {/* DYNAMIC GRID: auto-rows-auto on mobile, fixed 140px on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-auto md:auto-rows-[140px] gap-6 lg:gap-8">
            {/* Large Feature Card - Left - Image */}
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-3 rounded-3xl overflow-hidden relative group min-h-[300px] md:min-h-0">
              <Image
                src={photoPeople}
                alt="Elégedett vendégek az étteremben"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white text-sm font-medium leading-snug drop-shadow-md">
                &quot;A Bukio óta 30%-kal csökkent a telefonos adminisztrációnk.&quot;
                </p>
              </div>
            </div>

            {/* Fast System Card */}
            <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-center">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Vendégközpontú, nem csak egy űrlap
              </h3>
              <p className="text-gray-600 text-sm  mb-5 sm:mb-6 leading-relaxed">
                A Bukio villámgyors betöltése azonnali bizalmat épít. Ráadásul
                minden foglaló kap egy{" "}
                <strong className="text-gray-900">saját vendég-portált</strong>,
                ahol bármikor megtekintheti és telefonálgatás nélkül kezelheti a
                foglalását. A foglaláshoz tartozó QR-kóddal pedig azonnal
                bejelentkezhet az éttermbe.
              </p>
              <button
                onClick={openModal}
                className="text-indigo-600 cursor-pointer text-sm font-bold flex items-center gap-2 group w-fit"
              >
                Miért ilyen gyors a rendszer?
                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {/* Booking Management Card */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-2 bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-7 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Kezeld a foglalásokat az üzleti célodnak megfelelően{" "}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Válaszd a kézi foglalás-jóváhagyást a teljes kontrollért, vagy
                az automatikus elfogadást a hatékonyságért. A rendszer
                diszkréten figyelmeztet a{" "}
                <strong className="text-gray-900 font-semibold">
                  problémás &quot;no-show&quot; vendégekre
                </strong>{" "}
                a kezelőfelületen.
              </p>
            </div>

            {/* Google megjelenés Card */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-gray-200/50">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1.5">
                  Google-barát kialakítás
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  A foglalási oldalad keresőoptimalizált, így a vendégek
                  könnyedén rátalálnak a Google-ben.
                </p>
              </div>
            </div>

            {/* Teljes testreszabhatóság Card */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-white border border-gray-200/80 rounded-3xl p-6 relative overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-center">
              <div className="relative z-10">
                <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                  Teljes testreszabhatóság
                </h4>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mt-1">
                  Vigyél fel annyi területet, amennyit szeretnél, adj hozzá
                  képeket, leírást — a te arculatoddal
                </p>
              </div>
            </div>

            {/* Külföldi vendégek Card */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-2 bg-gradient-to-br from-indigo-50/50 to-white rounded-3xl p-6 sm:p-7 border border-indigo-100/50">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
                Külföldi vendégek?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                A foglalási űrlap felismeri a foglaló nyelvét, és azon szólítja.
                Az automatikus e-mailek 4 nyelven szerkeszthetők, így a külföldi
                vendégek is kimagasló vendégélményben részesülnek.
              </p>
            </div>

            {/* Biztonságos Card */}
            <div className="md:col-span-1 lg:col-span-1 lg:row-span-1 bg-white border border-gray-200/80 rounded-3xl p-6 hover:shadow-lg transition-shadow flex flex-col justify-center">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5">
                Jelszó nélküli védelem
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Modern és biztonságos bejelentkezés egyszer használatos kóddal.
              </p>
            </div>

            {/* ===== AI & FEATURES BOTTOM CARD ===== */}
            <div className="md:col-span-2 lg:col-span-4 lg:row-span-2 bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                {/* Bal oldal (Szöveg) */}
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
                    Okosabb asztalkiosztás - kevesebb üres szék.
                  </h3>
                  <p className="text-blue-100 sm:pb-10 text-sm sm:text-base leading-relaxed max-w-md">
                    A rendszer tanul a foglalási mintákból, segít előre jelezni
                    a no-show kockázatot, és támogatja az asztalok
                    optimalizálását — hogy több vendéget szolgálj ki ugyanannyi
                    idő alatt, miközben minden beépített funkció automatikusan
                    működik a háttérben.
                  </p>
                </div>

                {/* Jobb oldal (Glassmorphic + Scrolling Features) */}
                <div className="relative z-10 lg:translate-x-6 h-[280px] sm:h-[320px] flex flex-col justify-center mt-2 lg:mt-0">
                  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 shrink-0">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                        <span className="text-white text-lg font-bold">B</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold tracking-wide">
                          Bukio Dashboard
                        </p>
                        <p className="text-xs text-blue-200">
                          25+ valós idejű funkció
                        </p>
                      </div>
                    </div>

                    {/* Scrolling Area with Mask Image */}
                    <div
                      className="relative flex-1 overflow-hidden w-full"
                      style={{
                        maskImage:
                          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                        WebkitMaskImage:
                          "linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)",
                      }}
                    >
                      <div
                        ref={scrollRef}
                        className="animate-[scrollUp_80s_linear_infinite] space-y-2 group-hover:[animation-play-state:paused] transition-all pt-2 pb-2"
                      >
                        {[...scrollingFeatures, ...scrollingFeatures].map(
                          (feature, i) => {
                            const Icon = feature.icon;
                            return (
                              <div
                                key={i}
                                className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl p-2.5 sm:p-3 hover:bg-white/10 transition-colors cursor-default"
                              >
                                <div className="flex items-center gap-3 overflow-hidden">
                                  <Icon className="w-4 h-4 flex-shrink-0 text-white" />
                                  <span className="text-xs sm:text-sm font-medium text-white/90 truncate">
                                    {feature.label}
                                  </span>
                                </div>
                                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider bg-green-500/20 text-green-300 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">
                                  Aktív
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes scrollUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        /* Opcionális: Szép vékony scrollbar a Modalba, ha szükség lenne rá */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #e5e7eb;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #d1d5db;
        }
      `}</style>
    </>
  );
}
