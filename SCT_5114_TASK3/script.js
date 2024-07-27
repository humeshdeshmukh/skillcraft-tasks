let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function makeMove(index) {
    if (board[index] !== "" || !gameActive) {
        return;
    }
    board[index] = currentPlayer;
    document.getElementById(`cell-${index}`).innerText = currentPlayer;
    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === board[b] && board[a] === board[c] && board[a] !== "") {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        alert(`${currentPlayer} has won!`);
        return;
    }

    if (!board.includes("")) {
        gameActive = false;
        alert("It's a draw!");
    }
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll('.cell').forEach(cell => cell.innerText = "");
}
