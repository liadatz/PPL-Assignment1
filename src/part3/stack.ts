import { State, bind } from "./state";
import * as R from "ramda";

export type Stack = number[];

/**
 * Insert @param x to the Stack
 * @param x number to be added
 * @returns State of the pushing
 */
export const push : (x: number) => State<Stack, undefined> = (x: number) => {
    return (initialStack: Stack) => {
        return [R.concat([x], initialStack), undefined];
    }
}

/**
 * Returning the last added element from the Stack
 * @param initialStack The initial state of the Stack
 * @returns Array contaions the new Stack and the element we removed
 */
export const pop : (initialStack : Stack) => [Stack, number] = (initialStack: Stack) => {
    const x : number = initialStack[0];
    const q : Stack = R.drop(1, initialStack);
    return [q, x];
}

/**
 * 1. Dequeues a number x from the queue
 * 2. Enqueues 2 * x
 * 3. Enqueues x / 3
 * 4. Dequeues
 */
export const stackManip : (initialStack: Stack) => [Stack, undefined] = (initialStack: Stack)=> {
    return bind(pop, x => bind(push(x*x), y => bind(pop, z => push(x+x*x))))(initialStack)
};