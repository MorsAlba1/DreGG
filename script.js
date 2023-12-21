const pongGame = document.querySelector(".pong-game");
const playerPaddle = document.getElementById("playerPaddle");
const ball = document.getElementById("ball");

let ballX = 300;
let ballY = 200;
let ballSpeedX = 5;
let ballSpeedY = 5;

// Variables para el control táctil
let touchY = 0;
let gamePaused = false;

// Configura el evento táctil
pongGame.addEventListener("touchstart", (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de desplazamiento en dispositivos táctiles
    touchY = e.touches[0].clientY;
});

pongGame.addEventListener("touchmove", (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado de desplazamiento en dispositivos táctiles
    const deltaY = e.touches[0].clientY - touchY;
    const newTop = Math.min(pongGame.clientHeight - playerPaddle.clientHeight, Math.max(0, playerPaddle.offsetTop + deltaY));
    playerPaddle.style.top = newTop + "px";
    touchY = e.touches[0].clientY;
});

function update() {
    if (!gamePaused) {
        ballX += ballSpeedX;
        ballY += ballSpeedY;

        // Colisiones con las paredes superiores e inferiores
        if (ballY < 0 || ballY > pongGame.clientHeight - ball.clientHeight) {
            ballSpeedY = -ballSpeedY;
        }

        // Colisión con la paleta del jugador
        if (
            ballX < playerPaddle.clientWidth &&
            ballY > playerPaddle.offsetTop &&
            ballY < playerPaddle.offsetTop + playerPaddle.clientHeight
        ) {
            ballSpeedX = -ballSpeedX;
        }

        // Verificar si la pelota sale de la pantalla
        if (ballX < 0) {
            alert("¡Has perdido!");
            resetGame();
        } else if (ballX > pongGame.clientWidth - ball.clientWidth) {
            ballSpeedX = -ballSpeedX;
        }

        ball.style.left = ballX + "px";
        ball.style.top = ballY + "px";

        requestAnimationFrame(update);
    }
}

function resetGame() {
    ballX = pongGame.clientWidth / 2 - ball.clientWidth / 2;
    ballY = pongGame.clientHeight / 2 - ball.clientHeight / 2;
    ballSpeedX = -ballSpeedX;
    playerPaddle.style.top = (pongGame.clientHeight / 2 - playerPaddle.clientHeight / 2) + "px";
}

resetGame();
update();

// JavaScript para los botones
const pauseButton = document.getElementById("pauseButton");
const resetButton = document.getElementById("resetButton");
const exitButton = document.getElementById("exitButton");

pauseButton.addEventListener("click", () => {
    if (gamePaused) {
        // Reanudar el juego
        gamePaused = false;
        requestAnimationFrame(update);
        pauseButton.innerText = "Pausa";
    } else {
        // Pausar el juego
        gamePaused = true;
        pauseButton.innerText = "Continuar";
    }
});

resetButton.addEventListener("click", () => {
    resetGame();
});

exitButton.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres salir del juego?")) {
        // Redirige a una página de inicio o realiza alguna acción de salida aquí.
        alert("Juego cerrado.");
    }
});