class Projectile {
  constructor(game, parent, parentPos, type, enemy, enemyPos) {
    this.game = game;
    this.w = 5;
    this.h = 5;
    this.enemy = enemy;
    this.parent = parent;
    this.pos = parentPos;
    this.enemyPos = enemyPos;
    this.speed = {
      x: enemyPos.x - this.pos.x,
      y: enemyPos.y - this.pos.y,
    };
    this.attackPower = this.parent.projectilePower;
    this.type = type;
    this.markForDeletion = false;
    this.damageSound = new Audio();
    this.damageSound.src = "../sounds/damage.mp3";
    this.damageSound.volume = 0.05;
    this.attackSoundPlayed = false;
  }

  update(dt) {
    this.pos.x += (this.speed.x / dt) * 0.125;
    this.pos.y += (this.speed.y / dt) * 0.125;

    if (this.pos.x < 0 || this.pos.x > canvas.width) {
      this.markForDeletion = true;
    } else if (this.pos.y < 0 || this.pos.y > canvas.height) {
      this.markForDeletion = true;
    }
  }

  collide() {
    this.enemy.health -= this.attackPower;
    this.damageSound.play();
    this.markForDeletion = true;
  }

  draw(ctx) {
    // ctx.fillStyle = "red";
    // ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.w, this.h);
    if (!this.attackSoundPlayed) {
      this.sound.play();
      this.attackSoundPlayed = true;
    }
  }
}

class BuldingProjectile extends Projectile {
  constructor(game, parent, parentPos, type, enemy, enemyPos) {
    super(game, parent, parentPos, type, enemy, enemyPos);
    this.img = document.getElementById("fireball");
    this.sound = new Audio();
    this.sound.src = "../sounds/fire.wav";
    this.sound.volume = 0.05;
  }

  checkCollision() {
    if (
      this.enemy.pos.x < this.pos.x &&
      this.enemy.pos.x + this.enemy.w > this.pos.x &&
      this.enemy.pos.y < this.pos.y &&
      this.enemy.pos.y + this.enemy.h > this.pos.y
    ) {
      this.collide();
    }
  }
}

class EnemyProjectile extends Projectile {
  constructor(game, parent, parentPos, type, enemy, enemyPos) {
    super(game, parent, parentPos, type, enemy, enemyPos);
    this.img = document.getElementById("stoneBall");
    this.sound = new Audio();
    this.sound.src = "../sounds/cannon.wav";
    this.sound.volume = 0.1;
  }

  checkCollision() {
    if (
      this.enemy.pos.x < this.pos.x &&
      this.enemy.pos.x + this.enemy.w > this.pos.x &&
      this.enemy.pos.y < this.pos.y &&
      this.enemy.pos.y + this.enemy.h > this.pos.y
    ) {
      this.collide();
    }
  }
}
