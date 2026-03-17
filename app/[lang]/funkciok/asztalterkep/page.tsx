import Link from "next/link";
import {
  Users,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  Maximize2,
} from "lucide-react";
import AsztalTerkepDemo from "./AsztalTerkepDemo";
import { dictionariesFun } from "@/app/[lang]/dictionaries";

interface AsztalTerkepPageProps {
  params: Promise<{ lang: string }>;
}

export default async function AsztalTerkepPage({
  params,
}: AsztalTerkepPageProps) {
  const { lang } = await params;
  const dict = await dictionariesFun[lang as keyof typeof dictionariesFun]();

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-50 selection:text-indigo-900 font-sans overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-indigo-50/40 to-white rounded-full blur-[120px] -mt-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        {/* Breadcrumbs */}
        <nav className="flex items-center justify-center gap-2 text-xs text-gray-400 mb-12 font-medium tracking-wide uppercase">
          <Link
            href={`/${lang}`}
            className="hover:text-gray-900 transition-colors"
          >
            {dict.asztalterkep.breadcrumbs.home}
          </Link>
          <span>/</span>
          <Link
            href={`/${lang}#features`}
            className="hover:text-gray-900 transition-colors"
          >
            {dict.asztalterkep.breadcrumbs.features}
          </Link>
          <span>/</span>
          <span className="text-indigo-600">
            {dict.asztalterkep.breadcrumbs.current}
          </span>
        </nav>

        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-100 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.04)] mb-6">
            <span className="text-xs font-semibold text-gray-700 tracking-wide">
              {dict.asztalterkep.hero.badge}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
            Lássa át éttermét <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
              egyetlen pillanat alatt.
            </span>
          </h1>

          <p className="text-lg text-gray-500 leading-relaxed font-light mb-8 max-w-2xl mx-auto">
            Nem csak egy lista. Egy élő, lélegző térkép az étterméről. Kezelje a
            foglalásokat vizuálisan, ossza ki az asztalokat drag-and-drop
            egyszerűséggel.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={`https://www.bukio.hu/auth/register`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-800 transition-all shadow-xl shadow-indigo-900/10 hover:-translate-y-1"
            >
              {dict.asztalterkep.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`https://www.bukio.hu/auth/register`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-700 text-sm font-semibold rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              {dict.asztalterkep.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        {/* CINEMATIC DEMO CONTAINER */}
        <div className="relative w-full max-w-6xl mx-auto mb-32 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-[2.5rem] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-1000"></div>

          <div className="relative rounded-2xl bg-white/60 p-2 ring-1 ring-gray-900/5 shadow-2xl backdrop-blur-sm">
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
              <AsztalTerkepDemo dict={dict.asztalterkep.demo} />
            </div>
          </div>

          <div className="absolute -bottom-6 right-8 bg-white/90 backdrop-blur border border-gray-200 px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 text-xs font-medium text-gray-600 animate-bounce">
            <Maximize2 className="w-3 h-3 text-indigo-500" />
            Interaktív nézet
          </div>
        </div>

        {/* FEATURE GRID - NO ICONS, SUBTLE COLORS */}
        <div className="mb-32 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Modern nézetek - Halvány szürke */}
            <div className="md:col-span-2 bg-[#F9FAFB] rounded-2xl p-10 border border-gray-100 hover:border-gray-200 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {dict.asztalterkep.features[0].title}
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm max-w-lg">
                Felejtse el a papírt. Az asztaltérkép nézetben egyszerűen,
                vizuálisan követheti a foglalásokat, akár egy érintőképernyős
                POS terminálon.
              </p>
            </div>

            {/* Card 2: Export - Halvány indigó */}
            <div className="bg-[#F5F7FF] rounded-2xl p-10 border border-indigo-50/50 hover:border-indigo-100 transition-colors flex flex-col justify-center">
              <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                {dict.asztalterkep.features[1].title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Egy kattintással exportálhatja a napi listát PDF vagy Excel
                formátumban.
              </p>
            </div>

            {/* Card 3: Mobile - Halvány kék */}
            <div className="bg-[#F0F9FF] rounded-2xl p-10 border border-blue-50/50 hover:border-blue-100 transition-colors flex flex-col justify-center">
              <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                {dict.asztalterkep.features[2].title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Teljes funkcionalitás mobilon és tableten is. Irányítsa az
                éttermet bárhonnan.
              </p>
            </div>

            {/* Card 4: Overview - Halvány lila */}
            <div className="md:col-span-2 bg-[#FAF5FF] rounded-2xl p-10 border border-purple-50/50 hover:border-purple-100 transition-colors">
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">
                {dict.asztalterkep.features[3].title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                Azonnal láthatja a szabad és foglalt asztalokat, valamint a
                megérkezett vendégeket. A színkódolt rendszer segít a gyors
                tájékozódásban a csúcsidőben is.
              </p>
            </div>
          </div>
        </div>

        {/* DETAILS LIST */}
        {/* DETAILS SECTION - REIMAGINED (Dashboard Style) */}
        <div className="max-w-6xl mx-auto mb-32">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                {dict.asztalterkep.bookingInfo.title}
              </h2>
              <p className="text-gray-500 text-sm">
                Minden részlet egy helyen, egy kattintásra.
              </p>
            </div>
            {/* Dekoratív vonal */}
            <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-gray-100 to-transparent mx-8 mb-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dict.asztalterkep.bookingInfo.items.map(
              (item, index: number) => {
                const icons = [Users, Clock, MapPin, Sparkles];
                const Icon = icons[index % icons.length];

                // Egyedi színkódok az egyes kártyákhoz, hogy ne legyen monoton
                const styles = [
                  "border-blue-100 bg-blue-50/30 text-blue-600",
                  "border-indigo-100 bg-indigo-50/30 text-indigo-600",
                  "border-purple-100 bg-purple-50/30 text-purple-600",
                  "border-emerald-100 bg-emerald-50/30 text-emerald-600",
                ];
                const currentStyle = styles[index % styles.length];

                return (
                  <div
                    key={index}
                    className="group relative bg-white rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
                  >
                    {/* Háttér dekoráció (Watermark) */}
                    <div
                      className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 blur-xl ${currentStyle
                        .split(" ")[1]
                        .replace("/30", "")}`}
                    ></div>

                    {/* Ikon és Label */}
                    <div className="relative z-10 flex items-center gap-2 mb-3">
                      <div className={`p-1.5 rounded-lg ${currentStyle}`}>
                        <Icon className="w-4 h-4" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {item.label}
                      </span>
                    </div>

                    {/* Érték (Nagy és hangsúlyos) */}
                    <div className="relative z-10">
                      <span className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-indigo-900 transition-colors block truncate">
                        {item.value}
                      </span>
                    </div>

                    {/* Hover effekt (alsó csík) */}
                    <div
                      className={`absolute bottom-0 left-0 w-full h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ${currentStyle
                        .split(" ")[2]
                        .replace("text-", "bg-")}`}
                    ></div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-2xl shadow-indigo-100/50">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-indigo-50 to-purple-50 rounded-full blur-3xl opacity-60 pointer-events-none -z-10"></div>

          <div className="px-8 py-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
              {dict.asztalterkep.finalCta.title}
            </h2>
            <p className="text-gray-500 mb-8 max-w-xl mx-auto font-light">
              {dict.asztalterkep.finalCta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href={`https://www.bukio.hu/auth/register?trigger=${lang}`}
                className="px-8 py-3 bg-gray-900 text-white text-sm font-semibold rounded-full hover:bg-gray-800 transition-all hover:scale-105"
              >
                {dict.asztalterkep.finalCta.ctaPrimary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
