import { useState, useEffect } from 'react';
import { generateAlias } from '@/lib/aliases';

interface Profile {
    name: string;
    id: string;
}

const STORAGE_KEY = 'gps_clipboard_profile';

/**
 * Hook to manage user profile (custom name)
 * Stores name in localStorage for persistence
 */
export function useProfile() {
    const [profile, setProfile] = useState<Profile>(() => {
        // Initialize from localStorage or generate default
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    // Backwards compatibility: ensure id exists
                    if (!parsed.id) {
                        parsed.id = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
                    }
                    return parsed;
                } catch {
                    // Fall through to generate new profile
                }
            }
        }
        return {
            name: generateAlias(),
            id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36)
        };
    });

    // Save to localStorage whenever profile changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        }
    }, [profile]);

    const updateName = (name: string) => {
        setProfile(prev => ({ ...prev, name }));
    };

    return {
        profile,
        updateName,
    };
}
