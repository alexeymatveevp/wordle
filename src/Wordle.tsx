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