import Link from 'next/link';

export default function SiteFooter() {
    return (
        <footer className="py-8 bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-600">
                <div className="flex justify-center flex-wrap gap-4 md:gap-6 mb-4">
                    <Link href="/" className="hover:text-primary-600 hover:underline transition-colors font-medium">Home</Link>
                    <Link href="/about" className="hover:text-primary-600 hover:underline transition-colors font-medium">About</Link>
                    <Link href="/contact" className="hover:text-primary-600 hover:underline transition-colors font-medium">Contact</Link>
                    <Link href="/blog" className="hover:text-primary-600 hover:underline transition-colors font-medium">Blog</Link>
                    <Link href="/faq" className="hover:text-primary-600 hover:underline transition-colors font-medium">FAQ</Link>
                    <Link href="/privacy" className="hover:text-primary-600 hover:underline transition-colors font-medium">Privacy</Link>
                    <Link href="/terms" className="hover:text-primary-600 hover:underline transition-colors font-medium">Terms</Link>
                </div>
                <p className="text-xs text-gray-500">
                    Local Share • Anonymous • Local • Secure
                </p>
            </div>
        </footer>
    );
}
