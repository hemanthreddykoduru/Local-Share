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

            {/* Technical Details */}
            <section className="bg-white py-14">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Under the Hood</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <div className="text-3xl mb-3">🔒</div>
                            <h3 className="font-bold text-gray-800 mb-2">Privacy by Design</h3>
                            <p className="text-sm text-gray-600">
                                Your exact GPS coordinates are never sent to our servers. We compute a geo-cell ID on your device — a grid reference that cannot be reverse-engineered to find your precise location.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <div className="text-3xl mb-3">⚡</div>
                            <h3 className="font-bold text-gray-800 mb-2">Real-Time Updates</h3>
                            <p className="text-sm text-gray-600">
                                Messages appear instantly using real-time sync. You don&apos;t need to refresh the page — new posts from nearby users show up automatically as they are submitted.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                            <div className="text-3xl mb-3">🌐</div>
                            <h3 className="font-bold text-gray-800 mb-2">Works Everywhere</h3>
                            <p className="text-sm text-gray-600">
                                Local Share is a Progressive Web App that works on any modern browser — Chrome, Safari, Firefox — on any device. No app store, no install, no updates to manage.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
                <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
                <div className="space-y-4">
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
                        <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-bold text-gray-800 mb-2">{faq.q}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to try it yourself?</h2>
                    <p className="text-gray-600 mb-6">No sign-up needed. Just open Local Share and start posting to your local area.</p>
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
