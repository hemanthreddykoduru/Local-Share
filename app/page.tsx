'use client';

import { useLocation } from '@/hooks/useLocation';
import LocationPermission from '@/components/LocationPermission';
import ClipboardInput from '@/components/ClipboardInput';
import ClipboardFeed from '@/components/ClipboardFeed';
import RazorpayButton from '@/components/RazorpayButton';
import ProfileModal from '@/components/ProfileModal';
import SiteFooter from '@/components/SiteFooter';
import { useState, useEffect, useCallback } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useRoom } from '@/hooks/useRoom';
import { createRoom, deleteRoom, checkRoomExists } from '@/lib/firebase';

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
        <main className="min-h-screen bg-white font-sans text-gray-900">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-lg shadow-primary-100">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-black text-gray-900 tracking-tight"><a href="/">Local Share</a></h1>
                        </div>
                        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
                            <a href="/how-it-works" className="hover:text-primary-600 transition-colors">How it works</a>
                            <a href="/use-cases" className="hover:text-primary-600 transition-colors">Use Cases</a>
                            <a href="/pricing" className="hover:text-primary-600 transition-colors">Pricing</a>
                            <a href="/blog" className="hover:text-primary-600 transition-colors">Blog</a>
                            <a href="/manage" className="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all shadow-md shadow-primary-100">Share PDF</a>
                        </nav>
                        <button onClick={() => setShowProfileModal(true)} className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                             <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-bold text-xs uppercase">
                                {mounted ? profile.name.charAt(0) : '?'}
                             </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-24 pb-16 px-6 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
                <div className="max-w-4xl mx-auto text-center relative z-10">
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

            {/* Feature Grid */}
            <section className="py-20 px-6 bg-white border-y border-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">GPS Geo-Cells</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Our unique Geo-Cell technology creates a virtual 200m clipboard around you. Anyone in the same cell can see your drops, making it perfect for classrooms, coffee shops, and workshops.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002-2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Zero-Trace Privacy</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Privacy is not an afterthought; it's our core architecture. Every drop automatically self-destructs after one hour, leaving no trace on your devices or our servers. No permanent accounts required.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">SaaS Document Sharing</h3>
                            <p className="text-gray-500 leading-relaxed font-medium">
                                Beyond text snippets, Local Share now offers a professional PDF sharing platform. Upload, manage, and track views for your documents with high-fidelity analytics and short, branded links.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* App Section */}
            <section id="app" className="py-24 px-6 bg-gray-50 scroll-mt-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-8 justify-center">
                        <aside className="w-full lg:w-[320px] space-y-6">
                            <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                                <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl mb-6 ${privateRoom ? 'bg-purple-50 text-purple-700' : locationState.permissionGranted ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    <div className={`w-2.5 h-2.5 rounded-full ${privateRoom ? 'bg-purple-500' : locationState.permissionGranted ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                                    <span className="text-xs font-black uppercase tracking-widest">
                                        {privateRoom ? `Room ${privateRoom}` : locationState.permissionGranted ? 'Live Connection' : 'Disconnected'}
                                    </span>
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-4">How it works</h4>
                                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                                    Local Share creates a virtual 200-meter clipboard around your current location. No apps or accounts needed.
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

            {/* Founder Section */}
            <section className="py-24 px-6 bg-white overflow-hidden relative">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="w-full aspect-square bg-gradient-to-br from-primary-500 to-primary-900 rounded-[60px] flex items-center justify-center rotate-3 shadow-2xl relative z-10">
                                <span className="text-white text-9xl font-black opacity-10 text-center">HEMANTH</span>
                            </div>
                            <div className="absolute inset-0 bg-primary-100 rounded-[60px] -rotate-3 -translate-x-4"></div>
                        </div>
                        <div className="space-y-8">
                            <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">Built for a more <span className="text-primary-600">connected</span> physical world.</h2>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed italic">
                                "I built Local Share because I was tired of the friction involved in simple, local data transfers. Whether it's a URL in a workshop or a PDF in a classroom, we shouldn't have to exchange phone numbers to move bits of data across a 2-meter gap."
                            </p>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">Hemanth Reddy</h4>
                                <p className="text-gray-500 font-medium">Founder, Local-Share.tech</p>
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
