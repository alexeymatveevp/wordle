import { ViewModel } from "../utils/react.utils";
import { Word } from "../components/word";
import { BehaviorSubject, merge } from "rxjs";

interface WordleGameState {
    guesses: Array<Word>;
    addGuess: (w: Word) => void;
}

export const createWordleGameVM: () => ViewModel<WordleGameState> = () => {
    const guesses = new BehaviorSubject<Array<Word>>([]);

    const addGuess = (w: Word) => {
        console.log(w)
        guesses.next([...guesses.getValue(), w])
    }

    return {
        getState: () => ({
            guesses: guesses.getValue(),
            addGuess,
        }),
        observable: merge(guesses),
    }
}