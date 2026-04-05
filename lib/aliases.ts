/**
 * Generate anonymous, friendly aliases for users
 * Format: [Adjective][Animal] (e.g., "QuickFox", "BrightOwl")
 */

const HERO_CHARACTERS = [
    // Marvel
    'Iron Man (Tony Stark)', 'Captain America (Steve Rogers)', 'Thor (Thor Odinson)', 
    'Hulk (Bruce Banner)', 'Black Widow (Natasha Romanoff)', 'Hawkeye (Clint Barton)', 
    'Black Panther (T\'Challa)', 'Scarlet Witch (Wanda Maximoff)', 'Vision (Vision)', 
    'Captain Marvel (Carol Danvers)', 'Spider-Man (Peter Parker)', 'Ant-Man (Scott Lang)', 
    'Wasp (Hope van Dyne)', 'War Machine (James Rhodes)', 'Falcon (Sam Wilson)',
    'Winter Soldier (Bucky Barnes)', 'Loki (Loki Laufeyson)', 'Valkyrie (Brunnhilde)', 
    'Mantis (Mantis)', 'Okoye (Okoye)', 'Shuri (Shuri)', 'Nebula (Nebula)', 
    'Rocket Raccoon (Rocket)', 'Groot (Groot)', 'Drax (Drax the Destroyer)',
    'Star-Lord (Peter Quill)', 'Gamora (Gamora)', 'Wong (Wong)',
    
    // DC
    'Superman (Clark Kent)', 'Batman (Bruce Wayne)', 'Wonder Woman (Diana Prince)', 
    'The Flash (Barry Allen)', 'Green Lantern (Hal Jordan)', 'Aquaman (Arthur Curry)', 
    'Cyborg (Victor Stone)', 'Martian Manhunter (J\'onn J\'onzz)', 'Wonder Girl (Donna Troy)', 
    'Green Arrow (Oliver Queen)', 'Black Canary (Dinah Lance)', 'Zatanna (Zatanna Zatara)', 
    'Shazam (Billy Batson)', 'Nightwing (Dick Grayson)', 'Hawkman (Carter Hall)',
    'Hawkgirl (Shiera Sanders Hall)', 'Google (DC Comics character)', 'Plastic Man (Patrick "Eel" O\'Brian)', 
    'Elongated Man (Ralph Dibny)', 'Red Tornado (Ma Hunkel)'
];

/**
 * Generate a random anonymous alias
 * @returns Random alias string from superhero characters
 */
export function generateAlias(): string {
    return HERO_CHARACTERS[Math.floor(Math.random() * HERO_CHARACTERS.length)];
}
