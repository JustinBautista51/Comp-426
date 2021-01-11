/**
 * Course: COMP 426
 * Assignment: a05
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
    // TODO: Copy your code from a04 to render the hero card
    return `<div id = "${hero.id}">
    <div style = "color: ${hero.color}"> ${hero.name} </div>
    <div>${hero.first} ${hero.last}</div> <span>${hero.subtitle}</span>
    <img src ="${hero.img}">
    <p style = "background: ${hero.backgroundColor}">${hero.description}</p>
    <div>${hero.firstSeen}</div>
    <button class = "edit" id = "${hero.id}" >Edit</button>
            </div>`;
};



/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {
    // TODO: Copy your code from a04 to render the hero edit form
    return `<form id = "${hero.id}"> 
    <div><input type="text" id = "name" value = "${hero.name}" /><textarea rows ="4" cols="10"></textarea></div>
    <div><input type="text" id = "fname" value = "${hero.first}" /><textarea rows ="4" cols="10"></textarea></div>
    <div><input type="text"  id = "lname" value = "${hero.last}" /><textarea rows ="4" cols="10"></textarea></div>
    <div><input type="text"  id = "des" value = "${hero.description}" /><textarea rows ="4" cols="10"></textarea></div>
    <div><input type="text" id = "date" value = "${hero.firstSeen}"/><textarea rows = "4" cols ="10"></textarea><br></div>
    <button type="button" class = "cancel" id = "${hero.id}">cancel</button>
    <button type="submit" class="save" id = "${hero.id}"> save </button>   
    </form>`;

};



/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead
    //console.log(event.target.id);
    let sans = event.target.id
    // console.log(sans)
    let myHero = heroicData.filter(obj => obj.id == sans)
    // console.log(myHero);
    // console.log(renderHeroEditForm(myHero[0]));
    let rH = renderHeroEditForm(myHero[0])
    let elem = document.getElementById(sans)
    $(rH).insertAfter(elem)
    //  $(".cancel").on('click', handleCancelButtonPress)
    elem.remove();

};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead
    //console.log(event.target);
    let spot = event.target.id
    // console.log(spot)
    let currentHero = heroicData.filter(obj => obj.id == spot)
    // console.log(currentHero);
    let oldHero = renderHeroCard(currentHero[0])
    let elem = document.getElementById(spot)
    //console.log(elem)
    $(oldHero).insertAfter(elem)
    elem.remove();

};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead
    event.preventDefault();
    // console.log(event.target.id)
    let bro = event.target.id
    let currentHero = heroicData.filter(obj => obj.id == bro)
    //[{hero object}]
    console.log(currentHero);
    let oldHero = currentHero[0]
    // = {hero object}
    let newName = document.getElementById("name").value
    oldHero.name = newName
    let newFirst = document.getElementById("fname").value
    oldHero.first = newFirst
    let newLast = document.getElementById("lname").value
    oldHero.last = newLast
    let newDes = document.getElementById("des").value
    oldHero.description = newDes

    let data = new Date(document.getElementById("date").value)
    oldHero.firstSeen = new Date(
        data.getFullYear(),
        data.getMonth(),
        data.getDate()
    );


    let render = renderHeroCard(oldHero)
    let elem = document.getElementById(bro)
    console.log(oldHero)
    $(render).insertAfter(elem)
    elem.remove();


};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part
    for (let i = 0; i < heroes.length; i++) {
        let x = renderHeroCard(heroes[i])
        $root.append(x)

    }
    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button
    $("#root").on('click', ".edit", handleEditButtonPress)

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form
    $("#root").on('click', ".save", handleEditFormSubmit)
    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button
    $("#root").on('click', ".cancel", handleCancelButtonPress)
};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});