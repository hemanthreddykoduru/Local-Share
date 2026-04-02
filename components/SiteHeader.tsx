import Link from 'next/link';

export default function SiteHeader() {
    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <Link href="/" className="text-xl font-black tracking-tight text-gray-900 hover:text-primary-600 transition-colors">
                        Local Share
                    </Link>
                </div>

                {/* Nav */}
                <nav className="flex items-center gap-1">
                    {[
                        { href: '/blog', label: 'Blog' },
                        { href: '/faq', label: 'FAQ' },
                        { href: '/about', label: 'About' },
                        { href: '/contact', label: 'Contact' },
                    ].map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-sm font-medium text-gray-600 hover:text-primary-600 hover:bg-primary-50 px-3 py-2 rounded-lg transition-all"
                        >
                            {label}
                        </Link>
                    ))}
                    <Link
                        href="/"
                        className="ml-2 text-sm font-semibold bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                        Open App
                    </Link>
                </nav>
            </div>
        </header>
    );
}
