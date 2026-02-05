/**
 * Generate anonymous, friendly aliases for users
 * Format: [Adjective][Animal] (e.g., "QuickFox", "BrightOwl")
 */

const ADJECTIVES = [
    'Quick', 'Bright', 'Swift', 'Gentle', 'Bold',
    'Calm', 'Clever', 'Brave', 'Happy', 'Lucky',
    'Wise', 'Quiet', 'Sunny', 'Friendly', 'Kind',
    'Eager', 'Noble', 'Proud', 'Shiny', 'Zesty',
    'Merry', 'Jolly', 'Keen', 'Lively', 'Neat',
];

const ANIMALS = [
    'Fox', 'Owl', 'Bear', 'Wolf', 'Hawk',
    'Lion', 'Tiger', 'Eagle', 'Panda', 'Otter',
    'Falcon', 'Lynx', 'Raven', 'Swan', 'Moose',
    'Koala', 'Dolphin', 'Penguin', 'Seal', 'Crane',
    'Turtle', 'Rabbit', 'Deer', 'Peacock', 'Robin',
];

/**
 * Generate a random anonymous alias
 * @returns Random alias string (e.g., "QuickFox")
 */
export function generateAlias(): string {
    const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
    return `${adjective}${animal}`;
}
