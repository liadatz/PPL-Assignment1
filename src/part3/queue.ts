import { State, bind } from "./state";
import * as R from "ramda";

export type Queue = number[];

/**
 * Insert @param x to the Queue
 * @param x number to be added
 * @returns State of the pushing
 */
export const enqueue : (x: number) => State<Queue, undefined> = (x: number) => {
    return (initialQueue: Queue) => {
        return [R.concat(initialQueue, [x]), undefined];
    }
}

/**
 * Returning the first added element from the Queue that still in Queue
 * @param initialStack The initial state of the Queue
 * @returns Array contaions the new Queue and the element we removed
 */
export const dequeue : (initialQueue : Queue) => [Queue, number] = (initialQueue: Queue) => {
    const x : number = initialQueue[0];
    const q : Queue = R.drop(1, initialQueue);
    return [q, x];
}

/**
 * 1. Pops a number x
 * 2. Pushes x * x
 * 3. Pops a number y
 * 4. Pushes x + y
 */
export const queueManip : (intialQueue: Queue) => [Queue, number] = (initialQueue: Queue)=> {
    return bind(dequeue, x => bind(enqueue(x*2),  y => bind(enqueue(x/3), z => dequeue)))(initialQueue)
};