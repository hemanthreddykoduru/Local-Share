import { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AuthorBio from '@/components/AuthorBio';
import RelatedPosts from '@/components/RelatedPosts';

export const metadata: Metadata = {
    title: 'Privacy-First Design: How Local Share Protects Your Data | Local Share Blog',
    description: 'Deep dive into the privacy architecture of Local Share. Learn how we built a location-based tool that never stores your exact location and deletes all data automatically.',
    keywords: ['privacy design', 'data protection', 'anonymous sharing', 'location privacy', 'GDPR compliant'],
};

export default function PrivacyFirstDesignPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <SiteHeader />
            {/* Article Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <div className="text-sm text-primary-600 font-medium mb-2">DEEP DIVE</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Privacy-First Design: How Local Share Protects Your Data
                    </h1>
                    <p className="text-gray-600 text-lg">
                        A technical look at the privacy architecture behind a location-based tool that doesn&apos;t track you.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        Published: February 2026 • 7 min read
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Privacy Paradox of Location Apps</h2>
                        <p className="text-gray-600 mb-4">
                            Location-based applications face an inherent tension: they need location data to function, but users are rightfully concerned about how that data is used and stored.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Many popular apps solve this by collecting and storing precise GPS coordinates, building detailed location histories, and using this data for advertising or analytics. This approach works for the business, but it puts user privacy at risk.
                        </p>
                        <p className="text-gray-600">
                            At Local Share, we asked a different question: <strong>Can we build a useful location-based tool without ever storing anyone&apos;s exact location?</strong> The answer is yes.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Geo-Cell Approach</h2>
                        <p className="text-gray-600 mb-4">
                            Instead of transmitting and storing precise GPS coordinates, Local Share uses a system called <strong>geo-cells</strong>. Here&apos;s how it works:
                        </p>

                        <div className="bg-gray-100 p-6 rounded-xl mb-4">
                            <h3 className="font-bold text-gray-800 mb-3">Step-by-Step Process</h3>
                            <ol className="list-decimal pl-4 space-y-3 text-gray-700">
                                <li>
                                    <strong>Client-Side Calculation:</strong> When you open Local Share, your browser requests your GPS position from your device. This happens entirely on your device.
                                </li>
                                <li>
                                    <strong>Cell ID Generation:</strong> Using your coordinates, JavaScript running in your browser calculates which geo-cell you&apos;re in. Think of it like determining which square you&apos;re standing in on a giant invisible grid.
                                </li>
                                <li>
                                    <strong>Only ID Transmitted:</strong> Only this cell ID (a simple string like &quot;4j7x2k9m&quot;) is sent to our servers—not your actual latitude and longitude.
                                </li>
                                <li>
                                    <strong>Matching:</strong> Our server matches you with other users who have the same cell ID. That&apos;s it.
                                </li>
                            </ol>
                        </div>

                        <p className="text-gray-600">
                            The key insight: even if someone gained access to our database, they could only see cell IDs. They could not reverse-engineer anyone&apos;s exact position because many different precise coordinates map to the same cell.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">No Accounts = No Identity Tracking</h2>
                        <p className="text-gray-600 mb-4">
                            Traditional apps tie your activity to an account—usually linked to an email or phone number. This creates a persistent identity that can be tracked over time and across sessions.
                        </p>
                        <p className="text-gray-600 mb-4">
                            Local Share takes a different approach:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                            <li><strong>No account creation:</strong> You don&apos;t sign up, so there&apos;s no profile to track</li>
                            <li><strong>Ephemeral identity:</strong> You pick a display name each session (can be anything)</li>
                            <li><strong>No cookies for identification:</strong> We don&apos;t set tracking cookies</li>
                            <li><strong>Session-based:</strong> Each visit is essentially independent</li>
                        </ul>
                        <p className="text-gray-600">
                            The result: there&apos;s no way to correlate &quot;the person who was at the coffee shop on Tuesday&quot; with &quot;the person who was at the park on Wednesday.&quot; Each interaction is isolated.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Automatic Data Expiry</h2>
                        <p className="text-gray-600 mb-4">
                            Even the most privacy-conscious data collection becomes risky if data is stored indefinitely. Local Share solves this with aggressive automatic deletion:
                        </p>

                        <div className="bg-green-50 p-6 rounded-xl mb-4 border border-green-200">
                            <h3 className="font-bold text-green-900 mb-2">🗑️ 1-Hour Expiry Rule</h3>
                            <p className="text-green-800">
                                Every message posted on Local Share is automatically deleted after 1 hour. No exceptions. This is enforced at the database level, not just the application level.
                            </p>
                        </div>

                        <p className="text-gray-600 mb-4">
                            Why 1 hour? It&apos;s long enough to be useful for real-time local communication, but short enough that:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                            <li>Content doesn&apos;t persist beyond its relevance</li>
                            <li>Even if someone shares something regrettable, it&apos;s gone quickly</li>
                            <li>Our database stays small and fast</li>
                            <li>There&apos;s no historical record to be breached</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">What We Don&apos;t Collect</h2>
                        <p className="text-gray-600 mb-4">
                            It&apos;s worth being explicit about what Local Share does <strong>not</strong> collect:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                            <li>❌ Exact GPS coordinates (latitude/longitude)</li>
                            <li>❌ Email addresses or phone numbers</li>
                            <li>❌ Device identifiers (IDFA, Android ID, etc.)</li>
                            <li>❌ IP addresses (not logged)</li>
                            <li>❌ Browsing history or referrers</li>
                            <li>❌ Third-party analytics data</li>
                            <li>❌ Advertising identifiers</li>
                        </ul>
                        <p className="text-gray-600">
                            What we <strong>do</strong> temporarily store: geo-cell ID (not exact location), display name (you choose it), message content (deleted after 1 hour), and timestamp (for expiry calculation).
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Technical Security Measures</h2>
                        <p className="text-gray-600 mb-4">
                            Beyond the privacy architecture, we implement standard security best practices:
                        </p>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <span className="text-lg">🔒</span>
                                <div>
                                    <strong className="text-gray-800">HTTPS Everywhere</strong>
                                    <p className="text-sm text-gray-600">All traffic is encrypted in transit using TLS 1.3</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-lg">🛡️</span>
                                <div>
                                    <strong className="text-gray-800">Security Headers</strong>
                                    <p className="text-sm text-gray-600">HSTS, X-Frame-Options, XSS protection headers enabled</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-lg">🔥</span>
                                <div>
                                    <strong className="text-gray-800">Database Security</strong>
                                    <p className="text-sm text-gray-600">Firestore security rules restrict access to valid geo-cell members only</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <span className="text-lg">🧹</span>
                                <div>
                                    <strong className="text-gray-800">Automatic Cleanup</strong>
                                    <p className="text-sm text-gray-600">Scheduled functions purge expired data continuously</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Comparison with Traditional Apps</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-3 text-left">Aspect</th>
                                        <th className="border border-gray-300 p-3 text-left">Traditional Apps</th>
                                        <th className="border border-gray-300 p-3 text-left">Local Share</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium">Location Storage</td>
                                        <td className="border border-gray-300 p-3 text-red-600">Exact coordinates stored</td>
                                        <td className="border border-gray-300 p-3 text-green-600">Only cell ID (no coordinates)</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium">Account Required</td>
                                        <td className="border border-gray-300 p-3 text-red-600">Yes (email/phone)</td>
                                        <td className="border border-gray-300 p-3 text-green-600">No</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium">Data Retention</td>
                                        <td className="border border-gray-300 p-3 text-red-600">Indefinite or years</td>
                                        <td className="border border-gray-300 p-3 text-green-600">1 hour maximum</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium">Third-Party Tracking</td>
                                        <td className="border border-gray-300 p-3 text-red-600">Often included</td>
                                        <td className="border border-gray-300 p-3 text-green-600">None</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium">Location History</td>
                                        <td className="border border-gray-300 p-3 text-red-600">Built over time</td>
                                        <td className="border border-gray-300 p-3 text-green-600">Not possible</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Building Privacy into the Foundation</h2>
                        <p className="text-gray-600 mb-4">
                            Privacy wasn&apos;t an afterthought for Local Share—it was the starting point. We didn&apos;t build a location app and then try to add privacy features. We asked &quot;What&apos;s the minimum data needed?&quot; and built up from there.
                        </p>
                        <p className="text-gray-600">
                            This approach is sometimes called &quot;privacy by design,&quot; and it&apos;s becoming increasingly important as users (rightfully) demand more control over their digital footprint. We believe it&apos;s possible to build useful, location-aware tools without sacrificing privacy—and Local Share is proof.
                        </p>
                    </section>

                </div>

                {/* Related Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Related Articles</h3>
                    <div className="space-y-2">
                        <a href="/blog/how-geo-cells-work" className="block text-primary-600 hover:underline">
                            → Understanding Geo-Cells: The Technology Behind Local Share
                        </a>
                        <a href="/blog/secure-local-sharing" className="block text-primary-600 hover:underline">
                            → Secure Local Sharing: Why Anonymous is Better
                        </a>
                        <a href="/privacy" className="block text-primary-600 hover:underline">
                            → Read Our Full Privacy Policy
                        </a>
                    </div>
                </div>

                <AuthorBio />
                <RelatedPosts currentPath="/blog/privacy-first-design" />
            </article>

            <SiteFooter />
        </main>
    );
}
