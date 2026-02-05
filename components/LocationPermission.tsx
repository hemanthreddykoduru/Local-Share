'use client';

import { LocationState } from '@/types';

interface LocationPermissionProps {
    locationState: LocationState;
}

export default function LocationPermission({ locationState }: LocationPermissionProps) {
    const { isLoading, error, permissionGranted } = locationState;

    if (permissionGranted) {
        return null; // Don't show if permission granted
    }

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

                        <div className="text-left text-xs text-gray-500 mb-6">
                            <p className="font-semibold mb-1">How to enable in Chrome:</p>
                            <ol className="list-decimal ml-4 space-y-1">
                                <li>Click the 🔒 icon in the address bar</li>
                                <li>Toggle &quot;Location&quot; to <strong>On</strong></li>
                                <li>Click &quot;Try Again&quot; below</li>
                            </ol>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-6 w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
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
                    </>
                )}
            </div>
        </div>
    );
}
