'use strict';

window.addEventListener('load', () => {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  const playerSpeed = 5;

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
      ctx.save();
      // ctx.translate(player.position.x, player.position.y);
      // ctx.translate(
      //   player.position.x + player.width / 2,
      //   player.position.y + player.height / 2
      // );

      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
      ctx.rotate(this.rotation);
      ctx.restore();
    }

    update() {
      this.position.x += this.velocity.x;
      this.draw();
    }
  }

  class Projectile {
    constructor({ position, velocity }) {
      this.position = position;
      this.velocity = velocity;
      this.radius = 3;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'red';
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
    }
  }

  class Invader {
    constructor({ position }) {
      const image = new Image();
      image.src = './images/invader.png';
      const scale = 1;
      this.image = image;
      this.width = image.width * scale;
      this.height = image.height * scale;

      this.position = {
        x: position.x,
        y: position.y,
      };

      this.velocity = {
        x: 0,
        y: 0,
      };
    }

    draw() {
      ctx.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }

    update({ velocity }) {
      this.position.x += velocity.x;
      this.position.y += velocity.y;
      this.draw();
    }
  }

  class Grid {
    constructor() {
      this.position = {
        x: 0,
        y: 0,
      };

      this.velocity = {
        x: 3,
        y: 0,
      };

      this.invaders = [];

      const columns = Math.floor(Math.random() * 10 + 5);
      const rows = Math.floor(Math.random() * 5 + 2);
      // const rows = Math.floor(Math.random() * 5);

      this.width = columns * 30;

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          this.invaders.push(
            new Invader({ position: { x: i * 30, y: j * 30 } })
          );
        }
      }
      console.log(this.invaders);
    }

    update() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;

      this.velocity.y = 0;

      if (
        this.position.x + this.width >= canvas.width ||
        this.position.x <= 0
      ) {
        this.velocity.x = -this.velocity.x;
        this.velocity.y = 30;
      }
    }
  }

  const player = new Player();
  const projectiles = [];
  const grids = [new Grid()];

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
      player.velocity.x = -playerSpeed;
    } else if (
      keys.d.pressed &&
      player.position.x <= canvas.width - player.width
    ) {
      player.velocity.x = playerSpeed;
    } else {
      player.velocity.x = 0;
    }

    player.update();
    projectiles.forEach((projectile, index) => {
      if (projectile.position.y + projectile.radius <= 0) {
        projectiles.splice(index, 1);
      } else {
        projectile.update();
      }
    });

    grids.forEach((grid) => {
      grid.update();
      grid.invaders.forEach((invader) => {
        invader.update({ velocity: grid.velocity });
      });
    });

    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('keydown', ({ key }) => {
    // console.log(key);
    switch (key) {
      case 'a':
        // console.log('left');
        keys.a.pressed = true;
        player.rotation = -0.15;
        break;
      case 'd':
        // console.log('right');
        keys.d.pressed = true;
        player.rotation = 0.15;
        break;
      case ' ':
        // console.log('space');
        // keys.space.pressed = true;
        projectiles.push(
          new Projectile({
            position: {
              x: player.position.x + player.width / 2,
              y: player.position.y,
            },
            velocity: { x: 0, y: -10 },
          })
        );
        // console.log(projectiles);

        break;
    }
  });
  window.addEventListener('keyup', ({ key }) => {
    // console.log(key);
    switch (key) {
      case 'a':
        // console.log('left');
        keys.a.pressed = false;

        break;
      case 'd':
        // console.log('right');
        keys.d.pressed = false;
        break;
      case ' ':
        // console.log('space');
        keys.space.pressed = false;
        break;
    }
  });
});
