import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
    title: 'Contact Us - Local Share',
    description: 'Get in touch with the Local Share team. We welcome your feedback, questions, and suggestions for improving our local sharing tool.',
    keywords: ['contact local share', 'support', 'feedback', 'help'],
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
            <SiteHeader />
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-xl text-primary-100 max-w-xl mx-auto">
                        We&apos;d love to hear from you
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get In Touch</h2>
                            <p className="text-gray-600 mb-6">
                                Have a question, suggestion, or feedback? We&apos;re here to help. Reach out to us using any of the methods below.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Email</h3>
                                        <p className="text-gray-600">support@local-share.tech</p>
                                        <p className="text-sm text-gray-500">We typically respond within 24-48 hours</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">FAQ</h3>
                                        <p className="text-gray-600">Check our <a href="/faq" className="text-primary-600 hover:underline">Frequently Asked Questions</a></p>
                                        <p className="text-sm text-gray-500">Quick answers to common questions</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Blog & Guides</h3>
                                        <p className="text-gray-600">Visit our <a href="/blog" className="text-primary-600 hover:underline">Blog</a> for tutorials</p>
                                        <p className="text-sm text-gray-500">In-depth guides and use cases</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-800">Headquarters</h3>
                                        <p className="text-gray-600">Local Share Tech</p>
                                        <p className="text-sm text-gray-500">Bengaluru</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Response Time */}
                        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                            <h3 className="font-bold text-blue-900 mb-2">Response Times</h3>
                            <ul className="text-sm text-blue-800 space-y-1">
                                <li>• General inquiries: 24-48 hours</li>
                                <li>• Bug reports: Within 24 hours</li>
                                <li>• Feature requests: Noted and reviewed weekly</li>
                            </ul>
                        </div>
                    </div>

                    {/* Common Topics */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Common Topics</h2>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-semibold text-gray-800 mb-2">🐛 Bug Reports</h3>
                                    <p className="text-sm text-gray-600">
                                        Found something not working? Please include your device type, browser, and steps to reproduce the issue.
                                    </p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-semibold text-gray-800 mb-2">💡 Feature Requests</h3>
                                    <p className="text-sm text-gray-600">
                                        Have an idea to make Local Share better? We love hearing suggestions from our community.
                                    </p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-semibold text-gray-800 mb-2">🤝 Partnership Inquiries</h3>
                                    <p className="text-sm text-gray-600">
                                        Interested in using Local Share for your organization, school, or event? Let&apos;s talk.
                                    </p>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl">
                                    <h3 className="font-semibold text-gray-800 mb-2">📰 Press & Media</h3>
                                    <p className="text-sm text-gray-600">
                                        For press inquiries, interviews, or media coverage, please reach out via email.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Privacy Note */}
                        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
                            <h3 className="font-bold text-green-900 mb-2">Your Privacy</h3>
                            <p className="text-sm text-green-800">
                                Any information you share with us is kept confidential and used only to respond to your inquiry. We never sell or share your data with third parties.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to start sharing?</h2>
                    <a
                        href="/"
                        className="inline-block bg-primary-600 text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-primary-700 transition-all shadow-sm hover:shadow-md"
                    >
                        Open Local Share
                    </a>
                </div>
            </section>

            <SiteFooter />
        </main>
    );
}
