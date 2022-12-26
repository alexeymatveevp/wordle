import { createWordleGame, GameState } from "./wordle-game";

describe('WordleGame new game', () => {
    it('Initial state', async () => {
        const game = createWordleGame();
        const state = game.getState();
        const expected: GameState = {
            state: 'initial',
            guesses: [],
        }
        expect(state).toMatchObject(expected);
    });
    it('Does not accept incorrect answer length', async () => {
        const game = createWordleGame();
        game.newGame('a');
        const state = game.getState();
        const expected: GameState = {
            state: 'initial',
            guesses: [],
        }
        expect(state).toMatchObject(expected);
    });
    it('Does not accept non-existing word as answer', async () => {
        const game = createWordleGame();
        game.newGame('asdfg');
        const state = game.getState();
        const expected: GameState = {
            state: 'initial',
            guesses: [],
        }
        expect(state).toMatchObject(expected);
    });
    it('Can start a new game', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        const state = game.getState();
        const expected: GameState = {
            state: 'in-progress',
            guesses: [],
        }
        expect(state).toMatchObject(expected);
    });
    it('Can reset the game', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.reset();
        const state = game.getState();
        const expected: GameState = {
            state: 'initial',
            guesses: [],
        }
        expect(state).toMatchObject(expected);
    });
});

describe('WordleGame guessing', () => {
    it('Cannot guess word of incorrect length', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('a')
        const state = game.getState();
        const expected: GameState = {
            state: 'in-progress',
            guesses: [],
        }
        expect(state).toMatchObject(expected);
    });
    it('Cannot guess incorrect word', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('asdfg')
        const state = game.getState();
        const expected: GameState = {
            state: 'in-progress',
            guesses: [],
        }
        expect(state).toMatchObject(expected);
    });
    it('Guess a word one time', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('chill');
        const state = game.getState();
        expect(state.state).toMatch('in-progress');
        expect(state.guesses).toHaveLength(1);
        expect(state.guesses).toMatchObject(['chill']);
    });
    it('Guess same word two times', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('chill');
        game.makeGuess('chill');
        const state = game.getState();
        expect(state.state).toMatch('in-progress');
        expect(state.guesses).toHaveLength(2);
        expect(state.guesses).toMatchObject(['chill', 'chill']);
    });
    it('Cannot guess bad words or small length words', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('a');
        game.makeGuess('chill');
        game.makeGuess('b');
        game.makeGuess('asdfg');
        const state = game.getState();
        expect(state.state).toMatch('in-progress');
        expect(state.guesses).toHaveLength(1);
        expect(state.guesses).toMatchObject(['chill']);
    });
    it('Win', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('hello');
        const state = game.getState();
        expect(state.state).toMatch('win');
        expect(state.guesses).toHaveLength(1);
    });
    it('Lose', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('chill');
        game.makeGuess('bully');
        game.makeGuess('pluck');
        expect(game.getState().state).toMatch('in-progress');
        game.makeGuess('zebra');
        game.makeGuess('hover');
        game.makeGuess('rusty');
        const state = game.getState();
        expect(state.state).toMatch('loss');
        expect(state.guesses).toHaveLength(6);
    });
    it('Cannot guess after winning', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('hello');
        game.makeGuess('chill');
        game.makeGuess('bulky');
        const state = game.getState();
        expect(state.state).toMatch('win');
        expect(state.guesses).toHaveLength(1);
    });
    it('Cannot guess after loosing', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('chill');
        game.makeGuess('bulky');
        game.makeGuess('bulky');
        game.makeGuess('bulky');
        game.makeGuess('bulky');
        game.makeGuess('bulky');
        // more guessing
        game.makeGuess('bulky');
        game.makeGuess('bulky');
        const state = game.getState();
        expect(state.state).toMatch('loss');
        expect(state.guesses).toHaveLength(6);
    });
    it('Can play twice', async () => {
        const game = createWordleGame();
        game.newGame('hello');
        game.makeGuess('chill');
        game.makeGuess('hello');
        expect(game.getState().state).toMatch('win');
        expect(game.getState().guesses).toHaveLength(2);

        game.newGame('water');
        game.makeGuess('chill');
        game.makeGuess('hello');
        game.makeGuess('water');
        expect(game.getState().state).toMatch('win');
        expect(game.getState().guesses).toHaveLength(3);
    });
})