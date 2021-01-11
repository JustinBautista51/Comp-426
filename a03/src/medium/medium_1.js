import {
    variance
} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];
    }
    return sum;
}
// console.log(getSum([1, 2, 3, 4, 5]));


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort(function (a, b) {
        return a - b
    });
    let medianPlace = Math.floor(array.length / 2);
    if (array.length % 2 != 0) {
        return array[medianPlace];
    } else {
        let median = (array[medianPlace] + array[medianPlace - 1]) / 2;
        return median;
    }

}
// let array = [3, 2, 5, 6, 2, 7, 4, 2, 7, 5];
// console.log(getMedian(array)); // 4.5
// let array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// console.log(getMedian(array2));


/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    let answer = {};
    answer.length = array.length;
    answer.sum = getSum(array);
    answer.mean = answer.sum / answer.length;
    answer.median = getMedian(array);
    answer.min = Math.min(...array);
    answer.max = Math.max(...array);
    answer.variance = variance(array, answer.mean);
    answer.standard_deviation = Math.sqrt(answer.variance);
    return answer;



}
//console.log(getStatistics([3, 2, 4, 5, 5, 5, 2, 6, 7]))