class Enemey {
  constructor(game, pos) {
    this.game = game;
    this.pos = pos;
    // this.attacking = false;
    this.img = document.getElementById("enemey");
    this.projectiles = [];
    this.markForDeletion = false;
    this.frameX = 0;
    this.frameY = 0;
    this.MaxFrame = 2;
    this.nextFrame = 0;
  }

  update(dt) {
    // if (!this.attacking) {
    if (this.pos.x <= 0 + this.game.island.pos.x) {
      if (this.health <= this.maxHealth / 2) {
        this.frameY = 2;
      }
      this.pos.x += this.speed / dt;
    } else if (this.pos.x >= this.game.island.pos.x + this.game.island.w) {
      if (this.health <= this.maxHealth / 2) {
        this.frameY = 2;
      }
      this.pos.x -= this.speed / dt;
    } else if (this.pos.y <= 0 + this.game.island.pos.y) {
      if (this.health <= this.maxHealth / 2) {
        this.frameY = 2;
      }
      this.pos.y += this.speed / dt;
    } else if (this.pos.y >= this.game.island.pos.y + this.game.island.h) {
      if (this.health <= this.maxHealth / 2) {
        this.frameY = 2;
      }
      this.pos.y -= this.speed / dt;
    } else {
      if (this.health <= this.maxHealth / 2) {
        this.frameY = 3;
      } else {
        this.frameY = 1;
      }
    }
    // }

    if (this.health <= 0) {
      this.game.ui.coinAmount += this.coinAmount;
      this.game.numberOfEnemiesKilled += 1;
      this.game.ui.score += this.score;
      if (this.type === "BoduOdi" || this.type === "MaiOdi") {
        this.game.numberOfEnemies += 1;
        this.game.nextWave += 5;
        this.game.wave++;
      }
      if (this.game.boxDroppingChance > this.boxHaving) {
        if (this.pos.side === "up") {
          let boxPos = {
            x: this.pos.x,
            y: this.pos.y - this.h,
          };
          this.game.boxes.push(new Box(this.game, boxPos));
        } else if (this.pos.side === "right") {
          let boxPos = {
            x: this.pos.x + this.w,
            y: this.pos.y,
          };
          this.game.boxes.push(new Box(this.game, boxPos));
        } else if (this.pos.side === "down") {
          let boxPos = {
            x: this.pos.x,
            y: this.pos.y + this.h,
          };
          this.game.boxes.push(new Box(this.game, boxPos));
        } else if (this.pos.side === "left") {
          let boxPos = {
            x: this.pos.x - this.w,
            y: this.pos.y,
          };
          this.game.boxes.push(new Box(this.game, boxPos));
        }
      }
      this.markForDeletion = true;
    }

    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markForDeletion
    );

