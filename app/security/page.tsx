import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'Security Whitepaper - Local Share Protocol',
    description: 'Technical whitepaper detailing the security architecture, data anonymity, and ephemeral storage protocols of the Local Share platform.',
};

export default function SecurityWhitepaper() {
    return (
        <main className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans">
            <SiteHeader />
            
            {/* Header */}
            <section className="pt-32 pb-20 px-6 border-b border-gray-100 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
                        Technical Document v1.0
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
                        Security <span className="text-primary-600">Whitepaper.</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl">
                        A comprehensive analysis of the cryptographic anonymity, spatial quantization, and ephemeral data protocols that power the Local Share network.
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="flex-grow max-w-4xl mx-auto px-6 py-24">
                <div className="prose prose-gray prose-lg max-w-none space-y-20">
                    
                    {/* Abstract */}
                    <section id="abstract" className="p-10 bg-gray-50 rounded-[40px] border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-black text-gray-900 mb-6">Abstract</h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Local Share is an anonymous-by-design protocol for proximity-based data exchange. Unlike traditional cloud-sharing platforms that rely on persistent user accounts and global indexing, Local Share utilizes spatial quantization (Geo-Cells) to isolate data within 200-meter physical increments. This document details the technical implementation of our &quot;Zero-Knowledge&quot; location model and our ephemeral data lifecycle, which ensures absolute data destruction after 3,600 seconds.
                        </p>
                    </section>

                    {/* Cryptographic Anonymity */}
                    <section id="anonymity" className="space-y-8">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">1. Cryptographic Anonymity</h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            Our primary security objective is the decoupling of data from identity. Traditional platforms use &quot;Identity-First&quot; sharing; Local Share uses &quot;Proximity-First&quot; sharing.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900">Zero-Account Protocol</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    We do not collect PII (Personally Identifiable Information) such as email addresses, phone numbers, or social media handles. Every user session is associated with a temporary, client-side generated UUID that is never linked to a real-world persona.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900">IP Masking</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    While IP addresses are technically necessary for HTTP communication, our application layer does not store or log IP addresses in association with the content of a Geo-Cell. This ensures that even in the event of a database compromise, no link exists between a post and an IP address.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Spatial Quantization */}
                    <section id="spatial" className="space-y-8">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">2. Spatial Quantization & Privacy</h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            The most sensitive data in any proximity app is the user&apos;s location. Local Share solves this by ensuring that high-precision coordinates never leave the browser.
                        </p>
                        <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm space-y-6">
                            <h4 className="text-lg font-bold text-gray-900">The Quantization Process:</h4>
                            <ol className="list-decimal list-inside space-y-4 text-gray-600 font-medium">
                                <li>The browser retrieves the raw GPS signal (Latitude/Longitude).</li>
                                <li>The client-side JavaScript applies a 0.002 rounding factor (Spatial Quantization).</li>
                                <li>The rounded value is converted into a Cell Hash.</li>
                                <li>The raw, precise coordinates are immediately purged from memory.</li>
                            </ol>
                            <p className="text-sm text-gray-500 italic bg-gray-50 p-4 rounded-xl border border-gray-100">
                                Result: The server knows you are &quot;somewhere in a 200m grid square,&quot; but it can never know where you are standing within that square or your historical path.
                            </p>
                        </div>
                    </section>

                    {/* Data Expiry */}
                    <section id="expiry" className="space-y-8">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">3. Ephemeral Storage Protocols</h2>
                        <p className="text-gray-600 leading-relaxed font-medium">
                            We treat data as a temporary utility, not a permanent asset. Our infrastructure is optimized for deletion, not retention.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
                                <h4 className="font-bold text-primary-900 mb-2 text-sm">Hard Purge</h4>
                                <p className="text-xs text-primary-700 leading-relaxed">Automatic database triggers delete every record exactly 60 minutes after its creation time.</p>
                            </div>
                            <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
                                <h4 className="font-bold text-primary-900 mb-2 text-sm">No Backups</h4>
                                <p className="text-xs text-primary-700 leading-relaxed">Temporary clipboard data is excluded from our long-term database backups to ensure &quot;The Right to be Forgotten.&quot;</p>
                            </div>
                            <div className="p-6 bg-primary-50 rounded-2xl border border-primary-100">
                                <h4 className="font-bold text-primary-900 mb-2 text-sm">Encrypted Transit</h4>
                                <p className="text-xs text-primary-700 leading-relaxed">All data is encrypted in transit using TLS 1.3, ensuring no interception during the broadcast.</p>
                            </div>
                        </div>
                    </section>

                    {/* Compliance */}
                    <section id="compliance" className="pt-20 border-t border-gray-100">
                        <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">Compliance Statement</h2>
                        <div className="prose prose-gray">
                            <p className="text-gray-600 font-medium leading-relaxed">
                                Local Share is committed to the highest standards of data ethics. Our platform is fully compliant with the principles of the GDPR (General Data Protection Regulation) regarding data minimization and the &quot;Privacy by Design&quot; framework. 
                            </p>
                            <p className="text-gray-600 font-medium leading-relaxed">
                                Because we do not collect personal data and ensure all temporary data is destroyed within one hour, our platform represents the pinnacle of low-risk local networking for corporate, academic, and private environments.
                            </p>
                        </div>
                    </section>

                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
