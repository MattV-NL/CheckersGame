// Set up game board

const gameboard = [
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

// Reference Elements in the DOM

const cells = document.querySelectorAll("td");
const whiteTurnText = document.querySelectorAll("white-turn-text");
const blackTurnText = document.querySelectorAll("black-turn-text");
let whitePieces = document.querySelectorAll("white-pieces");
let blackPieces = document.querySelectorAll("black-pieces");

// Set up whose turn it will be and player scores to eventually end the game

let turn = true;
let whiteScore = 12;
let blackScore = 12;
let playerPieces;

//Set up object properties for selectedPiece

let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninethSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinethSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSPace: false
}

//remove the onclick property of the cells after a players turn

function removeCellOnClick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

// Reset the selected piece properties

function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninethSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinethSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSPace = false;
}

// Get the available jump spaces if possible
function getAvailableJumpSpaces() {
    if (turn) {
        if (gameboard[selectedPiece.indexOfBoardPiece + 14] === null &&
            cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("light-space") !== true &&
            gameboard[selectedPiece.indexOfBoardPiece + 7] >= 12) {
                selectedPiece.fourteenthSpace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece + 18] === null &&
            cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("light-space") !== true &&
            gameboard[selectedPiece.indexOfBoardPiece + 9] >= 12) {
                selectedPiece.eighteenthSpace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece - 18] === null &&
            cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("light-space") !== true &&
            gameboard[selectedPiece.indexOfBoardPiece - 9] >= 12) {
                    selectedPiece.minusEighteenthSPace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece - 14] === null &&
            cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("light-space") !== true &&
            gameboard[selectedPiece.indexOfBoardPiece - 7] >= 12) {
                    selectedPiece.minusFourteenthSpace = true;
            }
    } else {
        if (gameboard[selectedPiece.indexOfBoardPiece + 14] === null &&
            cells[selectedPiece.indexOfBoardPiece + 14].classList.contains("light-space") !== true &&
            gameboard[selectedPiece.indexOfBoardPiece + 7] < 12 && gameboard[selectedPiece.indexOfBoardPiece + 7] !== null) {
                selectedPiece.fourteenthSpace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece + 18] === null &&
            cells[selectedPiece.indexOfBoardPiece + 18].classList.contains("light-space") !== true &&
            gameboard[selectedPiece.indexOfBoardPiece + 9] < 12 && gameboard[selectedPiece.indexOfBoardPiece + 9] !== null) {
                selectedPiece.eighteenthSpace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece - 18] === null &&
                cells[selectedPiece.indexOfBoardPiece - 18].classList.contains("light-space") !== true &&
                gameboard[selectedPiece.indexOfBoardPiece - 9] < 12 && gameboard[selectedPiece.indexOfBoardPiece - 9] !== null) {
                    selectedPiece.minusEighteenthSPace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece - 14] === null &&
                cells[selectedPiece.indexOfBoardPiece - 14].classList.contains("light-space") !== true &&
                gameboard[selectedPiece.indexOfBoardPiece - 7] < 12 && gameboard[selectedPiece.indexOfBoardPiece - 7] !== null) {
                    selectedPiece.minusFourteenthSpace = true;
            }
    }
}

// Get the available spaces that the piece is able to move to

function getAvailableSpaces() {
    if (gameboard[selectedPiece.indexOfBoardPiece + 7] === null &&
        spaces[selectedPiece.indexOfBoardPiece + 7].classList.contains("light-space") !== true) {
            selectedPiece.seventhSpace = true;
        }
    if (gameboard[selectedPiece.indexOfBoardPiece + 9] === null &&
        spaces[selectedPiece.indexOfBoardPiece + 9].classList.contains("light-space") !== true) {
            selectedPiece.ninethSpace = true;
        }
    if (gameboard[selectedPiece.indexOfBoardPiece - 7] === null &&
        spaces[selectedPiece.indexOfBoardPiece - 7].classList.contains("light-space") !== true) {
            selectedPiece.minusSeventhSpace = true;
        }
    if (gameboard[selectedPiece.indexOfBoardPiece - 9] === null &&
        spaces[selectedPiece.indexOfBoardPiece - 9].classList.contains("light-space") !== true) {
            selectedPiece.minusNinethSpace = true;
        }
    getAvailableJumpSpaces();
}

// Check if the piece is kinged

function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}

// Get the selected piece from the click event

function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

// Reset the boarder style for the pieces after a player makes their move

function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "2px solid green";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

//Get Player Pieces

function getPlayerPieces() {
    if (turn) {
        playerPieces = whitePieces;
    } else {
        playerPieces = blackPieces;
    }
    removeCellOnClick();
    resetBorders();
}

//Set up event listeners

