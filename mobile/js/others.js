class Box {
  constructor(game, pos) {
    this.pos = pos;
    this.game = game;
    this.frameX = 0;
    this.frameY = 0;
    this.MaxFrame = 3;
    this.nextFrame = 500;
    this.size = 15;
    this.speed = 5;
    this.coin = Math.floor(Math.random() * 25 + 25);
    this.image = document.getElementById("box");
    this.markForDeletion = false;
    this.openSound = new Audio();
    this.openSound.src = "../sounds/boxOpen.wav";
    this.openSound.volume = 0.05;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frameX * this.size,
      this.frameY * this.size,
      this.size,
      this.size,
      this.pos.x,
      this.pos.y,
      this.size,
      this.size
    );
  }

  update(dt) {
    if (this.nextFrame > 500) {
      if (this.frameX < this.MaxFrame) {
        this.frameX++;
      } else {
        this.frameX = 0;
      }
      this.nextFrame = 0;
    } else {
      this.nextFrame += dt;
    }

    if (this.pos.x < this.game.island.pos.x - 50) {
      this.pos.x += this.speed / dt;
    } else if (this.pos.x > this.game.island.pos.x + this.game.island.w + 50) {
      this.pos.x -= this.speed / dt;
    } else if (this.pos.y < this.game.island.pos.y - 50) {
      this.pos.y += this.speed / dt;
    } else if (this.pos.y > this.game.island.pos.y + this.game.island.h + 50) {
      this.pos.y -= this.speed / dt;
    }
  }

  open() {
    this.openSound.play();
    this.game.ui.coinAmount += this.coin;
    this.markForDeletion = true;
  }
}
