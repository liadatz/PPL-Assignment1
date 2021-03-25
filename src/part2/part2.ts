import { resourceUsage } from "node:process";
import * as R from "ramda";
import {pipe} from "ramda";

/** 
 * Convert String to Array of Strings 
 */
const stringToArray = R.split("");

// Question 1 //

/**
 * Check if c is a vowel
 * @param c String to be evaluated
 * @returns true if c is a vowel or false otherwise
 */
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

/**
 * Count how many vowels @param s contains
 * @param s String to be evaluated
 * @returns number of vowels inside the @param s
 */
export const countVowels: (s: string) => number = (s: string) : number => {
    return (R.filter(isVowel, stringToArray(s))).length;
};

// Question 2 //

/**
 * compose a String array of a letter and the number of times it appeared in a row
 * @param counter number of times @param currChar appeared in a row 
 * @param currChar String representing a single char
 * @returns string array containing [currChar, counter] or just [currChar] incase currChar appeared only one time
 */
const composeAddition: (x: number, s: string) => string[]  = (counter: number, currChar: string): string[] => {
    if (counter === 1) return [currChar]
    else return [currChar,counter.toString()]
}

/**
 * Recursive program that Encode String array to compressed version
 * @param s String array needed to be compressed
 * @param counter number of times @param currChar appeared in a row 
 * @param index current index of the array
 * @param currChar current char
 * @param output String array accumulator for result
 * @returns compressed version of String array
 */
const recursiveLegnthEncoding: (s: string[], x: number, y: number, c: string, z: string[]) => string[] = 
    (s: string[], counter: number, index: number, currChar: string, output: string[]): string[] => { 
    if (index + 1 >= s.length) return R.concat(output, composeAddition(counter, currChar))
    else if (s[index + 1] === currChar) return recursiveLegnthEncoding(s, counter + 1, index + 1, currChar, output)
    else return recursiveLegnthEncoding(s, 1, index + 1, s[index + 1], R.concat(output, composeAddition(counter, currChar)))

}

/**
 * Encode String to compressed version String
 * @param s String needed to be compressed
 * @returns compressed version of @param s
 */
export const runLengthEncoding: (s: string) => string = (s: string): string => {
    const stringArray : string[]  = stringToArray(s)
    return R.join("", recursiveLegnthEncoding(stringArray, 1, 0, stringArray[0], []))
}

// Question 3 //
/**
 * Remove any char that is not kind of parenthesis
 * @param s String
 * @returns Array of strings containing only parenthesis from @param s
 */
const clean: (s: string) => string[] = (s: string): string[] => stringToArray(s).filter((c: string): boolean => {
    return (c === '[' || c === ']' ||c === '(' || c === ')' ||c === '{' || c ==='}')});

/**
 * Reduce fuction
 * @param s String array to be evaluate 
 * @returns Empty array of strings if @param s was legal or array of parenthesis and 'z' otherwise
 */
export const func = (s: string[]): string[] =>{
    return s.reduce((acc: string[], cur: string): string[] => {
        return (cur === '(' || cur === '[' || cur === '{') ? R.concat(stringToArray(cur), acc) :
            (cur == ')') ? ((acc[0] === '(') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                (cur == ']') ? ((acc[0] === '[') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                    (cur == '}') ? ((acc[0] === '{') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                        acc;
    }, [])
}

/**
 * Checking if @param s is legal
 */
export const isPaired: (s: string) => boolean = pipe(
    (s: string): string[] => func(clean(s)),
    (s: string[]): boolean => s.length === 0
);


