'use client';

import { useCallback, useState, useEffect } from 'react';
import { useClipboard } from '@/hooks/useClipboard';
import { useRealtime } from '@/hooks/useRealtime';
import SnippetCard from './SnippetCard';

import { Snippet } from '@/types';

interface ClipboardFeedProps {
    geoCell: string;
    userId: string;
    activeRoom?: string | null;
    onCreateRoom?: (code: string) => void;
    onJoinRoom?: (code: string) => void;
    onLeaveRoom?: () => void;
    isRoomCreator?: boolean;
}

export default function ClipboardFeed({ 
    geoCell, 
    userId, 
    activeRoom, 
    onCreateRoom,
    onJoinRoom,
    onLeaveRoom,
    isRoomCreator
}: ClipboardFeedProps) {
    const { snippets, isLoading, error, refresh } = useClipboard(geoCell);
    const [localSnippets, setLocalSnippets] = useState<Snippet[]>([]);

    // Clear realtime snippets if we change rooms/cells
    useEffect(() => {
        setLocalSnippets([]);
    }, [geoCell]);
    
    // Modals State
    const [showQR, setShowQR] = useState(false);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [joinCodeInput, setJoinCodeInput] = useState('');
    const [pendingRoomCode, setPendingRoomCode] = useState<string | null>(null);
    
    const displayRoomCode = activeRoom || pendingRoomCode || '';
    const hostUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/?room=${displayRoomCode}`
        : 'https://local-share.tech';

    const handleCreateRoom = () => {
        if (!activeRoom && onCreateRoom) {
            // Generate a random 6-digit code
            const newCode = Math.floor(100000 + Math.random() * 900000).toString();
            setPendingRoomCode(newCode);
            onCreateRoom(newCode);
        }
        setShowQR(true);
    };

    // Handle new snippets from realtime subscription
    const handleNewSnippet = useCallback((newSnippet: Snippet) => {
        setLocalSnippets(prev => {
            // Check if snippet already exists
            if (prev.some(s => s.id === newSnippet.id)) {
                return prev;
            }
            return [newSnippet, ...prev];
        });

        // Also refresh the main data
        refresh();
    }, [refresh]);

    // Handle modified snippets from realtime subscription
    const handleModifiedSnippet = useCallback((modifiedSnippet: Snippet) => {
        setLocalSnippets(prev => {
            if (prev.some(s => s.id === modifiedSnippet.id)) {
                return prev.map(s => s.id === modifiedSnippet.id ? modifiedSnippet : s);
            } else {
                return [modifiedSnippet, ...prev];
            }
        });

        refresh();
    }, [refresh]);

    // Handle deleted snippets from realtime subscription
    const handleRemovedSnippet = useCallback((snippetId: string) => {
        setLocalSnippets(prev => prev.filter(s => s.id !== snippetId));
        refresh();
    }, [refresh]);

    useRealtime(geoCell, handleNewSnippet, handleModifiedSnippet, handleRemovedSnippet);

    // Combine fetched snippets with real-time ones
    const allSnippets = [...localSnippets, ...snippets].reduce((acc, snippet) => {
        if (!acc.find(s => s.id === snippet.id)) {
            acc.push(snippet);
        }
        return acc;
    }, [] as Snippet[]);

    // Sort by created_at descending
    allSnippets.sort((a, b) => {
        const aTime = a.created_at.toMillis();
        const bTime = b.created_at.toMillis();
        return bTime - aTime;
    });

    const uniqueUsersCount = new Set(allSnippets.map(s => s.alias)).size;

    const renderSnippetsList = () => {
        if (isLoading) {
            return (
                <div className="text-center py-12">
                    <div className="w-12 h-12 mx-auto mb-4 relative">
                        <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-gray-600">Loading nearby messages...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-12 bg-red-50 rounded-xl border border-red-200">
                    <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 font-semibold mb-2">Failed to load messages</p>
                    <button
                        onClick={() => refresh()}
                        className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                        Try again
                    </button>
                </div>
            );
        }

        if (allSnippets.length === 0) {
            return (
                <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">No messages in this {activeRoom ? 'room' : 'area'} yet</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">
                        Be the first to share something with people around you! Messages appear in real-time.
                    </p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {allSnippets.map((snippet) => (
                    <SnippetCard 
                        key={snippet.id} 
                        snippet={snippet} 
                        userId={userId}
                    />
                ))}
            </div>
        );
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">
                        {activeRoom ? 'Group Messages' : 'Nearby Messages'} ({allSnippets.length})
                    </h2>
                    {allSnippets.length > 0 && (
                        <p className="text-sm text-green-600 font-medium flex items-center gap-1.5 mt-1">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            {uniqueUsersCount} {uniqueUsersCount === 1 ? 'person' : 'people'} {activeRoom ? 'online' : 'nearby'}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    {!activeRoom ? (
                        <>
                            <button
                                onClick={handleCreateRoom}
                                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary-200 bg-primary-50 hover:bg-primary-100 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                                Create Room
                            </button>
                            <button
                                onClick={() => setShowJoinModal(true)}
                                className="text-sm text-gray-600 hover:text-gray-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                                Join Room
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setShowQR(true)}
                                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg border border-primary-200 bg-primary-50 hover:bg-primary-100 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Share Code
                            </button>
                            <button
                                onClick={() => { if (onLeaveRoom) onLeaveRoom(); }}
                                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1 px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
                                title={isRoomCreator ? "Close this room and kick everyone" : "Leave this room"}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                {isRoomCreator ? 'End Room' : 'Leave'}
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => refresh()}
                        className="text-sm text-gray-500 hover:text-gray-800 font-medium flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* QR Dialog */}
            {showQR && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-slide-up">
                        <div className="p-8 text-center relative">
                            <button onClick={() => setShowQR(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                            <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Join this Room</h3>
                            <p className="text-gray-500 mb-6">Scan to connect, or enter this code directly:</p>
                            
                            {displayRoomCode && (
                                <div className="mb-6">
                                    <span className="text-4xl font-black text-gray-800 tracking-widest bg-gray-100 px-6 py-3 rounded-xl border border-gray-200">
                                        {displayRoomCode}
                                    </span>
                                </div>
                            )}
                            
                            <div className="bg-white p-4 rounded-xl border-2 border-gray-100 inline-block mb-8 shadow-sm">
                                <img 
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(hostUrl)}`} 
                                    width={192} 
                                    height={192} 
                                    className="w-48 h-48"
                                    alt="Room QR Code" 
                                />
                            </div>
                            
                            <button
                                onClick={() => setShowQR(false)}
                                className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-xl transition-colors focus:ring-2 focus:ring-gray-300 focus:outline-none"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Join Room Modal */}
            {showJoinModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-auto shadow-2xl relative">
                        <button
                            onClick={() => setShowJoinModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">Join a Room</h3>
                            <p className="text-gray-500 mb-6">Enter a 6-digit code to connect.</p>
                            
                            <input 
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                placeholder="6-Digit Code"
                                value={joinCodeInput}
                                onChange={(e) => setJoinCodeInput(e.target.value.replace(/\D/g, ''))}
                                className="w-full text-center text-3xl font-black tracking-widest text-gray-800 bg-gray-50 border border-gray-200 rounded-xl px-4 py-4 mb-6 focus:ring-2 focus:ring-primary-500 focus:outline-none"
                            />
                            
                            <button
                                onClick={() => {
                                    if (joinCodeInput.length >= 4 && onJoinRoom) {
                                        onJoinRoom(joinCodeInput);
                                        setShowJoinModal(false);
                                        setJoinCodeInput('');
                                    }
                                }}
                                disabled={joinCodeInput.length < 4}
                                className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl disabled:opacity-50 transition-all hover:bg-gray-800"
                            >
                                Join Room
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {allSnippets.length === 0 ? (
                <div className="text-center py-16 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-100">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">No messages {activeRoom ? 'in this room' : 'nearby'} yet</h3>
                    <p className="text-gray-600 max-w-sm mx-auto">
                        Be the first to share something with people around you! Messages appear in real-time.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {allSnippets.map((snippet) => (
                        <div key={snippet.id}>
                            <SnippetCard
                                snippet={snippet}
                                userId={userId}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
