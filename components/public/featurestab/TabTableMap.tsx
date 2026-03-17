import { Link } from "lucide-react";
import AsztalTerkepDemo from "./AsztalTerkepDemo";

const asztalTerkepDemoDict = {
  title: "Asztaltérkép",
  subtitle: "Mai foglalások",
  liveUpdate: "Élő",
  scrollHint: "Görgetés →",
  legend: {
    confirmed: "Visszaigazolt",
    pending: "Függőben",
    arrived: "Megérkezett",
  },
  notifications: {
    newBooking: "Új foglalás",
    checkIn: "Bejelentkezés",
  },
};

export default function TabTableMap() {
  return (
    <>
      {/* Text row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div className="max-w-xl">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Intelligens Asztaltérkép
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Vizuális asztalkiosztás drag-and-drop funkcióval. Lássa egy
            pillantással, mely asztalok foglaltak, és optimalizálja az ültetési
            rendet a maximális kapacitáskihasználás érdekében.
          </p>
        </div>
        <Link
          href="/funkciok/asztalterkep"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors whitespace-nowrap flex-shrink-0"
        >
          Asztaltérkép létrehozása
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Full-width demo */}
      <div className="rounded-2xl border border-gray-200 shadow-lg overflow-hidden bg-white">
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-300" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-gray-400 font-medium">
              admin.bukio.hu/asztalterkep
            </span>
          </div>
        </div>
        <AsztalTerkepDemo dict={asztalTerkepDemoDict} />
      </div>
    </>
  );
}