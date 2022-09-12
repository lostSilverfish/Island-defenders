class Island {
  constructor(game, w, h) {
    this.w = w;
    this.h = h;
    this.game = game;
    this.pos = {
      x: canvas.width / 2 - this.w / 2,
      y: canvas.height - this.h,
    };
    this.img = document.getElementById("island");
    this.buldings = [
      new Boduge(game, {
        x: this.pos.x + this.w / 2 - 64 / 2,
        y: this.pos.y + this.h / 2 - 64 / 2 + 50,
      }),
    ];

    this.kudageCoin = 50;
    this.medhugeCoin = 200;
    this.vahgeCoin = 25;
    this.placingBulding = "Vahge";
  }

  update(dt) {
    this.buldings = this.buldings.filter((bulding) => !bulding.markForDeletion);
    this.buldings.forEach((bulding) => {
      bulding.update(dt);
    });
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.pos.x, this.pos.y, this.w, this.h);

    this.buldings.forEach((bulding) => {
      bulding.draw(ctx);
    });
  }

  placeBulding(mousePos) {
    let onTopOfBuliding = false;

    for (let i = 0; i < this.buldings.length; i++) {
      let bulding = this.buldings[i];
      if (
        bulding.pos.x < mousePos.x + 16 &&
        bulding.w + 16 + bulding.pos.x > mousePos.x &&
        bulding.pos.y < mousePos.y + 16 &&
        bulding.h + 16 + bulding.pos.y > mousePos.y
      ) {
        // Cannot place on top another building
        onTopOfBuliding = true;
        break;
      }
    }

    if (!onTopOfBuliding) {
      if (
        this.placingBulding === "Kudage" &&
        this.game.ui.coinAmount >= this.kudageCoin
      ) {
        this.buldings.push(
          new Kudage(this.game, {
            x: mousePos.x - 16,
            y: mousePos.y - 16,
          })
        );
        this.game.ui.coinAmount -= this.kudageCoin;
      } else if (
        this.placingBulding === "Medhuge" &&
        this.game.ui.coinAmount >= this.medhugeCoin
      ) {
        this.buldings.push(
          new Medhuge(this.game, {
            x: mousePos.x - 16,
            y: mousePos.y - 16,
          })
        );
        this.game.ui.coinAmount -= this.medhugeCoin;
      } else if (
        this.placingBulding === "Vahge" &&
        this.game.ui.coinAmount >= this.vahgeCoin
      ) {
        this.buldings.push(
          new Vahge(this.game, {
            x: mousePos.x - 16,
            y: mousePos.y - 16,
          })
        );
        this.game.ui.coinAmount -= this.vahgeCoin;
      }
    }
  }

  checkEnemy(dt) {
    for (let i = 1; i < this.buldings.length; i++) {
      for (let j = 0; j < this.game.enemies.length; j++) {
        if (
          Math.abs(this.buldings[i].pos.x - this.game.enemies[j].pos.x) <=
            this.buldings[i].range &&
          Math.abs(this.buldings[i].pos.y - this.game.enemies[j].pos.y) <=
            this.buldings[i].range
        ) {
          this.buldings[i].attack(dt, this.game.enemies[j]);
          break;
        }
      }
      continue;
    }
  }
}
