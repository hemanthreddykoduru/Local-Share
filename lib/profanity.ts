/**
 * Basic profanity filter
 * Uses a word list to filter inappropriate content
 */

// Basic profanity word list (extend as needed)
const PROFANITY_LIST = [
    'badword1', 'badword2', 'badword3',
    // Add more words as needed
    // This is a minimal implementation - consider using a library for production
];

/**
 * Check if text contains profanity
 * @param text - Text to check
 * @returns True if profanity detected
 */
export function containsProfanity(text: string): boolean {
    const lowerText = text.toLowerCase();
    return PROFANITY_LIST.some(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        return regex.test(lowerText);
    });
}

/**
 * Filter profanity from text by replacing with asterisks
 * @param text - Text to filter
 * @returns Filtered text
 */
export function filterProfanity(text: string): string {
    let filtered = text;

    PROFANITY_LIST.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        const replacement = '*'.repeat(word.length);
        filtered = filtered.replace(regex, replacement);
    });

    return filtered;
}
