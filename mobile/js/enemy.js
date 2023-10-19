class Enemy {
  constructor(game, pos) {
    this.game = game;
    this.pos = pos;
    this.projectiles = [];
    this.markForDeletion = false;
    this.frameX = 0;
    this.frameY = 0;
    this.MaxFrame = 2;
    this.nextFrame = 0;
    this.frameInterval = 500;
  }

  update(dt) {
    // if (!this.attacking) {
    if (this.pos.y + this.h <= this.game.island.pos.y) {
      if (this.health <= this.maxHealth / 2) {
        this.frameY = 2;
      }
      this.pos.y += this.speed / dt;
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
      if (this.game.boxDroppingChance >= this.boxHaving) {
        let boxPos = {
          x: this.pos.x + this.w / 2,
          y: this.pos.y + this.h / 2,
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

    if (this.nextFrame > this.frameInterval) {
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
    if (this.attackTimer >= this.attackTime) {
      let myPosition = {
        x: this.pos.x + this.w / 2,
        y: this.pos.y + this.h,
      };
      this.projectiles.push(
        new EnemyProjectile(this.game, this, myPosition, "enemy", bulding, {
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

class KudaOdi extends Enemy {
  constructor(game, pos) {
    super(game, pos);
    this.w = 32;
    this.h = 53;
    this.health = Math.ceil(Math.random() * this.game.wave) + 10;
    this.maxHealth = this.health;
    this.attackTimer = 4000;
    this.attackTime = 4000;
    // this.attacking = false;
    this.type = "KudaOdi";
    this.img = document.getElementById("kudaOdi");
    this.speed = 5;
    this.range = 100;
    this.score = Math.round(Math.random() * 5 + 10);
    this.boxHaving = Math.floor(Math.random() * 100 + 1);
    this.coinAmount = Math.round(Math.random() * 2 + 2);
    this.projectilePower = 2;
  }
}

class MedhuOdi extends Enemy {
  constructor(game, pos) {
    super(game, pos);
    this.w = 40;
    this.h = 66;
    this.health = Math.ceil(Math.random() * this.game.wave) + 30;
    this.maxHealth = this.health;
    this.attackTimer = 3000;
    this.attackTime = 3000;
    // this.attacking = false;
    this.type = "MedhuOdi";
    this.img = document.getElementById("medhuOdi");
    this.speed = 5;
    this.range = 250;
    this.score = Math.round(Math.random() * 10 + 15);
    this.boxHaving = Math.floor(Math.random() * 100 + 1);
    this.coinAmount = Math.round(Math.random() * 2 + 5);
    this.projectilePower = 5;
  }
}

class BoduOdi extends Enemy {
  constructor(game, pos) {
    super(game, pos);
    this.w = 75;
    this.h = 124;
    this.health = (this.game.wave - 5) / 10 + 1 * 250;
    this.maxHealth = this.health;
    this.attackTimer = 1500;
    this.attackTime = 1500;
    // this.attacking = false;
    this.type = "BoduOdi";
    this.img = document.getElementById("boduOdi");
    this.speed = 2;
    this.range = 300;
    this.score =
      Math.round(Math.random() * 100 + 50) * ((this.game.wave - 5) / 10 + 1);
    this.boxHaving = this.game.boxDroppingChance;
    this.coinAmount =
      Math.round(Math.random() * 100 + 50) * ((this.game.wave - 5) / 10 + 1);
    this.projectilePower = (this.game.wave - 5) / 10 + 1 * 25;
  }
}

class MaiOdi extends Enemy {
  constructor(game, pos) {
    super(game, pos);
    this.w = 135;
    this.h = 223;
    this.health = (this.game.wave / 10) * 500;
    this.maxHealth = this.health;
    this.attackTimer = 3000;
    this.attackTime = 3000;
    // this.attacking = false;
    this.type = "MaiOdi";
    this.img = document.getElementById("maiOdi");
    this.speed = 1;
    this.range = 500;
    this.score = Math.round(Math.random() * 250 + 250) * (this.game.wave / 10);
    this.boxHaving = this.game.boxDroppingChance;
    this.coinAmount =
      Math.round(Math.random() * 100 + 150) * (this.game.wave / 10);
    this.projectilePower = (this.game.wave / 10) * 100;
  }
}
