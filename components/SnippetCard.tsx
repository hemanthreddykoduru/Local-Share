'use client';

import { Snippet } from '@/types';
import CopyButton from './CopyButton';
import { Timestamp } from 'firebase/firestore';

import { useState, useEffect } from 'react';
import { deleteSnippet, updateSnippet } from '@/lib/firebase';
import { sanitizeText } from '@/lib/sanitize';
import { filterProfanity } from '@/lib/profanity';
import { extractUrl } from '@/lib/utils';
import LinkPreview from './LinkPreview';

interface SnippetCardProps {
    snippet: Snippet;
    userId: string;
}

function getTimeAgo(timestamp: Timestamp, nowMillis: number): string {
    const date = timestamp.toDate();
    const seconds = Math.floor((nowMillis - date.getTime()) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export default function SnippetCard({ snippet, userId }: SnippetCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    
    // Edit state
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(snippet.text);
    const [isSaving, setIsSaving] = useState(false);
    
    // Live ticking countdown
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const expiresAt = snippet.expires_at as Timestamp;
    const createdAt = snippet.created_at as Timestamp;
    
    const diffSeconds = Math.max(0, Math.floor((expiresAt.toMillis() - now) / 1000));
    const displayMinutes = Math.floor(diffSeconds / 60);
    const displaySeconds = diffSeconds % 60;
    
    // Check if there is a URL
    const extractedUrl = extractUrl(snippet.text);

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

    const handleSave = async () => {
        const trimmed = editValue.trim();
        if (trimmed.length === 0 || trimmed.length > 1000) return;

        setIsSaving(true);
        // Clean text
        const sanitized = sanitizeText(trimmed);
        const filtered = filterProfanity(sanitized);

        const success = await updateSnippet(snippet.id, filtered);
        if (success) {
            setIsEditing(false);
        } else {
            alert('Failed to update message. Please try again.');
        }
        setIsSaving(false);
    };

    if (isDeleted) return null;

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow animate-slide-up">
            <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-9 h-9 flex-shrink-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {snippet.alias.charAt(0)}
                    </div>
                    <div className="min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{snippet.alias}</p>
                        <p className="text-xs text-gray-400">{getTimeAgo(createdAt, now)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                    {isOwner && !isEditing && (
                        <>
                            <button
                                onClick={() => {
                                    setEditValue(snippet.text);
                                    setIsEditing(true);
                                }}
                                className="flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-xs transition-all border bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-100 active:scale-95"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-xs transition-all border active:scale-95 ${isDeleting
                                    ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
                                    : 'bg-red-50 text-red-500 border-red-100 hover:bg-red-100'
                                    }`}
                            >
                                {isDeleting ? '...' : 'Delete'}
                            </button>
                        </>
                    )}
                    {isOwner && isEditing && (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                disabled={isSaving}
                                className="flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-xs transition-all border bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100 active:scale-95"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || editValue.trim().length === 0 || editValue.length > 1000}
                                className={`flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-xs transition-all border active:scale-95 ${isSaving || editValue.trim().length === 0 || editValue.length > 1000
                                    ? 'bg-green-50 text-green-300 border-green-100 cursor-not-allowed'
                                    : 'bg-green-50 text-green-600 border-green-100 hover:bg-green-100'
                                    }`}
                            >
                                {isSaving ? 'Saving...' : 'Save'}
                            </button>
                        </>
                    )}
                    <CopyButton text={snippet.text} />
                </div>
            </div>

            {isEditing ? (
                <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                    <textarea 
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none text-base"
                        rows={3}
                        maxLength={1000}
                        autoFocus
                    />
                </div>
            ) : (
                <div className="bg-gray-50 rounded-xl p-3 mb-3 border border-gray-100">
                    <p className="text-gray-800 whitespace-pre-wrap break-words text-sm leading-relaxed">
                        {snippet.text}
                    </p>
                    {extractedUrl && <LinkPreview url={extractedUrl} />}
                </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Anonymous</span>
                <span className={`font-mono tabular-nums ${diffSeconds <= 300 ? 'text-red-500 font-bold animate-pulse' : 'text-gray-400'}`}>
                    {displayMinutes}m {displaySeconds}s left
                </span>
            </div>
        </div>
    );
}
