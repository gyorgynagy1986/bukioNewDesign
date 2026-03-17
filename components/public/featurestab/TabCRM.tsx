"use client";

import Link from "next/link";

import {
  User,
  Mail,
  Phone,
  Calendar,
  Users,
  MapPin,
  Clock,
  BarChart3,
  X,
  Heart,
  XCircle,
  Star,
} from "lucide-react";

// --- Demo data for the CRM card ---
const guest = {
  name: "Kovács Anna",
  email: "kovacs.anna@gmail.com",
  phone: "+36 30 456 7890",
  memberSince: "2025. március 8.",
  totalBookings: 14,
  cancellations: 1,
  acceptanceRate: 93,
  noShows: 0,
  totalGuests: 38,
  avgGuests: 3,
  favoriteArea: "Terasz",
  restaurants: ["La Cucina", "Borkonyha"],
  firstBooking: "2025. március 8.",
  lastBooking: "2026. március 12.",
  lastVisit: "5 napja",
  statuses: ["Elfogadva", "Teljesítve"],
  cancelTime: "Átl. 4 órával előtte",
  cancelReasons: ["Betegség"],
};

function StatRow({ label, value, badge }: { label: string; value?: string | number; badge?: { text: string; color: string } }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-b-0">
      <span className="text-xs text-gray-500">{label}</span>
      {badge ? (
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${badge.color}`}>
          {badge.text}
        </span>
      ) : (
        <span className="text-xs font-semibold text-gray-900">{value}</span>
      )}
    </div>
  );
}

function CardSection({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-50">
        <Icon className="w-4 h-4 text-blue-500" />
        <h4 className="text-sm font-bold text-gray-800">{title}</h4>
      </div>
      <div className="px-4 py-1">{children}</div>
    </div>
  );
}

function CRMCard() {
  return (
    <div className="bg-gray-50/80 rounded-2xl border border-gray-200 shadow-lg overflow-hidden max-w-lg mx-auto lg:mx-0">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
            KA
          </div>
          <h3 className="text-base font-bold text-gray-900">{guest.name}</h3>
        </div>
        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
          <X className="w-3.5 h-3.5 text-gray-400" />
        </div>
      </div>

      {/* Cards grid */}
      <div className="p-4 grid grid-cols-2 gap-3 max-h-[480px] overflow-y-auto crm-scroll">
        {/* Személyes adatok */}
        <CardSection icon={User} title="Személyes adatok">
          <StatRow label="Név" value={guest.name} />
          <StatRow label="Email" value={guest.email} />
          <StatRow label="Telefon" value={guest.phone} />
          <StatRow label="Tag mióta" badge={{ text: guest.memberSince, color: "bg-gray-100 text-gray-700" }} />
        </CardSection>

        {/* Foglalási statisztikák */}
        <CardSection icon={BarChart3} title="Foglalási statisztikák">
          <StatRow label="Összes foglalás" badge={{ text: String(guest.totalBookings), color: "bg-blue-100 text-blue-700" }} />
          <StatRow label="Lemondások" badge={{ text: String(guest.cancellations), color: "bg-gray-100 text-gray-600" }} />
          <div className="py-2.5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-500">Elfogadási arány</span>
              <span className="text-xs font-bold text-blue-600">{guest.acceptanceRate}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${guest.acceptanceRate}%` }} />
            </div>
          </div>
          <StatRow label="Nem jelent meg" badge={{ text: String(guest.noShows), color: "bg-emerald-50 text-emerald-600" }} />
        </CardSection>

        {/* Vendégszám */}
        <CardSection icon={Users} title="Vendégszám adatok">
          <StatRow label="Összes vendég" badge={{ text: String(guest.totalGuests), color: "bg-blue-50 text-blue-700" }} />
          <StatRow label="Átlagos létszám" value={guest.avgGuests} />
        </CardSection>

        {/* Preferenciák */}
        <CardSection icon={Heart} title="Preferenciák">
          <StatRow label="Kedvenc terület" value={guest.favoriteArea} />
          <div className="py-2.5">
            <span className="text-xs text-gray-500 block mb-1.5">Éttermek</span>
            <div className="flex flex-wrap gap-1">
              {guest.restaurants.map((r) => (
                <span key={r} className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full">{r}</span>
              ))}
            </div>
          </div>
        </CardSection>

        {/* Időadatok */}
        <CardSection icon={Clock} title="Időadatok">
          <StatRow label="Első foglalás" value={guest.firstBooking} />
          <StatRow label="Utolsó foglalás" value={guest.lastBooking} />
          <StatRow label="Utolsó látogatás" badge={{ text: guest.lastVisit, color: "bg-emerald-50 text-emerald-700" }} />
        </CardSection>

        {/* Foglalási státuszok */}
        <CardSection icon={Star} title="Foglalási státuszok">
          <div className="py-2.5">
            <div className="flex flex-wrap gap-1">
              {guest.statuses.map((s) => (
                <span
                  key={s}
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    s === "Elfogadva" ? "bg-emerald-50 text-emerald-700" : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </CardSection>

        {/* Lemondási információk */}
        <CardSection icon={XCircle} title="Lemondási infó">
          <StatRow label="Lemondási idő" value={guest.cancelTime} />
          <div className="py-2.5">
            <span className="text-xs text-gray-500 block mb-1.5">Lemondási okok</span>
            <div className="flex flex-wrap gap-1">
              {guest.cancelReasons.map((r) => (
                <span key={r} className="text-[10px] font-medium px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full">{r}</span>
              ))}
            </div>
          </div>
        </CardSection>

        {/* Feedback */}
        <CardSection icon={Mail} title="Manuális review küldés">
          <div className="py-3">
            <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white text-xs font-semibold rounded-lg transition-colors">
              <Mail className="w-3.5 h-3.5" />
              Feedback Email küldés
            </button>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Email sablonoknál a feedback sablont használja!
            </p>
          </div>
        </CardSection>
      </div>
    </div>
  );
}

export default function TabCRM() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Left: Description */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Vendégkezelés & CRM
        </h3>
        <p className="text-gray-600 leading-relaxed mb-6">
          Ismerje meg vendégeit jobban! Tárolja preferenciáikat, allergiáikat,
          korábbi foglalásaikat, és nyújtson személyre szabott élményt minden
          látogatáskor.
        </p>

        <div className="space-y-4 mb-8">
          {[
            { title: "Vendégprofil", desc: "Minden vendégről részletes profil, foglalási előzményekkel és statisztikákkal." },
            { title: "Elfogadási arány", desc: "Azonnal láthatja, mennyire megbízható egy vendég — foglalások, lemondások, no-show-k egy helyen." },
            { title: "Preferenciák", desc: "Kedvenc terület, korábbi éttermek, speciális igények — személyre szabott kiszolgálás." },
            { title: "Feedback rendszer", desc: "Automatikus vagy manuális review kérés email-ben, minden látogatás után." },
          ].map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className="w-1 rounded-full bg-blue-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/funkciok/vendegkezeles"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
        >
          Vendégadatok kezelése
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Right: CRM Card Demo */}
      <div className="relative">
        <div className="sticky top-8">
          <CRMCard />
        </div>
      </div>

      <style jsx>{`
        .crm-scroll::-webkit-scrollbar { width: 4px; }
        .crm-scroll::-webkit-scrollbar-track { background: transparent; }
        .crm-scroll::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
}