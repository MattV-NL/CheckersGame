/* create gameboard using the ID's from the HTML so that the javaescript knows how to address the pieces and move them aruond the screen*/

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

/* reference elements in the DOM*/

const spaces = document.querySelectorAll('td');
let whitePieces = document.querySelectorAll('.white-piece');
let blackPieces = document.querySelectorAll('.black-piece');
const whiteTurnText = document.querySelectorAll('.white-turn-text');
const blackTurnText = document.querySelectorAll('.black-turn-text');
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
}

/* let us determine  whose turn it is and eventually determine a winner with 'score' */

let turn = true;
let whiteScore = 12;
let blackScore = 12;
let playerPieces;

let selectedPiece = {
//get the specific piece id
    pieceId: -1,
//get location on the board we created
    indexOfBoardPiece: -1,
//determine if it is a king
    isKing: false,
//all the possible moves that are available
    seventhSpace: false,
    ninethSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinethSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSPace: false     
}

// Add event listeners

function handleClickOfPieces() {
    if (turn) {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].addEventListener('click', getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener('click', getPlayerPieces);
        }
    }
}

function getPlayerPieces() {
    if (turn) {
        playerPieces = whitePieces; 
    } else {
        playerPieces = blackPieces;
    }
    removeCellOnClick();
    resetBorders();
}

function removeCellOnClick() {
    for (let i = 0; i < spaces.length; i++) {
        spaces[i].removeAttribute('onclick');
    }
}

function resetBorders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = '1px solid white';
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    //selectedPiece.pieceId = -1;
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

function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains('king')) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}

function getAvailableSpaces() {
    if (gameboard[selectedPiece.indexOfBoardPiece + 7] === null &&
        spaces[selectedPiece.indexOfBoardPiece + 7].classList.contains('light-space') !== true) {
            selectedPiece.seventhSpace = true;
        }
    if (gameboard[selectedPiece.indexOfBoardPiece + 9] === null &&
        spaces[selectedPiece.indexOfBoardPiece + 9].classList.contains('light-space') !== true) {
            selectedPiece.ninethSpace = true;
        }
    if (gameboard[selectedPiece.indexOfBoardPiece - 7] === null &&
        spaces[selectedPiece.indexOfBoardPiece - 7].classList.contains('light-space') !== true) {
            selectedPiece.minusSeventhSpace = true;
        }
    if (gameboard[selectedPiece.indexOfBoardPiece - 9] === null &&
        spaces[selectedPiece.indexOfBoardPiece - 9].classList.contains('light-space') !== true) {
            selectedPiece.minusNinethSpace = true;
        }
    getAvailableJumpSpaces();   
}

function getAvailableJumpSpaces() {
    if (turn) {
        if (gameboard[selectedPiece.indexOfBoardPiece + 14] === null &&
            spaces[selectedPiece.indexOfBoardPiece + 14].classList.contains('light-space') !== true &&
            gameboard[selectedPiece.indexOfBoardPiece + 7] >= 12) {
                selectedPiece.fourteenthSpace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece + 18] === null &&
            spaces[selectedPiece.indexOfBoardPiece + 18].classList.contains('light-space') !== true &&
            gameboard[selectedPiece.indexOfBoardPiece + 9] >= 12) {
                selectedPiece.eighteenthSpace = true;
            }
    }
}