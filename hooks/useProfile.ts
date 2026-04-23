import { useState, useEffect } from 'react';
import { generateAlias } from '@/lib/aliases';
import { auth } from '@/lib/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

interface Profile {
    name: string;
    id: string; // Firebase anonymous uid
}

const NAME_KEY = 'gps_clipboard_name';

/**
 * Hook to manage user profile.
 * Uses Firebase Anonymous Auth for a real, verifiable uid.
 * The display name is persisted in localStorage.
 */
export function useProfile() {
    const [profile, setProfile] = useState<Profile>({ name: '', id: '' });

    useEffect(() => {
        // Listen for auth state - sign in anonymously if no user yet
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                try {
                    const cred = await signInAnonymously(auth);
                    user = cred.user;
                } catch (e) {
                    console.error('[useProfile] Anonymous sign-in failed:', e);
                    return;
                }
            }

            // Load saved display name or generate one
            const savedName = typeof window !== 'undefined'
                ? localStorage.getItem(NAME_KEY)
                : null;

            const name = savedName || generateAlias();
            if (!savedName && typeof window !== 'undefined') {
                localStorage.setItem(NAME_KEY, name);
            }

            setProfile({ name, id: user.uid });
        });

        return () => unsub();
    }, []);

    const updateName = (name: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(NAME_KEY, name);
        }
        setProfile(prev => ({ ...prev, name }));
    };

    return { profile, updateName };
}
