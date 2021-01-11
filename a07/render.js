
import Game from "./engine/game.js";
let game = {}

export const loadGameDOM = function () {
     game = new Game(4);
    const $root = $('#root');
    const $edit = $(`#edit`)
    document.getElementById("win").style.display = "none"
    document.getElementById("lost").style.display = "none"
document.addEventListener("keydown", checkKeyPress)
$root.append(`<div id= "board">${printboard((game.getGameState().board))}</div>`)
$edit.after(`<span id="score">Score : ${game.score} </span>`)
document.getElementById("edit").addEventListener("click", handleNewGame)

};
export const handleNewGame = function() {
    game.setupNewGame()
    let elem = document.getElementById("board")
    let newboard = printboard((game.getGameState().board))
    $(newboard).insertAfter(elem)
    elem.remove()
    let SB = document.getElementById("score")
    let newScore = score(game.getGameState().score)
    $(newScore).insertAfter(SB)
    SB.remove()
    document.getElementById("win").style.display = "none"
    document.getElementById("lost").style.display = "none"
}
export const score = function(score) {
return `<span id="score">Score : ${game.score} </span>`
}

export const printboard = function (array) {
    let row1 = ``
    let row2 = ``
    let row3 = ``
    let row4 = ``
for(let i = 0; i < game.size; i++){
    row1 += `<span id= "cell">${game.getGameState().board[i]}</span>`
}
for(let i = game.size; i < game.size*2; i++){
    row2 += `<span id= "cell">${game.getGameState().board[i]}</span>`
}
for(let i = game.size*2; i < game.size*3; i++){
    row3 += `<span id= "cell">${game.getGameState().board[i]}</span>`
}
for(let i = game.size*3; i < game.size**2; i++){
    row4 += `<span id= "cell">${game.getGameState().board[i]}</span>`
}
return `<div id ="board"><div id="row">${row1}</div> <div id="row">${row2}</div> <div id="row">${row3}</div> <div id="row">${row4}</div></div>`
}
export const winner = function() {
    if(game.won == true) {
       document.getElementById("win").style.display = ""
    }
    if(game.over == true) {
       document.getElementById("lost").style.display = ""
    }
}

export const checkKeyPress = function (key) {
    key.preventDefault();
    if(key.keyCode == "37") {
    game.move("left")
    let elem = document.getElementById("board")
    let newboard = printboard((game.getGameState().board))
    $(newboard).insertAfter(elem)
    elem.remove()
    let SB = document.getElementById("score")
    let newScore = score(game.getGameState().score)
    $(newScore).insertAfter(SB)
    SB.remove()
    winner()
     }
    if(key.keyCode == "38") {
        game.move("up")
    let elem = document.getElementById("board")
    let newboard = printboard((game.getGameState().board))
    $(newboard).insertAfter(elem)
    elem.remove()
    let SB = document.getElementById("score")
    let newScore = score(game.getGameState().score)
    $(newScore).insertAfter(SB)
    SB.remove()
        winner()
    }
    if(key.keyCode == "39") {
        game.move("right")
    let elem = document.getElementById("board")
    let newboard = printboard((game.getGameState().board))
    $(newboard).insertAfter(elem)
    elem.remove()
    let SB = document.getElementById("score")
    let newScore = score(game.getGameState().score)
    $(newScore).insertAfter(SB)
    SB.remove()
        winner()
    }
    if(key.keyCode == "40") {
        game.move("down")
    let elem = document.getElementById("board")
    let newboard = printboard((game.getGameState().board))
    $(newboard).insertAfter(elem)
    elem.remove()
    let SB = document.getElementById("score")
    let newScore = score(game.getGameState().score)
    $(newScore).insertAfter(SB)
    SB.remove()
        winner()
    }

}

$(function () {
    loadGameDOM();
});