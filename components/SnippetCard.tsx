'use client';

import { Snippet } from '@/types';
import CopyButton from './CopyButton';
import { Timestamp } from 'firebase/firestore';

import { useState } from 'react';
import { deleteSnippet } from '@/lib/firebase';

interface SnippetCardProps {
    snippet: Snippet;
    userId: string;
}

function getTimeAgo(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export default function SnippetCard({ snippet, userId }: SnippetCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const expiresAt = snippet.expires_at as Timestamp;
    const createdAt = snippet.created_at as Timestamp;
    const minutesLeft = Math.max(0, Math.floor((expiresAt.toMillis() - Date.now()) / 60000));

    // Check ownership
    const isOwner = snippet.owner_id === userId;

    const handleDelete = async () => {
        if (!confirm('Start removing this message?')) return;

        setIsDeleting(true);
        const success = await deleteSnippet(snippet.id);
        if (success) {
            setIsDeleted(true);
        } else {
            alert('Failed to delete message. Please try again.');
        }
        setIsDeleting(false);
    };

    if (isDeleted) return null;

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow animate-slide-up group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {snippet.alias.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{snippet.alias}</p>
                        <p className="text-xs text-gray-500">{getTimeAgo(createdAt)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isOwner && (
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border ${isDeleting
                                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 hover:border-red-300'
                                }`}
                        >
                            {isDeleting ? (
                                <>
                                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Deleting...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <span>Delete</span>
                                </>
                            )}
                        </button>
                    )}
                    <CopyButton text={snippet.text} />
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <p className="text-gray-800 whitespace-pre-wrap break-words">
                    {snippet.text}
                </p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Nearby • Anonymous</span>
                <span>Expires in {minutesLeft}m</span>
                {/* DEBUG: Remove later */}
                {/* <span className="opacity-20 text-[8px]">{snippet.owner_id ? 'HasOwner' : 'NoOwner'} {isOwner ? '(ME)' : ''}</span> */}
            </div>
        </div>
    );
}
