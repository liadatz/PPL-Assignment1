import { State, bind } from "./state";
import * as R from "ramda";

export type Queue = number[];

export const enqueue : (x: number) => State<Queue, undefined> = (x: number) => {
    return (initialQueue: Queue) => {
        return [R.concat(initialQueue, [x]), undefined];
    }
}

export const dequeue : (initialQueue : Queue) => [Queue, number] = (initialQueue: Queue) => {
    const x : number = initialQueue[0];
    const q : Queue = R.drop(1, initialQueue);
    return [q, x];
}


export const queueManip : (intialQueue: Queue) => [Queue, number] = (initialQueue: Queue)=> {
    return bind(dequeue, x => bind(enqueue(x*2),  y => bind(enqueue(x/3), z => dequeue)))(initialQueue)
};