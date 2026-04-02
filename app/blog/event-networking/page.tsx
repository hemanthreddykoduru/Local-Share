import { Metadata } from 'next';
import AdUnit from '@/components/AdUnit';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import AuthorBio from '@/components/AuthorBio';
import RelatedPosts from '@/components/RelatedPosts';

export const metadata: Metadata = {
    title: 'Event Networking Made Easy: Share Contact Info Locally | Local Share Blog',
    description: 'Learn how to exchange contact information at events, conferences, and meetups without fumbling with phones or business cards using Local Share.',
    keywords: ['event networking', 'share contact info', 'conference networking', 'digital business card', 'meetup contacts'],
};

export default function EventNetworkingPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <SiteHeader />
            {/* Article Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-4 py-8">
                    <div className="text-sm text-primary-600 font-medium mb-2">NETWORKING</div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Event Networking Made Easy: Share Contact Info Locally
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Stop fumbling with phones at conferences. Drop your info in the local feed and focus on the conversation.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        Published: February 2026 • 4 min read
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
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Awkward Networking Moment</h2>
                        <p className="text-gray-600 mb-4">
                            You&apos;re at a conference. You just had a great conversation with someone. Now comes the awkward part:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                            <li>&quot;What&apos;s your LinkedIn?&quot; → Both pull out phones, search, send request</li>
                            <li>&quot;Let me give you my card&quot; → They don&apos;t have pockets, card gets lost</li>
                            <li>&quot;I&apos;ll email you&quot; → You forget their name 10 minutes later</li>
                            <li>Exchange phone numbers → Feels too personal for a professional contact</li>
                        </ul>
                        <p className="text-gray-600">
                            What if there was a better way?
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Local Share Approach</h2>
                        <p className="text-gray-600 mb-4">
                            Instead of the phone juggling, try this:
                        </p>

                        <div className="bg-green-50 p-6 rounded-xl mb-4 border border-green-200">
                            <h3 className="font-bold text-green-900 mb-3">The Smooth Move</h3>
                            <ol className="list-decimal pl-4 space-y-2 text-green-800">
                                <li>&quot;Great meeting you! I&apos;m going to drop my info in Local Share - just open local-share.tech&quot;</li>
                                <li>You post: &quot;Jane Smith | Product Manager at TechCorp | jane@techcorp.com | linkedin.com/in/janesmith&quot;</li>
                                <li>They open the site, see your info, copy what they need</li>
                                <li>Conversation continues naturally</li>
                            </ol>
                        </div>

                        <p className="text-gray-600">
                            The key advantage: you&apos;re not both staring at your phones. You stay present in the conversation while seamlessly exchanging information.
                        </p>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why It Works at Events</h2>

                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">📍</span>
                                <div>
                                    <strong className="text-gray-800">Location-Based</strong>
                                    <p className="text-sm text-gray-600">Only people at the same event see the feed. No random strangers.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">⏱️</span>
                                <div>
                                    <strong className="text-gray-800">Temporary</strong>
                                    <p className="text-sm text-gray-600">Info disappears after 1 hour. It&apos;s not a permanent public post.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">📱</span>
                                <div>
                                    <strong className="text-gray-800">No App Required</strong>
                                    <p className="text-sm text-gray-600">Anyone with a phone browser can access it. No downloads.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">💬</span>
                                <div>
                                    <strong className="text-gray-800">Context Preserved</strong>
                                    <p className="text-sm text-gray-600">Add a note: &quot;Met at the AI panel - discussed partnership&quot;</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Best Practices for Event Networking</h2>

                        <div className="space-y-4">
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-2">📝 Format Your Info Clearly</h3>
                                <p className="text-gray-600 text-sm mb-2">
                                    Make it easy to scan and copy:
                                </p>
                                <code className="block bg-gray-100 p-3 rounded text-sm">
                                    Jane Smith | Product Manager<br />
                                    TechCorp Inc.<br />
                                    jane@techcorp.com<br />
                                    linkedin.com/in/janesmith
                                </code>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-2">🎯 Add Context</h3>
                                <p className="text-gray-600 text-sm">
                                    &quot;Looking to connect with AI/ML engineers in the Bay Area&quot; or &quot;Happy to chat about product strategy&quot;
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-2">⏰ Timing Matters</h3>
                                <p className="text-gray-600 text-sm">
                                    Post during networking sessions, not during talks. The feed is most useful during breaks and social hours.
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-800 mb-2">🔒 Control What You Share</h3>
                                <p className="text-gray-600 text-sm">
                                    Share your professional email, not personal. Include only what you&apos;d put on a business card.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">For Event Organizers</h2>
                        <p className="text-gray-600 mb-4">
                            Make networking easier for your attendees:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2">
                            <li>Mention Local Share in your opening remarks</li>
                            <li>Display &quot;local-share.tech&quot; on screens during networking breaks</li>
                            <li>Use it yourself to share schedule updates or room changes</li>
                            <li>Post the event WiFi password (one less thing to announce)</li>
                        </ul>
                    </section>

                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Compared to Alternatives</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-300 text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 p-3 text-left">Method</th>
                                        <th className="border border-gray-300 p-3 text-left">Pros</th>
                                        <th className="border border-gray-300 p-3 text-left">Cons</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium">Business Cards</td>
                                        <td className="border border-gray-300 p-3">Tangible, professional</td>
                                        <td className="border border-gray-300 p-3">Easy to lose, requires carrying them</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium">LinkedIn QR</td>
                                        <td className="border border-gray-300 p-3">Digital, connects profiles</td>
                                        <td className="border border-gray-300 p-3">Both need app open, scanning issues</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium">AirDrop/Nearby</td>
                                        <td className="border border-gray-300 p-3">Quick transfer</td>
                                        <td className="border border-gray-300 p-3">iOS/Android only, same platform needed</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 p-3 font-medium bg-green-50">Local Share</td>
                                        <td className="border border-gray-300 p-3 bg-green-50">Works on any device, no app, instant</td>
                                        <td className="border border-gray-300 p-3 bg-green-50">Requires internet connection</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                </div>

                {/* CTA */}
                <div className="mt-12 bg-primary-50 p-8 rounded-2xl text-center border border-primary-100">
                    <h3 className="text-xl font-bold text-primary-900 mb-2">Ready for your next event?</h3>
                    <p className="text-primary-700 mb-4">Try Local Share at your next conference or meetup.</p>
                    <a href="/" className="inline-block bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                        Open Local Share
                    </a>
                </div>

                {/* Related Links */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <h3 className="font-bold text-gray-800 mb-4">Related Articles</h3>
                    <div className="space-y-2">
                        <a href="/blog/local-networking-without-apps" className="block text-primary-600 hover:underline">
                            → Local Networking Without Apps
                        </a>
                        <a href="/blog/classroom-collaboration-guide" className="block text-primary-600 hover:underline">
                            → Classroom Collaboration Guide
                        </a>
                    </div>
                </div>

                <AuthorBio />
                <RelatedPosts currentPath="/blog/event-networking" />
            </article>

            <SiteFooter />
        </main >
    );
}
