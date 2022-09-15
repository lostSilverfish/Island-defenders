// Main Building class
class Building {
  constructor(game, pos) {
    this.game = game;
    this.pos = pos;
    this.frameX = 0;
    this.frameY = 0;
    this.nextFrame = 0;
    this.MaxFrame = 3;
    this.markForDeletion = false;
  }

  update(dt) {
    if (this.type !== "Boduge") {
      if (this.health < 0) {
        this.markForDeletion = true;
      } else if (this.health < 20) {
        this.frameY = 1;
      }
    } else {
      if (this.health < 0) {
        this.markForDeletion = true;
        this.game.gameState = "gameOver";
      } else if (this.health <= 250) {
        this.frameY = 1;
      } else if (this.health > 250) {
        this.frameY = 0;
      }
    }

    if (this.projectiles) {
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markForDeletion
      );

      this.projectiles.forEach((projectile) => {
        projectile.checkCollision();
        projectile.update(dt);
      });
    }

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

    if (this.type === "Boduge") {
      if (this.coinDisplayTimer > 5000) {
        this.coinDisplayTimer = 0;
        this.displayCoin = true;
      } else if (this.coinDisplayTimer > 2500) {
        this.displayCoin = false;
        this.coinDisplayTimer += dt;
      } else {
        this.coinDisplayTimer += dt;
      }

      if (this.healthTimer > 1000) {
        if (this.health < 500) {
          this.health += 2;
        }
        this.healthTimer = 0;
      } else {
        this.healthTimer += dt;
      }
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.img,
      this.frameX * this.w,
      this.frameY * this.h,
      this.w,
      this.h,
      this.pos.x,
      this.pos.y,
      this.w,
      this.h
    );
    if (this.projectiles) {
      this.projectiles.forEach((projectile) => {
        projectile.draw(ctx);
      });
    }

    if (this.type == "Boduge") {
      if (this.coinDisplayTimer > 5000) {
        this.game.ui.coinAmount += 5;
      }
    }

    if (this.displayCoin) {
      ctx.drawImage(
        this.coinImg,
        this.pos.x,
        this.pos.y,
        this.coinSize,
        this.coinSize
      );
    }
  }

  attack(dt, enemy) {
    if (this.attackTimer > this.attackTime) {
      if (enemy.pos.side === "right") {
        this.projectiles.push(
          new BuldingProjectile(
            this.game,
            this,
            {
              x: this.pos.x + this.w / 2,
              y: this.pos.y + this.h / 2,
            },
            "bulding",
            enemy,
            {
              x: enemy.pos.x + enemy.w / 2,
              y: enemy.pos.y + enemy.h / 2,
            }
          )
        );
      } else if (enemy.pos.side === "up") {
        this.projectiles.push(
          new BuldingProjectile(
            this.game,
            this,
            {
              x: this.pos.x + this.w / 2,
              y: this.pos.y + this.h / 2,
            },
            "bulding",
            enemy,
            {
              x: enemy.pos.x + enemy.h / 2,
              y: enemy.pos.y - enemy.w / 2,
            }
          )
        );
      } else if (enemy.pos.side === "left") {
        this.projectiles.push(
          new BuldingProjectile(
            this.game,
            this,
            {
              x: this.pos.x + this.w / 2,
              y: this.pos.y + this.h / 2,
            },
            "bulding",
            enemy,
            {
              x: enemy.pos.x - enemy.w / 2,
              y: enemy.pos.y - enemy.h / 2,
            }
          )
        );
      } else if (enemy.pos.side === "down") {
        this.projectiles.push(
          new BuldingProjectile(
            this.game,
            this,
            {
              x: this.pos.x + this.w / 2,
              y: this.pos.y + this.h / 2,
            },
            "bulding",
            enemy,
            {
              x: enemy.pos.x - enemy.h / 2,
              y: enemy.pos.y + enemy.w / 2,
            }
          )
        );
      }
      this.attackTimer = 0;
    } else {
      this.attackTimer += dt;
    }
  }
}

class Kudage extends Building {
  constructor(game, pos) {
    super(game, pos);
    this.w = 64;
    this.h = 64;
    this.type = "Kudage";
    this.health = 100;
    this.img = document.getElementById("kudage");
    this.projectiles = [];
    this.attackTimer = 1000;
    this.attackTime = 1000;
    this.range = 200;
    this.projectilePower = 5;
  }
}

class Medhuge extends Building {
  constructor(game, pos) {
    super(game, pos);
    this.w = 64;
    this.h = 64;
    this.type = "Medhuge";
    this.health = 200;
    this.img = document.getElementById("medhuge");
    this.projectiles = [];
    this.attackTimer = 500;
    this.attackTime = 500;
    this.range = 400;
    this.projectilePower = 10;
  }
}

class Vahge extends Building {
  constructor(game, pos) {
    super(game, pos);
    this.w = 64;
    this.h = 64;
    this.type = "Vahge";
    this.health = 50;
    this.img = document.getElementById("vahge");
    this.projectiles = [];
    this.attackTimer = 2000;
    this.attackTime = 2000;
    this.range = 150;
    this.projectilePower = 5;
  }
}

class Boduge extends Building {
  constructor(game, pos) {
    super(game, pos);
    this.w = 128;
    this.h = 128;
    this.health = 500;
    this.coinSize = 28;
    this.type = "Boduge";
    this.img = document.getElementById("boduge");
    this.coinImg = document.getElementById("smallCoin");
    this.coinDisplayTimer = 0;
    this.displayCoin = false;
    this.healthTimer = 0;
    this.projectilePower = 15;
  }
}

class BulidingPreview {
  constructor(pos) {
    this.pos = pos;
    this.w = 64;
    this.h = 64;
  }
  update(mousePos) {
    this.pos.x = mousePos.x - this.w / 2;
    this.pos.y = mousePos.y - this.h / 2;
  }
  draw(ctx) {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.w, this.h);
  }
}

class KudagePreview extends BulidingPreview {
  constructor(pos) {
    super(pos);
    this.img = document.getElementById("kudagePrev");
  }
}

class MehdugePreveiew extends BulidingPreview {
  constructor(pos) {
    super(pos);
    this.img = document.getElementById("medhugePrev");
  }
}

class VahgePreview extends BulidingPreview {
  constructor(pos) {
    super(pos);
    this.img = document.getElementById("vahgePrev");
  }
}
