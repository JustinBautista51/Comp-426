import keypress from 'keypress';
import Game from "./engine/game.js";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 *
 */

let game = new Game(2);
//console.table(game.toString());
game.loadGame({board: [0,2,0,2], score: 0, won: false, over: false})
console.table(game.toString())
game.move("right")
console.table(game.toString())
game.move("up")
console.table(game.toString())
game.move("up")
console.table(game.toString())
//console.log(game.getGameState().board)
// game.board = [32,16,8,2,4,2,64,8,4,16,32,16,4,8,4,2]
// console.table(game.toString())
// game.move("up")
// console.log("first")
// console.table(game.toString())
// console.log(game.getGameState())
// game.move("up")
// console.log("second")
// console.table(game.toString())
// console.log(game.getGameState())
// // console.log(game.score)
//  console.log(game.over + "this is over")
//  console.log(game.hasNextMove())
// console.log(game.setupNewGame())
// console.table(game.toString())
// console.log(game.score)
// game.onMove(gameState => {
//     console.log(game.toString());
//     console.log(game.gameState);
// });

// game.onWin(gameState => {
//     console.log('You won with a gameState of...', gameState)
// });

// game.onLose(gameState => {
//     console.log('You lost! :(', gameState)
//     console.log(`Your score was ${gameState.score}`);
// });

// process.stdin.on('keypress', function (ch, key) {
//     switch (key.name) {
//         case 'right':
//             game.move('right');
//             break;
//         case 'left':
//             game.move('left');

//             break;
//         case 'down':
//             game.move('down');

//             break;
//         case 'up':
//             game.move('up');
//             break;
//     }
//     if (key && key.ctrl && key.name == 'c') {
//         process.stdin.pause();
//     }
// });


// process.stdin.setRawMode(true);
// process.stdin.resume();

