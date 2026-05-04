import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Homepage', href: '/admin/homepage' },
    { name: 'About Page', href: '/admin/about' },
    { name: 'Facilities', href: '/admin/facilities' },
    { name: 'News', href: '/admin/news' },
    { name: 'News Settings', href: '/admin/news-settings' },
    { name: 'Photo Gallery', href: '/admin/photos' },
    { name: 'Contact Page', href: '/admin/contact' },
  ];

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-64 md:flex-shrink-0 bg-[#8B1A1A] text-white p-4 md:p-6 overflow-y-auto border-b md:border-b-0 border-red-900">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-8">Bank CMS</h2>
        <nav className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 pb-2 md:pb-0">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap px-3 md:px-4 py-2 rounded hover:bg-red-900 transition-colors text-sm md:text-base flex-shrink-0"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 md:mb-8 text-sm md:text-base" role="alert">
          <p className="font-bold">Notice</p>
          <p>Any changes saved here will take approximately 1-2 minutes to appear on the live website while Cloudflare rebuilds the application.</p>
        </div>
        {children}
      </div>
    </div>
  );
}
