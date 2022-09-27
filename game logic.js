let playerText = document.getElementById('PlayerText')
let restartBtn = document.getElementById('RestartBtn')
let boxes = Array.from (document.getElementsByClassName('box'))


let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')
console.log(boxes)

const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

console.log(spaces)

//function for starting the game
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))

}


//conditions for  alternating players 
function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerText = '${currentPlayer} has won!'
            let winning_blocks = playerHasWon()

           winning_blocks.map( box => boxes[box].style.backgroundColor= winnerIndicator)
           boxes.forEach(box => box.removeEventListener('click', boxClicked))
            return
        }
        

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT 
    }
}

// winning combinations criteria
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [8,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

]


//function for when the player wins
function playerHasWon() {
    for (const condition of winningCombos ) {
        let [a,b,c] = condition

        if(spaces[a] && (spaces[a] == spaces[b]) && spaces[a] == spaces[c]) {
            return[a,b,c]
        }
        
    }
    return false
}


// restart button functionality
restartBtn.addEventListener('click', restart)

function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
        boxes.forEach(box => box.addEventListener('click', boxClicked))

    })

    currentPlayer = X_TEXT
}

//start the game
startGame()