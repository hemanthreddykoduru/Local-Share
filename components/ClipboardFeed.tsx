'use client';

import { useCallback, useState } from 'react';
import { useClipboard } from '@/hooks/useClipboard';
import { useRealtime } from '@/hooks/useRealtime';
import SnippetCard from './SnippetCard';

import { Snippet } from '@/types';

interface ClipboardFeedProps {
    geoCell: string;
    userId: string;
}

export default function ClipboardFeed({ geoCell, userId }: ClipboardFeedProps) {
    const { snippets, isLoading, error, refresh } = useClipboard(geoCell);
    const [localSnippets, setLocalSnippets] = useState<Snippet[]>([]);

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

    useRealtime(geoCell, handleNewSnippet);

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
            <div className="text-center py-16 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border border-primary-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No messages nearby yet</h3>
                <p className="text-gray-600 max-w-sm mx-auto">
                    Be the first to share something with people around you! Messages appear in real-time.
                </p>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                    Nearby Messages ({allSnippets.length})
                </h2>
                <button
                    onClick={() => refresh()}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Refresh
                </button>
            </div>

            <div className="space-y-4">
                {allSnippets.map((snippet, index) => (
                    <div key={snippet.id}>
                        <SnippetCard
                            snippet={snippet}
                            userId={userId}
                        />

                    </div>
                ))}
            </div>
        </div>
    );
}
