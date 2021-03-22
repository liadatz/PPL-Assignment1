"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPaired = exports.func = exports.clean = exports.isEven = exports.runLengthEncoding = exports.removeRepeat = exports.countRepeat = exports.countVowels = exports.isVowel = void 0;
const R = require("ramda");
const ramda_1 = require("ramda");
const stringToArray = R.split("");
const isVowel = (c) => {
    if (c === 'a' || c === 'A' ||
        c === 'e' || c === 'E' ||
        c === 'i' || c === 'I' ||
        c === 'o' || c === 'O' ||
        c === 'u' || c === 'U')
        return true;
    else
        return false;
};
exports.isVowel = isVowel;
/* Question 1 */
const countVowels = (s) => {
    return (R.filter(exports.isVowel, stringToArray(s))).length;
};
exports.countVowels = countVowels;
/* Question 2 */
const countRepeat = (c, s) => {
    return c + R.reduceWhile((acc, cur) => { return (cur == "c" || (cur != "c" && acc > 0)); }, (acc, cur) => {
        if (cur == c)
            return acc + 1;
        else
            return acc;
    }, 0, stringToArray(s));
};
exports.countRepeat = countRepeat;
const removeRepeat = (s) => {
    return R.dropRepeats(stringToArray(s)); //return [a,b,c,d] out of "aaabbbcccdddd"
};
exports.removeRepeat = removeRepeat;
const runLengthEncoding = (s) => {
    const charsArray = exports.removeRepeat(s); //abcd
    return charsArray.reduce((acc, cur) => acc + exports.countRepeat(cur, s), "");
};
exports.runLengthEncoding = runLengthEncoding;
/* Question 3 */
const isEven = (c, s) => {
    return true;
};
exports.isEven = isEven;
const clean = (s) => stringToArray(s).filter((c) => {
    return (c === '[' || c === ']' ||
        c === '(' || c === ')' ||
        c === '{' || c === '}');
});
exports.clean = clean;
const func = (s) => {
    return s.reduce((acc, cur) => {
        return (cur === '(' || cur === '[' || cur === '{') ? R.concat(stringToArray(cur), acc) :
            (cur == ')') ? ((acc[0] === '(') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                (cur == ']') ? ((acc[0] === '[') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                    (cur == '}') ? ((acc[0] === '{') ? R.drop(1, acc) : R.concat(stringToArray("z"), acc)) :
                        acc;
    }, [""]);
};
exports.func = func;
exports.isPaired = ramda_1.pipe((s) => exports.func(exports.clean(s)), (s) => s.length === 0);
//# sourceMappingURL=part2.js.map