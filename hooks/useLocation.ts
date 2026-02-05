import { useState, useEffect } from 'react';
import { requestLocationPermission, startLocationRefresh } from '@/lib/location';
import { LocationState } from '@/types';

/**
 * Hook to manage GPS location state
 * Handles permission requests and periodic location refresh
 */
export function useLocation() {
    const [state, setState] = useState<LocationState>({
        geoCell: null,
        error: null,
        isLoading: true,
        permissionGranted: false,
    });

    useEffect(() => {
        let cleanup: (() => void) | null = null;

        async function initLocation() {
            const result = await requestLocationPermission();

            if (result.error) {
                setState({
                    geoCell: null,
                    error: result.error,
                    isLoading: false,
                    permissionGranted: false,
                });
                return;
            }

            setState({
                geoCell: result.geoCell,
                error: null,
                isLoading: false,
                permissionGranted: true,
            });

            // Start periodic refresh (every 3 minutes)
            cleanup = startLocationRefresh((newGeoCell) => {
                setState(prev => ({
                    ...prev,
                    geoCell: newGeoCell,
                }));
            });
        }

        initLocation();

        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return state;
}