function handleEventListners() {
    if (turn) {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}

// Swap turns after a player moves

function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < whiteTurnText.length; i++) {
            whiteTurnText[i].style.color = "gray";
            blackTurnText[i].style.color = "black";
        }
    } else {
        turn = true;
        for (let i = 0; i < blackTurnText.length; i++) {
            blackTurnText[i].style.color = "gray";
            whiteTurnText[i].style.color = "black";
        }
    }
    handleEventListners();
}

// Check for a win

function checkForWin() {
    if (blackScore === 0) {
        for (let i = 0; i < whiteTurnText.length; i++) {
            whiteTurnText[i].style.color = "black";
            blackTurnText[i].style.display = "none";
            whiteTurnText[i].textContent = "White Wins!";
        }
    } else if (whiteScore === 0) {
        for (let i = 0; i <blackTurnText.length; i++) {
            blackTurnText[i].style.color = "black";
            whiteTurnText[i].style.display = "none";
            blackTurnText[i].textContent = "Black Wins!";
        }
    }
    changePlayer();
}

// Remove the event listeners on pieces

function removeEventListener() {
    if (turn) {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].removeEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i ++) {
        blackPieces[i].removeEventListener("click", getPlayerPieces);
        }
    }
    checkForWin();
}

// Change the data of the selected piece

function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    gameboard[indexOfBoardPiece] = null;
    gameboard[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add("king")
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <=7) {
        document.getElementById(selectedPiece.pieceId).classList.add("king");
    }
    if (removePiece) {
        gameboard[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            spaces[removePiece].innerHTML = "";
            blackScore--
        }
        if (turn === false && selectedPiece.pieceId >= 12 ) {
            spaces[removePiece].innerHTML = "";
            whiteScore--
        }
    }
    resetSelectedPieceProperties();
    removeCellOnClick();
    removeEventListener();
}

// Move the pice to the new location

function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    spaces[selectedPiece.indexOfBoardPiece].innerHTML = "";
    if (turn) {
        if (selectedPiece.isKing) {
            spaces[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece king" id="${selectedPiece.pieceId}"></p>`;
            whitePieces = document.querySelectorAll("p");
        } else {
            spaces[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece" id="${selectedPiece.pieceId}"></p>`;
            whitePieces = document.querySelectorAll("p");
        }
    } else {
        if (selectedPiece.isKing) {
            spaces[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`;
            blackPieces = document.querySelectorAll("span");
        } else {
            spaces[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
            blackPieces = document.querySelectorAll("span");
        }
    }
    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

// Give the cells clicks

function giveSpacesClick() {
    if (selectedPiece.seventhSpace) {
        cells[selectedPiece.indexOfBoardPiece + 7].setAttribute("onclick", "makeMove(7)");
    }
    if (selectedPiece.ninethSpace) {
        cells[selectedPiece.indexOfBoardPiece + 9].setAttribute("onclick", "makeMove(9)");
    }
    if (selectedPiece.fourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 14].setAttribute("onclick", "makeMove(14)");
    }
    if (selectedPiece.eighteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece + 18].setAttribute("onclick", "makeMove(18)");
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[selectedPiece.indexOfBoardPiece - 7].setAttribute("onclick", "makeMove(-7)");
    }
    if (selectedPiece.minusNinethSpace) {
        cells[selectedPiece.indexOfBoardPiece - 9].setAttribute("onclick", "makeMove(-9)");
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[selectedPiece.indexOfBoardPiece - 14].setAttribute("onclick", "makeMove(-14)");
    }
    if (selectedPiece.minusEighteenthSPace) {
        cells[selectedPiece.indexOfBoardPiece - 18].setAttribute("onclick", "makeMove(-18");
    }
}

// Give the selected piece a border to know which piece is going to move

function changePieceStyle() {
    if (selectedPiece.seventhSpace || selectedPiece.ninethSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace || selectedPiece.minusSeventhSpace || selectedPiece.minusNinethSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSPace) {
        document.getElementById(selectedPiece.placeId).style.border = "3px solid red";
        giveSpacesClick();
    } else {
        return;
    }
}

// Not sure

function checkPieceCondition() {
    if (selectedPiece.isKing) {
        changePieceStyle();
    } else {
        if (turn) {
            selectedPiece.minusSeventhSpace = false;
            selectedPiece.minusNinethSpace = false;
            selectedPiece.minusFourteenthSpace = false;
            selectedPiece.minusEighteenthSPace = false;
        } else {
            selectedPiece.seventhSpace = false;
            selectedPiece.ninethSpace = false;
            selectedPiece.fourteenthSpace = false;
            selectedPiece.eighteenthSpace = false;
        }
        changePieceStyle();
    }
}

handleEventListners();