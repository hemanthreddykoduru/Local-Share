import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'Mission - The Human Side of Local Sharing',
    description: 'Learn about the social contract of physical proximity and the story behind Local Share, founded at GITAM University by Hemanth Reddy.',
};

export default function MissionPage() {
    return (
        <main className="min-h-screen bg-white flex flex-col font-sans">
            <SiteHeader />
            
            {/* The Social Contract of Proximity */}
            <section className="pt-32 pb-24 px-6 bg-white overflow-hidden">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-12 tracking-tighter animate-reveal">
                        The Social Contract of <span className="text-primary-600">Nearby Sharing.</span>
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left animate-slide-up">
                        <div className="bg-gray-50 p-12 rounded-[50px] border border-gray-100">
                            <h4 className="text-3xl font-bold text-gray-900 mb-6">Why proximity feels safer.</h4>
                            <p className="text-gray-700 leading-relaxed mb-6 text-lg font-medium">
                                On the global internet, you are sharing with billions of anonymous actors. The risk of phishing or malicious interception is high because the scale is infinite. But in a local room, the &quot;Social Contract&quot; is physical.
                            </p>
                            <p className="text-gray-600 leading-relaxed text-lg font-medium">
                                When you drop a guest WiFi password at a coffee shop, you can physically see the 10-15 people who have access to that feed. This human-scale networking reduces the psychological barrier to sharing and creates an environment of implicit trust.
                            </p>
                        </div>
                        <div className="bg-primary-50 p-12 rounded-[50px] border border-primary-100">
                            <h4 className="text-3xl font-bold text-primary-900 mb-6">Ephemeral by Design.</h4>
                            <p className="text-primary-800 leading-relaxed mb-6 text-lg font-medium">
                                Most platforms want to keep your data forever because data is their currency. We built Local Share with the opposite goal: to delete your data as soon as its utility is gone. 
                            </p>
                            <p className="text-primary-800 leading-relaxed text-lg font-medium">
                                This &quot;Ephemeral Architecture&quot; is our promise to you. By setting a hard 60-minute expiry on every drop, we ensure that even if someone were to join your Geo-Cell tomorrow, they wouldn&apos;t find a single trace of what was shared today.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <section className="py-24 px-6 bg-gray-50 overflow-hidden relative border-y border-gray-100">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="relative animate-reveal">
                            <div className="w-full aspect-square bg-gradient-to-br from-primary-500 to-primary-900 rounded-[60px] flex items-center justify-center rotate-3 shadow-2xl relative z-10 overflow-hidden">
                                <span className="text-black text-7xl md:text-8xl font-black opacity-20 text-center select-none uppercase tracking-tighter">
                                    Hemanth
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-primary-200 rounded-[60px] -rotate-3 -translate-x-4"></div>
                        </div>
                        <div className="space-y-8 animate-slide-up">
                            <div className="inline-flex items-center gap-2 text-primary-600 font-bold uppercase tracking-widest text-xs">
                                Founder Story & Vision
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight leading-tight italic">
                                &quot;I tested the first prototype at <span className="text-primary-600">GITAM Campus.</span>&quot;
                            </h2>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed">
                                I built Local Share during my time as a Software Engineering student at GITAM Bengaluru. I noticed a constant friction point: every time we formed a study group or held a workshop, we spent the first 10 minutes just trying to share a URL or a PDF.
                            </p>
                            <p className="text-xl text-gray-600 font-medium leading-relaxed">
                                We were exchanging phone numbers just to send a single link. It felt invasive and inefficient. Local Share was born from that campus frustration. Today, it serves thousands of users worldwide, proving that the most powerful connections are often the ones sitting right in front of us.
                            </p>
                            <div className="pt-4 flex items-center gap-6">
                                <div>
                                    <h4 className="text-2xl font-bold text-gray-900">Hemanth Reddy</h4>
                                    <p className="text-gray-500 text-lg font-medium">Founder & Software Engineer</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
