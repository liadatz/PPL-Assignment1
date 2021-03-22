import { resourceUsage } from "node:process";
import * as R from "ramda";
import {pipe} from "ramda";

const stringToArray = R.split("");
const isVowel: (c:string) => boolean = (c: string) : boolean => {
    if (c === 'a' || c === 'A' ||
        c === 'e' || c === 'E' ||
        c === 'i' || c === 'I' ||
        c === 'o' || c === 'O' ||
        c === 'u' || c === 'U')
        return true;
    else
        return false;
}
/* Question 1 */
export const countVowels = (s: string) : number => {
    return (R.filter(isVowel, stringToArray(s))).length;
};

/* Question 2 */
const composeAddition = (counter: number, currChar: string): string[] => {
    if (counter === 1) return [currChar]
    else return [currChar,counter.toString()]

}

const recursiveLegnthEncoding = (s: string[], counter: number, index: number, currChar: string, output: string[]): string[] => { 
    if (index + 1 >= s.length) return R.concat(output, composeAddition(counter, currChar))
    else if (s[index + 1] === currChar) return recursiveLegnthEncoding(s, counter + 1, index + 1, currChar, output)
    else return recursiveLegnthEncoding(s, 1, index + 1, s[index + 1], R.concat(output, composeAddition(counter, currChar)))

}

export const runLengthEncoding = (s: string): string => {
    const stringArray : string[]  = stringToArray(s)
    return R.join("", recursiveLegnthEncoding(stringArray, 1, 0, stringArray[0], []))
}

/* Question 3 */
const clean = (s: string): string[] => stringToArray(s).filter((c: string): boolean => {
    return (c === '[' || c === ']' ||c === '(' || c === ')' ||c === '{' || c ==='}')});

export const func = (s: string[]): string[] =>{
    return s.reduce((acc: string[], cur: string): string[] => {
        return (cur === '(' || cur === '[' || cur === '{') ? R.concat(stringToArray(cur), acc) :
            (cur == ')') ? ((acc[0] === '(') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                (cur == ']') ? ((acc[0] === '[') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                    (cur == '}') ? ((acc[0] === '{') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                        acc;
    }, [])
}


export const isPaired = pipe(
    (s: string): string[] => func(clean(s)),
    (s: string[]): boolean => s.length === 0
);


