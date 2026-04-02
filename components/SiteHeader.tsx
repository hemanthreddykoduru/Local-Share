import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SiteHeader() {
    return (
        <header className="bg-white border-b border-gray-100 py-4 px-6 md:px-12 flex flex-col sm:flex-row sm:items-center justify-between shadow-sm sticky top-0 z-50">
            <div className="mb-4 sm:mb-0 flex items-center gap-4">
                <Link href="/" className="text-gray-500 hover:text-primary-600 transition-colors hidden sm:flex items-center gap-1 text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    App
                </Link>
                <h1 className="text-2xl font-black tracking-tight text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                    <Link href="/">Local Share</Link>
                </h1>
            </div>
            <nav className="flex flex-wrap gap-4 sm:space-x-6 sm:gap-0">
                <Link href="/blog" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">Blog</Link>
                <Link href="/faq" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">FAQ</Link>
                <Link href="/about" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">About</Link>
                <Link href="/contact" className="text-sm font-semibold text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
            </nav>
        </header>
    );
}
