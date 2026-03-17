interface TabPlaceholderProps {
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
  }
  
  export default function TabPlaceholder({ title, description, linkText, linkHref }: TabPlaceholderProps) {
    return (
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>
          <a
            href={linkHref}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            {linkText}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 aspect-[4/3] flex items-center justify-center">
          <div className="text-gray-400 text-sm">{title} előnézet</div>
        </div>
      </div>
    );
  }