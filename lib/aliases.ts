/**
 * Generate anonymous, friendly aliases for users
 * Format: [Adjective][Animal] (e.g., "QuickFox", "BrightOwl")
 */

const MARVEL_CHARACTERS = [
    'Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow',
    'Hawkeye', 'Black Panther', 'Scarlet Witch', 'Vision', 'Captain Marvel',
    'Spider-Man', 'Ant-Man', 'Wasp', 'War Machine', 'Falcon',
    'Winter Soldier', 'Loki', 'Valkyrie', 'Mantis', 'Okoye',
    'Shuri', 'Nebula', 'Rocket Raccoon', 'Groot', 'Drax',
    'Star-Lord', 'Gamora', 'Wong'
];

/**
 * Generate a random anonymous alias
 * @returns Random alias string from Marvel characters
 */
export function generateAlias(): string {
    return MARVEL_CHARACTERS[Math.floor(Math.random() * MARVEL_CHARACTERS.length)];
}
