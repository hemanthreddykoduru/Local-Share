import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'Changelog - Local Share',
    description: 'Track the latest updates, new features, and security improvements for Local Share. See how we are evolving the local sharing experience.',
};

export default function ChangelogPage() {
    const updates = [
        {
            date: 'May 3, 2026',
            version: 'v1.4.0',
            title: 'Professional Login & Security Hardening',
            description: 'Launched a new dedicated login page with full support for Email/Password authentication, registration, and password recovery. Hardened Firestore security rules to protect user data while allowing public view count increments.',
            changes: [
                'New professional /login page with multi-mode UI (Login, Register, Forgot Password).',
                'Real-time view tracking for PDF projects with live dashboard updates.',
                'Enhanced robots.txt and sitemap for better search engine indexing.',
                'Improved sign-out flow with automatic session cleanup and redirection.'
            ]
        },
        {
            date: 'April 29, 2026',
            version: 'v1.3.2',
            title: 'SaaS Platform Finalization',
            description: 'Transitioned the platform to a professional SaaS experience with custom modals, tiered pricing, and owner-only insights.',
            changes: [
                'Replaced browser alerts with high-fidelity React modals using glassmorphism.',
                'Implemented tiered plan logic (Free, Pro, Pro Plus) with dynamic UI adaptation.',
                'Expanded Pro Plus PDF storage limit to 100 documents.',
                'Added "Project Insights" sidebar for owners to track performance.'
            ]
        },
        {
            date: 'April 27, 2026',
            version: 'v1.2.5',
            title: 'Razorpay Integration & Pro Features',
            description: 'Launched the first version of our premium subscription model with secure Indian payment gateway integration.',
            changes: [
                'Full Razorpay integration for Pro and Pro Plus subscriptions.',
                'Dynamic pricing engine with automatic plan tiering.',
                'PDF Viewer admin sidebar for quick project management.',
                'Mobile-responsive pricing grid with plan comparisons.'
            ]
        },
        {
            date: 'April 23, 2026',
            version: 'v1.1.0',
            title: 'PDF Sharing Infrastructure',
            description: 'Added the core PDF sharing engine, allowing users to upload and share documents with unique, short links.',
            changes: [
                'Firebase Storage integration for secure PDF uploads.',
                'Unique slug generation for shareable document links.',
                'Custom PDF viewer with branding and download options.',
                'Initial dashboard for managing shared links.'
            ]
        },
        {
            date: 'April 20, 2026',
            version: 'v1.0.0',
            title: 'The Launch of Local Share',
            description: 'Initial public release of the GPS-based community clipboard.',
            changes: [
                'Real-time text sharing based on 200m GPS geo-cells.',
                'Private room support with 6-digit invitation codes.',
                'Privacy-first design: all content expires in 1 hour.',
                'Zero-account required sharing experience.'
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-[#FDFDFF] flex flex-col font-sans">
            <SiteHeader />
            
            <div className="flex-grow max-w-3xl mx-auto px-6 py-20">
                <div className="mb-20">
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Product Updates & <span className="text-primary-600">Engineering.</span></h1>
                    <div className="prose prose-gray prose-lg">
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Welcome to the Local Share development log. This page serves as more than just a list of features; it is a technical record of our commitment to evolving the <strong>Spatial Web</strong>. At Local Share, we believe that the next generation of internet utilities must be built on three pillars: absolute privacy, physical proximity, and zero-friction accessibility.
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            Our engineering philosophy focuses on moving computation and data storage as close to the user as possible. By leveraging Geo-location APIs and ephemeral databases, we are building a tool that respects the &quot;human scale&quot; of communication. Every update listed below represents a step toward a world where your digital tools are as aware of your surroundings as you are.
                        </p>
                    </div>
                </div>

                <div className="space-y-20">
                    {updates.map((update, index) => (
                        <div key={index} className="relative pl-10 border-l-2 border-gray-100 pb-2">
                            {/* Dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-md"></div>
                            
                            <div className="mb-4 flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-400">{update.date}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest bg-primary-50 text-primary-600 px-3 py-1 rounded-full">
                                    {update.version}
                                </span>
                            </div>
                            
                            <h2 className="text-2xl font-black text-gray-900 mb-4">{update.title}</h2>
                            <div className="space-y-6">
                                <p className="text-gray-600 leading-relaxed font-medium">
                                    {update.description}
                                </p>
                                
                                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Key Improvements</h4>
                                    <ul className="space-y-4">
                                        {update.changes.map((change, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 leading-relaxed font-medium">
                                                <span className="text-primary-500 mt-1 flex-shrink-0">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                </span>
                                                {change}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Future Roadmap */}
                <div className="mt-32 pt-20 border-t border-gray-100">
                    <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        Looking Ahead
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">The <span className="text-primary-600">Roadmap</span> for 2026.</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-gray-900 mb-2">PWA Optimization</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Implementing advanced service worker caching to ensure Local Share remains functional even in low-connectivity environments like conference basements.</p>
                        </div>
                        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                            <h4 className="font-bold text-gray-900 mb-2">Edge Computing</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">Migrating our Geo-cell logic to Edge Functions to reduce global latency and improve the &quot;instant-on&quot; feeling of the local feed.</p>
                        </div>
                    </div>
                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
