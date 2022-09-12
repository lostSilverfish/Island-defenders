class Game {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.island = new Island(this, 400, 250);
    this.ui = new UI(this);
    this.enemies = [];
    this.boxes = [];
    this.enemyTimer = 0;
    this.nextEnemey = 7000;
    this.numberOfEnemies = 5;
    this.numberOfEnemiesKilled = 0;
    this.nextWave = 20;
    this.wave = 1;
    this.boxDroppingChance = 2.5;
    this.gameState = "welcome";
  }

  update(dt) {
    this.enemyTimer += dt;
    this.enemies = this.enemies.filter((enemy) => !enemy.markForDeletion);
    this.boxes = this.boxes.filter((box) => !box.markForDeletion);
    if (
      this.enemyTimer > this.nextEnemey &&
      this.enemies.length < this.numberOfEnemies
    ) {
      if (this.wave < 5) {
        this.addNewEnemy();
      } else if (this.wave >= 5) {
        for (let i = 0; i < 2; i++) {
          this.addNewEnemy();
        }
      } else if (this.wave >= 10) {
        for (let i = 0; i < 5; i++) {
          this.addNewEnemy();
        }
      }
    }

    this.island.update(dt);
    if (this.enemies.length > 0) {
      this.enemies.forEach((enemy) => {
        enemy.update(dt);
      });
    }

    if (this.boxes.length > 0) {
      this.boxes.forEach((box) => {
        box.update(dt);
      });
    }

    if (this.numberOfEnemiesKilled > this.nextWave) {
      this.numberOfEnemies += 1;
      this.nextWave += 20;
      this.wave++;
      if (this.boxDroppingChance <= 25) {
        this.boxDroppingChance += 0.25;
      }
      if (this.nextEnemey > 500) {
        this.nextEnemey -= 100;
      }
    }
  }

  draw(ctx) {
    this.island.draw(ctx);
    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
    if (this.boxes.length > 0) {
      this.boxes.forEach((box) => {
        box.draw(ctx);
      });
    }
    this.ui.draw(ctx);
  }

  addNewEnemy() {
    let randomPos = this.getRandomPos();
    if (randomPos) {
      this.enemies.push(new Enemey(this, randomPos));
      this.enemyTimer = 0;
    }
  }

  getRandomPos() {
    let pos = {
      x: Math.round(
        Math.random() * (canvas.width - 32) + this.island.pos.x + 32
      ),
      y: 0,
    };

    return pos;
  }

  checkForBulding(dt) {
    for (let i = 0; i < this.enemies.length; i++) {
      for (let j = this.island.buldings.length - 1; j >= 0; j--) {
        if (
          Math.abs(
            this.enemies[i].pos.x -
              (this.island.buldings[j].pos.x + this.island.buldings[j].w / 2)
          ) <=
            this.enemies[i].range - 100 &&
          Math.abs(
            this.enemies[i].pos.y -
              (this.island.buldings[j].pos.y + this.island.buldings[j].h / 2)
          ) <=
            this.enemies[i].range - 100
        ) {
          // this.enemies[i].attacking = true;
          this.enemies[i].attack(dt, this.island.buldings[j]);
          break;
        } else if (
          Math.abs(
            this.enemies[i].pos.x -
              (this.island.buldings[j].pos.x + this.island.buldings[j].w / 2)
          ) <= this.enemies[i].range &&
          Math.abs(
            this.enemies[i].pos.y -
              (this.island.buldings[j].pos.y + this.island.buldings[j].h / 2)
          ) <= this.enemies[i].range
        ) {
          // this.enemies[i].attacking = true;
          this.enemies[i].attack(dt, this.island.buldings[j]);
          break;
        } else {
          // this.enemies[i].attacking = false;
        }
      }
      continue;
    }
  }
}
