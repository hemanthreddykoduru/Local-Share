import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'Compare Local Share - The Fastest Way to Drop Data',
    description: 'Compare Local Share vs AirDrop vs WhatsApp. See why our privacy-first, zero-install proximity sharing is the best choice for temporary local networking.',
};

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
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-8 tracking-tight">The Future of <span className="text-primary-600">Local Networking.</span></h1>
                    <div className="prose prose-gray prose-lg">
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Sharing a link or a file with someone standing two meters away should be as simple as speaking to them. Yet, in our quest for a globalized internet, we have made local sharing surprisingly difficult. Most modern tools require you to either be part of a closed ecosystem or sacrifice your personal privacy just to move a few bits of data across a room.
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Local Share was built to solve this &quot;Proximity Friction.&quot; By removing the need for accounts, apps, and phone number exchanges, we are restoring the natural, ephemeral nature of local communication. Below is a detailed technical comparison of how Local Share stacks up against industry giants.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto mb-32 bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-100/50 p-8">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b-2 border-gray-50">
                                <th className="py-8 px-6 text-left text-xs font-black text-gray-400 uppercase tracking-widest">Core Capability</th>
                                <th className="py-8 px-6 text-left text-xl font-black text-primary-600 bg-primary-50/50 rounded-t-[30px]">Local Share</th>
                                <th className="py-8 px-6 text-left text-sm font-bold text-gray-600">Apple AirDrop</th>
                                <th className="py-8 px-6 text-left text-sm font-bold text-gray-600">WhatsApp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {comparisons.map((item, index) => (
                                <tr key={index} className="group">
                                    <td className="py-8 px-6 text-sm font-bold text-gray-900 group-hover:bg-gray-50 transition-colors rounded-l-2xl">{item.feature}</td>
                                    <td className="py-8 px-6 text-sm font-bold text-primary-700 bg-primary-50/50 group-hover:bg-primary-100/30 transition-colors">{item.localShare}</td>
                                    <td className="py-8 px-6 text-sm font-medium text-gray-500 group-hover:bg-gray-50 transition-colors">{item.airDrop}</td>
                                    <td className="py-8 px-6 text-sm font-medium text-gray-500 group-hover:bg-gray-50 transition-colors rounded-r-2xl">{item.whatsapp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="space-y-32">
                    {/* AirDrop Deep Dive */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg">
                                Comparison Study 01
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Beyond the <span className="text-primary-600">Apple Silo.</span></h2>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                Apple&apos;s AirDrop is often cited as the gold standard for local sharing, and for good reason—it is fast and secure. However, it suffers from a fundamental flaw: **Exclusivity.** 
                            </p>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                In a modern professional environment, you cannot guarantee that everyone is using an iPhone or a Mac. In a typical workshop or classroom, a 30% mix of Android or Windows users creates a &quot;Digital Divide.&quot; Local Share bridges this gap by moving the technology into the browser. If your device has a web browser and GPS, you are already part of the network. No walled gardens, just universal access.
                            </p>
                        </div>
                        <div className="bg-gray-50 rounded-[50px] p-12 border border-gray-100">
                            <h4 className="text-2xl font-black text-gray-900 mb-6">The AirDrop Barrier</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-primary-600 font-bold">!</div>
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed">Requires Bluetooth and WiFi to be toggled on specifically for sharing, often failing in high-interference areas.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-primary-600 font-bold">!</div>
                                    <p className="text-sm text-gray-600 font-medium leading-relaxed">Visibility settings (&quot;Contacts Only&quot;) often prevent seamless sharing with strangers in public spaces.</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* WhatsApp Deep Dive */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 bg-primary-50 rounded-[50px] p-12 border border-primary-100">
                            <h4 className="text-2xl font-black text-primary-900 mb-6">The Messaging Trap</h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-primary-600 font-bold">?</div>
                                    <p className="text-sm text-primary-800 font-medium leading-relaxed">Exchanging phone numbers just for a one-time file drop is a massive privacy risk and a violation of personal boundaries.</p>
                                </li>
                                <li className="flex gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0 text-primary-600 font-bold">?</div>
                                    <p className="text-sm text-primary-800 font-medium leading-relaxed">Permanent chat threads clutter your inbox and keep temporary data stored on cloud servers forever.</p>
                                </li>
                            </ul>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg">
                                Comparison Study 02
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">The Friction of <span className="text-primary-600">Permanent Accounts.</span></h2>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                Most people fall back on WhatsApp or Telegram for local sharing because &quot;everyone has it.&quot; But this convenience comes at a hidden cost: **Digital Permanence.** 
                            </p>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                When you share a WiFi password or a temporary document via a messaging app, that data is now part of your permanent chat history. It is backed up to the cloud, synced across devices, and associated with your real-world identity (phone number). Local Share is built for the &quot;In-Between Moments.&quot; It provides a temporary bridge that disappears as soon as its purpose is served. No lasting footprint, no privacy leaks.
                            </p>
                        </div>
                    </div>

                    {/* The In-Between Moments */}
                    <div className="text-center max-w-4xl mx-auto space-y-12">
                        <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">The &quot;In-Between&quot; <span className="text-primary-600">Moments.</span></h2>
                        <p className="text-xl text-gray-600 leading-relaxed font-medium">
                            Local Share isn&apos;t meant to replace your email or your long-term cloud storage. It is designed for the moments when traditional tools are too &quot;heavy.&quot;
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
                                <h4 className="font-black text-gray-900 mb-4 uppercase text-xs tracking-widest text-primary-600">Scenario 01</h4>
                                <h3 className="text-xl font-bold mb-3">Conference Networking</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">Sharing your digital business card or a LinkedIn profile with a group of people you just met during a coffee break. No contact adding required.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
                                <h4 className="font-black text-gray-900 mb-4 uppercase text-xs tracking-widest text-primary-600">Scenario 02</h4>
                                <h3 className="text-xl font-bold mb-3">Academic Collaboration</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">Dropping a reference URL to everyone in your lecture hall without needing a massive group chat or a centralized LMS login.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm">
                                <h4 className="font-black text-gray-900 mb-4 uppercase text-xs tracking-widest text-primary-600">Scenario 03</h4>
                                <h3 className="text-xl font-bold mb-3">Public Transit Sharing</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">Passing a temporary gate pass or a transit map to a fellow traveler without exchanging any personal identifiers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
