const gameContainer = document.querySelector('.game-container');
const playerPaddle = document.getElementById('player-paddle');
const computerPaddle = document.getElementById('computer-paddle');
const ball = document.querySelector('.ball');

let ballX = gameContainer.clientWidth / 2;
let ballY = gameContainer.clientHeight / 2;
let ballSpeedX = 5; // Ball's horizontal speed
let ballSpeedY = 5; // Ball's vertical speed

let playerPaddleY = gameContainer.clientHeight / 2 - 40; // Initial position of player paddle
let computerPaddleY = gameContainer.clientHeight / 2 - 40; // Initial position of computer paddle
const paddleSpeed = 15; // Paddle's movement speed

let playerScore = 0;
let computerScore = 0;
const WINNING_SCORE = 11; // Set the desired winning score

const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');

// Function to update the position of the paddles
function updatePaddles() {
  playerPaddle.style.top = playerPaddleY + 'px';
  computerPaddle.style.top = computerPaddleY + 'px';
}

// Function to update the position of the ball
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball collision with top and bottom walls
  if (ballY < 0 || ballY > gameContainer.clientHeight - 20) {
    ballSpeedY = -ballSpeedY;
  }

  // Ball collision with paddles
  if (
    (ballX < 30 && ballY > playerPaddleY && ballY < playerPaddleY + 80) ||
    (ballX > gameContainer.clientWidth - 50 && ballY > computerPaddleY && ballY < computerPaddleY + 80)
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Ball out of bounds (scoring)
  if (ballX < 0) {
    // Computer scores a point
    computerScore++;
    updateScores();
    resetBall();
  } else if (ballX > gameContainer.clientWidth) {
    // Player scores a point
    playerScore++;
    updateScores();
    resetBall();
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

// Function to control computer paddle with randomized movement
// Function to control computer paddle with randomized movement
function computerAI() {
    const middleOfPaddle = computerPaddleY + 40;
  
    // Introduce more randomness in the AI's movement
    const randomDirection = Math.random();
    if (randomDirection < 0.2 && middleOfPaddle < ballY - 10) {
      computerPaddleY += paddleSpeed;
    } else if (randomDirection < 0.4 && middleOfPaddle > ballY + 10) {
      computerPaddleY -= paddleSpeed;
    }
  }
  

// Function to update the scores
function updateScores() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = computerScore;
}

// Function to reset the ball's position
function resetBall() {
  ballX = gameContainer.clientWidth / 2;
  ballY = gameContainer.clientHeight / 2;
  ballSpeedX = 5;
  ballSpeedY = 5;
}

// Function to check for a winner and reset the game
function checkWinner() {
  if (playerScore === WINNING_SCORE) {
    alert('Player wins!');
    resetGame();
  } else if (computerScore === WINNING_SCORE) {
    alert('Computer wins!');
    resetGame();
  }
}

// Function to reset the game
function resetGame() {
  playerScore = 0;
  computerScore = 0;
  updateScores();
  resetBall();
  playerPaddleY = gameContainer.clientHeight / 2 - 40;
  computerPaddleY = gameContainer.clientHeight / 2 - 40;
}

// Event listeners to control player paddle movement
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowUp' && playerPaddleY > 0) {
    playerPaddleY -= paddleSpeed;
  }
  if (event.key === 'ArrowDown' && playerPaddleY < gameContainer.clientHeight - 80) {
    playerPaddleY += paddleSpeed;
  }
});

// Main game loop
function gameLoop() {
  updatePaddles();
  updateBall();
  computerAI();
  checkWinner();

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
