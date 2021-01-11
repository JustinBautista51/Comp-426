/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Justin Bautista 
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */



/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function (hero) {
    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object

    // Example: 
    // return `<div>${hero.name}</div>`;


    return `<div style = "color: ${hero.color}"> ${hero.name} </div>
        <div>${hero.first} ${hero.last}</div> <span>${hero.subtitle}</span>
        <img src ="${hero.img}">
        <p style = "background: ${hero.backgroundColor}">${hero.description}</p>
        <div>${hero.firstSeen}</div>
        <button>Edit</button>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;
    return `<form><form><input type="text" value = "${hero.name}" /><textarea rows ="4" cols="10"></textarea></form>

        <form><input type="text" value = "${hero.first}" /><textarea rows ="4" cols="10"></textarea></form>

        <form><input type="text" value = "${hero.last}" /><textarea rows ="4" cols="10"></textarea></form>

        <form><input type="text" value = "${hero.description}" /><textarea rows ="4" cols="10"></textarea></form>

        <form><input type="text" value = "${hero.name}" /><textarea rows ="10" cols="10"></textarea></form>
        <form><textarea  rows = "4" cols ="10">"${hero.firstSeen}"</textarea><br></form>
        <form><button type="button">cancel</button>
        <button type="submit"> save </button></form></form>`


};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    for (let i = 0; i < heroes.length; i++) {
        let x = renderHeroCard(heroes[i])
        $root.append(x)

    }

    // TODO: Generate the heroes using renderHeroCard()

    // TODO: Append the hero cards to the $root element

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()
    let y = renderHeroEditForm(randomHero)
    $($root).append(y)
    // TODO: Append the hero edit form to the $root element
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});