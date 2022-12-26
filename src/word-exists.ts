import * as fs from 'fs';

/**
 * Ensures that a word exist in vocabulary.
 */
export type WordExistsChecker = (guess: string) => boolean;

/**
 * Implements a {@link WordExistsChecker} read from a simple file.
 * @param guess
 */
export const fileWordExistsChecker: WordExistsChecker = (guess: string) => {
    // bad examples
    if (typeof guess !== 'string' || guess === '') {
        return false;
    }
    const f = fs.readFileSync('./assets/five-letters.txt').toString();
    const words = f.split(/\r?\n/);
    return words.some(w => w === guess);
}