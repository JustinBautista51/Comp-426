/*
Add your code for Game here
 */

export default class Game{
board = []
score = 0
won = false 
over = false
moved = []
win = []
lose= []
    constructor(size) {
    this.board = Array(size**2)
    this.board.fill(0,0,(size**2) )
    this.addTiles()
    this.addTiles()
    this.size = size;
    this.totalSize = size**2
    this.shifted = false;
    } 
    setupNewGame() {
    let sameSize = this.size
    this.board = Array(sameSize**2)
    this.board.fill(0,0,(sameSize**2))
    this.won = false;
    this.over = false;
    this.score = 0;
    this.addTiles()
    this.addTiles()
    }
    loadGame(gameState) {
        this.board = gameState.board
        this.score = gameState.score
        this.won = gameState.won
        this.over = gameState.over
    }
     move(direction) {
        if(direction == "up") {
            for(let i = this.size; i< this.board.length; i++) {
                if(this.board[i] != 0) {
                    let above = i % this.size
                    while (above < i) {
                        if(this.board[above] == 0) {
                            this.board[above] = this.board[i]
                            this.board[i] = 0
                            above = i;
                            this.shifted = true;
                        }
                        else {
                            above += this.size
                        }
                    }
                }
            }
            this.upAdder()
        }
        if(direction == "down") {
            this.board.reverse()
            for(let i = this.size; i< this.board.length; i++) {
                if(this.board[i] != 0) {
                    let above = i % this.size
                    while (above < i) {
                        if(this.board[above] == 0) {
                            this.board[above] = this.board[i]
                            this.board[i] = 0
                            above = i;
                            this.shifted = true;
                        }
                        else {
                            above += this.size
                        }
                    }
                }
            }
            this.upAdder()
            this.board.reverse();
        }
        if(direction == "left") {
            this.board.reverse()
            for(let i = 0; i < this.board.length; i += this.size) {
                for(let j = i + this.size -2; j >= i; j--) {
                    if(this.board[j] != 0) {
                    let right = this.size - 1 + i
                    while (right > j) {
                        if(this.board[right] == 0) {
                            this.board[right] = this.board[j]
                            this.board[j] = 0
                            right = j;
                            this.shifted = true;
                        }
                        else {
                            right --
                        }
                    }
                }
                }
                
            }
            this.rightAdder()
            this.board.reverse()
            
        }
        if(direction == "right") {
            for(let i = 0; i < this.board.length; i += this.size) {
                for(let j = i + this.size -2; j >= i; j--) {
                    if(this.board[j] != 0) {
                    let right = this.size - 1 + i
                    while (right > j) {
                        if(this.board[right] == 0) {
                            this.board[right] = this.board[j]
                            this.board[j] = 0
                            right = j;
                            this.shifted = true;
                        }
                        else {
                            right --
                        }
                    }
                }
                }
                
            }
            this.rightAdder()
        }

         this.update(this.moved)
         this.won = this.board.includes(2048)
         if(this.won) {
             this.update(this.win)
         }
         if(this.shifted == true) {
             this.addTiles()
             this.shifted = false
         }
             if(!this.hasNextMove() && this.won == false) {
                this.update(this.lose)
                this.over = true
            }
             
             
        
    }
    onMove(callback) {
        this.moved.push(callback)

    }
    onWin(callback) {
        this.win.push(callback)
    }
    onLose(callback) {
        this.lose.push(callback)
    }
    getGameState() {
        return {board: this.board,
            score: this.score,
            won: this.won,
            over: this.over
        }
    }  
    addTiles() {
         let chance = Math.random()
         let emptySpots = []
         let empty = false
         this.board.forEach(function (value , i) {
             if (value == 0) {
                 emptySpots.push(i)
                 empty = true;
             }
         });
         if (empty == true) { 
            let space = Math.floor(Math.random() * emptySpots.length)
            if(chance <= .9 ) {
                this.board[emptySpots[space]] = 2
            }
            else {
                this.board[emptySpots[space]] = 4
            }

         }
     }
toString() {
    let board = []
    let temp = []
    let sides = this.size
    this.board.forEach(function (value,i)  {
        temp.push(value)
        if (i % sides == sides -1) {
            board.push(temp)
            temp = []
        }
    });
    return board
}
upAdder() {
    for(let j = 0; j < this.board.length - this.size; j++) {
        if (this.board[j] == this.board[j + this.size] && this.board[j] !=0 && this.board[j+ this.size] !=0) {
            this.board[j] = this.board[j]*2
            this.board[j + this.size] = 0
            this.score += this.board[j] 
            this.shifted = true;
            
        }
        for(let k = 0; k <this.size ; k++) {
            for(let m = this.size; m < this.board.length - this.size; m++) {
            if (this.board[m] == 0 && this.board[m+this.size] != 0 ) {
                this.board[m] = this.board[m +this.size]
                this.board[m + this.size] = 0
            }
            }
        }
        
    }

}
rightAdder(){
    for(let j = this.board.length-1; j > 0 ; j--) {
        if (this.board[j] == this.board[j -1 ] && j % this.size != 0 && this.board[j] !=0 && this.board[j-1] !=0) {
            this.board[j] = this.board[j]*2
            this.board[j -1] = 0
            this.score += this.board[j] 
            this.shifted = true;
        }
        for(let k = 0; k <this.size; k++) {
             for(let m = 0; m < this.board.length; m++) {
                if (m % this.size != 0 && this.board[m] == 0 && this.board[m - 1] != 0) {
                this.board[m] = this.board[m-1]
                this.board[m -1] = 0
            }
            }
        }
       
            
    }

}
hasNextMove (b=this.board) {
    let legal = false;
    for(let i= 0; i <b.length; i++){
        if(i >= this.size) {
            if(b[i-this.size] == 0 | b[i-this.size] == b[i]){
                return true;
            }
        }
        if(i <= b.length-1-this.size ) {
            if(b[i+this.size] == 0 | b[i+this.size] == b[i]) {
                return true;
            }
        }
        if(i%this.size != 0) {
            if(b[i-1] == 0 | b[i-1] == b[i] ) {
                return true;
            }
        }
        if(i%this.size != this.size-1) {
            if(b[i+1] == 0 | b[i+1] == b[i]) {
                return true;
            }
    }
}
return legal;
}
update (listener) {
    for ( let kas = 0; kas < listener.length; kas++) {
        listener[kas](this.getGameState)
    }
}
}
