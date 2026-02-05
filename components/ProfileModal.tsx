'use client';

import { useState, useEffect } from 'react';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentName: string;
    onSave: (name: string) => void;
}

export default function ProfileModal({ isOpen, onClose, currentName, onSave }: ProfileModalProps) {
    const [name, setName] = useState(currentName);
    const [error, setError] = useState('');

    useEffect(() => {
        setName(currentName);
    }, [currentName]);

    if (!isOpen) return null;

    const handleSave = () => {
        const trimmedName = name.trim();

        if (!trimmedName) {
            setError('Name cannot be empty');
            return;
        }

        if (trimmedName.length > 20) {
            setError('Name must be 20 characters or less');
            return;
        }

        onSave(trimmedName);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div className="mb-6">
                    <label htmlFor="profile-name" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Display Name
                    </label>
                    <input
                        id="profile-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError('');
                        }}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                        maxLength={20}
                        autoFocus
                    />
                    <div className="flex items-center justify-between mt-2">
                        {error && <span className="text-sm text-red-600">{error}</span>}
                        <span className={`text-sm ml-auto ${name.length > 15 ? 'text-orange-600' : 'text-gray-500'}`}>
                            {name.length}/20
                        </span>
                    </div>
                </div>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                        <span className="font-semibold">Note:</span> Your name will be shown on all your messages.
                        Choose something friendly and respectful!
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}
