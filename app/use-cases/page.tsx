'use client';

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';

export default function UseCasesPage() {
    const cases = [
        {
            title: 'College Classrooms',
            description: 'The most popular use for Local Share. Students use GPS-based cells to share study links, PDF notes, and group project resources without needing to exchange phone numbers or join WhatsApp groups.',
            icon: '🎓',
            benefits: ['Instant sharing with everyone in the room', 'No spam from permanent group chats', 'Notes auto-expire to keep the space clean']
        },
        {
            title: 'Professional Events & Networking',
            description: 'Network at conferences by dropping your LinkedIn profile or presentation slides into the local cell. Attendees within 200m can grab your info instantly as you speak.',
            icon: '🤝',
            benefits: ['No app downloads required for attendees', 'Works in crowded halls where Wi-Fi is spotty', 'Track how many people viewed your slides']
        },
        {
            title: 'Office Collaboration',
            description: 'Quickly drop a URL or a PDF to the colleague sitting across from you. Avoid the friction of email or the clutter of Slack for one-off snippets.',
            icon: '🏢',
            benefits: ['Privacy-first sharing', 'Zero-click connection', 'Great for temporary file transfers']
        },
        {
            title: 'Retail & Local Commerce',
            description: 'Local shops use Private Rooms with a 6-digit code to share digital menus, catalogs, or price lists with customers without requiring a physical QR code scanner at every table.',
            icon: '🛍️',
            benefits: ['Easy 6-digit access codes', 'Dynamic content updates', 'No physical materials needed']
        }
    ];

    return (
        <main className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans">
            <SiteHeader />
            
            <div className="flex-grow max-w-5xl mx-auto px-6 py-20">
                <div className="mb-20 text-center">
                    <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">Real-world Use Cases</h1>
                    <p className="text-gray-500 font-medium text-xl leading-relaxed max-w-2xl mx-auto">
                        Discover how thousands of users are using Local Share to bridge the physical and digital worlds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    {cases.map((useCase, index) => (
                        <div key={index} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="text-4xl mb-6">{useCase.icon}</div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">{useCase.title}</h2>
                            <p className="text-gray-600 mb-8 leading-relaxed font-medium">
                                {useCase.description}
                            </p>
                            <div className="space-y-3">
                                {useCase.benefits.map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-3 text-sm text-gray-500">
                                        <span className="text-green-500 mt-1">✓</span>
                                        {benefit}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-primary-600 rounded-[40px] p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4">Have a unique use case?</h2>
                        <p className="text-primary-100 font-medium mb-8 max-w-xl mx-auto">
                            Local Share is a flexible tool designed for any scenario where you need to share bits of data with people physically near you.
                        </p>
                        <Link href="/contact" className="inline-block bg-white text-primary-600 font-bold px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            Tell us your story
                        </Link>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -ml-32 -mb-32"></div>
                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
