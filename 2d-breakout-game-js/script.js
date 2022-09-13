"use strict";

//Creating a reference to the canvas element
const canvas = document.getElementById("myCanvas");
//Variable to store 2d rendering context (the tool we can use to paint on the canvas)
const ctx = canvas.getContext("2d");

// //Draw a red square on canvas
// ctx.beginPath();
// ctx.rect(20, 40, 50, 50);
// ctx.fillStyle = "#f00";
// ctx.fill();
// ctx.closePath();

// //Draw a green circle on canvas
// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI * 2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// // ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// // ctx.stroke();
// ctx.closePath();

const COLOR = "#0095DD";

let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const ballRadius = 5;

const paddleHeight = 10;
const paddleWidth = 75;

let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];

let score = 0;

for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status === 1) {
        const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = COLOR;
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = COLOR;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = COLOR;
  ctx.fill();
  ctx.closePath();
}

function draw() {
  //Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Draw bricks
  drawBricks();

  //Draw a blue circle on canvas
  drawBall();

  //Draw the paddle
  drawPaddle();

  //Collision detection for ball on bricks
  collisionDetection();

  //Drawing score
  drawScore();

  //Moving paddle to left or right
  if (rightPressed) {
    paddleX = Math.min(paddleX + 7, canvas.width - paddleWidth);
  } else if (leftPressed) {
    paddleX = Math.max(paddleX - 7, 0);
  }
  // const test = [300, 600, 780, 150];
  // console.log(...test);
  // console.log(Math.min(...test), Math.max(...test));

  //Bouncing the ball on the walls
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dx < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    //Paddle hiting the ball
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      //Defining game over logic
      alert("GAME OVER");
      document.location.reload();
      clearInterval(interval);
    }
  }

  x += dx;
  y += dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = true;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    rightPressed = false;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score === brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATULATIONS!");
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "14px Arial";
  ctx.fillStyle = COLOR;
  ctx.fillText(`Score: ${score}`, 8, 20);
}

// setInterval(draw, 10);
const interval = setInterval(draw, 10);
