import { initializeApp, getApps } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import {
    getFirestore,
    collection,
    query,
    where,
    orderBy,
    getDocs,
    addDoc,
    Timestamp,
    limit as firestoreLimit,
    QueryConstraint,
    deleteDoc,
    updateDoc,
    doc
} from 'firebase/firestore';
import { Snippet } from '@/types';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase (only once)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize App Check (Browser only)
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY),
        isTokenAutoRefreshEnabled: true
    });
}

export const db = getFirestore(app);

/**
 * Fetch snippets for a specific geo-cell
 * @param geoCell - Geo-cell identifier
 * @returns Array of active, non-expired snippets
 */
export async function fetchSnippetsForGeoCell(geoCell: string): Promise<Snippet[]> {
    try {
        const snippetsRef = collection(db, 'snippets');
        const now = Timestamp.now();

        const q = query(
            snippetsRef,
            where('geo_cell', '==', geoCell),
            where('status', '==', 'active'),
            where('expires_at', '>', now),
            orderBy('expires_at'),
            orderBy('created_at', 'desc'),
            firestoreLimit(50)
        );

        const querySnapshot = await getDocs(q);
        const snippets: Snippet[] = [];

        querySnapshot.forEach((doc) => {
            snippets.push({
                id: doc.id,
                ...doc.data(),
            } as Snippet);
        });

        return snippets;
    } catch (error) {
        console.error('Error fetching snippets:', error);
        return [];
    }
}

/**
 * Insert a new snippet
 * @param snippet - Snippet data without ID
 * @returns Created snippet or null on error
 */
export async function insertSnippet(
    snippet: Omit<Snippet, 'id' | 'reports' | 'status'>
): Promise<Snippet | null> {
    try {
        const snippetsRef = collection(db, 'snippets');

        const docRef = await addDoc(snippetsRef, {
            ...snippet,
            reports: 0,
            status: 'active',
        });

        return {
            id: docRef.id,
            ...snippet,
            reports: 0,
            status: 'active',
        };
    } catch (error) {
        console.error('Error inserting snippet:', error);
        return null;
    }
}

/**
 * Delete a snippet
 * @param id - Snippet ID
 */
export async function deleteSnippet(id: string): Promise<boolean> {
    try {
        const docRef = doc(db, 'snippets', id);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error('Error deleting snippet:', error);
        return false;
    }
}

/**
 * Update a snippet's text
 * @param id - Snippet ID
 * @param newText - The new text for the snippet
 */
export async function updateSnippet(id: string, newText: string): Promise<boolean> {
    try {
        const docRef = doc(db, 'snippets', id);
        await updateDoc(docRef, {
            text: newText
        });
        return true;
    } catch (error) {
        console.error('Error updating snippet:', error);
        return false;
    }
}

// ─── Room Management ─────────────────────────────────────────────────────────

/**
 * Create a private room document in Firestore.
 * The room is owned by the creator. Only the creator can delete it.
 */
export async function createRoom(roomCode: string, creatorId: string): Promise<boolean> {
    try {
        const roomRef = doc(db, 'rooms', roomCode);
        const { setDoc } = await import('firebase/firestore');
        await setDoc(roomRef, {
            creator_id: creatorId,
            active: true,
            created_at: Timestamp.now(),
        });
        return true;
    } catch (error) {
        console.error('Error creating room:', error);
        return false;
    }
}

/**
 * Delete a private room (creator only).
 * This invalidates the room for all other users in real-time.
 */
export async function deleteRoom(roomCode: string): Promise<boolean> {
    try {
        const roomRef = doc(db, 'rooms', roomCode);
        await deleteDoc(roomRef);
        return true;
    } catch (error) {
        console.error('Error deleting room:', error);
        return false;
    }
}

/**
 * Check if a room exists and is active before allowing a join.
 * Returns the room data or null if it doesn't exist.
 */
export async function checkRoomExists(roomCode: string): Promise<{ creator_id: string } | null> {
    try {
        const { getDoc } = await import('firebase/firestore');
        const roomRef = doc(db, 'rooms', roomCode);
        const snap = await getDoc(roomRef);
        if (snap.exists() && snap.data()?.active) {
            return snap.data() as { creator_id: string };
        }
        return null;
    } catch (error) {
        console.error('Error checking room:', error);
        return null;
    }
}
