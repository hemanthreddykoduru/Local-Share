import DOMPurify from 'dompurify';

/**
 * Sanitize text input to prevent XSS attacks
 * Removes all HTML tags and dangerous content
 * @param text - Raw text input
 * @returns Sanitized text safe for display
 */
export function sanitizeText(text: string): string {
    // In browser environment
    if (typeof window !== 'undefined') {
        return DOMPurify.sanitize(text, {
            ALLOWED_TAGS: [], // No HTML tags allowed
            ALLOWED_ATTR: [], // No attributes allowed
            KEEP_CONTENT: true, // Keep text content
        });
    }

    // Server-side fallback: basic HTML entity encoding
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
}

/**
 * Validate text length
 * @param text - Text to validate
 * @param maxLength - Maximum allowed length (default: 1000)
 * @returns True if valid
 */
export function isValidTextLength(text: string, maxLength: number = 1000): boolean {
    return text.length > 0 && text.length <= maxLength;
}
