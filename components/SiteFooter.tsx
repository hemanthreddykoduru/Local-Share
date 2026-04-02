import Link from 'next/link';

export default function SiteFooter() {
    return (
        <footer className="bg-gray-900 text-gray-400 mt-auto">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-8">
                {/* Top row */}
                <div className="flex flex-col md:flex-row justify-between gap-8 mb-10">
                    {/* Brand */}
                    <div className="max-w-xs">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="text-white font-bold text-lg">Local Share</span>
                        </div>
                        <p className="text-sm leading-relaxed">
                            Instantly share text and links with people physically nearby. No login. No install. 100% anonymous.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-12">
                        <div>
                            <p className="text-white font-semibold mb-3 text-sm">Product</p>
                            <div className="flex flex-col gap-2 text-sm">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                                <Link href="/faq" className="hover:text-white transition-colors">FAQ</Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-semibold mb-3 text-sm">Company</p>
                            <div className="flex flex-col gap-2 text-sm">
                                <Link href="/about" className="hover:text-white transition-colors">About</Link>
                                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                            </div>
                        </div>
                        <div>
                            <p className="text-white font-semibold mb-3 text-sm">Legal</p>
                            <div className="flex flex-col gap-2 text-sm">
                                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom row */}
                <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <p>© {new Date().getFullYear()} Local Share · Anonymous · Local · Secure</p>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
