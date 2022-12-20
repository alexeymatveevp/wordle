type WordChecker = (guess: string) => Promise<boolean>;

export const fileWordChecker: WordChecker = guess => {
    //TODO: change path to the file on server
    return fetch("../../scripts/five-letters.txt").then((buffer) => {
        const words = buffer.toString().split(/\r?\n/);

        return words.indexOf(guess) >= 0;
    }).catch(() => {
        throw new Error('Something went wrong');
    })
}
export const apiWordChecker: WordChecker = guess => {
    return fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + guess).then((response) => {
        if (response.ok) {
            return true;
        }
        throw new Error('Something went wrong');
    })
}