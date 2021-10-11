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

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return gameboard.indexOf(parsed);
}

const spaces = document.querySelectorAll('td');
let whitePieces = document.querySelectorAll('.white-piece');
let blackPieces = document.querySelectorAll('.black-piece');
const whiteTurnText = document.querySelectorAll('.white-turn-text');
const blackTurnText = document.querySelectorAll('.black-turn-text');


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
            whitePieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
    targetPieces();
}

// Getting the target's ID and assigning it to selectedPiece.pieceId
function targetPieces() {
    if (turn) {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].addEventListener('click', getTargetId);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener('click', getTargetId);
        }
    }
}

function getTargetId(event) {
    console.log(parseInt(event.target.id));
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}
// End of new code

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
        playerPieces[i].style.border = '2px solid green';
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

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

/*--------------- issue with event being deprecated ----------------------- */
 
function getSelectedPiece() {
    //selectedPiece.pieceId = parseInt(event.target.id);
    //selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    //isPieceKing();
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
        if (gameboard[selectedPiece.indexOfBoardPiece - 18] === null &&
            spaces[selectedPiece.indexOfBoardPiece - 18].classList.contains('light-space') !== true &&
            gameboard[selectedPiece.indexOfBoardPiece - 9] >= 12) {
                    selectedPiece.minusEighteenthSPace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece - 14] === null &&
            spaces[selectedPiece.indexOfBoardPiece - 14].classList.contains('light-space') !== true &&
            gameboard[selectedPiece.indexOfBoardPiece - 7] >= 12) {
                    selectedPiece.minusFourteenthSpace = true;
            }
    } else {
        if (gameboard[selectedPiece.indexOfBoardPiece + 14] === null &&
            spaces[selectedPiece.indexOfBoardPiece + 14].classList.contains('light-space') !== true &&
            gameboard[selectedPiece.indexOfBoardPiece + 7] < 12 && gameboard[selectedPiece.indexOfBoardPiece + 7] !== null) {
                selectedPiece.fourteenthSpace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece + 18] === null &&
            spaces[selectedPiece.indexOfBoardPiece + 18].classList.contains('light-space') !== true &&
            gameboard[selectedPiece.indexOfBoardPiece + 9] < 12 && gameboard[selectedPiece.indexOfBoardPiece + 9] !== null) {
                selectedPiece.eighteenthSpace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece - 18] === null &&
                spaces[selectedPiece.indexOfBoardPiece - 18].classList.contains('light-space') !== true &&
                gameboard[selectedPiece.indexOfBoardPiece - 9] < 12 && gameboard[selectedPiece.indexOfBoardPiece - 9] !== null) {
                    selectedPiece.minusEighteenthSPace = true;
            }
        if (gameboard[selectedPiece.indexOfBoardPiece - 14] === null &&
                spaces[selectedPiece.indexOfBoardPiece - 14].classList.contains('light-space') !== true &&
                gameboard[selectedPiece.indexOfBoardPiece - 7] < 12 && gameboard[selectedPiece.indexOfBoardPiece - 7] !== null) {
                    selectedPiece.minusFourteenthSpace = true;
            }
    }
}

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

function changePieceStyle() {
    if (selectedPiece.seventhSpace || selectedPiece.ninethSpace || selectedPiece.fourteenthSpace || selectedPiece.eighteenthSpace || selectedPiece.minusSeventhSpace || selectedPiece.minusNinethSpace || selectedPiece.minusFourteenthSpace || selectedPiece.minusEighteenthSPace) {
        document.getElementById(selectedPiece.placeId).style.border = "3px solid green";
        giveSpacesClick();
    } else {
        return;
    }
}

