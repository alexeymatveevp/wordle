import fs from 'fs'

fs.readFile("en.txt", (err, buff) => {
    if (err) {
        console.error(err);
        return;
    }

    const fileLetterWords = buff.toString().split(/\r?\n/).filter(str => str.length === 5).join('\r\n');
    fs.writeFile('five-letters.txt', fileLetterWords, function (err) {
        if (err) return console.log(err);
    });
});