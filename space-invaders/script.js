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

      this.rotation = 0;
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

    update() {
      this.position.x += this.velocity.x;
      this.draw();
    }
  }

  const player = new Player();

  const keys = {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    space: {
      pressed: false,
    },
  };

  function animate() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (keys.a.pressed && player.position.x >= 0) {
      player.velocity.x = -5;
    } else if (
      keys.d.pressed &&
      player.position.x <= canvas.width - player.width
    ) {
      player.velocity.x = 5;
    } else {
      player.velocity.x = 0;
    }

    player.update();
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('keydown', ({ key }) => {
    console.log(key);
    switch (key) {
      case 'a':
        console.log('left');
        keys.a.pressed = true;
        break;
      case 'd':
        console.log('right');
        keys.d.pressed = true;
        break;
      case ' ':
        console.log('space');
        keys.space.pressed = true;
        break;
    }
  });
  window.addEventListener('keyup', ({ key }) => {
    console.log(key);
    switch (key) {
      case 'a':
        console.log('left');
        keys.a.pressed = false;
        break;
      case 'd':
        console.log('right');
        keys.d.pressed = false;
        break;
      case ' ':
        console.log('space');
        keys.space.pressed = false;
        break;
    }
  });
});
