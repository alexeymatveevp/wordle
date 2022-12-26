/**
 * Represents a guess result as an array with different letters.
 */
export type GuessResult = Array<LetterT>;
/**
 * Letter with 4 different states.
 */
export interface LetterT {
    value: string;
    state: StateType;
}
/**
 * CORRECT - letter is in correct spot.
 * WRONG_SPOT - letter exists in word, but is in incorrect spot.
 * WRONG - letter does not exist in this word.
 */
export type StateType = 'CORRECT' | 'WRONG_SPOT' | 'WRONG';

/**
 * Function which makes a guess and returned the validated guess result.
 * Implements one of the core features of the game.
 * @param answer - the correct answer
 * @param guess - the guess word
 */
export const makeGuess = (answer: string, guess: string): GuessResult => {
    const result: Array<LetterT> = [];
    for (let i = 0; i < answer.length; i++) {
        const a = answer.charAt(i);
        const g = guess.charAt(i);
        if (g === a) {
            result.push({
                value: g,
                state: 'CORRECT',
            });
            // tricky place: take a look at last 2 tests
            // replace matched letters so they are not duplicated
            answer = answer.replace(a, '_');
        } else {
            const answerHasThisLetter = answer.indexOf(g) !== -1;
            if (answerHasThisLetter) {
                result.push({
                    value: g,
                    state: 'WRONG_SPOT',
                });
            } else {
                result.push({
                    value: g,
                    state: 'WRONG',
                });
            }
        }
    }
    return result;
}
