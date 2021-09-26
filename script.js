const blackPiece = document.querySelectorAll(".black-piece");

function handleClick() {
    blackPiece.AddEventListener('click', e => {
    console.log(e)
})
}

handleClick()