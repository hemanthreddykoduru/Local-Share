import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'Features - The Pillars of Local Sharing',
    description: 'Explore the core technologies that power Local Share: GPS Geo-Cells, Zero-Trace Privacy, and Frictionless SaaS Integration.',
};

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            <SiteHeader />
            
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-tight animate-reveal">
                        The Three Pillars of <span className="text-primary-600">Local Sharing.</span>
                    </h1>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-20 animate-reveal">
                        Most file-sharing tools are built for the global web, ignoring the unique needs of people in the same physical room. Local Share is engineered from the ground up to prioritize proximity, privacy, and speed.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-24 text-left animate-slide-up">
                        {/* GPS Geo-Cell Technology */}
                        <div className="group space-y-6 bg-gray-50 p-12 rounded-[50px] border border-gray-100">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h3 className="text-4xl font-black text-gray-900">GPS Geo-Cell Technology</h3>
                            <p className="text-gray-600 text-lg leading-relaxed font-medium">
                                Traditional location sharing involves tracking your precise movement across a map. Our proprietary **Geo-Cell** technology is different. We divide the world into a massive grid of 200-meter &quot;cells.&quot; When you open Local Share, you aren&apos;t &quot;tracked&quot;; you are simply associated with your current cell. 
                            </p>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                This creates a virtual, location-locked &quot;room&quot; where everyone in the same building or park can drop data instantly. It is the digital equivalent of a physical whiteboard—visible only to those who are actually there. No accounts, no persistent tracking, and no global footprint.
                            </p>
                        </div>

                        {/* Zero-Trace Privacy Architecture */}
                        <div className="group space-y-6 bg-purple-50 p-12 rounded-[50px] border border-purple-100">
                            <div className="w-16 h-16 bg-white text-purple-600 rounded-3xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002-2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-4xl font-black text-purple-900">Zero-Trace Privacy Architecture</h3>
                            <p className="text-purple-800 text-lg leading-relaxed font-medium">
                                We believe that temporary data should stay temporary. In an era where every click is logged and every message is archived, Local Share offers a &quot;Digital Memory&quot; that fades. Every drop on our platform is governed by a strict **60-minute TTL (Time-To-Live)**.
                            </p>
                            <p className="text-purple-700 leading-relaxed font-medium">
                                After one hour, your text or link is purged from our encrypted database forever. This &quot;Zero-Trace&quot; philosophy makes Local Share the safest way to share guest WiFi passwords, temporary links, or meeting notes without worrying about the data living indefinitely in a cloud silo.
                            </p>
                        </div>

                        {/* Frictionless SaaS Integration */}
                        <div className="group space-y-6 bg-amber-50 p-12 rounded-[50px] border border-amber-100">
                            <div className="w-16 h-16 bg-white text-amber-600 rounded-3xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-4xl font-black text-amber-900">Frictionless SaaS Integration</h3>
                            <p className="text-amber-800 text-lg leading-relaxed font-medium">
                                While our root utility is anonymous sharing, we have expanded into professional document management. Our PDF sharing platform allows businesses to upload marketing materials or technical specs and generate a &quot;Local Link.&quot; 
                            </p>
                            <p className="text-amber-700 leading-relaxed font-medium">
                                Imagine a conference where a speaker says, &quot;Open Local Share to get the slide deck.&quot; Within 5 seconds, hundreds of attendees have the PDF on their phones without a single app download. This is the power of proximity-based SaaS: delivering the right document, to the right person, at the right location, at the right time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