    this.projectiles.forEach((projectile) => {
      projectile.checkCollision();
      projectile.update(dt);
    });

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
  }

  draw(ctx) {
    if (this.pos.side === "up") {
      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(-0.5 * Math.PI);
      ctx.drawImage(
        this.img,
        this.frameX * this.w,
        this.frameY * this.h,
        this.w,
        this.h,
        0,
        0,
        this.w,
        this.h
      );
      ctx.restore();
    } else if (this.pos.side === "left") {
      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(Math.PI);
      ctx.drawImage(
        this.img,
        this.frameX * this.w,
        this.frameY * this.h,
        this.w,
        this.h,
        0,
        0,
        this.w,
        this.h
      );
      ctx.restore();
    } else if (this.pos.side === "down") {
      ctx.save();
      ctx.translate(this.pos.x, this.pos.y);
      ctx.rotate(0.5 * Math.PI);
      ctx.drawImage(
        this.img,
        this.frameX * this.w,
        this.frameY * this.h,
        this.w,
        this.h,
        0,
        0,
        this.w,
        this.h
      );
      ctx.restore();
    } else {
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
    }

    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx);
    });
  }

  attack(dt, bulding) {
    if (this.attackTimer >= this.attackTime) {
      if (this.pos.side === "right") {
        let myPosition = {
          x: this.pos.x,
          y: this.pos.y + this.h / 2,
        };
        this.projectiles.push(
          new EnemyProjectile(this.game, this, myPosition, "bulding", bulding, {
            x: bulding.pos.x + bulding.w / 2,
            y: bulding.pos.y + bulding.h / 2,
          })
        );
      } else if (this.pos.side === "up") {
        let myPosition = {
          x: this.pos.x + this.h / 2,
          y: this.pos.y,
        };
        this.projectiles.push(
          new EnemyProjectile(this.game, this, myPosition, "bulding", bulding, {
            x: bulding.pos.x + bulding.w / 2,
            y: bulding.pos.y + bulding.h / 2,
          })
        );
      } else if (this.pos.side === "left") {
        let myPosition = {
          x: this.pos.x,
          y: this.pos.y - this.h / 2,
        };
        this.projectiles.push(
          new EnemyProjectile(this.game, this, myPosition, "bulding", bulding, {
            x: bulding.pos.x + bulding.w / 2,
            y: bulding.pos.y + bulding.h / 2,
          })
        );
      } else if (this.pos.side === "down") {
        let myPosition = {
          x: this.pos.x - this.h / 2,
          y: this.pos.y,
        };
        this.projectiles.push(
          new EnemyProjectile(this.game, this, myPosition, "bulding", bulding, {
            x: bulding.pos.x + bulding.w / 2,
            y: bulding.pos.y + bulding.h / 2,
          })
        );
      }

      this.attackTimer = 0;
    } else {
      this.attackTimer += dt;
    }
  }
}

class KudaOdi extends Enemey {
  constructor(game, pos) {
    super(game, pos);
    this.w = 106;
    this.h = 64;
    this.health = 10;
    this.maxHealth = 10;
    this.attackTimer = 4000;
    this.attackTime = 4000;
    // this.attacking = false;
    this.type = "KudaOdi";
    this.img = document.getElementById("kudaOdi");
    this.speed = 10;
    this.range = 100;
    this.score = Math.round(Math.random() * 5 + 10);
    this.boxHaving = Math.floor(Math.random() * 100 + 1);
    this.coinAmount = 2;
    this.projectilePower = 2;
  }
}

class MedhuOdi extends Enemey {
  constructor(game, pos) {
    super(game, pos);
    this.w = 132;
    this.h = 80;
    this.health = 30;
    this.maxHealth = 30;
    this.attackTimer = 3000;
    this.attackTime = 3000;
    // this.attacking = false;
    this.type = "MedhuOdi";
    this.img = document.getElementById("medhuOdi");
    this.speed = 15;
    this.range = 250;
    this.score = Math.round(Math.random() * 10 + 15);
    this.boxHaving = Math.floor(Math.random() * 100 + 1);
    this.coinAmount = 5;
    this.projectilePower = 5;
  }
}

class BoduOdi extends Enemey {
  constructor(game, pos) {
    super(game, pos);
    this.w = 248;
    this.h = 150;
    this.health = 250;
    this.maxHealth = 250;
    this.attackTimer = 1500;
    this.attackTime = 1500;
    // this.attacking = false;
    this.type = "BoduOdi";
    this.img = document.getElementById("boduOdi");
    this.speed = 10;
    this.range = 300;
    this.score = Math.round(Math.random() * 100 + 50);
    this.boxHaving = 100;
    this.coinAmount = 100;
    this.projectilePower = 25;
  }
}

class MaiOdi extends Enemey {
  constructor(game, pos) {
    super(game, pos);
    this.w = 446;
    this.h = 270;
    this.health = 500;
    this.maxHealth = 500;
    this.attackTimer = 5000;
    this.attackTime = 5000;
    // this.attacking = false;
    this.type = "MaiOdi";
    this.img = document.getElementById("maiOdi");
    this.speed = 5;
    this.range = 500;
    this.score = Math.round(Math.random() * 250 + 250);
    this.boxHaving = 100;
    this.coinAmount = 250;
    this.projectilePower = 100;
  }
}
