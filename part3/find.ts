import { Result, makeFailure, makeOk, bind, either, isOk } from "../lib/result";
import * as R from "ramda";

/* Library code */
const findOrThrow: <T>(pred: (x: T) => boolean, a: T[]) => T = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult: <T>(pred: (x:T) => boolean, a:T[]) => Result<T> = <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
    const filtered : T[] = R.filter(pred, a);
    if (filtered.length > 0) return makeOk(filtered[0]);
    else return makeFailure("No element found.");

}
/* Client code */
const returnSquaredIfFoundEven_v1: (a: number[]) => number = (a: number[]): number => {
    try {
        const x: number = findOrThrow((x: number) => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2: <T>(a: number[]) => Result<T> = (a: number[]): Result<number> => {
    const f: <T>(x: number) => Result<T> = (x: number) : Result<number> => makeOk(x*x);
    return bind(findResult((x: number): boolean => x % 2 === 0, a), f)
};

export const returnSquaredIfFoundEven_v3: (a: number[]) => number = (a: number[]): number => {
    const isOk: (x: number) => number = (x: number) : number => x*x;
    const isFailure: (s: string) => number = (message: string) : number => -1;
    return either(findResult((x: number): boolean => x % 2 === 0, a), isOk, isFailure) 
}