/**
 * Geo-cell conversion library
 * Converts GPS coordinates to privacy-safe grid cells
 */

// Cell size in degrees (~500 meters at equator)
// Increased from 0.002 to account for GPS accuracy variance
export const CELL_SIZE = 0.005;

/**
 * Convert latitude and longitude to a geo-cell identifier
 * @param lat - Latitude in degrees
 * @param lon - Longitude in degrees
 * @returns Geo-cell identifier string (e.g., "12345_67890")
 */
export function coordinatesToGeoCell(lat: number, lon: number): string {
    // Validate inputs
    if (lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        throw new Error('Invalid coordinates');
    }

    // Round to nearest grid cell
    const latCell = Math.floor(lat / CELL_SIZE);
    const lonCell = Math.floor(lon / CELL_SIZE);

    return `${latCell}_${lonCell}`;
}

/**
 * Validate geo-cell format
 * @param geoCell - Geo-cell identifier to validate
 * @returns True if valid format
 */
export function isValidGeoCell(geoCell: string): boolean {
    const pattern = /^-?\d+_-?\d+$/;
    return pattern.test(geoCell);
}
