import React from "react";

export type StateType = 'EMPTY' | 'CORRECT' | 'WRONG_SPOT' | 'WRONG';

export interface LetterT {
    value: string;
    state: StateType;
    isFilled: boolean;
}
export const Letter = React.memo<LetterT>(({value, state}) => {
    return <div className={'letter ' + getStateClassName(state)}>{value}</div>
})

function getStateClassName(state: StateType) {
    switch (state) {
        case "CORRECT":
            return 'letter__correct';
        case "EMPTY":
            return 'letter__empty';
        case "WRONG_SPOT":
            return 'letter__present';
        case "WRONG":
            return 'letter__wrong';
    }
}