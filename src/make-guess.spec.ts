import { GuessResult, makeGuess } from "./make-guess";

describe('makeGuess function', () => {
    it('Simple positive case', () => {
        const res = makeGuess('hello', 'holls');
        // console.log(JSON.stringify(guess1, null, 2))
        const expected: GuessResult = [
            {
                "value": "h",
                "state": "CORRECT"
            },
            {
                "value": "o",
                "state": "WRONG_SPOT"
            },
            {
                "value": "l",
                "state": "CORRECT"
            },
            {
                "value": "l",
                "state": "CORRECT"
            },
            {
                "value": "s",
                "state": "WRONG"
            }
        ]
        expect(res).toMatchObject(expected);
    });
    it('Second "l" should be in wrong spot', () => {
        const res = makeGuess('hello', 'chill');
        const expected: GuessResult = [
            {
                "value": "c",
                "state": "WRONG"
            },
            {
                "value": "h",
                "state": "WRONG_SPOT"
            },
            {
                "value": "i",
                "state": "WRONG"
            },
            {
                "value": "l",
                "state": "CORRECT"
            },
            {
                "value": "l",
                "state": "WRONG_SPOT"
            }
        ]
        expect(res).toMatchObject(expected);
    });
    it('Letter "e" is duplicated twice', () => {
        const res = makeGuess('hello', 'peace');
        const expected: GuessResult = [
            {
                "value": "p",
                "state": "WRONG"
            },
            {
                "value": "e",
                "state": "CORRECT"
            },
            {
                "value": "a",
                "state": "WRONG"
            },
            {
                "value": "c",
                "state": "WRONG"
            },
            {
                "value": "e",
                "state": "WRONG"
            }
        ]
        expect(res).toMatchObject(expected);
    });
    it('Letter "l" is duplicated twice', () => {
        const res = makeGuess('hello', 'chill');
        const expected: GuessResult = [
            {
                "value": "c",
                "state": "WRONG"
            },
            {
                "value": "h",
                "state": "WRONG_SPOT"
            },
            {
                "value": "i",
                "state": "WRONG"
            },
            {
                "value": "l",
                "state": "CORRECT"
            },
            {
                "value": "l",
                "state": "WRONG_SPOT"
            }
        ]
        expect(res).toMatchObject(expected);
    });
});
