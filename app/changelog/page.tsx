'use client';

import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

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
                <div className="mb-16 text-center">
                    <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight">Changelog</h1>
                    <p className="text-gray-500 font-medium text-lg leading-relaxed">
                        Follow our journey as we build the world's most seamless local sharing experience.
                    </p>
                </div>

                <div className="space-y-12">
                    {updates.map((update, index) => (
                        <div key={index} className="relative pl-8 border-l-2 border-gray-100 pb-12 last:pb-0">
                            {/* Dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow-sm"></div>
                            
                            <div className="mb-2 flex items-center gap-3">
                                <span className="text-sm font-bold text-gray-400">{update.date}</span>
                                <span className="text-[10px] font-black uppercase tracking-widest bg-primary-50 text-primary-600 px-2 py-0.5 rounded">
                                    {update.version}
                                </span>
                            </div>
                            
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">{update.title}</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed font-medium">
                                {update.description}
                            </p>
                            
                            <ul className="space-y-3">
                                {update.changes.map((change, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                                        <span className="text-primary-400 mt-1">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                        </span>
                                        {change}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <SiteFooter />
        </main>
    );
}
