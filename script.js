//document.getElementById("welcome").style.display = 'none'

let button = document.getElementById('start-button');
let welcomeMessage = document.getElementById('welcome-background');

function startButton() {
    welcomeMessage.style.display = 'none'
}

button.addEventListener('click', startButton)