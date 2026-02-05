import { useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { Snippet } from '@/types';

/**
 * Hook to subscribe to real-time snippet updates for a geo-cell
 * Uses Firestore onSnapshot for real-time updates
 */
export function useRealtime(
    geoCell: string | null,
    onNewSnippet: (snippet: Snippet) => void
) {
    useEffect(() => {
        if (!geoCell) return;

        console.log('[useRealtime] Setting up listener for geo-cell:', geoCell);

        const snippetsRef = collection(db, 'snippets');
        const now = Timestamp.now();

        // TEMPORARY: Show all messages globally for testing
        const q = query(
            snippetsRef,
            // where('geo_cell', '==', geoCell),  // Disabled for testing
            where('status', '==', 'active'),
            where('expires_at', '>', now)
        );

        // Track if this is the initial load
        let isInitialLoad = true;

        // Subscribe to real-time updates
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log('[useRealtime] Snapshot received, changes:', snapshot.docChanges().length);
            snapshot.docChanges().forEach((change) => {
                console.log('[useRealtime] Change type:', change.type, 'isInitialLoad:', isInitialLoad);
                // Only process 'added' events after initial load
                if (change.type === 'added' && !isInitialLoad) {
                    const newSnippet = {
                        id: change.doc.id,
                        ...change.doc.data(),
                    } as Snippet;

                    console.log('[useRealtime] New snippet detected:', newSnippet);
                    onNewSnippet(newSnippet);
                }
            });

            // After first snapshot, all subsequent changes are real updates
            if (isInitialLoad) {
                console.log('[useRealtime] Initial load complete');
                isInitialLoad = false;
            }
        }, (error) => {
            console.error('[useRealtime] Error in snapshot listener:', error);
        });

        return () => {
            console.log('[useRealtime] Cleaning up listener');
            unsubscribe();
        };
    }, [geoCell, onNewSnippet]);
}
