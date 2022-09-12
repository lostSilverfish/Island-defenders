class Projectile {
  constructor(game, parent, parentPos, type, enemy, enemyPos) {
    this.game = game;
    this.w = 11;
    this.h = 11;
    this.enemy = enemy;
    this.parent = parent;
    this.pos = parentPos;
    this.enemyPos = enemyPos;
    this.speed = {
      x: enemyPos.x - this.pos.x,
      y: enemyPos.y - this.pos.y,
    };
    this.type = type;
    this.markForDeletion = false;
  }

  update(dt) {
    this.pos.x += (this.speed.x / dt) * 0.5;
    this.pos.y += (this.speed.y / dt) * 0.5;

    if (this.pos.x < 0 || this.pos.x > canvas.width) {
      this.markForDeletion = true;
    } else if (this.pos.y < 0 || this.pos.y > canvas.height) {
      this.markForDeletion = true;
    }
  }

  draw(ctx) {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.w, this.h);
  }
}

class BuldingProjectile extends Projectile {
  constructor(game, parent, parentPos, type, enemy, enemyPos) {
    super(game, parent, parentPos, type, enemy, enemyPos);
    this.attackPower = 5;
    this.img = document.getElementById("fireball");
  }

  checkCollision() {
    if (this.enemy.pos.side === "right") {
      if (
        this.enemy.pos.x < this.pos.x &&
        this.enemy.pos.x + this.enemy.w > this.pos.x &&
        this.enemy.pos.y < this.pos.y &&
        this.enemy.pos.y + this.enemy.h > this.pos.y
      ) {
        this.enemy.health -= this.attackPower;
        this.markForDeletion = true;
      }
    } else if (this.enemy.pos.side === "up") {
      if (
        this.enemy.pos.x < this.pos.x &&
        this.enemy.pos.x + this.enemy.w > this.pos.x &&
        this.enemy.pos.y > this.pos.y &&
        this.enemy.pos.y - this.enemy.h < this.pos.y
      ) {
        this.enemy.health -= this.attackPower;
        this.markForDeletion = true;
      }
    } else if (this.enemy.pos.side === "left") {
      if (
        this.enemy.pos.x > this.pos.x &&
        this.enemy.pos.x - this.enemy.w < this.pos.x &&
        this.enemy.pos.y > this.pos.y &&
        this.enemy.pos.y - this.enemy.h < this.pos.y
      ) {
        this.enemy.health -= this.attackPower;
        this.markForDeletion = true;
      }
    } else if (this.enemy.pos.side === "down") {
      if (
        this.enemy.pos.x > this.pos.x &&
        this.enemy.pos.x - this.enemy.w < this.pos.x &&
        this.enemy.pos.y < this.pos.y &&
        this.enemy.pos.y + this.enemy.h > this.pos.y
      ) {
        this.enemy.health -= this.attackPower;
        this.markForDeletion = true;
      }
    }
  }
}

class EnemyProjectile extends Projectile {
  constructor(game, parent, parentPos, type, enemy, enemyPos) {
    super(game, parent, parentPos, type, enemy, enemyPos);
    this.attackPower = 5;
    this.img = document.getElementById("stoneBall");
  }

  checkCollision() {
    if (
      this.enemy.pos.x < this.pos.x &&
      this.enemy.pos.x + this.enemy.w > this.pos.x &&
      this.enemy.pos.y < this.pos.y &&
      this.enemy.pos.y + this.enemy.h > this.pos.y
    ) {
      this.enemy.health -= this.attackPower;
      this.markForDeletion = true;
    }
  }
}
