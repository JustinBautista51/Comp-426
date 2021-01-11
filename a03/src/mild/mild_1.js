/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    let sum = a + b;
    let answer = a + " + " + b + " = " + sum;
    return answer;

}
console.log(sumToString(3, 4));


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    let array = [];
    let index = endNumber - startNumber;
    for (let i = 0; i <= index; i++) {
        array[i] = startNumber + i;
    }
    return array;

}
console.log(getIncreasingArray(3, 7));

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let answer = {
        min: 0,
        max: 0
    };
    answer.min = Math.min(...numbers);
    answer.max = Math.max(...numbers);
    return answer;

}
console.log(maxAndMin([3, 4, 4, 5, 6, -1, 0]));

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let counter = {};
    for (let element of array) {
        if (counter[element] != undefined) {
            counter[element] += 1
        } else {
            counter[element] = 1
        }
    }
    return counter
}

let sans = {}
console.log(countArray([
    [{
        sans
    }, {
        sans
    }][{
        sans
    }, {
        sans
    }]
]))
// console.log(countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some',
//     [1, 2],
//     [1, 2, 3],
//     [1, 2, 3],
// ]));
// console.log(countArray([3, 4, 5, 5, 3, "sans", "sans", "mans", [1, 2],
//     [1, 2],
//     [2, 3],
//     [2, 1],
//     [1, 2, 3]
// ]));