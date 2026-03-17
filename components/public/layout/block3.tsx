"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ChevronRight, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Globe,
  UtensilsCrossed,
  Share2,
  Info,
  ExternalLink
} from 'lucide-react';

export default function UserManagementSectionEnhanced() {
  const [activePreviewTab, setActivePreviewTab] = useState<'contact' | 'hours' | 'services' | 'social'>('contact');
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('HU');
  const [highlightPanel, setHighlightPanel] = useState(false);

  const languages = [
    { code: 'HU', name: 'Magyar', flag: '🇭🇺' },
    { code: 'EN', name: 'English', flag: '🇬🇧' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
  ];

  const translations: Record<string, Record<string, string>> = {
    HU: {
      restaurantInfo: 'Étterem információk',
      contact: 'Elérhetőség',
      hours: 'Nyitvatartás',
      services: 'Szolgáltatások',
      social: 'Közösségi',
      address: 'Cím',
      phone: 'Telefon',
      email: 'Email',
      website: 'Weboldal',
      details: 'Részletek',
      share: 'Megosztás',
      closed: 'Zárva',
      kitchen: 'Konyha',
      monday: 'Hétfő',
      tuesday: 'Kedd',
      wednesday: 'Szerda',
      sunday: 'Vasárnap',
      dogFriendly: 'Kutyabarát',
      vegan: 'Vegán',
      wifi: 'WiFi',
      parking: 'Parkolás',
      romantic: 'Romantikus',
      liveMusic: 'Élő zene',
      linkCopied: 'Link másolva a vágólapra!',
      shareText: 'Nézd meg ezt az éttermet!',
      restaurantName: 'Chatbot - beta (teszt verzió)',
    },
    EN: {
      restaurantInfo: 'Restaurant information',
      contact: 'Contact',
      hours: 'Opening hours',
      services: 'Services',
      social: 'Social',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      website: 'Website',
      details: 'Details',
      share: 'Share',
      closed: 'Closed',
      kitchen: 'Kitchen',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      sunday: 'Sunday',
      dogFriendly: 'Dog friendly',
      vegan: 'Vegan',
      wifi: 'WiFi',
      parking: 'Parking',
      romantic: 'Romantic',
      liveMusic: 'Live music',
      linkCopied: 'Link copied to clipboard!',
      shareText: 'Check out this restaurant!',
      restaurantName: 'Chatbot - beta (test version)',
    },
    DE: {
      restaurantInfo: 'Restaurant-Informationen',
      contact: 'Kontakt',
      hours: 'Öffnungszeiten',
      services: 'Leistungen',
      social: 'Soziale Medien',
      address: 'Adresse',
      phone: 'Telefon',
      email: 'E-Mail',
      website: 'Webseite',
      details: 'Details',
      share: 'Teilen',
      closed: 'Geschlossen',
      kitchen: 'Küche',
      monday: 'Montag',
      tuesday: 'Dienstag',
      wednesday: 'Mittwoch',
      sunday: 'Sonntag',
      dogFriendly: 'Hundefreundlich',
      vegan: 'Vegan',
      wifi: 'WLAN',
      parking: 'Parkplatz',
      romantic: 'Romantisch',
      liveMusic: 'Live-Musik',
      linkCopied: 'Link in die Zwischenablage kopiert!',
      shareText: 'Schau dir dieses Restaurant an!',
      restaurantName: 'Chatbot - Beta (Testversion)',
    },
    ES: {
      restaurantInfo: 'Información del restaurante',
      contact: 'Contacto',
      hours: 'Horario',
      services: 'Servicios',
      social: 'Redes sociales',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo',
      website: 'Sitio web',
      details: 'Detalles',
      share: 'Compartir',
      closed: 'Cerrado',
      kitchen: 'Cocina',
      monday: 'Lunes',
      tuesday: 'Martes',
      wednesday: 'Miércoles',
      sunday: 'Domingo',
      dogFriendly: 'Pet friendly',
      vegan: 'Vegano',
      wifi: 'WiFi',
      parking: 'Aparcamiento',
      romantic: 'Romántico',
      liveMusic: 'Música en vivo',
      linkCopied: '¡Enlace copiado al portapapeles!',
      shareText: '¡Mira este restaurante!',
      restaurantName: 'Chatbot - beta (versión de prueba)',
    },
  };

  const t = (key: string) => translations[currentLanguage]?.[key] || translations['HU'][key] || key;

  const handleShare = async () => {
    const shareData = {
      title: 'Étterem - Bukio',
      text: t('shareText'),
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert(t('linkCopied'));
      }
    } catch (err) {
      console.log('Share cancelled or failed');
    }
  };

  const handleDetailsClick = () => {
    setHighlightPanel(true);
    setTimeout(() => setHighlightPanel(false), 1500);
  };

  const previewTabs = [
    { id: 'contact' as const, label: t('contact') },
    { id: 'hours' as const, label: t('hours') },
    { id: 'services' as const, label: t('services') },
  ];

  return (
    <section className="relative py-12 lg:py-24 overflow-hidden">
      {/* Full background image */}
      <div className="absolute inset-0">
        <Image
          src="/rest.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Light overlay to keep text readable */}
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Minden fontos információ egy helyen
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Vendégeid a foglalási felületen egy kattintással megtekinthetik éttermed adatait — 4 nyelven, mobilról is tökéletesen.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-4 lg:pr-8">

            
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Átlátható étterem-infók a vendégeid számára
            </h3>
            
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Nyitvatartás, elérhetőségek, szolgáltatások — minden egy helyen, szerkeszthetően. Az információk magyar, angol, német és spanyol nyelven is megjelennek, így a külföldi vendégeid is könnyedén tájékozódhatnak.
            </p>
          </div>

          {/* Right: Restaurant Info Panel - New Design */}
          <div className="relative flex justify-center lg:justify-end">
            <div className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-500 max-w-md w-full ${
              highlightPanel ? 'ring-4 ring-teal-400 ring-opacity-50 scale-[1.02] shadow-2xl shadow-teal-200/50' : ''
            }`}>

              {/* Cover Image */}
              <div className="relative h-32 md:h-40">
                <Image 
                  src="/rest.png" 
                  alt="Étterem" 
                  fill 
                  className="object-cover" 
                />
                {/* Close button overlay */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-800/50 backdrop-blur-sm flex items-center justify-center hover:bg-gray-800/70 transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>

              {/* Profile picture - overlapping cover */}
              <div className="flex justify-center -mt-12 relative z-10">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <Image 
                    src="/restorante.webp" 
                    alt="Étterem profil" 
                    width={96} 
                    height={96} 
                    className="object-cover w-full h-full" 
                  />
                </div>
              </div>

              {/* Restaurant Name */}
              <div className="text-center px-4 pt-2 pb-3">
                <h3 className="text-base font-bold text-gray-900">{t('restaurantName')}</h3>
              </div>

              {/* Tabs - centered, teal active pill */}
              <div className="flex flex-wrap justify-center gap-1.5 px-3 pb-1.5">
                {previewTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActivePreviewTab(tab.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activePreviewTab === tab.id
                        ? 'bg-teal-600 text-white shadow-md shadow-teal-200'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Social tab link - separate row */}
              <div className="flex justify-center pb-2">
                <button
                  onClick={() => setActivePreviewTab('social')}
                  className={`px-3 py-1 text-xs font-medium transition-all border-b-2 ${
                    activePreviewTab === 'social'
                      ? 'text-teal-700 border-teal-600'
                      : 'text-gray-500 border-transparent hover:text-gray-700'
                  }`}
                >
                  {t('social')}
                </button>
              </div>

              {/* Content */}
              <div className="px-3 pb-4 space-y-2 max-h-64 overflow-y-auto">
                {activePreviewTab === 'contact' && (
                  <>
                    <div className="flex items-start gap-2.5 p-3 bg-teal-50/60 rounded-lg">
                      <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-medium text-teal-700/70 mb-0.5">{t('address')}</p>
                        <p className="text-xs font-semibold text-gray-900">Foglalj, Budapest, 2222, Magyarország</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 bg-teal-50/60 rounded-lg">
                      <Phone className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-medium text-teal-700/70 mb-0.5">{t('phone')}</p>
                        <p className="text-sm font-bold text-gray-900">+36306564162</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 bg-teal-50/60 rounded-lg">
                      <Mail className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-medium text-teal-700/70 mb-0.5">{t('email')}</p>
                        <p className="text-sm font-bold text-gray-900">hello@bukio.hu</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 p-3 bg-teal-50/60 rounded-lg">
                      <Globe className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-medium text-teal-700/70 mb-0.5">{t('website')}</p>
                        <p className="text-sm font-bold text-gray-900 inline-flex items-center gap-1">
                          www.bukio.hu
                          <ExternalLink className="w-3 h-3 text-teal-600" />
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {activePreviewTab === 'hours' && (
                  <>
                    {[
                      { day: t('monday'), hours: '17:00 - 22:00', kitchen: '21:30' },
                      { day: t('tuesday'), hours: '13:00 - 23:59', kitchen: '23:30' },
                      { day: t('wednesday'), hours: '08:00 - 20:00', kitchen: '19:30' },
                    ].map((item) => (
                      <div key={item.day} className="flex justify-between items-center p-3 bg-teal-50/60 rounded-lg">
                        <span className="text-xs font-semibold text-gray-900">{item.day}</span>
                        <div className="text-right">
                          <p className="text-xs font-bold text-gray-900">{item.hours}</p>
                          <p className="text-[10px] text-gray-500">{t('kitchen')}: {item.kitchen}</p>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-between items-center p-3 bg-red-50/60 rounded-lg">
                      <span className="text-xs font-semibold text-gray-900">{t('sunday')}</span>
                      <p className="text-xs font-bold text-red-600">{t('closed')}</p>
                    </div>
                  </>
                )}

                {activePreviewTab === 'services' && (
                  <div className="grid grid-cols-2 gap-1.5">
                    {[t('dogFriendly'), t('vegan'), t('wifi'), t('parking'), t('romantic'), t('liveMusic')].map((service) => (
                      <div key={service} className="flex items-center gap-1.5 p-2.5 bg-teal-50/60 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                        <span className="text-xs font-medium text-gray-900">{service}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activePreviewTab === 'social' && (
                  <div className="flex flex-wrap gap-1.5">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-100">
                      <svg className="w-3.5 h-3.5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-xs font-medium text-blue-900">Facebook</span>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors border border-pink-100">
                      <svg className="w-3.5 h-3.5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <span className="text-xs font-medium text-pink-900">Instagram</span>
                    </a>
                    <a href="https://wolt.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-100">
                      <UtensilsCrossed className="w-3.5 h-3.5 text-indigo-600" />
                      <span className="text-xs font-medium text-indigo-900">Wolt</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}