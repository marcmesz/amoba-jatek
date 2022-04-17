const mainDiv = document.querySelector(".main")
const messageDiv = document.querySelector(".message")
let square = ""
let player = 1
let gameover = false
let currentMark = "."
let board = [
    "", "", "",
    "", "", "",
    "", "", "",
]

for (let i = 0; i < 9; i++){
    square+=`<div id="${i}" class="square"></div>`
}

mainDiv.innerHTML=square

mainDiv.childNodes.forEach(element => {
    element.addEventListener("click",()=>{
        if(!gameover){
            setPlayers(element)
            checkForMatch(element)
        }
    })
});

function setPlayers(element){
    const clickedSquare = element.getAttribute("id")
    if(player===1){
        currentMark = "X"
        element.innerText = currentMark
        player=2
    }
    else{
        currentMark = "O"
        element.innerText = currentMark
        player=1
    }
    board[clickedSquare]=currentMark
}

function checkForMatch(element){
    if(
        board[0] === currentMark & board[1] === currentMark & board[2] === currentMark ||
        board[3] === currentMark & board[4] === currentMark & board[5] === currentMark ||
        board[6] === currentMark & board[7] === currentMark & board[8] === currentMark ||
        board[0] === currentMark & board[3] === currentMark & board[6] === currentMark ||
        board[1] === currentMark & board[4] === currentMark & board[7] === currentMark ||
        board[2] === currentMark & board[5] === currentMark & board[8] === currentMark ||
        board[0] === currentMark & board[4] === currentMark & board[8] === currentMark ||
        board[2] === currentMark & board[4] === currentMark & board[6] === currentMark
    ){
        gameover=true
        showPattern()
        let message = ""
        if(currentMark==="X"){
            message = "Player 1 wins! 🎉"
        }
        else{
            message = "Player 2 wins! 🥳"
        }
        messageDiv.innerHTML=`<p>${message}</p><a href="javascript:location.reload();">Restart game</a>`
    }
    else{
        let tiesquares = 0
        document.querySelectorAll(".square").forEach(item=>{
            if(item.innerText){
                tiesquares++
            }
        })
        if(tiesquares===9){
            gameover=true
            message="It's a TIE 😞"
            messageDiv.innerHTML=`<p>${message}</p><a href="javascript:location.reload();">Restart game</a>`
        }
    }
}

function showPattern(){
    let selectedSquares = []
    if(board[0] === currentMark & board[1] === currentMark & board[2] === currentMark){
        selectedSquares = [0,1,2]
    }
    else if(board[3] === currentMark & board[4] === currentMark & board[5] === currentMark){
        selectedSquares = [3,4,5]
    }
    else if(board[6] === currentMark & board[7] === currentMark & board[8] === currentMark){
        selectedSquares = [6,7,8]
    }
    else if(board[0] === currentMark & board[3] === currentMark & board[6] === currentMark){
        selectedSquares = [0,3,6]
    }
    else if(board[1] === currentMark & board[4] === currentMark & board[7] === currentMark){
        selectedSquares = [1,4,7]
    }
    else if(board[2] === currentMark & board[5] === currentMark & board[8] === currentMark){
        selectedSquares = [2,5,8]
    }
    else if(board[0] === currentMark & board[4] === currentMark & board[8] === currentMark){
        selectedSquares = [0,4,8]
    }
    else if(board[2] === currentMark & board[4] === currentMark & board[6] === currentMark){
        selectedSquares = [2,4,6]
    }

    document.querySelectorAll(".square").forEach(square=>square.classList.add("hide"))
    selectedSquares.forEach(square=>{
        document.getElementById(square).classList.add("winner")
    })
}