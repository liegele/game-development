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

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  //Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //Draw a blue circle on canvas
  drawBall();
  x += dx;
  y += dy;

  //Bouncing the ball on the walls
  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy > canvas.height - ballRadius || y + dx < ballRadius) {
    dy = -dy;
  }
}

setInterval(draw, 10);
