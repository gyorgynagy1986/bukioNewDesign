'use client';

import Link from 'next/link';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube, 
  Instagram,
  Monitor,
  Apple,
  Smartphone,
  Globe,
  TabletSmartphone,
  Tv
} from 'lucide-react';

// Footer link struktúra
const footerSections = [
  {
    title: 'Bukio',
    links: [
      { label: 'Rólunk', href: '/rolunk' },
      { label: 'Karrier', href: '/karrier' },
      { label: 'Árak', href: '/arak' },
      { label: 'Vélemények', href: '/velemenyek' },
      { label: 'Partnereink', href: '/partnereink' },
      { label: 'Ajánlj minket', href: '/ajanlj-minket' },
    ],
  },
  {
    title: 'Funkciók',
    links: [
      { label: 'Asztalfoglalás Online', href: '/funkciok/asztalfoglalas' },
      { label: 'Automatikus Emlékeztetők', href: '/funkciok/emlekeztetok' },
      { label: 'Intelligens Asztaltérkép', href: '/funkciok/asztalterkep' },
      { label: 'Email Sablonok', href: '/funkciok/email-sablonok' },
      { label: 'Admin Panel', href: '/funkciok/admin-panel' },
      { label: 'Statisztikák & Riportok', href: '/funkciok/statisztikak' },
    ],
  },
  {
    title: 'Segítség',
    links: [
      { label: 'Tudásbázis', href: '/tudasbazis' },
      { label: 'Gyakori Kérdések', href: '/tudasbazis/gyik' },
      { label: 'Adatvédelmi irányelvek', href: '/adatvedelem' },
      { label: 'Felhasználási feltételek', href: '/feltelek' },
      { label: 'Kapcsolat', href: '/kapcsolat' },
      { label: 'Kérdezz szakértőt', href: '/kapcsolat#szakerto' },
    ],
  },
  {
    title: 'Megoldások',
    links: [
      { label: 'Kis Vendéglőknek', href: '/megoldasok/kiskavezok' },
      { label: 'Éttermeknek', href: '/megoldasok/ettermek' },
      { label: 'Étteremlánc', href: '/megoldasok/ettermlanc' },
      { label: 'Szállodai Éttermek', href: '/megoldasok/hotelek' },
      { label: 'Bisztrók & Kávézók', href: '/megoldasok/bisztrok' },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/bukio', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/bukio', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/bukio', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/@bukio', label: 'YouTube' },
  { icon: Instagram, href: 'https://instagram.com/bukio', label: 'Instagram' },
];

const platforms = [
  { icon: Monitor, label: 'Web App' },
  { icon: Apple, label: 'iOS' },
  { icon: Smartphone, label: 'Android' },
  { icon: TabletSmartphone, label: 'Tablet' },
  { icon: Globe, label: 'Widget' },
  { icon: Tv, label: 'Dashboard' },
];

const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal'];

export default function Footer() {
  return (
    <footer className="bg-[#0d0d14] text-gray-300">
      {/* Felső rész - disclaimer */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            <sup>1</sup> A Bukio az egyik leggyorsabban növekvő éttermi foglalási rendszer 
            Magyarországon. Adataink a 2025. januári belső statisztikáinkon alapulnak, 
            amelyet független partnerek is megerősítettek.
          </p>
        </div>
      </div>

      {/* Fő tartalom */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Social + App Store sor */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
          {/* Social Media */}
          <div>
            <h3 className="text-white font-medium mb-4">Kövess minket</h3>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* App Store gombok */}
          <div className="flex items-center gap-3">
            <Link
              href="https://apps.apple.com/bukio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black border border-gray-700 rounded-lg px-4 py-2.5 hover:bg-gray-900 transition-colors duration-200"
            >
              <Apple className="w-6 h-6 text-white" />
              <div className="text-left">
                <div className="text-[10px] text-gray-400">Töltsd le az</div>
                <div className="text-sm font-semibold text-white">App Store-ból</div>
              </div>
            </Link>
            <Link
              href="https://play.google.com/store/apps/bukio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black border border-gray-700 rounded-lg px-4 py-2.5 hover:bg-gray-900 transition-colors duration-200"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734c0-.382.218-.727.609-.92z" fill="#00D9FF"/>
                <path d="M17.556 8.235l-3.764 3.764 3.764 3.765 4.254-2.424c.482-.275.482-.934 0-1.209l-4.254-2.896z" fill="#FFCE00"/>
                <path d="M3.609 1.814L13.792 12l-3.764 3.764L3 22.186V2.734c0-.382.218-.727.609-.92z" fill="#00F076"/>
                <path d="M13.792 12L3.609 22.186a.996.996 0 00.609.92l13.338-7.341L13.792 12z" fill="#F63448"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-gray-400">SZEREZD MEG:</div>
                <div className="text-sm font-semibold text-white">Google Play</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Link oszlopok */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Platform ikonok */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="text-white font-medium mb-6">Elérhető platformok</h3>
          <div className="flex flex-wrap items-center gap-8">
            {platforms.map((platform) => (
              <div
                key={platform.label}
                className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <platform.icon className="w-7 h-7" />
                <span className="text-xs">{platform.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alsó sor */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Bukio. Minden jog fenntartva.
          </p>

          {/* Fizetési módok */}
          <div className="flex items-center gap-2">
            {/* Visa */}
            <div className="bg-white rounded px-2 py-1">
              <svg className="h-4 w-auto" viewBox="0 0 48 16" fill="none">
                <path d="M19.5 1.5L17 14.5H14L16.5 1.5H19.5Z" fill="#1A1F71"/>
                <path d="M30 1.5L26.5 14.5H23.5L25.5 6.5L24 14.5H21L24.5 1.5H27.5L25.5 9.5L27 1.5H30Z" fill="#1A1F71"/>
                <path d="M12 1.5L9 10.5L8.5 8L7.5 2.5C7.5 2.5 7.3 1.5 6 1.5H1L1 1.8C1 1.8 2.5 2.1 4 3L7 14.5H10.5L15 1.5H12Z" fill="#1A1F71"/>
              </svg>
            </div>
            {/* Mastercard */}
            <div className="bg-white rounded px-2 py-1">
              <svg className="h-4 w-auto" viewBox="0 0 32 20" fill="none">
                <circle cx="11" cy="10" r="7" fill="#EB001B"/>
                <circle cx="21" cy="10" r="7" fill="#F79E1B"/>
                <path d="M16 4.3c1.7 1.3 2.8 3.4 2.8 5.7s-1.1 4.4-2.8 5.7c-1.7-1.3-2.8-3.4-2.8-5.7s1.1-4.4 2.8-5.7z" fill="#FF5F00"/>
              </svg>
            </div>
            {/* Amex */}
            <div className="bg-[#006FCF] rounded px-2 py-1">
              <span className="text-white text-[10px] font-bold">AMEX</span>
            </div>
            {/* PayPal */}
            <div className="bg-white rounded px-2 py-1">
              <span className="text-[#003087] text-[10px] font-bold">Pay<span className="text-[#009CDE]">Pal</span></span>
            </div>
          </div>

          {/* Nyelv választó */}
          <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200">
            <Globe className="w-4 h-4" />
            <span className="text-sm">Magyar</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}