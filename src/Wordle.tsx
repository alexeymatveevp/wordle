import {FC, useEffect, useState} from 'react'
import './styles.css'
import {Letter, LetterProps} from "./components/letter";

const EMPTY_LETTERS: Array<LetterProps> = Array.from({length: 5}, () => ({value: '', state: 'EMPTY', isFilled: false}));
const regexpLetter = RegExp(`[A-Za-z]`);
export const Wordle: FC = () => {
    const [letters, setLetters] = useState(EMPTY_LETTERS)
    const listenToKeyBoard = (event: KeyboardEvent) => {
        console.log(event);
        if(event.code === 'Backspace') {
            //@ts-ignore
            const lastFilled = letters.findLastIndex((letter: LetterProps) => letter.isFilled);
            const newLetters = letters.map((letter, index) => {
                if( lastFilled >= 0 && index === (lastFilled)) {
                    return {value: '', state: letter.state, isFilled: false}
                }
                return letter;
            });
            setLetters(newLetters);
        } else if (regexpLetter.test(event.key)) {
            const firstEmpty = letters.findIndex(letter => !letter.isFilled);
            const newLetters = letters.map((letter, index) => {
                if( index === firstEmpty) {
                    return {value: event.key, state: letter.state, isFilled: true}
                }
                return letter;
            });
            setLetters(newLetters);
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', listenToKeyBoard);

        return () => window.removeEventListener('keydown', listenToKeyBoard);
    })
    return (
        <div className="App">
            <h1>It works Tanya &lt;3 </h1>
            <div className="card">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <div className={'word'}>
            {letters.map((letter, index) => <Letter {...letter} key={index} />)}</div>
        </div>
    )
}

// here you go
interface LetterGuess {
    letter: string;
    guess: 'correct' | 'wrong-spot' | 'wrong';
}

export const makeGuess = (answer: string, guess: string): Array<LetterGuess> => {
    const result: Array<LetterGuess> = [];
    for (let i = 0; i < answer.length; i++) {
        const a = answer.charAt(i);
        const g = guess.charAt(i);
        if (g === a) {
            result.push({
                letter: g,
                guess: 'correct',
            });
        } else if (answer.indexOf(g) !== -1) {
            result.push({
                letter: g,
                guess: 'wrong-spot',
            });
        } else {
            result.push({
                letter: g,
                guess: 'wrong',
            });
        }
    }
    return result;
}

import { makeGuess } from "./wordle_0";

describe('Wordle test suite', () => {
    it('Simple positive case', () => {
        const res = makeGuess('hello', 'holls');
        // console.log(JSON.stringify(guess1, null, 2))
        const expected = [
            {
                "letter": "h",
                "guess": "correct"
            },
            {
                "letter": "o",
                "guess": "wrong-spot"
            },
            {
                "letter": "l",
                "guess": "correct"
            },
            {
                "letter": "l",
                "guess": "correct"
            },
            {
                "letter": "s",
                "guess": "wrong"
            }
        ]
        expect(res).toMatchObject(expected);
    });
    it('Second "l" should be in wrong spot', () => {
        const res = makeGuess('hello', 'chill');
        const expected = [
            {
                "letter": "c",
                "guess": "wrong"
            },
            {
                "letter": "h",
                "guess": "wrong-spot"
            },
            {
                "letter": "i",
                "guess": "wrong"
            },
            {
                "letter": "l",
                "guess": "correct"
            },
            {
                "letter": "l",
                "guess": "wrong-spot"
            }
        ]
        expect(res).toMatchObject(expected);
    });
    it('Letter "e" is duplicated twice', () => {
        const res = makeGuess('hello', 'peace');
        const expected = [
            {
                "letter": "p",
                "guess": "wrong"
            },
            {
                "letter": "e",
                "guess": "correct"
            },
            {
                "letter": "a",
                "guess": "wrong"
            },
            {
                "letter": "c",
                "guess": "wrong"
            },
            {
                "letter": "e",
                "guess": "wrong"
            }
        ]
        expect(res).toMatchObject(expected);
    });
});
