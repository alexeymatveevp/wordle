import { GuessResult, makeGuess } from "./make-guess";
import { fileWordExistsChecker } from "./word-exists";

/**
 * Config of the game used to define it's rules.
 * Currently let's stick with {@link DEFAULT_GAME_CONFIG} as our main rules.
 * But it's a good practice to make configuration from the start.
 */
export interface WordleGameConfig {
    wordLength: number;
    numberOfTries: number;
}
const DEFAULT_GAME_CONFIG: WordleGameConfig = {
    wordLength: 5,
    numberOfTries: 6,
}

/**
 * The game state.
 */
export interface GameState {
    guesses: Array<string>;
    state: 'win' | 'loss' | 'in-progress' | 'initial';
}

/**
 * The game instance. Has API to control and play.
 */
export interface WordleGame {
    newGame: (answer: string) => void;
    makeGuess: (guess: string) => GuessResult | void;
    getState: () => GameState;
    reset: () => void;
}

/**
 * Functional way to create the game. Write your implementation here.
 * @param gameConfig - the game rules object
 */
export const createWordleGame = (gameConfig: WordleGameConfig = DEFAULT_GAME_CONFIG): WordleGame => {
    // TODO your implementation here
    let answer: string | undefined;
    let gameState: GameState = {
        guesses: [],
        state: 'initial',
    };

    const newGame = (_answer: string) => {
        if (!fileWordExistsChecker(_answer)) {
            return;
        }
        reset();
        gameState.state = 'in-progress';
        answer = _answer;
    }

    const makeGuessFn = (guess: string): GuessResult | undefined => {
        if (!answer || !fileWordExistsChecker(guess)) {
            return;
        }
        if (gameState.guesses.length >= gameConfig.numberOfTries) {
            return;
        }
        if (gameState.state === 'win' || gameState.state === 'loss') {
            return;
        }
        gameState.guesses.push(guess);
        if (guess === answer) {
            gameState = {
                ...gameState,
                state: 'win',
            }
        }
        if (gameState.guesses.length === gameConfig.numberOfTries) {
            gameState = {
                ...gameState,
                state: 'loss',
            }
        }
        return makeGuess(answer, guess);
    }

    const getState = (): GameState => {
        return {
            ...gameState
        }
    }

    const reset = () => {
        answer = undefined;
        gameState = {
            guesses: [],
            state: 'initial',
        }
    }

    return {
        newGame,
        makeGuess: makeGuessFn,
        getState,
        reset,
    }
}