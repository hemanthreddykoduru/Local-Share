import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'The Local Share Blog - GPS Clipboard',
    description: 'Insights on local sharing technology, privacy tips, and community use cases.',
};

export default function BlogIndex() {
    return (
        <main className="min-h-screen bg-white">
            <header className="bg-primary-50 border-b border-primary-100 py-16 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4">The Local Share Blog</h1>
                    <p className="text-xl text-gray-600">Insights, updates, and guides on secure location-based sharing.</p>
                </div>
            </header>

            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Article 1 */}
                    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 flex-1">
                            <div className="text-xs font-semibold text-primary-600 uppercase tracking-widest mb-2">Privacy</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                <Link href="/blog/secure-local-sharing" className="hover:text-primary-600">
                                    Why Anonymous Sharing is Safer
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Discover why ephemeral, location-based text drops are superior to email or messaging apps for quick, temporary data sharing.
                            </p>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/blog/secure-local-sharing" className="text-primary-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </article>

                    {/* Article 2 */}
                    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 flex-1">
                            <div className="text-xs font-semibold text-purple-600 uppercase tracking-widest mb-2">Technology</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                <Link href="/blog/how-geo-cells-work" className="hover:text-purple-600">
                                    Under the Hood: Geo-Cells
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                A technical deep dive into how we calculate &quot;grids&quot; to match you with nearby users without tracking your movement history.
                            </p>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/blog/how-geo-cells-work" className="text-purple-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </article>

                    {/* Article 3 */}
                    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 flex-1">
                            <div className="text-xs font-semibold text-green-600 uppercase tracking-widest mb-2">Guides</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                <Link href="/blog/top-usage-ideas" className="hover:text-green-600">
                                    Top 5 Use Cases
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                From classrooms to conferences, see how people are using GPS Clipboard to speed up collaboration.
                            </p>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/blog/top-usage-ideas" className="text-green-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </article>

                    {/* Article 4 - NEW */}
                    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 flex-1">
                            <div className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-2">Guides</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                <Link href="/blog/local-networking-without-apps" className="hover:text-blue-600">
                                    Local Networking Without Apps
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                How Local Share enables instant sharing without downloading apps, creating accounts, or sharing contact info.
                            </p>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/blog/local-networking-without-apps" className="text-blue-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </article>

                    {/* Article 5 - NEW */}
                    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 flex-1">
                            <div className="text-xs font-semibold text-red-600 uppercase tracking-widest mb-2">Deep Dive</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                <Link href="/blog/privacy-first-design" className="hover:text-red-600">
                                    Privacy-First Design
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                A technical look at how we built a location-based tool that never stores your exact location.
                            </p>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/blog/privacy-first-design" className="text-red-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </article>

                    {/* Article 6 - NEW */}
                    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 flex-1">
                            <div className="text-xs font-semibold text-orange-600 uppercase tracking-widest mb-2">Education</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                <Link href="/blog/classroom-collaboration-guide" className="hover:text-orange-600">
                                    Classroom Collaboration Guide
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                A practical guide for teachers on using Local Share for classroom activities and instant resource sharing.
                            </p>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/blog/classroom-collaboration-guide" className="text-orange-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </article>

                    {/* Article 7 - NEW */}
                    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 flex-1">
                            <div className="text-xs font-semibold text-teal-600 uppercase tracking-widest mb-2">Tips & Tricks</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                <Link href="/blog/share-wifi-passwords" className="hover:text-teal-600">
                                    Share WiFi Passwords Instantly
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Stop spelling out complex passwords. Drop them in the local feed and everyone can copy-paste.
                            </p>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/blog/share-wifi-passwords" className="text-teal-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </article>

                    {/* Article 8 - NEW */}
                    <article className="flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 flex-1">
                            <div className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-2">Networking</div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                <Link href="/blog/event-networking" className="hover:text-pink-600">
                                    Event Networking Made Easy
                                </Link>
                            </h2>
                            <p className="text-gray-600 text-sm mb-4">
                                Exchange contact info at conferences without fumbling with phones or business cards.
                            </p>
                        </div>
                        <div className="p-6 pt-0 mt-auto">
                            <Link href="/blog/event-networking" className="text-pink-600 font-medium hover:underline">
                                Read More →
                            </Link>
                        </div>
                    </article>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 border-t">
                <Link href="/" className="text-gray-500 hover:text-gray-900">← Back to App</Link>
            </div>
        </main>
    );
}
