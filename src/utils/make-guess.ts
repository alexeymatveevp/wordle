import {LetterT} from "../components/letter";

export const makeGuess = (answer: string, guess: string): Array<LetterT> => {
    const result: Array<LetterT> = [];
    for (let i = 0; i < answer.length; i++) {
        const a = answer.charAt(i);
        const g = guess.charAt(i);
        if (g === a) {
            result.push({
                value: g,
                state: 'CORRECT',
                isFilled: true,
            });
        } else if (answer.indexOf(g) !== -1) {
            result.push({
                value: g,
                state: 'WRONG_SPOT',
                isFilled: true,
            });
        } else {
            result.push({
                value: g,
                state: 'WRONG',
                isFilled: true,
            });
        }
    }
    return result;
}
