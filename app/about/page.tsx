import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'About Us - Local Share',
    description: 'Learn about Local Share, our mission to enable instant, private local communication, and how we built a tool that connects people nearby without compromising privacy.',
    keywords: ['about local share', 'local sharing app', 'anonymous sharing', 'privacy-first communication'],
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <SiteHeader />
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">About Local Share</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        Connecting people nearby through instant, anonymous text sharing
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-gray-600 mb-4">
                        Local Share was created with a simple belief: <strong>sharing information with people around you should be instant, private, and effortless</strong>.
                    </p>
                    <p className="text-gray-600 mb-4">
                        In a world where sharing a simple piece of text often requires exchanging phone numbers, email addresses, or downloading yet another app, we saw a better way. Local Share uses your device&apos;s location to create a private, temporary bulletin board for everyone within about 200 meters of you.
                    </p>
                    <p className="text-gray-600">
                        No accounts. No installs. No data collection. Just open the site and start sharing.
                    </p>
                </div>

                {/* How We Built It */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">How It Works</h2>
                    <div className="space-y-4 text-gray-600">
                        <p>
                            <strong>Geo-Cell Technology:</strong> When you visit Local Share, we calculate a &quot;geo-cell&quot; based on your approximate location. This is a small grid square (roughly 200m × 200m) that determines which messages you can see and send.
                        </p>
                        <p>
                            <strong>Privacy by Design:</strong> We never store your exact GPS coordinates. The geo-cell is computed locally on your device, and only the cell identifier is used to match you with nearby users.
                        </p>
                        <p>
                            <strong>Auto-Expiry:</strong> All messages automatically disappear after 1 hour. This keeps the feed relevant and ensures your shared content doesn&apos;t persist forever on the internet.
                        </p>
                        <p>
                            <strong>Anonymous by Default:</strong> You can choose any display name you like—no sign-up, no verification. This makes it perfect for quick, casual sharing.
                        </p>
                    </div>
                </div>

                {/* Use Cases */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Who Uses Local Share?</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-2">📚 Educators</h3>
                            <p className="text-sm text-blue-800">
                                Teachers share URLs, code snippets, or instructions with their entire class instantly without needing email lists.
                            </p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                            <h3 className="font-bold text-green-900 mb-2">🎤 Event Organizers</h3>
                            <p className="text-sm text-green-800">
                                Conference hosts share WiFi passwords, schedule links, or announcements with attendees without printing QR codes.
                            </p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                            <h3 className="font-bold text-purple-900 mb-2">🏠 Neighbors</h3>
                            <p className="text-sm text-purple-800">
                                Communities share local alerts, lost pet notices, or impromptu meetup announcements with people in the immediate area.
                            </p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
                            <h3 className="font-bold text-orange-900 mb-2">👥 Collaborative Teams</h3>
                            <p className="text-sm text-orange-800">
                                Co-working spaces and offices use it for quick text drops without cluttering Slack or email.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">🔒</span>
                            <div>
                                <strong className="text-gray-800">Privacy First</strong>
                                <p className="text-sm text-gray-600">We collect the minimum data possible and delete everything automatically.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">⚡</span>
                            <div>
                                <strong className="text-gray-800">Instant Access</strong>
                                <p className="text-sm text-gray-600">No downloads, no sign-ups, no friction. Just open and share.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">🌍</span>
                            <div>
                                <strong className="text-gray-800">Local Focus</strong>
                                <p className="text-sm text-gray-600">Built for real-world, local interactions—not global broadcasting.</p>
                            </div>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-2xl">🛠️</span>
                            <div>
                                <strong className="text-gray-800">Simple by Design</strong>
                                <p className="text-sm text-gray-600">We believe the best tools get out of your way and just work.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Our Team */}
            <section className="bg-white py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Meet the Team</h2>
                    <div className="bg-gray-50 rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start max-w-2xl mx-auto">
                        <div className="flex-shrink-0">
                            <div className="w-32 h-32 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-md">
                                HR
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">Hemanth Reddy</h3>
                            <p className="text-primary-600 font-semibold mb-4">Founder & Lead Developer</p>
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Hemanth Reddy is a software engineering student at <strong>GITAM Bengaluru</strong>, specializing in distributed systems and real-time networking. He created Local Share to solve a recurring problem he faced during university workshops and tech meetups: the friction of sharing quick links and PDFs with peers without exchanging personal contact information.
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <a href="https://linkedin.com/in/koduruhemanthreddy/" target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-50 text-[#0077b5] rounded-lg hover:bg-blue-100 transition-colors flex items-center gap-2 text-sm font-bold">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                    LinkedIn
                                </a>
                                <a href="https://x.com/ThanosReddy25" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 text-black rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2 text-sm font-bold">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    X (Twitter)
                                </a>
                                <a href="https://github.com/hemanthreddykoduru" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 text-sm font-bold">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    GitHub
                                </a>
                                <a href="https://www.instagram.com/hemanth.reddy.k/" target="_blank" rel="noopener noreferrer" className="p-2 bg-pink-50 text-[#e4405f] rounded-lg hover:bg-pink-100 transition-colors flex items-center gap-2 text-sm font-bold">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.058-1.69-.072-4.949-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to try it?</h2>
                    <p className="text-gray-600 mb-6">
                        Start sharing with people nearby in seconds.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
                    >
                        Open Local Share
                    </a>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
