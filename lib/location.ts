import { coordinatesToGeoCell } from './geocell';

export interface GeolocationPosition {
    coords: {
        latitude: number;
        longitude: number;
    };
}

/**
 * Request GPS permission and get current location
 * @returns Promise with geo-cell ID or error
 */
export async function requestLocationPermission(): Promise<{
    geoCell: string | null;
    error: string | null;
}> {
    // Check if geolocation is supported
    if (!navigator.geolocation) {
        return {
            geoCell: null,
            error: 'Geolocation is not supported by your browser',
        };
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                try {
                    const geoCell = coordinatesToGeoCell(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                    resolve({ geoCell, error: null });
                } catch (err) {
                    resolve({ geoCell: null, error: 'Invalid GPS coordinates' });
                }
            },
            (error) => {
                let errorMessage = 'Location access denied';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location permission denied. Please enable location access to use this app.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information unavailable. Please check your device settings.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out. Please try again.';
                        break;
                }

                resolve({ geoCell: null, error: errorMessage });
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
}

/**
 * Get current geo-cell without permission request
 * (assumes permission already granted)
 */
export async function getCurrentGeoCell(): Promise<string | null> {
    const result = await requestLocationPermission();
    return result.geoCell;
}

/**
 * Start periodic location refresh
 * @param callback - Function to call with new geo-cell
 * @param intervalMs - Refresh interval in milliseconds (default: 3 minutes)
 * @returns Cleanup function to stop refresh
 */
export function startLocationRefresh(
    callback: (geoCell: string) => void,
    intervalMs: number = 180000 // 3 minutes
): () => void {
    const interval = setInterval(async () => {
        const geoCell = await getCurrentGeoCell();
        if (geoCell) {
            callback(geoCell);
        }
    }, intervalMs);

    return () => clearInterval(interval);
}
