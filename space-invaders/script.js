'use strict';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  // console.log(canvas, ctx);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Player {
    constructor() {
      const image = new Image();
      image.src = './images/spaceship.png';
      const scale = 0.15;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;

      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20,
      };

      this.velocity = {
        x: 0,
        y: 0,
      };
    }

    draw() {
      // ctx.fillStyle = 'red';
      // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  }

  const player = new Player();

  function animate() {
    requestAnimationFrame(animate);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player.draw();
  }
  animate();
});
