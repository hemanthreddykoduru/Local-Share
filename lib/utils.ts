/**
 * Extracts the first naturally occurring URL in a string of text.
 * @param text The text body to scan
 * @returns The extracted URL string, or null if no valid URL is found
 */
export function extractUrl(text: string): string | null {
    if (!text) return null;
    // Basic regex to find http/https URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const matches = text.match(urlRegex);
    if (matches && matches.length > 0) {
        return matches[0];
    }
    return null;
}
