/**
 * Generate anonymous, friendly aliases for users
 * Format: [Adjective][Animal] (e.g., "QuickFox", "BrightOwl")
 */

const HERO_CHARACTERS = [
    // Marvel
    'Iron Man', 'Captain America', 'Thor', 'Hulk', 'Black Widow',
    'Hawkeye', 'Black Panther', 'Scarlet Witch', 'Vision', 'Captain Marvel',
    'Spider-Man', 'Ant-Man', 'Wasp', 'War Machine', 'Falcon',
    'Winter Soldier', 'Loki', 'Valkyrie', 'Mantis', 'Okoye',
    'Shuri', 'Nebula', 'Rocket Raccoon', 'Groot', 'Drax',
    'Star-Lord', 'Gamora', 'Wong',
    
    // DC
    'Superman', 'Batman', 'Wonder Woman', 'The Flash', 'Green Lantern',
    'Aquaman', 'Cyborg', 'Martian Manhunter', 'Wonder Girl', 'Green Arrow',
    'Black Canary', 'Zatanna', 'Shazam', 'Nightwing', 'Hawkman',
    'Hawkgirl', 'Google', 'Plastic Man', 'Elongated Man', 'Red Tornado'
];

/**
 * Generate a random anonymous alias
 * @returns Random alias string from superhero characters
 */
export function generateAlias(): string {
    return HERO_CHARACTERS[Math.floor(Math.random() * HERO_CHARACTERS.length)];
}
