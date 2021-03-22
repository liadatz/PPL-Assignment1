import { State, bind } from "./state";
import * as R from "ramda";

export type Stack = number[];

export const push : (x: number) => State<Stack, undefined> = (x: number) => {
    return (initialStack: Stack) => {
        return [R.concat([x], initialStack), undefined];
    }
}

export const pop : (initialStack : Stack) => [Stack, number] = (initialStack: Stack) => {
    const x : number = initialStack[0];
    const q : Stack = R.drop(1, initialStack);
    return [q, x];
    //test
}

export const stackManip : (initialStack: Stack) => [Stack, undefined] = (initialStack: Stack)=> {
    return bind(pop, x => bind(push(x*x), y => bind(pop, z => push(x+x*x))))(initialStack)
};