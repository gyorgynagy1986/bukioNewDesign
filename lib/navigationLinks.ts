// Navigation Links Configuration for Bukio
// Központi navigációs linkek kezelése

export interface NavLink {
    label: string;
    href: string;
  }
  
  export interface NavDropdownSection {
    title: string;
    links: NavLink[];
  }
  
  export interface NavDropdown {
    label: string;
    sections: NavDropdownSection[];
    viewAllLink?: NavLink;
  }
  
  export interface Language {
    code: string;
    name: string;
    flag: string;
    href: string;
  }
  
  // ============================================
  // LANGUAGES / NYELVEK
  // ============================================
  export const languages: Language[] = [
    { code: 'hu', name: 'Magyar', flag: '🇭🇺', href: '/' },
    { code: 'en', name: 'English', flag: '🇬🇧', href: '/en' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪', href: '/de' },
    { code: 'es', name: 'Español', flag: '🇪🇸', href: '/es' },
  ];
  
  // ============================================
  // MAIN NAVIGATION LINKS / FŐ NAVIGÁCIÓ
  // ============================================
  export const mainLinks: NavLink[] = [
    { label: 'Árak', href: '/arak' },
    { label: 'Kapcsolat', href: '/kapcsolat' },
  ];
  
  // ============================================
  // FUNKCIÓK DROPDOWN
  // ============================================
  export const funkcioDropdown: NavDropdown = {
    label: 'Funkciók',
    sections: [
      {
        title: 'Foglaláskezelés',
        links: [
          { label: 'Asztalfoglalás Online', href: '/funkciok/asztalfoglalas' },
          { label: 'Automatikus Emlékeztetők', href: '/funkciok/emlekeztetok' },
          { label: 'Intelligens Asztaltérkép', href: '/funkciok/asztalterkep' },
        ],
      },
      {
        title: 'Adminisztráció',
        links: [
          { label: 'Email Sablonok', href: '/funkciok/email-sablonok' },
          { label: 'Admin Panel', href: '/funkciok/admin-panel' },
          { label: 'Statisztikák & Riportok', href: '/funkciok/statisztikak' },
        ],
      },
    ],
    viewAllLink: { label: 'Összes funkció', href: '/funkciok' },
  };
  
  // ============================================
  // MEGOLDÁSOK DROPDOWN
  // ============================================
  export const megoldasokDropdown: NavDropdown = {
    label: 'Megoldások',
    sections: [
      {
        title: 'Típus szerint',
        links: [
          { label: 'Kis Vendéglőknek', href: '/megoldasok/kiskavezok' },
          { label: 'Éttermeknek', href: '/megoldasok/ettermek' },
          { label: 'Étteremlánc', href: '/megoldasok/ettermlanc' },
        ],
      },
      {
        title: 'Speciális',
        links: [
          { label: 'Szállodai Éttermek', href: '/megoldasok/hotelek' },
          { label: 'Bisztrók & Kávézók', href: '/megoldasok/bisztrok' },
        ],
      },
    ],
  };
  
  // ============================================
  // TUDÁSBÁZIS DROPDOWN
  // ============================================
  export const tudasbazisDropdown: NavDropdown = {
    label: 'Tudásbázis',
    sections: [
      {
        title: 'Kezdő lépések',
        links: [
          { label: 'Első Lépések', href: '/tudasbazis/kezdolakesek' },
          { label: 'Bevezetési Útmutató', href: '/tudasbazis/bevezetes' },
          { label: 'Gyakori Kérdések', href: '/tudasbazis/gyik' },
        ],
      },
      {
        title: 'Források',
        links: [
          { label: 'Videó Oktatóanyagok', href: '/tudasbazis/video-oktatoanyagok' },
          { label: 'Blog & Tippek', href: '/tudasbazis/blog' },
          { label: 'API Dokumentáció', href: '/tudasbazis/api-dokumentacio' },
        ],
      },
    ],
  };
  
  // ============================================
  // AUTH LINKS / BEJELENTKEZÉS
  // ============================================
  export const authLinks = {
    login: { label: 'Bejelentkezés', href: '/bejelentkezes' },
    register: { label: 'Kipróbálom', href: '/regisztracio' },
  };
  
  // ============================================
  // ALL DROPDOWNS (for iteration)
  // ============================================
  export const dropdowns: NavDropdown[] = [
    funkcioDropdown,
    megoldasokDropdown,
    tudasbazisDropdown,
  ];
  
  // ============================================
  // FLAT LINKS (összes link egy tömbben)
  // ============================================
  export const getAllLinks = (): NavLink[] => {
    const allLinks: NavLink[] = [
      { label: 'Főoldal', href: '/' },
      ...mainLinks,
      authLinks.login,
      authLinks.register,
    ];
  
    dropdowns.forEach((dropdown) => {
      dropdown.sections.forEach((section) => {
        allLinks.push(...section.links);
      });
      if (dropdown.viewAllLink) {
        allLinks.push(dropdown.viewAllLink);
      }
    });
  
    return allLinks;
  };
  
  // ============================================
  // HELPER: Get flat links for a dropdown (mobile nav)
  // ============================================
  export const getDropdownFlatLinks = (dropdown: NavDropdown): NavLink[] => {
    const links: NavLink[] = [];
    dropdown.sections.forEach((section) => {
      links.push(...section.links);
    });
    return links;
  };