import { useState, useEffect } from 'react';
import { generateAlias } from '@/lib/aliases';
import { auth } from '@/lib/firebase';
import { signInAnonymously, onAuthStateChanged } from 'firebase/auth';

interface Profile {
    name: string;
    id: string; // Firebase anonymous uid — empty string means auth not ready
}

const NAME_KEY = 'gps_clipboard_name';

/**
 * Hook to manage user profile.
 * Uses Firebase Anonymous Auth for a real, verifiable uid.
 * Exposes authError so consumers can show a meaningful message
 * when Anonymous Auth is not enabled in the Firebase Console.
 */
export function useProfile() {
    const [profile, setProfile] = useState<Profile>({ name: '', id: '' });
    const [authReady, setAuthReady] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                try {
                    const cred = await signInAnonymously(auth);
                    user = cred.user;
                    setAuthError(null);
                } catch (e: unknown) {
                    // "auth/operation-not-allowed" means Anonymous Auth is not
                    // enabled in the Firebase Console. Surface this clearly.
                    const code = (e as { code?: string })?.code;
                    if (code === 'auth/operation-not-allowed') {
                        console.error(
                            '[useProfile] Anonymous Auth is disabled.\n' +
                            'Go to: Firebase Console → Authentication → Sign-in method → Anonymous → Enable'
                        );
                        setAuthError('Anonymous Auth not enabled in Firebase Console.');
                    } else {
                        console.error('[useProfile] Sign-in failed:', e);
                        setAuthError('Authentication failed. Please refresh.');
                    }
                    setAuthReady(true);
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
            setAuthReady(true);
        });

        return () => unsub();
    }, []);

    const updateName = (name: string) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem(NAME_KEY, name);
        }
        setProfile(prev => ({ ...prev, name }));
    };

    return { profile, updateName, authReady, authError };
}
