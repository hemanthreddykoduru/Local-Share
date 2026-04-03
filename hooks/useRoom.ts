'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface UseRoomResult {
    isRoomValid: boolean;      // false = room deleted / doesn't exist
    isChecking: boolean;       // true while first fetch is in progress
    creatorId: string | null;  // the user who created the room
}

/**
 * Watches a room document in Firestore in real-time.
 * If the room is deleted (creator left), isRoomValid becomes false immediately.
 */
export function useRoom(roomCode: string | null): UseRoomResult {
    const [isRoomValid, setIsRoomValid] = useState(true);
    const [isChecking, setIsChecking] = useState(true);
    const [creatorId, setCreatorId] = useState<string | null>(null);

    useEffect(() => {
        if (!roomCode) {
            setIsChecking(false);
            setIsRoomValid(true);
            return;
        }

        setIsChecking(true);
        const roomRef = doc(db, 'rooms', roomCode);

        const unsubscribe = onSnapshot(roomRef, (snap) => {
            if (snap.exists() && snap.data()?.active) {
                setIsRoomValid(true);
                setCreatorId(snap.data().creator_id ?? null);
            } else {
                // Room was deleted or marked inactive — kick everyone out
                setIsRoomValid(false);
                setCreatorId(null);
            }
            setIsChecking(false);
        }, (error) => {
            console.error('[useRoom] snapshot error:', error);
            setIsChecking(false);
        });

        return () => unsubscribe();
    }, [roomCode]);

    return { isRoomValid, isChecking, creatorId };
}
