import mpg_data from "./data/mpg_data.js";
import {
    getStatistics
} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        highway: (mpg_data
            .map(car => car.highway_mpg)
            .reduce((acc, miles) => {
                return acc + miles
            })) / mpg_data.length,
        city: (mpg_data
            .map(car => car.city_mpg)
            .reduce((acc, miles) => {
                return acc + miles
            })) / mpg_data.length
    },
    //map high way and city then maybe reduce it , add it, and divide it  
    allYearStats: getStatistics(mpg_data.map(car => car.year)),
    ratioHybrids: ((mpg_data
        .filter(car => car.hybrid === true)).length) / mpg_data.length
    //get cars with hybrid propety that is true in an array, find the length, divide it by the array length of all the total cars  
};
// console.log("avGHighway")
// console.log(allCarStats.avgMpg.highway);
// console.log("avGCity")
// console.log(allCarStats.avgMpg.city);
// console.log("allYearStats")
// console.log(allCarStats.allYearStats);
// console.log("HybridStats")
// console.log(allCarStats.ratioHybrids);


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: mpg_data
        .filter(car => car.hybrid === true)
        .reduce((acc, val) => {
                if (!acc.map(v => v.make).includes(val.make)) {
                    //  we got a car make
                    let hybrids = mpg_data
                        .filter(car => car.make === val.make)
                        .filter(car => car.hybrid === true)
                        .map(car => car.id)
                        .reduce((acc, id) => {
                            if (!acc.includes(id)) acc.push(id);
                            return acc;
                        }, []);
                    //we have ids
                    let car_obj = {
                        make: val.make,
                        hybrids,
                    };
                    acc.push(car_obj);
                };
                acc.sort(((a, b) => b.hybrids.length - a.hybrids.length))
                return acc;
            },
            []),




    avgMpgByYearAndHybrid: mpg_data
        .reduce((acc, val) => {
            if (!acc[val.year]) {
                let cars = mpg_data
                    //object by years 
                    .filter(obj => obj.year === val.year)
                    //everything by hybrid
                    .filter(obj2 => obj2.hybrid === true)
                let badcar = mpg_data
                    //object by years 
                    .filter(obj => obj.year === val.year)
                    //everything by nothybrid
                    .filter(obj2 => obj2.hybrid === false)
                let car_obj = {
                    hybrid: {
                        city: cars
                            //all hybrids to their city_mpg
                            .map(car => car.city_mpg)
                            //doing the average
                            .reduce((acc, miles) => {
                                return acc + miles
                            }) / cars.length,
                        highway: cars
                            //all hybrids to their highway_mpg
                            .map(car => car.highway_mpg)
                            .reduce((acc, miles) => {
                                return acc + miles
                            }) / cars.length
                    },

                    notHybrid: {
                        city: badcar
                            //all hybrids to their city_mpg
                            .map(car => car.city_mpg)
                            //doing the average
                            .reduce((acc, miles) => {
                                return acc + miles
                            }) / badcar.length,
                        highway: badcar
                            //all hybrids to their highway_mpg
                            .map(car => car.highway_mpg)
                            // doing average
                            .reduce((acc, miles) => {
                                return acc + miles
                            }) / badcar.length
                    },

                };
                acc[val.year] = car_obj;
            };

            return acc;
        }, {})
};
console.log(moreStats.makerHybrids)
console.log(moreStats.avgMpgByYearAndHybrid)