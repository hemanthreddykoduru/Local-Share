import { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AuthorBio from '@/components/AuthorBio';
import RelatedPosts from '@/components/RelatedPosts';

export const metadata: Metadata = {
    title: 'Share WiFi Passwords Instantly with Local Share | Local Share Blog',
    description: 'Learn how to share WiFi passwords with guests, visitors, and event attendees instantly using Local Share - no apps, no typing long passwords.',
    keywords: ['share wifi password', 'wifi sharing', 'guest wifi', 'event wifi', 'instant wifi sharing'],
};

export default function ShareWifiPasswordsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <SiteHeader />
            {/* Article Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <div className="text-sm text-primary-600 font-medium mb-2">TIPS & TRICKS</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Share WiFi Passwords Instantly with Local Share
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Stop spelling out complex passwords. Drop them in the local feed and everyone can copy-paste.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        Published: February 2026 • 3 min read
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <AdUnit slotId="BLOG_POST_TOP_AD" format="auto" />
                </div>
                <div className="prose prose-lg max-w-none">

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">The WiFi Password Problem</h2>
                        <p className="text-gray-600 mb-4">
                            We&apos;ve all been there. A guest asks for the WiFi password, and you have to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                            <li>Find where you wrote it down</li>
                            <li>Spell out &quot;xK9#mPq2$nL&quot; character by character</li>
                            <li>Watch them type it wrong three times</li>
                            <li>Finally connect after 5 minutes of frustration</li>
                        </ul>
                        <p className="text-gray-600">
                            With Local Share, this becomes a 10-second process.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Simple Solution</h2>

                        <div className="bg-blue-50 p-6 rounded-xl mb-4 border border-blue-200">
                            <h3 className="font-bold text-blue-900 mb-3">How It Works</h3>
                            <ol className="list-decimal pl-4 space-y-2 text-blue-800">
                                <li><strong>You:</strong> Open Local Share and post: &quot;WiFi: MyNetwork / Password: xK9#mPq2$nL&quot;</li>
                                <li><strong>Guest:</strong> Opens Local Share on their phone</li>
                                <li><strong>Guest:</strong> Sees your message, long-presses to copy the password</li>
                                <li><strong>Guest:</strong> Pastes into WiFi settings. Done!</li>
                            </ol>
                        </div>

                        <p className="text-gray-600">
                            No verbal spelling. No typos. No frustration. The password auto-deletes after 1 hour for security.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Perfect For...</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-2">🏠 Homes</h3>
                                <p className="text-gray-600 text-sm">
                                    When friends visit, just post the password once. Everyone can grab it.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-2">☕ Cafés & Restaurants</h3>
                                <p className="text-gray-600 text-sm">
                                    Staff posts the daily password. Customers check the local feed instead of asking.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-2">🎤 Events & Conferences</h3>
                                <p className="text-gray-600 text-sm">
                                    Organizers post event WiFi. Hundreds of attendees connect without bottlenecks.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-2">🏢 Co-Working Spaces</h3>
                                <p className="text-gray-600 text-sm">
                                    New members get instant access. No need to track down staff.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Security Considerations</h2>
                        <p className="text-gray-600 mb-4">
                            You might wonder: is it safe to post WiFi passwords publicly?
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                            <li><strong>Local only:</strong> Only people within ~200m can see it (they&apos;re already in your space)</li>
                            <li><strong>Auto-expiry:</strong> The password disappears after 1 hour</li>
                            <li><strong>Guest networks:</strong> Use a separate guest network for visitors anyway</li>
                            <li><strong>You control timing:</strong> Post it when guests arrive, it&apos;s gone by the time they leave</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Pro Tips</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Format clearly: &quot;Network: [name] | Password: [password]&quot;</li>
                            <li>Include any special instructions (e.g., &quot;Click Accept on the captive portal&quot;)</li>
                            <li>For events, consider posting other useful info too (schedule link, venue map, etc.)</li>
                        </ul>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-12 bg-primary-50 p-8 rounded-2xl text-center border border-primary-100">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">Ready to try it?</h3>
                    <p className="text-primary-700 mb-4">Share your WiFi password in seconds.</p>
                    <a href="/" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                        Open Local Share
                    </a>
                </div>

                {/* Related Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Related Articles</h3>
                    <div className="space-y-2">
                        <a href="/blog/top-usage-ideas" className="block text-primary-600 hover:underline">
                            → Top 5 Use Cases for Local Share
                        </a>
                        <a href="/blog/local-networking-without-apps" className="block text-primary-600 hover:underline">
                            → Local Networking Without Apps
                        </a>
                    </div>
                </div>

                <AuthorBio />
                <RelatedPosts currentPath="/blog/share-wifi-passwords" />
            </article>

            <SiteFooter />
        </main>
    );
}
