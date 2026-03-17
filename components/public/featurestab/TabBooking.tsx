import ChatBookingFormDemo from "../../Chatbookingformdemo";

const demoLinks = [
  {
    label: "Standard",
    tag: "Népszerű",
    href: "https://www.bukio.hu/booking/standard-foglalas",
    icon: "M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z",
  },
  {
    label: "Lépésenkénti",
    href: "https://www.bukio.hu/booking/lepesenkenti-foglalas",
    icon: "M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z",
  },
  {
    label: "Chatbot",
    tag: "Beta",
    href: "https://www.bukio.hu/booking/chatbot",
    icon: "M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z",
  },
];

export default function TabBooking() {
  return (
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
      {/* Left: Description + CTA buttons */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Online Foglalási Rendszer
        </h3>
        <p className="text-gray-600 leading-relaxed mb-8">
          Vendégei bármikor, bárhonnan foglalhatnak asztalt az Ön éttermében. A
          modern, mobilbarát felület egyszerűvé teszi a foglalást, így növelheti
          vendégkörét és csökkentheti a telefonos megkereséseket.
        </p>

        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Próbálja ki élesben
        </p>

        <div className="flex flex-wrap gap-3">
          {demoLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gray-50 border border-gray-200 hover:bg-white hover:border-gray-300 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-200"
            >
              <span className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center text-gray-500 group-hover:text-blue-600 group-hover:border-blue-100 group-hover:bg-blue-50 transition-all shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
                </svg>
              </span>
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                {link.label}
              </span>
              {link.tag && (
                <span className={`text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-md ${
                  link.tag === "Beta"
                    ? "bg-amber-50 text-amber-600 border border-amber-200/50"
                    : "bg-blue-50 text-blue-600 border border-blue-200/50"
                }`}>
                  {link.tag}
                </span>
              )}
              <svg
                className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-all group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Right: Live Demo */}
      <div className="relative">
        <div className="sticky top-8">
          <ChatBookingFormDemo />
        </div>
      </div>
    </div>
  );
}