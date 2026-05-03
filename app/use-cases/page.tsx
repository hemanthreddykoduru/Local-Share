'use client';

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import Link from 'next/link';

export default function UseCasesPage() {
    const cases = [
        {
            title: 'College Classrooms & University Study Groups',
            description: 'Local Share has become an essential tool in academic environments where students need to collaborate in real-time. In a typical lecture hall, exchanging phone numbers or creating permanent group chats just to share a single PDF or a research link is cumbersome and intrusive. Local Share solves this by allowing students to drop resources into a 200m geo-cell that everyone in the room can access instantly. This is particularly useful for spontaneous study groups or sharing digital handouts without the friction of email or social media. Because all drops auto-expire after one hour, the local clipboard stays clean and relevant for the next class period, ensuring a clutter-free experience for everyone on campus.',
            icon: '🎓'
        },
        {
            title: 'Professional Events, Conferences & Networking',
            description: 'At large-scale professional events, networking often happens in short, high-energy bursts where speed is critical. Instead of fumbling with business cards or manual LinkedIn searches, speakers and attendees can use Local Share to broadcast their contact info or presentation slides to everyone physically nearby. This "one-to-many" sharing capability works perfectly in crowded exhibition halls where cellular data might be congested or Wi-Fi is unreliable. By simply opening their browser, attendees can grab the speaker’s resources without needing to download a specialized event app. It’s a low-friction way to bridge the gap between a physical conversation and a digital connection that lasts long after the conference ends.',
            icon: '🤝'
        },
        {
            title: 'Agile Office Collaboration & Temporary Teams',
            description: 'Modern offices frequently utilize agile workspaces where teams are constantly shifting between desks and meeting rooms. Local Share provides a "zero-click" bridge for these temporary collaboration moments, allowing coworkers to swap URLs, snippets of code, or design mockups without polluting their Slack channels or email inboxes. It is the perfect solution for one-off file transfers between colleagues who might not be in the same department or project group. The privacy-first architecture ensures that sensitive snippets don’t live forever on a corporate server, as they are automatically purged within an hour. This makes it an ideal tool for secure, ephemeral sharing in fast-paced corporate environments.',
            icon: '🏢'
        },
        {
            title: 'Retail, Local Commerce & Digital Menus',
            description: 'Local businesses and restaurants are increasingly turning to Local Share to provide a contactless, digital experience for their customers. Instead of requiring physical QR code stickers on every table—which can be difficult to update—a shopkeeper can simply set up a Private Room with a 6-digit access code. Customers can enter this code to instantly view digital menus, daily specials, or loyalty program details. This system is incredibly flexible, allowing owners to update their shared content in real-time without reprinting physical materials. It provides a modern, tech-forward interaction that respects customer privacy, as no personal data or app installations are required to access the local store information.',
            icon: '🛍️'
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
