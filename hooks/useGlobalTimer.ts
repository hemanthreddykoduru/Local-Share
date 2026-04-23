import { useState, useEffect } from 'react';

// Single global Set of listeners
const listeners = new Set<React.Dispatch<React.SetStateAction<number>>>();
let intervalId: NodeJS.Timeout | null = null;

export function useGlobalTimer(tickRateMs: number = 1000) {
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        listeners.add(setNow);

        if (!intervalId) {
            intervalId = setInterval(() => {
                const currentNow = Date.now();
                // Update all listeners in the same tick
                listeners.forEach(listener => listener(currentNow));
            }, tickRateMs);
        }

        return () => {
            listeners.delete(setNow);
            if (listeners.size === 0 && intervalId) {
                clearInterval(intervalId);
                intervalId = null;
            }
        };
    }, [tickRateMs]);

    return now;
}
