import {Letter, LetterT} from "./letter";
import React from "react";

export type Word = Array<LetterT>;
interface WordProps {
    word: Word
}
export const Word = React.memo<WordProps>(({word}) => {
    return <div className={'word'}>
        {word.map((letter, index) => <Letter {...letter} key={index} />)}
    </div>
});