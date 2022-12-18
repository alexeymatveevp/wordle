import {makeGuess} from "./utils/make-guess";

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
