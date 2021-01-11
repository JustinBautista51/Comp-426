/**
 *
 * @param variable
 * @returns {{type: ("undefined"|"object"|"boolean"|"number"|"string"|"function"|"symbol"|"bigint"), value: *}}
 * example: identifyVariable(4);
 * returns: { type: 'number', value: 4 }
 */
export function identifyVariable(variable) {
   let answer = {};
   answer.type = typeof variable;
   answer.value = variable;
   return answer;
}
console.log(identifyVariable("sans"));




/**
 *
 * @param array
 * @returns {[]}
 * example: identifyArray(['some', 3, [3, 4], false]);
 * returns: [
 { type: 'string', value: 'some' },
 { type: 'number', value: 3 },
 { type: 'object', value: [ 3, 4 ] },
 { type: 'boolean', value: false }
 ]

 */
export function identifyArray(array) {
   // just use the last function then iterate through it
   let answer = [];
   for (let i = 0; i < array.length; i++) {
      answer[i] = identifyVariable(array[i]);
   }
   return answer;
}
console.log(identifyArray(['some', 3, [3, 4], false]));

/**
 * mutates the object that is passed in.
 * @param object
 * @param key
 * @returns {*} does not have to return anything
 *
 * example:
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 removeKey(obj, 'password');
 obj now does not contain the `password` field
 */
export function removeKey(object, key) {
   let property = key;
   delete object[property];
}
let obj = {
   name: 'Mr. Boss',
   title: 'boss',
   age: 33,
   password: 'pass123'
};
console.log(obj);
removeKey(obj, 'password');
console.log(obj);

/**
 * Does not mutate the object passed in
 * @param object
 * @param key
 * @returns {*} The object with its keys removed
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
};
 obj = removeKeyNonDestructive(obj, 'password');
 obj will not have the `password` field only because it was assigned the result of the function.
 If only `removeKeyNonDestructive` was called, nothing would have changed.
 */
export function removeKeyNonDestructive(object, key) {
   let {
      [key]: removeThisProperty, ...rest
   } = object;
   return rest;

}
let obj2 = {
   name: 'Mr. Boss',
   title: 'boss',
   age: 33,
   password: 'pass123'
};
let objC = removeKeyNonDestructive(obj2, 'password');
console.log('altered ');
console.log(obj2);
console.log(objC);

/**
 * Remove and return the listed keys. Without mutating the object passed in.
 * @param object
 * @param {string[]} keyList
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 *
 * example:

 let obj = {
    name: 'Mr. Boss',
    title: 'boss',
    age: 33,
    password: 'pass123'
 };
 obj = removeKeys(obj, ['password', 'age']);
 // object not looks like this
 { name: 'Mr. Boss', title: 'boss' }

 * @return {*} The object with its keys removed.
 */
export function removeKeys(object, keyList) {
   for (let i = 0; i < keyList.length; i++) {
      object = removeKeyNonDestructive(object, keyList[i]);
   }
   return object;
}
let obj3 = {
   name: 'Mr. Boss',
   title: 'boss',
   age: 33,
   password: 'pass123'
};
console.log(obj3);
console.log('altered');
console.log(removeKeys(obj3, ['password', 'age']));
console.log(obj3);