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
console.log(paddleX);

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  //Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Draw a blue circle on canvas
  drawBall();

  //Draw the paddle
  drawPaddle();

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

  console.log(paddleX, paddleX + paddleWidth);
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

// setInterval(draw, 10);
const interval = setInterval(draw, 10);
