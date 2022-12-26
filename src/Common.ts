import { Copiable } from "./Interfaces";

export function cloneArray<T extends Copiable>(arr: Array<Copiable> ): Array<T>  {
    return arr.map(item => item.copy());
}

// object used for custom string display for buttons with underlying js values
export interface KeyDisplay {
    Display: string; // ui display string
    Js: string;      // javascript literal string
}

export const SymbolKey = {
    Add: { Display: '+', Js: '+' },
    Sub: { Display: '-', Js: '-' },
    Mult: { Display: 'x', Js: '*' },
    Div: { Display: '÷', Js: '/' },
    Equal: { Display: '=', Js: '=' },
    Dot: { Display: '.', Js: '.'},
    Clear: { Display: 'C', Js: 'C'}
};

/**
 * Checks if a KeyDisplay object is an operator or not
 * @param key Js string
 * @param symbs choose your own SymbolKey object if you want (optional)
 * @returns 
 */
export function isOperator(key: string, symbs = SymbolKey): boolean {
    return key === symbs.Add.Js || key === symbs.Sub.Js ||
        key === symbs.Mult.Js || key === symbs.Div.Js;
}

/**
 * Checks if a character is a digit
 * @param char string (one character long) to test
 */
export function isDigit(char: string) {
    if (char.length !== 1)
        throw { name: "Invalid argument", what: "isDigit char must be 1 character long"};
    
    return /^[0-9]$/.test(char);
}

export const NumKey: Array<KeyDisplay> = [
    { Display: '0', Js: '0' },
    { Display: '1', Js: '1' },
    { Display: '2', Js: '2' },
    { Display: '3', Js: '3' },
    { Display: '4', Js: '4' },
    { Display: '5', Js: '5' },
    { Display: '6', Js: '6' },
    { Display: '7', Js: '7' },
    { Display: '8', Js: '8' },
    { Display: '9', Js: '9' },
    { Display: 'a', Js: 'A' },
    { Display: 'b', Js: 'B' },
    { Display: 'c', Js: 'C' },
    { Display: 'd', Js: 'D' },
    { Display: 'e', Js: 'E' },
    { Display: 'f', Js: 'F' },
];
