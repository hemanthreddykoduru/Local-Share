'use client';

import { useLocation } from '@/hooks/useLocation';
import LocationPermission from '@/components/LocationPermission';
import ClipboardInput from '@/components/ClipboardInput';
import ClipboardFeed from '@/components/ClipboardFeed';
import RazorpayButton from '@/components/RazorpayButton';
import ProfileModal from '@/components/ProfileModal';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useRoom } from '@/hooks/useRoom';
import { createRoom, deleteRoom, checkRoomExists } from '@/lib/firebase';

function Typewriter({ text, delay = 100 }: { text: string, delay?: number }) {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);
            return () => clearTimeout(timeout);
        } else {
            // Loop: Wait 2 seconds then reset
            const resetTimeout = setTimeout(() => {
                setCurrentText('');
                setCurrentIndex(0);
            }, 2000);
            return () => clearTimeout(resetTimeout);
        }
    }, [currentIndex, delay, text]);

    return (
        <span>
            {currentText}
            <span className="text-primary-600 animate-pulse">|</span>
        </span>
    );
}

export default function Home() {
    const locationState = useLocation();
    const [refreshKey, setRefreshKey] = useState(0);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const { profile, updateName, authReady, authError } = useProfile();
    const [mounted, setMounted] = useState(false);
    const [privateRoom, setPrivateRoom] = useState<string | null>(null);
    const [isRoomCreator, setIsRoomCreator] = useState(false);
    const [showClosedModal, setShowClosedModal] = useState(false);

    const { isRoomValid, isChecking: isRoomChecking } = useRoom(privateRoom);

    useEffect(() => {
        setMounted(true);
        if (typeof window !== 'undefined') {
            const searchParams = new URLSearchParams(window.location.search);
            const roomCode = searchParams.get('room');
            if (roomCode) {
                setPrivateRoom(roomCode.toUpperCase());
            }
        }
    }, []);

    useEffect(() => {
        if (privateRoom && !isRoomChecking && !isRoomValid) {
            if (!isRoomCreator) {
                setShowClosedModal(true);
            } else {
                clearRoom();
            }
        }
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

    const handleLeaveRoom = useCallback(async () => {
        if (!privateRoom) return;
        if (isRoomCreator) {
            await deleteRoom(privateRoom);
        } else {
            clearRoom();
        }
    }, [privateRoom, isRoomCreator, clearRoom]);

    const handleSubmitSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    const handleSaveName = (name: string) => {
        updateName(name);
    };

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
                <ClipboardInput
                    geoCell={effectiveGeoCell!}
                    alias={mounted ? profile.name : ''}
                    userId={profile.id}
                    authReady={authReady}
                    authError={authError}
                    onSubmitSuccess={handleSubmitSuccess}
                />
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
        <main className="min-h-screen bg-white flex flex-col font-sans">
            <SiteHeader />

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
                <div className="max-w-4xl mx-auto text-center relative z-10 animate-reveal">
                    <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-8">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse"></span>
                        Privacy-First Local Networking
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 tracking-tighter leading-[1.1]">
                        The invisible bridge for your <span className="text-primary-600">nearby data.</span>
                    </h2>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto mb-12">
                        Share text, links, and documents with people sitting right next to you — without exchanging phone numbers, joining groups, or downloading apps.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#app" className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-xl shadow-gray-200 text-lg">
                            Open Clipboard
                        </a>
                        <a href="/use-cases" className="w-full sm:w-auto px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all text-lg">
                            Explore Use Cases
                        </a>
                    </div>
                </div>
            </section>

            {/* Feature Grid - Expanded for SEO/Value */}
            <section className="py-24 px-6 bg-white border-y border-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">The Three Pillars of <span className="text-primary-600">Local Sharing.</span></h2>
                        <p className="text-gray-600 text-lg font-medium leading-relaxed">
                            Most file-sharing tools are built for the global web, ignoring the unique needs of people in the same physical room. Local Share is engineered from the ground up to prioritize proximity, privacy, and speed.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 animate-slide-up">
                        <div className="group space-y-6">
                            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">GPS Geo-Cell Technology</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Traditional location sharing involves tracking your precise movement across a map. Our proprietary **Geo-Cell** technology is different. We divide the world into a massive grid of 200-meter "cells." When you open Local Share, you aren&apos;t "tracked"; you are simply associated with your current cell. 
                            </p>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                This creates a virtual, location-locked "room" where everyone in the same building or park can drop data instantly. It is the digital equivalent of a physical whiteboard—visible only to those who are actually there. No accounts, no persistent tracking, and no global footprint.
                            </p>
                        </div>
                        <div className="group space-y-6">
                            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002-2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Zero-Trace Privacy Architecture</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                We believe that temporary data should stay temporary. In an era where every click is logged and every message is archived, Local Share offers a "Digital Memory" that fades. Every drop on our platform is governed by a strict **60-minute TTL (Time-To-Live)**.
                            </p>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                After one hour, your text or link is purged from our encrypted database forever. This "Zero-Trace" philosophy makes Local Share the safest way to share guest WiFi passwords, temporary links, or meeting notes without worrying about the data living indefinitely in a cloud silo.
                            </p>
                        </div>
                        <div className="group space-y-6">
                            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-3xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-500 shadow-sm">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Frictionless SaaS Integration</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                While our root utility is anonymous sharing, we have expanded into professional document management. Our PDF sharing platform allows businesses to upload marketing materials or technical specs and generate a "Local Link." 
                            </p>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Imagine a conference where a speaker says, "Open Local Share to get the slide deck." Within 5 seconds, hundreds of attendees have the PDF on their phones without a single app download. This is the power of proximity-based SaaS: delivering the right document, to the right person, at the right location, at the right time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: The Engineering Deep Dive */}
            <section className="py-24 px-6 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto animate-slide-up">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg">
                                Technical Deep-Dive
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                                How we engineered <span className="text-primary-600">Digital Proximity.</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                Building a location-based tool that respects privacy is a major engineering challenge. Most apps solve this by asking for "Always Allow" location permissions and streaming your GPS data to a server. We rejected this model.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                                        <span className="text-primary-600 font-bold">01</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Spatial Indexing</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">We use a mathematical rounding algorithm to convert your latitude and longitude into a discrete cell ID. Your raw coordinates never leave your browser; only the "Cell Hash" is sent to our infrastructure.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                                        <span className="text-primary-600 font-bold">02</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Peer Discovery</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">Once in a cell, our real-time database establishes a listener for that specific hash. This allows for sub-100ms latency between someone posting a link and you seeing it on your screen.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
                                        <span className="text-primary-600 font-bold">03</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 mb-1">Stateless Sessions</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">Because we don&apos;t use cookies to track identity, every visit is essentially a "clean slate." Your privacy is protected by the very design of the platform, not just a policy written in a PDF.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-primary-600 to-primary-900 rounded-[40px] p-12 text-white shadow-2xl relative z-10">
                                <h3 className="text-2xl font-bold mb-6 italic">&quot;Proximity is the ultimate filter.&quot;</h3>
                                <p className="text-primary-100 leading-relaxed mb-8">
                                    The global internet is noisy because anyone can reach you. By filtering the world through physical space, we rediscover the relevance of the people and information immediately around us.
                                </p>
                                <div className="bg-primary-800/50 rounded-2xl p-6 border border-primary-500/30">
                                    <code className="text-xs text-primary-200 block mb-2">// Geo-Cell Calculation</code>
                                    <code className="text-sm text-white block">CellID = floor(lat / 0.002) + &quot;_&quot; + floor(lon / 0.002)</code>
                                </div>
                            </div>
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-100 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Section */}
            <section id="app" className="py-24 px-6 bg-white scroll-mt-20 border-b border-gray-50">
                <div className="max-w-7xl mx-auto animate-fade-in">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-6">
                            {mounted ? (
                                <Typewriter text="Enter the Local Feed." delay={150} />
                            ) : (
                                "Enter the Local Feed."
                            )}
                        </h2>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Grant location permission to join your 200m Geo-Cell, or create a private room for remote collaboration.
                        </p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-8 justify-center">
                        <aside className="w-full lg:w-[320px] space-y-6">
                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl mb-6 ${privateRoom ? 'bg-purple-50 text-purple-700' : locationState.permissionGranted ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    <div className={`w-2.5 h-2.5 rounded-full ${privateRoom ? 'bg-purple-500' : locationState.permissionGranted ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                    <span className="text-xs font-black uppercase tracking-widest">
                                        {privateRoom ? `Room ${privateRoom}` : locationState.permissionGranted ? 'Live Connection' : 'Disconnected'}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-4">Support the Project</h4>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                    Local Share is an independent, founder-led project. Your donations help keep our location-aware servers running and ensure we never have to sell user data.
                                </p>
                                <div className="pt-4 border-t border-gray-100">
                                    <RazorpayButton />
                                </div>
                            </div>
                        </aside>
                        <div className="flex-1 max-w-4xl min-w-0">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </section>

            {/* NEW SECTION: The Social Contract of Proximity */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-5xl mx-auto text-center animate-slide-up">
                    <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-12 tracking-tight">The Social Contract of <span className="text-primary-600">Nearby Sharing.</span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                        <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Why proximity feels safer.</h4>
                            <p className="text-gray-600 leading-relaxed mb-6 font-medium">
                                On the global internet, you are sharing with billions of anonymous actors. The risk of phishing or malicious interception is high because the scale is infinite. But in a local room, the "Social Contract" is physical.
                            </p>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                When you drop a guest WiFi password at a coffee shop, you can physically see the 10-15 people who have access to that feed. This human-scale networking reduces the psychological barrier to sharing and creates an environment of implicit trust.
                            </p>
                        </div>
                        <div className="bg-primary-50 p-10 rounded-[40px] border border-primary-100">
                            <h4 className="text-2xl font-bold text-primary-900 mb-4">Ephemeral by Design.</h4>
                            <p className="text-primary-800 leading-relaxed mb-6 font-medium">
                                Most platforms want to keep your data forever because data is their currency. We built Local Share with the opposite goal: to delete your data as soon as its utility is gone. 
                            </p>
                            <p className="text-primary-800 leading-relaxed font-medium">
                                This "Ephemeral Architecture" is our promise to you. By setting a hard 60-minute expiry on every drop, we ensure that even if someone were to join your Geo-Cell tomorrow, they wouldn&apos;t find a single trace of what was shared today.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder Section - Expanded for EEAT */}
            <section className="py-24 px-6 bg-gray-50 overflow-hidden relative">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="relative">
                            <div className="w-full aspect-square bg-gradient-to-br from-primary-500 to-primary-900 rounded-[60px] flex items-center justify-center rotate-3 shadow-2xl relative z-10 overflow-hidden">
                                <span className="text-black text-7xl md:text-8xl font-black opacity-20 text-center select-none uppercase tracking-tighter">
                                    Hemanth
                                </span>
                            </div>
                            <div className="absolute inset-0 bg-primary-200 rounded-[60px] -rotate-3 -translate-x-4"></div>
                        </div>
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 text-primary-600 font-bold uppercase tracking-widest text-xs">
                                Founder Story & Vision
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight italic">
                                &quot;I tested the first prototype at <span className="text-primary-600">GITAM Campus.</span>&quot;
                            </h2>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                I built Local Share during my time as a Software Engineering student at GITAM Bengaluru. I noticed a constant friction point: every time we formed a study group or held a workshop, we spent the first 10 minutes just trying to share a URL or a PDF.
                            </p>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed">
                                We were exchanging phone numbers just to send a single link. It felt invasive and inefficient. Local Share was born from that campus frustration. Today, it serves thousands of users worldwide, proving that the most powerful connections are often the ones sitting right in front of us.
                            </p>
                            <div className="pt-4 flex items-center gap-4">
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900">Hemanth Reddy</h4>
                                    <p className="text-gray-500 font-medium">Founder & Software Engineer</p>
                                </div>
                                <div className="h-10 w-px bg-gray-300"></div>
                                <a href="/about" className="text-primary-600 font-bold hover:underline">Full Bio →</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <SiteFooter />

            {/* Modals */}
            {showProfileModal && (
                <ProfileModal
                    isOpen={showProfileModal}
                    onClose={() => setShowProfileModal(false)}
                    currentName={profile.name}
                    onSave={handleSaveName}
                />
            )}

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
