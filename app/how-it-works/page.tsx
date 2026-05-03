import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'How It Works - Local Share',
    description: 'Learn how Local Share uses GPS-based geo-cells to instantly connect you with people nearby. No accounts, no installs — just open and share text within 200 meters.',
    keywords: ['how local share works', 'gps clipboard', 'geo-cell technology', 'proximity sharing', 'anonymous local messaging'],
};

const steps = [
    {
        number: '01',
        emoji: '📍',
        title: 'Open Local Share',
        description:
            'Visit local-share.tech on any device — phone, tablet, or desktop. No app download required. Your browser asks for location permission to determine your geo-cell.',
        color: 'blue',
    },
    {
        number: '02',
        emoji: '🗺️',
        title: 'Your Geo-Cell is Calculated',
        description:
            'We use your GPS signal to calculate a private "geo-cell" — a roughly 200m × 200m grid square. Only the cell ID is sent to our server, never your exact coordinates.',
        color: 'green',
    },
    {
        number: '03',
        emoji: '✍️',
        title: 'Pick a Name & Post',
        description:
            'Choose any display name (no sign-up needed) and type your message, link, or note. Hit send and your post instantly appears for everyone in the same geo-cell.',
        color: 'purple',
    },
    {
        number: '04',
        emoji: '👥',
        title: 'Nearby People See It',
        description:
            'Anyone within ~200 meters who opens Local Share sees your message in real time. They can reply or post their own messages to the shared local feed.',
        color: 'orange',
    },
    {
        number: '05',
        emoji: '🗑️',
        title: 'Auto-Deletes After 1 Hour',
        description:
            'All messages automatically expire and are permanently deleted after 1 hour. No data lingers, no history is stored. The feed stays fresh and private.',
        color: 'red',
    },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    blue:   { bg: 'bg-blue-50',   border: 'border-blue-100',   text: 'text-blue-900',   badge: 'bg-blue-100 text-blue-700' },
    green:  { bg: 'bg-green-50',  border: 'border-green-100',  text: 'text-green-900',  badge: 'bg-green-100 text-green-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-900', badge: 'bg-purple-100 text-purple-700' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-900', badge: 'bg-orange-100 text-orange-700' },
    red:    { bg: 'bg-red-50',    border: 'border-red-100',    text: 'text-red-900',    badge: 'bg-red-100 text-red-700' },
};

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <SiteHeader />

            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">How It Works</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        Local Share uses GPS-based geo-cells to create a private, temporary bulletin board for everyone within 200 meters of you.
                    </p>
                </div>
            </section>

            {/* Steps */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
                <div className="space-y-6">
                    {steps.map((step) => {
                        const c = colorMap[step.color];
                        return (
                            <div
                                key={step.number}
                                className={`${c.bg} border ${c.border} rounded-2xl p-6 sm:p-8 flex gap-6 items-start`}
                            >
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${c.badge} font-bold`}>
                                    {step.emoji}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-xs font-bold tracking-widest uppercase ${c.text} opacity-60`}>
                                            Step {step.number}
                                        </span>
                                    </div>
                                    <h2 className={`text-xl font-bold ${c.text} mb-2`}>{step.title}</h2>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* NEW SECTION: Technical Whitepaper */}
            <section className="bg-white py-24 border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg mb-8">
                        Technical Whitepaper
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-12 tracking-tight">The Engineering of <span className="text-primary-600">Spatial Privacy.</span></h2>
                    
                    <div className="prose prose-gray prose-lg max-w-none space-y-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">1. Spatial Quantization (Geo-Cells)</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                The core innovation of Local Share is our approach to spatial quantization. Instead of treating the earth as a continuous map of precise coordinates, we treat it as a discrete grid of &quot;Geo-Cells.&quot; This process is mathematically known as spatial indexing.
                            </p>
                            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 font-mono text-sm space-y-4">
                                <p className="text-primary-600 font-bold">// The Geo-Cell Calculation Logic</p>
                                <p className="text-gray-800">
                                    Precision = 0.002; // Roughly 200 meters<br />
                                    Latitude_Cell = Math.floor(User_Latitude / Precision);<br />
                                    Longitude_Cell = Math.floor(User_Longitude / Precision);<br />
                                    Cell_ID = &quot;cell_&quot; + Latitude_Cell + &quot;_&quot; + Longitude_Cell;
                                </p>
                            </div>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                By dividing the world into 200-meter increments, we ensure that two users in the same coffee shop, classroom, or office building will generate the exact same <code>Cell_ID</code>. Crucially, because this rounding happens **locally** in the browser, our servers never receive the user&apos;s high-precision GPS coordinates. We only receive the &quot;Quantized ID,&quot; making it impossible to pinpoint an individual&apos;s exact location.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">2. Ephemeral Data Lifecycle</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Data persistence is the enemy of privacy. In a traditional social network, your &quot;digital footprint&quot; grows indefinitely. Local Share employs a strict **Ephemeral Data Protocol** to ensure that information is only available when it is relevant.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-2">60-Minute TTL</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">Every document, text snippet, and link posted to a Geo-Cell is governed by a Time-To-Live (TTL) of 3,600 seconds. Our backend employs automated cleanup workers that purge expired records every minute.</p>
                                </div>
                                <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                                    <h4 className="font-bold text-gray-900 mb-2">Stateless Sessions</h4>
                                    <p className="text-sm text-gray-500 leading-relaxed">We do not use persistent cookies or tracking IDs. Every session is unique to the device and the current Geo-Cell. When you leave the area or close the browser, your association with the cell is terminated.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">3. Real-Time Peer Discovery</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                To achieve an &quot;instant&quot; sharing feeling, we utilize a real-time event-driven architecture. When a user enters a Geo-Cell, their browser establishes a secure WebSocket listener for that specific <code>Cell_ID</code>.
                            </p>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                This &quot;Pub/Sub&quot; (Publisher/Subscriber) model means that data transfers are pushed to users rather than pulled. When you &quot;drop&quot; a link, it is published to the cell channel, and all active listeners in that cell receive the update within milliseconds. This architecture bypasses the need for traditional &quot;request/response&quot; cycles, making Local Share feel like a physical extension of the room you are in.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-gray-900">4. Compliance & Anonymity</h3>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Local Share is built on the principle of **Anonymous by Design.** Unlike tools that &quot;anonymize&quot; data after collection, we simply do not collect identifying data in the first place.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">No Email or Phone Number required for use.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">No storage of IP addresses in association with Geo-Cells.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <p className="text-gray-600 text-sm font-medium">Full compliance with ephemeral data standards for local networking.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-black text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            {
                                q: 'Do I need to create an account?',
                                a: 'No. Local Share is completely anonymous. Just choose a display name when you first post — no email, no password, no sign-up.',
                            },
                            {
                                q: 'How accurate is the 200m range?',
                                a: 'The range depends on your device\'s GPS accuracy. In open outdoor areas, geo-cells are very precise. Indoors, accuracy may vary slightly due to GPS signal strength, but the matching is always within a reasonable local range.',
                            },
                            {
                                q: 'What happens to my messages after 1 hour?',
                                a: 'All messages are permanently and automatically deleted from our servers after 1 hour. There is no archive, no history, and no way to retrieve expired messages.',
                            },
                            {
                                q: 'Can strangers outside my area see my messages?',
                                a: 'No. Only people whose device is currently located within your geo-cell can see your messages. Someone 500 meters away would be in a completely different cell and cannot see your feed.',
                            },
                            {
                                q: 'Is Local Share free to use?',
                                a: 'Yes, Local Share is completely free. There are no paid tiers, no subscriptions, and no hidden fees.',
                            },
                        ].map((faq, i) => (
                            <div key={i} className="bg-white rounded-[32px] border border-gray-100 p-8 shadow-sm">
                                <h3 className="font-bold text-gray-900 mb-3">{faq.q}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed font-medium">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-white py-24 border-t border-gray-50">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Ready to try the future of local sharing?</h2>
                    <p className="text-gray-500 mb-10 text-lg font-medium">No sign-up needed. Just open Local Share and start posting to your local area.</p>
                    <a
                        href="/"
                        className="inline-flex items-center justify-center bg-primary-600 text-white px-10 py-5 rounded-[24px] font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-200"
                    >
                        Open Local Share
                    </a>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
