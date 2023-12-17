let playBoard = document.querySelector(".play_board");
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".high_score");
let snakeBody = [];
let intervalID;
let gameover = false;
let foodX,
  foodY,
  score = 0,
  highScore = localStorage.getItem("highScore") || 0,
  velocityX = 0,
  velocityY = 0,
  snakeX = 5,
  snakeY = 10;

highScoreElement.innerHTML = `High Score: ${highScore}`;

const changeFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

function handleGameOver() {
  // Set Score to HighScore
  clearInterval(intervalID);
  alert("GameOver");
  location.reload();
}

const initGame = () => {
  if (gameover) return handleGameOver();
  let htmlMarkup = `<div class='food' style='grid-area: ${foodY}/${foodX}'></div>`;

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([snakeX, snakeY]);
    changeFoodPosition();
    score += 1;
    highScore = score >= highScore ? score : highScore;
    localStorage.setItem("highScore", highScore);
    scoreElement.innerHTML = `Score: ${score}`;
    highScoreElement.innerHTML = `High Score: ${highScore}`;
  }

  snakeX += velocityX;
  snakeY += velocityY;

  if (snakeX <= 0 || snakeY > 30 || snakeY <= 0 || snakeX > 30) {
    gameover = true;
  }

  // Esta parte no la entiendo
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  // Esta es para setear la cabeza creo
  snakeBody[0] = [snakeX, snakeY];

  // Esta es para pintar el resto de la serpiente
  for (let i = 0; i < snakeBody.length; i++) {
    if (
      i !== 0 &&
      snakeBody[0][1] === snakeBody[i][1] &&
      snakeBody[0][0] === snakeBody[i][0]
    ) {
      gameover = true;
    }
    htmlMarkup += `<div class='body' style='grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]}'></div>`;
  }

  htmlMarkup += `<div class='head' style='grid-area: ${snakeY}/${snakeX}'></div>`;
  playBoard.innerHTML = htmlMarkup;
};

function changeDirection(e) {
  console.log(e.key);
  if (e.key == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

document.addEventListener("keydown", changeDirection);

changeFoodPosition();
intervalID = setInterval(initGame, 125);
