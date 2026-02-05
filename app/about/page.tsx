import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us - Local Share',
    description: 'Learn about Local Share, our mission to enable instant, private local communication, and how we built a tool that connects people nearby without compromising privacy.',
    keywords: ['about local share', 'local sharing app', 'anonymous sharing', 'privacy-first communication'],
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <section className="bg-primary-600 text-white py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4">About Local Share</h1>
                    <p className="text-xl text-primary-100">
                        Connecting people nearby through instant, anonymous text sharing
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="max-w-4xl mx-auto px-4 py-12">
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

            {/* Footer CTA */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to try it?</h2>
                    <p className="text-gray-600 mb-6">
                        Start sharing with people nearby in seconds.
                    </p>
                    <a
                        href="/"
                        className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                    >
                        Open Local Share
                    </a>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-50 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-600">
                    <div className="flex justify-center gap-6 mb-4">
                        <a href="/" className="hover:text-gray-900 hover:underline">Home</a>
                        <a href="/blog" className="hover:text-gray-900 hover:underline">Blog</a>
                        <a href="/faq" className="hover:text-gray-900 hover:underline">FAQ</a>
                        <a href="/privacy" className="hover:text-gray-900 hover:underline">Privacy</a>
                        <a href="/terms" className="hover:text-gray-900 hover:underline">Terms</a>
                    </div>
                    <p className="text-xs text-gray-500">
                        Local Share • Anonymous • Local • Secure
                    </p>
                </div>
            </footer>
        </main>
    );
}
