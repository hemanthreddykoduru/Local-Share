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
import { useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useRoom } from '@/hooks/useRoom';
import { createRoom, deleteRoom, checkRoomExists } from '@/lib/firebase';

export default function Home() {
    const locationState = useLocation();
    const [refreshKey, setRefreshKey] = useState(0);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { profile, updateName } = useProfile();
    const [mounted, setMounted] = useState(false);
    const [privateRoom, setPrivateRoom] = useState<string | null>(null);
    // Track whether the current user is the room creator
    const [isRoomCreator, setIsRoomCreator] = useState(false);
    const [showClosedModal, setShowClosedModal] = useState(false);

    // Real-time room watcher — kicks users out when creator leaves
    const { isRoomValid, isChecking: isRoomChecking, creatorId } = useRoom(privateRoom);

    useEffect(() => {
        setMounted(true);
        // Check URL for ?room=123456
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const roomCode = searchParams.get('room');
            if (roomCode) {
                setPrivateRoom(roomCode.toUpperCase());
            }
        }
    }, []);

    // Auto-kick: if room becomes invalid (creator left), clear local room state
    useEffect(() => {
        if (privateRoom && !isRoomChecking && !isRoomValid) {
            if (!isRoomCreator) {
                setShowClosedModal(true);
            } else {
                clearRoom();
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRoomValid, isRoomChecking, privateRoom, isRoomCreator]);

    const clearRoom = useCallback(() => {
        setPrivateRoom(null);
        setIsRoomCreator(false);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.delete('room');
            window.history.pushState({}, '', url.toString());
        }
    }, []);

    // Called by LocationPermission/ClipboardFeed Create Room buttons
    const handleCreateRoom = useCallback(async (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const ok = await createRoom(cleanCode, profile.id);
        if (!ok) {
            alert('Failed to create room. Please try again.');
            return;
        }
        setIsRoomCreator(true);
        setPrivateRoom(cleanCode);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('room', cleanCode);
            window.history.pushState({}, '', url.toString());
        }
    }, [profile.id]);

    // Called by Join Room UI
    const handleJoinRoom = useCallback(async (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        const roomData = await checkRoomExists(cleanCode);
        if (!roomData) {
            alert('Room not found or has already been closed.');
            return;
        }
        setIsRoomCreator(false);
        setPrivateRoom(cleanCode);
        if (typeof window !== 'undefined') {
            const url = new URL(window.location.href);
            url.searchParams.set('room', cleanCode);
            window.history.pushState({}, '', url.toString());
        }
    }, []);

    // Creator leaves → delete room → everyone gets kicked in real-time
    const handleLeaveRoom = useCallback(async () => {
        if (!privateRoom) return;
        if (isRoomCreator) {
            await deleteRoom(privateRoom);
            // clearRoom will be called by the useEffect watching isRoomValid
        } else {
            clearRoom();
        }
    }, [privateRoom, isRoomCreator, clearRoom]);

    // Backward-compat: used by LocationPermission which passes a code directly
    const handleRoomChange = useCallback((code: string) => {
        if (!code) { clearRoom(); return; }
        // If code is new (user is creating), call handleCreateRoom
        // LocationPermission already distinguishes Create vs Join
        handleCreateRoom(code);
    }, [handleCreateRoom, clearRoom]);

    const handleSubmitSuccess = () => {
        // Trigger refresh of feed
        setRefreshKey(prev => prev + 1);
    };

    const handleSaveName = (name: string) => {
        updateName(name);
    };

    // Conditional rendering for the main interaction area
    const effectiveGeoCell = privateRoom ? `room_${privateRoom}` : locationState.geoCell;
    const isReady = privateRoom !== null || locationState.permissionGranted;

    const renderContent = () => {
        if (!isReady) {
            return (
                <LocationPermission
                    locationState={locationState}
                    onCreatePrivateRoom={handleCreateRoom}
                    onJoinPrivateRoom={handleJoinRoom}
                />
            );
        }

        return (
            <div className="space-y-3">
                {/* Input Section */}
                <ClipboardInput
                    geoCell={effectiveGeoCell!}
                    alias={mounted ? profile.name : ''}
                    userId={profile.id}
                    onSubmitSuccess={handleSubmitSuccess}
                />

                {/* Feed Section */}
                <ClipboardFeed 
                    key={refreshKey} 
                    geoCell={effectiveGeoCell!} 
                    userId={profile.id} 
                    activeRoom={privateRoom}
                    onCreateRoom={handleCreateRoom}
                    onJoinRoom={handleJoinRoom}
                    onLeaveRoom={handleLeaveRoom}
                    isRoomCreator={isRoomCreator}
                />
            </div>
        );
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* AdBlock Detector */}
            {/* <AdBlockDetector /> */}

            {/* Header */}
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-800"><a href="/">Local Share</a></h1>
                                <p className="text-xs text-gray-500">Local Share & Community Text Drop</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                            <a href="/blog" className="hover:text-primary-600 transition-colors">Blog</a>
                            <a href="/faq" className="hover:text-primary-600 transition-colors">FAQ</a>
                            <a href="/about" className="hover:text-primary-600 transition-colors">About</a>
                        </nav>
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
                                    <span className="hidden sm:inline">{mounted ? profile.name : ''}</span>
                                </button>
                                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${privateRoom ? 'bg-purple-100' : locationState.permissionGranted ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    {privateRoom ? (
                                        <span className="text-xs font-semibold text-purple-700">🔒 Room {privateRoom}</span>
                                    ) : (
                                        <>
                                            <div className={`w-2 h-2 rounded-full ${locationState.permissionGranted ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                            <span className={`text-xs font-medium ${locationState.permissionGranted ? 'text-green-700' : 'text-gray-500'}`}>
                                                {locationState.permissionGranted ? 'Connected' : 'Waiting'}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content & Sidebar Layout */}
            {/* Main Content & Sidebar Layout */}
            <div className="max-w-7xl mx-auto px-4 mt-8 text-center">
            </div>

            <div className="max-w-full mx-auto px-2 py-0">
                <div className="flex flex-col lg:flex-row gap-4 justify-center">
                    {/* Left Sidebar - Content for AdSense Value */}
                    <aside className="w-full lg:w-[300px] flex-shrink-0 lg:order-first order-last space-y-4">
                        {/* Sticky Container */}
                        <div className="lg:sticky lg:top-24 space-y-4">

                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    How it works
                                </h3>
                                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                    Share with people nearby via GPS, or create a private room with a 6-digit code — no accounts required.
                                </p>
                                <ul className="text-sm text-gray-600 space-y-2">
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>GPS mode connects you with people within ~200m automatically.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>Private Rooms let you share via a 6-digit code — no GPS needed.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-green-500 mt-0.5">✓</span>
                                        <span>All messages auto-delete after 1 hour for privacy.</span>
                                    </li>
                                </ul>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3">
                                    <a href="/blog/privacy-first-design" className="text-xs font-medium text-primary-600 hover:text-primary-800 flex items-center gap-1 group">
                                        Read our Privacy Architecture
                                        <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </a>
                                    <a 
                                        href="https://tightslybella.com/m8bybpc0?key=26747bf7af71ff67c33d96f2ea9f1210" 
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 px-3 py-2 rounded-lg text-center shadow-sm transition-all hover:shadow-md flex items-center justify-center gap-2"
                                    >
                                        ♥️ Support Local Share
                                    </a>
                                </div>
                            </div>

                        </div>
                    </aside>

                    {/* Main Interaction Area (Center) */}
                    <div className="flex-1 min-w-0 max-w-4xl">
                        {renderContent()}
                    </div>

                    {/* Right Sidebar */}
                    <aside className="hidden xl:block w-[160px] flex-shrink-0 space-y-4">
                        <div className="lg:sticky lg:top-24 space-y-2">
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

            {/* Room Closed Modal */}
            {showClosedModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-slide-up text-center p-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Room Closed</h2>
                        <p className="text-gray-600 mb-6">The creator has ended this room session. You have been disconnected.</p>
                        <button
                            onClick={() => {
                                setShowClosedModal(false);
                                clearRoom();
                            }}
                            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-colors"
                        >
                            Return to Home
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}
