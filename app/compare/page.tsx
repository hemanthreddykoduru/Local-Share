'use client';

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export default function ComparePage() {
    const comparisons = [
        {
            feature: 'Setup Required',
            localShare: 'None (Web-based)',
            airDrop: 'Apple ID / Bluetooth On',
            whatsapp: 'Phone Number / Group Join'
        },
        {
            feature: 'Platform Support',
            localShare: 'Universal (Any Browser)',
            airDrop: 'Apple Only',
            whatsapp: 'Any (App Required)'
        },
        {
            feature: 'Privacy Level',
            localShare: 'High (Auto-expires in 1hr)',
            airDrop: 'High (P2P)',
            whatsapp: 'Medium (Permanent Chats)'
        },
        {
            feature: 'Proximity Method',
            localShare: 'GPS Geo-cells / Rooms',
            airDrop: 'Bluetooth Range',
            whatsapp: 'Manual Add'
        },
        {
            feature: 'File Expiry',
            localShare: '1 Hour (Automatic)',
            airDrop: 'Permanent',
            whatsapp: 'Permanent'
        }
    ];

    return (
        <main className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans">
            <SiteHeader />
            
            <div className="flex-grow max-w-5xl mx-auto px-6 py-20">
                <div className="mb-20 text-center">
                    <h1 className="text-5xl font-black text-gray-900 mb-6 tracking-tight">How Local Share Compares</h1>
                    <p className="text-gray-500 font-medium text-xl leading-relaxed max-w-2xl mx-auto">
                        See why Local Share is the fastest way to drop text and files to anyone nearby without the friction of apps or accounts.
                    </p>
                </div>

                <div className="overflow-x-auto mb-20">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-100">
                                <th className="py-6 px-4 text-left text-sm font-black text-gray-400 uppercase tracking-widest">Feature</th>
                                <th className="py-6 px-4 text-left text-lg font-black text-primary-600 bg-primary-50 rounded-t-3xl">Local Share</th>
                                <th className="py-6 px-4 text-left text-sm font-bold text-gray-600">Apple AirDrop</th>
                                <th className="py-6 px-4 text-left text-sm font-bold text-gray-600">WhatsApp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {comparisons.map((item, index) => (
                                <tr key={index} className="group">
                                    <td className="py-6 px-4 text-sm font-bold text-gray-900 group-hover:bg-gray-50 transition-colors">{item.feature}</td>
                                    <td className="py-6 px-4 text-sm font-bold text-primary-700 bg-primary-50 group-hover:bg-primary-100/50 transition-colors">{item.localShare}</td>
                                    <td className="py-6 px-4 text-sm font-medium text-gray-500">{item.airDrop}</td>
                                    <td className="py-6 px-4 text-sm font-medium text-gray-500">{item.whatsapp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-black text-gray-900">Why choose Local Share?</h2>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            AirDrop is fantastic, but only if everyone has an iPhone. WhatsApp is universal, but it requires you to exchange personal phone numbers and creates permanent chat threads for what are often temporary tasks.
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Local Share fills the gap. It's built for the **"In-between Moments"** — when you need to send a link to a stranger in a workshop, a file to a temporary coworker, or a photo to someone you just met.
                        </p>
                    </div>
                    <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Key Competitive Advantages</h3>
                        <div className="space-y-4">
                            {[
                                { title: 'Zero Friction', desc: 'No accounts, no phone numbers, no apps.' },
                                { title: 'Browser-First', desc: 'Works on iOS, Android, Windows, and Mac.' },
                                { title: 'Privacy-Built', desc: 'Content self-destructs after one hour.' },
                                { title: 'Geo-Aware', desc: 'Automatically finds the people right next to you.' }
                            ].map((adv, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">{adv.title}</h4>
                                        <p className="text-sm text-gray-500">{adv.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
