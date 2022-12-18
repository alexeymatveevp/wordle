import {FC, useEffect, useState} from 'react'
import './styles.css'
import {Letter, LetterT} from "./components/letter";
import {Word} from "./components/word";
import {makeGuess} from "./utils/make-guess";

const EMPTY_LETTERS: Array<LetterT> = Array.from({length: 5}, () => ({value: '', state: 'EMPTY', isFilled: false}));
const regexpLetter = RegExp(`[A-Za-z]{1}`);
export const Wordle: FC = () => {
    const [letters, setLetters] = useState(EMPTY_LETTERS)
    const answer = 'hello';
    const [guesses, addGuess] = useState<Array<Word>>([]);

    const listenToKeyBoard = (event: KeyboardEvent) => {
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
        } else if (event.code === 'Enter' && letters.every(letter => letter.isFilled)) {
            console.log('check the guess');
            const guessWord = letters.map(letter => letter.value).join('');
            const guessResult = makeGuess(answer, guessWord);
            addGuess((prevState) => [...prevState, guessResult]);
            setLetters(EMPTY_LETTERS);
        } else if (event.key.length === 1 && regexpLetter.test(event.key)) {
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
            {guesses.map(guess => <Word word={guess} />)}
            {guesses.length <= 5 &&
                <div className={'word'}>
                    {letters.map((letter, index) => <Letter {...letter} key={index} />)}
                </div>
            }
        </div>
    )
}
