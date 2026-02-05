import { initializeApp, getApps } from 'firebase/app';
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

        // TEMPORARY: Show all messages globally for testing
        const q = query(
            snippetsRef,
            // where('geo_cell', '==', geoCell),  // Disabled for testing
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
