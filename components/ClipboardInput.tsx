'use client';

import { useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { sanitizeText, isValidTextLength } from '@/lib/sanitize';
import { filterProfanity } from '@/lib/profanity';

interface ClipboardInputProps {
    geoCell: string;
    alias: string;
    userId: string;
    onSubmitSuccess: () => void;
}

const MAX_LENGTH = 1000;

export default function ClipboardInput({ geoCell, alias, userId, onSubmitSuccess }: ClipboardInputProps) {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const remainingChars = MAX_LENGTH - text.length;
    const isValid = text.trim().length > 0 && text.length <= MAX_LENGTH;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValid) {
            setError('Please enter valid text (1-1000 characters)');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            console.log('[ClipboardInput] Submitting message, geo-cell:', geoCell, 'alias:', alias);

            // Sanitize and filter text
            const sanitized = sanitizeText(text.trim());
            const filtered = filterProfanity(sanitized);

            // Create expiration timestamp (1 hour from now)
            const expiresAt = Timestamp.fromMillis(Date.now() + 3600000);
            const createdAt = Timestamp.now();

            // Add to Firestore directly
            const docRef = await addDoc(collection(db, 'snippets'), {
                text: filtered,
                geo_cell: geoCell,
                alias: alias,
                owner_id: userId,
                created_at: createdAt,
                expires_at: expiresAt,
                reports: 0,
                status: 'active',
            });

            console.log('[ClipboardInput] Message saved successfully, ID:', docRef.id);

            // Clear form
            setText('');
            onSubmitSuccess();
        } catch (error) {
            console.error('[ClipboardInput] Error submitting:', error);
            setError('Failed to post message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="snippet-text" className="block text-sm font-semibold text-gray-700 mb-2">
                        Share something nearby
                    </label>
                    <textarea
                        id="snippet-text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type your message here... (visible to people within ~200m)"
                        className={`w-full px-4 py-3 border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all ${text.length > MAX_LENGTH
                            ? 'border-red-300 focus:ring-red-500'
                            : 'border-gray-300 focus:ring-primary-500'
                            }`}
                        rows={4}
                        maxLength={MAX_LENGTH + 100}
                        disabled={isSubmitting}
                    />
                    <div className="flex items-center justify-between mt-2">
                        <span className={`text-sm ${remainingChars < 0 ? 'text-red-600 font-semibold' : remainingChars < 100 ? 'text-orange-600' : 'text-gray-500'}`}>
                            {remainingChars < 0 ? `${Math.abs(remainingChars)} over limit` : `${remainingChars} characters left`}
                        </span>
                        <span className="text-xs text-gray-400">
                            Expires in 1 hour
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${isValid && !isSubmitting
                        ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-lg'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Posting...
                        </span>
                    ) : (
                        'Post to Nearby Clipboard'
                    )}
                </button>
            </form>
        </div>
    );
}
