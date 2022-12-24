import { FC, useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import './styles.css'
import {Letter, LetterT} from "./components/letter";
import {Word} from "./components/word";
import {makeGuess} from "./utils/make-guess";
import {apiWordChecker} from "./utils/check-word";
import { useViewModel } from "./utils/react.utils";
import { createWordleGameVM } from "./view-models/game-vm";

const TRIES_AMOUNT = 6;
const WORD_LENGTH = 5;
const EMPTY_LETTERS: Array<LetterT> = Array.from({length: WORD_LENGTH}, () => ({value: '', state: 'EMPTY', isFilled: false}));
const regexpLetter = RegExp(`[A-Za-z]`);

export const Wordle: FC = () => {
    const [letters, setLetters] = useState(EMPTY_LETTERS)
    const answer = 'abuse';
    const wordleGameVM = useMemo(createWordleGameVM, []);
    let { guesses, addGuess } = useViewModel(wordleGameVM);
    // const [guesses, addGuess] = useState<Array<Word>>([]);
    const [isVictory, setVictory] = useState<boolean>(false);
    const [error, setError] = useState<string>();

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
            const guessWord = getWordByLetters(letters);
            const guessResult = makeGuess(answer, guessWord);
            const ifWordExist = apiWordChecker(guessWord);
            ifWordExist.then(() => {
                addGuess(guessResult);
                setLetters(EMPTY_LETTERS);
                if (guessResult.every(letter => letter.state ==='CORRECT')) {
                    setVictory(true);
                }
            }).catch(() => {
                setError('Word does not exist');
            })
        } else if (event.key.length === 1 && regexpLetter.test(event.key)) {
            const firstEmpty = letters.findIndex(letter => !letter.isFilled);
            const newLetters = letters.map((letter, index) => {
                if( index === firstEmpty) {
                    return {value: event.key, state: letter.state, isFilled: true}
                }
                return letter;
            });
            setLetters(newLetters);
            setError(undefined);
        }
    };
    useEffect(() => {
        window.addEventListener('keydown', listenToKeyBoard);

        return () => window.removeEventListener('keydown', listenToKeyBoard);
    })
    const emptyTries = useMemo(() => Array.from({length: TRIES_AMOUNT - guesses.length - Number(!isVictory)}, (_: unknown, index: number) => <Word word={EMPTY_LETTERS} key={index} />), [guesses])
    return (
        <div className="App">
            <h1>It works Tanya &lt;3 </h1>
            {guesses.map((guess, index) => <Word word={guess} key={index} />)}
            {guesses.length < TRIES_AMOUNT && !isVictory &&
                <div className={'word'}>
                    {letters.map((letter, index) => <Letter {...letter} key={index} />)}
                </div>
            }
            {emptyTries}

            {error && <div className={'status error'}>{error}</div>}
            {isVictory && <div className={'status victory'}>YOU WON!</div>}
        </div>
    )
}

function getWordByLetters(letters: Array<LetterT>): string {
    return letters.map(letter => letter.value).join('');
}