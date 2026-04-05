'use client';

import { useState } from 'react';
import { LocationState } from '@/types';

interface LocationPermissionProps {
    locationState: LocationState;
    onCreatePrivateRoom?: (code: string) => void;
    onJoinPrivateRoom?: (code: string) => void;
}

export default function LocationPermission({ locationState, onCreatePrivateRoom, onJoinPrivateRoom }: LocationPermissionProps) {
    const { isLoading, error, permissionGranted } = locationState;
    const [roomInput, setRoomInput] = useState('');
    const [showJoinInput, setShowJoinInput] = useState(false);

    const handleCreateRoom = () => {
        if (!onCreatePrivateRoom) return;
        const newCode = Math.floor(100000 + Math.random() * 900000).toString();
        onCreatePrivateRoom(newCode);
    };

    const handleJoinRoom = () => {
        if (!onJoinPrivateRoom || roomInput.length < 4) return;
        onJoinPrivateRoom(roomInput.trim().toUpperCase());
    };

    if (permissionGranted) {
        return null;
    }

    const RoomOptions = () => (
        <div className="mt-8 border-t border-gray-100 pt-6">
            <p className="text-sm font-semibold text-gray-700 mb-4">No GPS? Use a Private Room instead:</p>
            <div className="flex flex-col gap-3">
                {/* Create Room */}
                <button
                    onClick={handleCreateRoom}
                    className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create a New Room
                </button>

                {/* Join Room toggle */}
                {!showJoinInput ? (
                    <button
                        onClick={() => setShowJoinInput(true)}
                        className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Join an Existing Room
                    </button>
                ) : (
                    <div className="flex gap-2">
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            placeholder="Enter 6-Digit Code"
                            maxLength={6}
                            value={roomInput}
                            onChange={(e) => setRoomInput(e.target.value.replace(/\D/g, ''))}
                            autoFocus
                            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:outline-none placeholder-gray-400 text-center font-bold tracking-widest"
                        />
                        <button
                            onClick={handleJoinRoom}
                            disabled={roomInput.length < 4}
                            className="bg-gray-800 hover:bg-gray-900 text-white font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Join
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="w-full py-12 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 max-w-md w-full text-center animate-fade-in">
                {isLoading ? (
                    <>
                        <div className="w-16 h-16 mx-auto mb-6 relative">
                            <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Requesting Location Access
                        </h2>
                        <p className="text-gray-600">
                            Please allow location access to connect with people nearby
                        </p>
                    </>
                ) : error ? (
                    <>
                        <div className="w-16 h-16 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Location Access Required
                        </h2>
                        <p className="text-gray-600 mb-6">
                            {error}
                        </p>
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-left text-sm text-gray-700">
                            <p className="font-semibold mb-2">Why we need location:</p>
                            <ul className="space-y-1 ml-4">
                                <li>• Connect you with nearby users</li>
                                <li>• Share text within ~200 meters</li>
                                <li>• No exact coordinates stored</li>
                                <li>• Privacy-safe geo-cell system</li>
                            </ul>
                        </div>
                        <div className="text-left text-xs text-gray-500 mt-4 mb-2">
                            <p className="font-semibold mb-1">How to enable in Chrome:</p>
                            <ol className="list-decimal ml-4 space-y-1">
                                <li>Click the 🔒 icon in the address bar</li>
                                <li>Toggle &quot;Location&quot; to <strong>On</strong></li>
                                <li>Click &quot;Try Again&quot; below</li>
                            </ol>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                        {onJoinPrivateRoom && <RoomOptions />}
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Local Community Clipboard
                        </h2>
                        <p className="text-gray-600 mb-6">
                            Share text snippets with people nearby anonymously
                        </p>
                        <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 text-left text-sm text-gray-700 mb-6">
                            <p className="font-semibold mb-2">How it works:</p>
                            <ul className="space-y-1 ml-4">
                                <li>• GPS groups you with nearby users (~200m)</li>
                                <li>• Share text that expires in 1 hour</li>
                                <li>• Completely anonymous</li>
                                <li>• Your exact location is never stored</li>
                            </ul>
                        </div>
                        {onJoinPrivateRoom && <RoomOptions />}
                    </>
                )}
            </div>
        </div>
    );
}
