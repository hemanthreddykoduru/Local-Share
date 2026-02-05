'use client';

import { useLocation } from '@/hooks/useLocation';
import LocationPermission from '@/components/LocationPermission';
import ClipboardInput from '@/components/ClipboardInput';
import ClipboardFeed from '@/components/ClipboardFeed';
import AdUnit from '@/components/AdUnit';
import AdsterraSlot from '@/components/AdsterraSlot';
import AdsterraNative from '@/components/AdsterraNative';
import AdBlockDetector from '@/components/AdBlockDetector';

import ProfileModal from '@/components/ProfileModal';
import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';

export default function Home() {
    const locationState = useLocation();
    const [refreshKey, setRefreshKey] = useState(0);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { profile, updateName } = useProfile();

    const handleSubmitSuccess = () => {
        // Trigger refresh of feed
        setRefreshKey(prev => prev + 1);
    };

    const handleSaveName = (name: string) => {
        updateName(name);
    };

    // Conditional rendering for the main interaction area
    const renderContent = () => {
        if (!locationState.permissionGranted) {
            return <LocationPermission locationState={locationState} />;
        }

        return (
            <div className="space-y-1">
                {/* Input Section */}

                <ClipboardInput
                    geoCell={locationState.geoCell!}
                    alias={profile.name}
                    userId={profile.id}
                    onSubmitSuccess={handleSubmitSuccess}
                />

                {/* Feed Section */}
                <ClipboardFeed key={refreshKey} geoCell={locationState.geoCell!} userId={profile.id} />
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* AdBlock Detector */}
            <AdBlockDetector />

            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800">Local Share</h1>
                                <p className="text-xs text-gray-500">Local Share & Community Text Drop</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setShowProfileModal(true)}
                                    className="flex items-center gap-2 px-3 py-2 bg-primary-50 border border-primary-200 rounded-lg text-sm font-medium text-primary-700 hover:bg-primary-100 transition-colors"
                                    title="Edit your display name"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="hidden sm:inline">{profile.name}</span>
                                </button>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${locationState.permissionGranted ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    <div className={`w-2 h-2 rounded-full ${locationState.permissionGranted ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                    <span className={`text-xs font-medium ${locationState.permissionGranted ? 'text-green-700' : 'text-gray-500'}`}>
                                        {locationState.permissionGranted ? 'Connected' : 'Waiting'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content & Sidebar Layout */}
            {/* Main Content & Sidebar Layout */}
            {/* Adsterra Leaderboard (728x90) - Visible on Desktop */}
            <div className="hidden md:block max-w-7xl mx-auto px-4 mt-16 text-center">
                <AdsterraSlot confKey="902fd7bb53e5c530ed5c74f8aac32749" height={90} width={728} />
            </div>

            <div className="max-w-full mx-auto px-2 py-0">
                <div className="flex flex-col lg:flex-row gap-2 justify-center">
                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-[300px] flex-shrink-0 lg:order-first order-last space-y-4">
                        {/* Sticky Container */}
                        <div className="lg:sticky lg:top-8 space-y-4">
                            {/* Adsterra Skyscraper 160x600 (Requested for "empty left side") */}
                            <AdsterraSlot confKey="522e88f625d0d1bd94d2fe32ffd25ae0" height={600} width={160} className="mx-auto" />

                            {/* Ad Unit - Clean (no container) - Keep AdSense for when approved */}
                            <AdUnit slotId="SIDEBAR_AD_SLOT" />
                        </div>
                    </aside>

                    {/* Main Interaction Area (Center) */}
                    <div className="flex-1 min-w-0 max-w-4xl">
                        {renderContent()}

                        {/* Bottom Ads Section (Moved Inside Middle Column to remove gap) */}
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">Advertisement</p>

                            {/* Desktop */}
                            <div className="hidden md:block">
                                <AdsterraSlot confKey="902fd7bb53e5c530ed5c74f8aac32749" height={90} width={728} />
                            </div>

                            {/* Tablet */}
                            <div className="hidden sm:block md:hidden">
                                <AdsterraSlot confKey="d8b53417bd3c184afba226eaa0cb71d5" height={60} width={468} />
                            </div>

                            {/* Mobile */}
                            <div className="block sm:hidden">
                                <AdsterraSlot confKey="15b635755a72dde4108826eabafe6653" height={50} width={320} />
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <aside className="hidden xl:block w-[160px] flex-shrink-0 space-y-4">
                        <div className="lg:sticky lg:top-8 space-y-2">
                            {/* Adsterra Skyscraper 160x600 (Top) */}
                            <AdsterraSlot confKey="522e88f625d0d1bd94d2fe32ffd25ae0" height={600} width={160} />

                            {/* Adsterra Skyscraper 160x600 (Bottom - Request) */}
                            <AdsterraSlot confKey="522e88f625d0d1bd94d2fe32ffd25ae0" height={600} width={160} />
                        </div>
                    </aside>
                </div>
            </div>

            {/* Publisher Content / SEO Section for AdSense */}
            <section className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-200">
                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">How Local Share Works</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">1</div>
                                <p className="text-gray-600"><strong>Local Matching:</strong> We use your device&apos;s location to calculate a precise &quot;geo-cell&quot;. You strictly connect with people in this same grid.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">2</div>
                                <p className="text-gray-600"><strong>Anonymous Sharing:</strong> No accounts required. Choose a display name and start sharing text, links, or notes instantly.</p>
                            </li>
                            <li className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">3</div>
                                <p className="text-gray-600"><strong>Auto-Expiry:</strong> To keep the feed fresh and relevant, all messages automatically disappear after 1 hour.</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Why use this tool?</h2>
                        <div className="space-y-4 text-gray-600">
                            <p>
                                <strong>Events &amp; Conferences:</strong> Quickly share WiFi passwords, schedule links, or contact info with everyone in the room without collecting emails.
                            </p>
                            <p>
                                <strong>Classrooms &amp; Workshops:</strong> Teachers can drop URLs or code snippets for students to pick up immediately.
                            </p>
                            <p>
                                <strong>Local Communities:</strong> Share neighborhood alerts or announcements with people physically nearby.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="bg-gray-100 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What Users Are Saying</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <p className="text-gray-600 italic mb-4">&quot;Perfect for sharing WiFi passwords with guests. No more spelling out complex passwords character by character!&quot;</p>
                            <p className="text-sm font-semibold text-gray-800">— Home User</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <p className="text-gray-600 italic mb-4">&quot;I use this in my classroom to share links instantly. Students just open the site and grab what they need.&quot;</p>
                            <p className="text-sm font-semibold text-gray-800">— High School Teacher</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <p className="text-gray-600 italic mb-4">&quot;Great for conferences! No app downloads, no account setup. Just works.&quot;</p>
                            <p className="text-sm font-semibold text-gray-800">— Event Organizer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Preview Section */}
            <section className="max-w-4xl mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Frequently Asked Questions</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2">Is my location tracked?</h3>
                        <p className="text-gray-600 text-sm">No. We never store your exact GPS coordinates. Only a geo-cell ID is used, which cannot be reverse-engineered to find your precise location.</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2">Do I need to create an account?</h3>
                        <p className="text-gray-600 text-sm">No account required! Local Share is completely anonymous. Just pick a display name and start sharing.</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2">How long do messages last?</h3>
                        <p className="text-gray-600 text-sm">All messages automatically expire after 1 hour. This keeps the feed fresh and ensures your data doesn&apos;t persist.</p>
                    </div>
                    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-2">What&apos;s the range?</h3>
                        <p className="text-gray-600 text-sm">Approximately 200 meters (650 feet). Perfect for a classroom, building, or small outdoor area.</p>
                    </div>
                </div>
                <div className="text-center mt-6">
                    <a href="/faq" className="text-primary-600 font-medium hover:underline">View all FAQs →</a>
                </div>
            </section>

            {/* Blog Preview Section */}
            <section className="bg-primary-50 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">From Our Blog</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <a href="/blog/privacy-first-design" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow block">
                            <div className="text-xs font-semibold text-red-600 uppercase mb-2">Deep Dive</div>
                            <h3 className="font-bold text-gray-800 mb-2">Privacy-First Design</h3>
                            <p className="text-gray-600 text-sm">How we built a location-based tool that never stores your exact location.</p>
                        </a>
                        <a href="/blog/classroom-collaboration-guide" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow block">
                            <div className="text-xs font-semibold text-orange-600 uppercase mb-2">Education</div>
                            <h3 className="font-bold text-gray-800 mb-2">Classroom Guide</h3>
                            <p className="text-gray-600 text-sm">10 ways teachers can use Local Share for instant resource sharing.</p>
                        </a>
                        <a href="/blog/share-wifi-passwords" className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow block">
                            <div className="text-xs font-semibold text-teal-600 uppercase mb-2">Tips</div>
                            <h3 className="font-bold text-gray-800 mb-2">Share WiFi Instantly</h3>
                            <p className="text-gray-600 text-sm">Stop spelling out complex passwords. Just drop them in the local feed.</p>
                        </a>
                    </div>
                    <div className="text-center mt-6">
                        <a href="/blog" className="text-primary-600 font-medium hover:underline">Read more articles →</a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 bg-gray-50 border-t border-gray-200">
                <div className="max-w-4xl mx-auto px-4 text-center text-sm text-gray-600">
                    <div className="flex justify-center flex-wrap gap-4 mb-4">
                        <a href="/about" className="hover:text-gray-900 hover:underline">About</a>
                        <a href="/faq" className="hover:text-gray-900 hover:underline">FAQ</a>
                        <a href="/blog" className="font-medium text-primary-600 hover:text-primary-800 hover:underline">Blog</a>
                        <a href="/contact" className="hover:text-gray-900 hover:underline">Contact</a>
                        <span className="text-gray-300">|</span>
                        <a href="/privacy" className="hover:text-gray-900 hover:underline">Privacy</a>
                        <a href="/terms" className="hover:text-gray-900 hover:underline">Terms</a>
                    </div>
                    <p className="mb-2">
                        <span className="font-semibold">Privacy First:</span> Your exact location is never stored.
                        Messages expire after 1 hour.
                    </p>
                    <p className="text-xs text-gray-500">
                        GPS Clipboard • Anonymous • Local • Secure
                    </p>
                </div>
            </footer>

            <ProfileModal
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                currentName={profile.name}
                onSave={handleSaveName}
            />
        </main>
    );
}