function giveSpacesClick() {
    if (selectedPiece.seventhSpace) {
        spaces[selectedPiece.indexOfBoardPiece + 7].setAttribute('onclick', 'makeMove(7)');
    }
    if (selectedPiece.ninethSpace) {
        spaces[selectedPiece.indexOfBoardPiece + 9].setAttribute('onclick', 'makeMove(9)');
    }
    if (selectedPiece.fourteenthSpace) {
        spaces[selectedPiece.indexOfBoardPiece + 14].setAttribute('onclick', 'makeMove(14)');
    }
    if (selectedPiece.eighteenthSpace) {
        spaces[selectedPiece.indexOfBoardPiece + 18].setAttribute('onclick', 'makeMove(18)');
    }
    if (selectedPiece.minusSeventhSpace) {
        spaces[selectedPiece.indexOfBoardPiece - 7].setAttribute('onclick', 'makeMove(-7)');
    }
    if (selectedPiece.minusNinethSpace) {
        spaces[selectedPiece.indexOfBoardPiece - 9].setAttribute('onclick', 'makeMove(-9)');
    }
    if (selectedPiece.minusFourteenthSpace) {
        spaces[selectedPiece.indexOfBoardPiece - 14].setAttribute('onclick', 'makeMove(-14)');
    }
    if (selectedPiece.minusEighteenthSPace) {
        spaces[selectedPiece.indexOfBoardPiece - 18].setAttribute('onclick', 'makeMove(-18');
    }
}

function makeMove(number) {
    document.getElementById(selectedPiece.pieceId).remove();
    spaces[selectedPiece.indexOfBoardPiece].innerHTML = '';
    if (turn) {
        if (selectedPiece.isKing) {
            spaces[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece king" id="${selectedPiece.pieceId}"></p>`;
            whitePieces = document.querySelectorAll('p');
        } else {
            spaces[selectedPiece.indexOfBoardPiece + number].innerHTML = `<p class="white-piece" id="${selectedPiece.pieceId}"></p>`;
            whitePieces = document.querySelectorAll('p');
        }
    } else {
        if (selectedPiece.isKing) {
            spaces[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece king" id="${selectedPiece.pieceId}"></span>`;
            blackPieces = document.querySelectorAll('span');
        } else {
            spaces[selectedPiece.indexOfBoardPiece + number].innerHTML = `<span class="black-piece" id="${selectedPiece.pieceId}"></span>`;
            blackPieces = document.querySelectorAll('span');
        }
    }
    let indexOfPiece = selectedPiece.indexOfBoardPiece
    if (number === 14 || number === -14 || number === 18 || number === -18) {
        changeData(indexOfPiece, indexOfPiece + number, indexOfPiece + number / 2);
    } else {
        changeData(indexOfPiece, indexOfPiece + number);
    }
}

function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    gameboard[indexOfBoardPiece] = null;
    gameboard[modifiedIndex] = parseInt(selectedPiece.pieceId);
    if (turn && selectedPiece.pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(selectedPiece.pieceId).classList.add('king')
    }
    if (turn === false && selectedPiece.pieceId >= 12 && modifiedIndex <=7) {
        document.getElementById(selectedPiece.pieceId).classList.add('king');
    }
    if (removePiece) {
        gameboard[removePiece] = null;
        if (turn && selectedPiece.pieceId < 12) {
            spaces[removePiece].innerHTML = '';
            blackScore--
        }
        if (turn === false && selectedPiece.pieceId >= 12 ) {
            spaces[removePiece].innerHTML = '';
            whiteScore--
        }
    }
    resetSelectedPieceProperties();
    removeCellOnClick();
    removeEventListener();
}

function removeEventListener() {
    if (turn) {
        for (let i = 0; i < whitePieces.length; i++) {
            whitePieces[i].removeEventListener('click', getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i ++) {
        blackPieces[i].removeEventListener('click', getPlayerPieces);
        }
    }
    checkForWin();
}

function checkForWin() {
    if (blackScore === 0) {
        for (let i = 0; i < whiteTurnText.length; i++) {
            whiteTurnText[i].style.color = 'black';
            blackTurnText[i].style.display = 'none';
            whiteTurnText[i].textContent = 'White Wins!';
        }
    } else if (whiteScore === 0) {
        for (let i = 0; i <blackTurnText.length; i++) {
            blackTurnText[i].style.color = 'black';
            whiteTurnText[i].style.display = 'none';
            blackTurnText[i].textContent = 'Black Wins!';
        }
    }
    changePlayer();
}

function changePlayer() {
    if (turn) {
        turn = false;
        for (let i = 0; i < whiteTurnText.length; i++) {
            whiteTurnText[i].style.color = 'gray';
            blackTurnText[i].style.color = 'black';
        }
    } else {
        turn = true;
        for (let i = 0; i < blackTurnText.length; i++) {
            blackTurnText[i].style.color = 'gray';
            whiteTurnText[i].style.color = 'black';
        }
    }
    handleClickOfPieces();
}

handleClickOfPieces();