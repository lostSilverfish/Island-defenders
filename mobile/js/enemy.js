class Enemey {
  constructor(game, pos) {
    this.game = game;
    this.pos = pos;
    this.w = 32;
    this.h = 53;
    this.health = 25;
    this.attackTimer = 3500;
    // this.attacking = false;
    this.img = document.getElementById("enemey");
    this.projectiles = [];
    this.markForDeletion = false;
    this.frameX = 0;
    this.frameY = 0;
    this.MaxFrame = 2;
    this.nextFrame = 0;
    this.speed = 15;
    this.range = 250;
    this.score = Math.round(Math.random() * 10 + 15);
    this.boxHaving = Math.floor(Math.random() * 100 + 1);
  }

  update(dt) {
    // if (!this.attacking) {
    if (this.pos.y <= 0 + this.game.island.pos.y - 50) {
      if (this.health <= 5) {
        this.frameY = 2;
      }
      this.pos.y += this.speed / dt;
    } else {
      if (this.health <= 5) {
        this.frameY = 3;
      } else {
        this.frameY = 1;
      }
    }
    // }

    if (this.health <= 0) {
      this.game.ui.coinAmount += 5;
      this.game.numberOfEnemiesKilled += 1;
      this.game.ui.score += this.score;
      if (this.game.boxDroppingChance > this.boxHaving) {
        let boxPos = {
          x: this.pos.x,
          y: this.pos.y - this.h,
        };
        this.game.boxes.push(new Box(this.game, boxPos));
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

    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx);
    });
  }

  attack(dt, bulding) {
    if (this.attackTimer >= 2500) {
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

      this.attackTimer = 0;
    } else {
      this.attackTimer += dt;
    }
  }
}
