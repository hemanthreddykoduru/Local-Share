import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'FAQ - Local Share',
    description: 'Frequently asked questions about Local Share. Learn how to use the app, understand our privacy practices, and troubleshoot common issues.',
    keywords: ['local share faq', 'how to use local share', 'local sharing help', 'geo-cell explained'],
};

const faqs = [
    {
        category: 'Getting Started',
        questions: [
            {
                q: 'What is Local Share?',
                a: 'Local Share is a web-based tool that lets you share text, links, and notes with people physically near you (within about 200 meters). No app download or account creation is required—just open the website and start sharing.'
            },
            {
                q: 'Do I need to create an account?',
                a: 'No! Local Share is completely anonymous. You can choose any display name you like, and there\'s no sign-up, email verification, or password required.'
            },
            {
                q: 'Why does it need my location?',
                a: 'Location is the core feature. We use your device\'s GPS to calculate a "geo-cell" (a small geographic area). This ensures you only see messages from people nearby and your messages only reach people in your immediate vicinity.'
            },
            {
                q: 'How do I enable location access?',
                a: 'When you first visit Local Share, your browser will ask for location permission. Click "Allow". If you previously denied it, you can re-enable it in your browser settings: click the lock/info icon next to the URL, find "Location", and set it to "Allow".'
            },
        ]
    },
    {
        category: 'Using Local Share',
        questions: [
            {
                q: 'How long do messages last?',
                a: 'All messages automatically expire and are deleted after 1 hour. This keeps the feed fresh and relevant, and ensures your content doesn\'t persist indefinitely.'
            },
            {
                q: 'Can I delete my own messages?',
                a: 'Yes, you can delete messages you\'ve posted using the delete button on your message card. However, even if you don\'t delete them manually, they will auto-expire after 1 hour.'
            },
            {
                q: 'How far is the "local" range?',
                a: 'The range is approximately 200 meters (about 650 feet). This covers a typical room, building, or small outdoor area like a park or plaza.'
            },
            {
                q: 'Can I share images or files?',
                a: 'Currently, Local Share supports text only. You can share URLs/links to images or files hosted elsewhere. We may add direct media sharing in the future.'
            },
            {
                q: 'Is there a character limit?',
                a: 'Yes, messages are limited to 1000 characters to keep the feed readable and prevent spam.'
            },
        ]
    },
    {
        category: 'Privacy & Security',
        questions: [
            {
                q: 'Is my exact location stored?',
                a: 'No. We never store your exact GPS coordinates. Your device calculates a geo-cell identifier locally, and only this grid reference is sent to our servers. It\'s impossible to reverse-engineer your exact position from the cell ID.'
            },
            {
                q: 'Who can see my messages?',
                a: 'Only people currently within the same geo-cell (approximately 200m radius) can see your messages. People outside this area cannot access your content.'
            },
            {
                q: 'Are messages encrypted?',
                a: 'Messages are transmitted over HTTPS (encrypted in transit). Since messages are public within the geo-cell and auto-expire in 1 hour, we prioritize simplicity and speed over end-to-end encryption for this use case.'
            },
            {
                q: 'Do you collect personal data?',
                a: 'We collect the absolute minimum: geo-cell reference (not exact location), display name (you choose, can be anything), and message content (auto-deleted after 1 hour). No email, no phone number, no tracking.'
            },
        ]
    },
    {
        category: 'Technical Questions',
        questions: [
            {
                q: 'What is a geo-cell?',
                a: 'A geo-cell is a small grid square on Earth\'s surface, roughly 200m × 200m. We use a system similar to S2 geometry to divide the world into these cells. Your current cell determines who you can communicate with.'
            },
            {
                q: 'Does it work indoors?',
                a: 'Yes, as long as your device can get a GPS signal or use Wi-Fi/cellular location services. In some deep indoor areas, you may need to step near a window briefly to get an accurate location fix.'
            },
            {
                q: 'Why am I seeing old messages?',
                a: 'Messages can take up to a few seconds to sync in real-time. If you\'re seeing stale data, try refreshing using the refresh button or reloading the page. Messages older than 1 hour are automatically removed.'
            },
            {
                q: 'Does it work in all countries?',
                a: 'Yes! Local Share works anywhere in the world where you have internet access and can share your location. The geo-cell system covers the entire planet.'
            },
        ]
    },
    {
        category: 'Troubleshooting',
        questions: [
            {
                q: 'Location permission is blocked. How do I fix it?',
                a: 'Open your browser settings, find the site permissions for local-share.tech, and change Location from "Blocked" to "Allow". Then refresh the page. On mobile, you may also need to enable location services in your device settings.'
            },
            {
                q: 'I posted a message but no one responded.',
                a: 'Local Share only works when there are other people nearby also using the service. It\'s most useful in group settings like classrooms, events, or meetings where multiple people are present and have the site open.'
            },
            {
                q: 'The page is not loading.',
                a: 'Check your internet connection. Local Share requires an active network connection to send and receive messages. Also ensure JavaScript is enabled in your browser.'
            },
        ]
    }
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <SiteHeader />
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Frequently Asked Questions</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                        Everything you need to know about using Local Share
                    </p>
                </div>
            </section>

            {/* FAQ Content */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                {faqs.map((category, catIndex) => (
                    <div key={catIndex} className="mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-primary-200">
                            {category.category}
                        </h2>
                        <div className="space-y-4">
                            {category.questions.map((item, qIndex) => (
                                <div key={qIndex} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                                    <h3 className="font-bold text-lg text-gray-800 mb-2">
                                        {item.q}
                                    </h3>
                                    <p className="text-gray-600">
                                        {item.a}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Still have questions */}
                <div className="bg-blue-50 rounded-2xl p-8 text-center border border-blue-100">
                    <h2 className="text-xl font-bold text-blue-900 mb-2">Still have questions?</h2>
                    <p className="text-blue-700 mb-4">
                        Check out our blog for in-depth guides and tutorials.
                    </p>
                    <a
                        href="/blog"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                    >
                        Visit Blog
                    </a>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
