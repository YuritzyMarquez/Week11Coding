const squares = document.querySelectorAll(".squares");
const playerX = "X";
const playerO = "O";
let turn = playerX;

const layoutState = Array(squares.length);
layoutState.fill(null);

const winner = document.getElementById("winner");
const winnerContextbox = document.getElementById("winnerContextbox");
const winnerAnnounce = document.getElementById("winnerAnnounce");
const restart = document.getElementById("restart");
restart.addEventListener("click", newGame);

squares.forEach((square) => square.addEventListener("click", squareClick));

function setHoverText() {
  squares.forEach((square) => {
    square.classList.remove("x-hover");
    square.classList.remove("o-hover");
  });
  
  const hoverClass = `${turn.toLowerCase()}-hover`;
  
  squares.forEach((square) => {
    if (square.innerText == "") {
      square.classList.add(hoverClass);
    }
  });
  
}
  
setHoverText();

function squareClick(event) {
    if (winnerContextbox.classList.contains("visible")) {
        return;
    }

    const square = event.target;
    const squareNumber = square.dataset.index;
    if(square.innerText != "") {
        return;
    }

    if(turn === playerX) {
        square.innerText = playerX;
        layoutState[squareNumber-1] = playerX;
        turn = playerO;
    }
    else {
        square.innerText = playerO;
        layoutState[squareNumber-1] = playerO;
        turn = playerX;
    }

    setHoverText();
    seeWhoWins();
}

function seeWhoWins() {
    for (const winnerPattern of winnerPatterns) {
        const {combo, winnerClass} = winnerPattern;
        const squareValue1 = layoutState[combo[0] - 1];
        const squareValue2 = layoutState[combo[1] - 1];
        const squareValue3 = layoutState[combo[2] - 1];

        if(squareValue1 != null && squareValue1 === squareValue2 && squareValue1 === squareValue3) {
            winner.classList.add(winnerClass);
            gameOverSign(squareValue1);
            return;
        }
    }

    const allOfGridFilled  = layoutState.every((square) => square != null);
    if (allOfGridFilled) {
        gameOverSign(null);
    }
}

function gameOverSign(winnerText) {
    let text = 'There has been a tie!';
    if(winnerText != null) {
        text = `The winner is ${winnerText}! Congratulations!`;
    }
    winnerContextbox.className = "visible";
    winnerAnnounce.innerText = text;

}

function newGame() {
    winner.className = "winner";
    winnerContextbox.className = "hide";
    layoutState.fill(null);
    squares.forEach((square) => (square.innerText = ""));
    turn = playerX;
    setHoverText();
}

const winnerPatterns =[
    { combo: [1, 2, 3], winnerClass: "winnerRow1" },
    { combo: [4, 5, 6], winnerClass: "winnerRow2" },
    { combo: [7, 8, 9], winnerClass: "winnerRow3" },

    { combo: [1, 4, 7], winnerClass: "winnerCol1" },
    { combo: [2, 5, 8], winnerClass: "winnerCol2" },
    { combo: [3, 6, 9], winnerClass: "winnerCol3" },

    { combo: [1, 5, 9], winnerClass: "winnerDiaright" },
    { combo: [3, 5, 7], winnerClass: "winnerDialeft" },
];