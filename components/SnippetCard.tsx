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
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-shadow animate-slide-up group">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {snippet.alias.charAt(0)}
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">{snippet.alias}</p>
                        <p className="text-xs text-gray-500">{getTimeAgo(createdAt, now)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {isOwner && !isEditing && (
                        <>
                            <button
                                onClick={() => {
                                    setEditValue(snippet.text);
                                    setIsEditing(true);
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all border bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700 hover:border-blue-300"
                            >
                                <span>Edit</span>
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all border ${isDeleting
                                    ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                    : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700 hover:border-red-300'
                                    }`}
                            >
                                {isDeleting ? <span>...</span> : <span>Delete</span>}
                            </button>
                        </>
                    )}
                    {isOwner && isEditing && (
                        <>
                            <button
                                onClick={() => setIsEditing(false)}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all border bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:text-gray-700 hover:border-gray-300"
                            >
                                <span>Cancel</span>
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving || editValue.trim().length === 0 || editValue.length > 1000}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium transition-all border ${isSaving || editValue.trim().length === 0 || editValue.length > 1000
                                    ? 'bg-green-50 text-green-400 border-green-200 cursor-not-allowed'
                                    : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 hover:border-green-300'
                                    }`}
                            >
                                <span>{isSaving ? 'Saving...' : 'Save'}</span>
                            </button>
                        </>
                    )}
                    <CopyButton text={snippet.text} />
                </div>
            </div>

            {isEditing ? (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <textarea 
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-primary-500 focus:outline-none resize-none"
                        rows={3}
                        maxLength={1000}
                        autoFocus
                    />
                </div>
            ) : (
                <div className="bg-gray-50 rounded-lg p-4 mb-3">
                    <p className="text-gray-800 whitespace-pre-wrap break-words">
                        {snippet.text}
                    </p>
                    {extractedUrl && <LinkPreview url={extractedUrl} />}
                </div>
            )}

            <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Nearby • Anonymous</span>
                <span className={`font-mono ${diffSeconds <= 300 ? 'text-red-500 font-bold animate-pulse' : ''}`}>
                    Expires in {displayMinutes}m {displaySeconds}s
                </span>
                {/* DEBUG: Remove later */}
                {/* <span className="opacity-20 text-[8px]">{snippet.owner_id ? 'HasOwner' : 'NoOwner'} {isOwner ? '(ME)' : ''}</span> */}
            </div>
        </div>
    );
}
