const playerOneButton = document.querySelector('button');
const playerTwoButton = document.querySelector('.playerTwoButton');
const h3 = document.querySelector('h3');
const endScoreButton = document.querySelector('.endScoreButton');
const restartButton = document.querySelector('.restart');

const playerOneDisplay = document.querySelector('.playerOneDisplay');
const playerTwoDisplay = document.querySelector('.playerTwoDisplay');

let playerOneScore = 0;
let playerTwoScore = 0;

playerOneDisplay.innerText = playerOneScore;
playerTwoDisplay.innerText = playerTwoScore;

let gameEndScore = document.querySelector('#endScore').value;
let gameEnd = false;

const checkGameOver = function () {
    if (playerOneScore >= gameEndScore) {
        h3.innerText = "GAME OVER Player One Wins!"
        h3.style.color = "red";
        gameEnd = true;
    }
    if (playerTwoScore >= gameEndScore) {
        h3.innerText = "GAME OVER Player Two Wins!"
        h3.style.color = "red";
        gameEnd = true;
    }
}

const scoreColorUpdate = function () {
    if (playerOneScore > playerTwoScore) {
        playerOneDisplay.style.color = "green";
        playerTwoDisplay.style.color = "red";
    } else if (playerOneScore < playerTwoScore) {
        playerOneDisplay.style.color = "red";
        playerTwoDisplay.style.color = "green"
    } else {
        playerOneDisplay.style.color = "black";
        playerTwoDisplay.style.color = "black";
    }
    checkGameOver();
}

playerOneButton.addEventListener("click", function () {
    if (gameEnd === false) {
        playerOneScore++;
        playerOneDisplay.innerText = playerOneScore;
        scoreColorUpdate();
    }
});

playerTwoButton.addEventListener("click", function () {
    if (gameEnd === false) {
        playerTwoScore++;
        playerTwoDisplay.innerText = playerTwoScore;
        scoreColorUpdate();
    }
});

endScoreButton.addEventListener("click", function () {
    gameEndScore = Number(document.querySelector('#endScore').value);
})

restartButton.addEventListener("click", () => window.location.reload());

