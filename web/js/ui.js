class UI {
  constructor(game) {
    this.coinSize = 45;
    this.coinBarSize = {
      w: 125,
      h: 45,
    };
    this.uiBuldingBarSize = {
      w: 85,
      h: 255,
    };
    this.uiBuldingSize = 75;
    this.gameNameSize = {
      w: 550,
      h: 50,
    };
    this.gameOverSize = {
      w: 312,
      h: 80,
    };
    this.startBtnSize = {
      w: 150,
      h: 46,
    };
    this.tryAgainBtnSize = {
      w: 200,
      h: 46,
    };
    this.coinPos = {
      x: canvas.width / 2 - game.island.w / 2,
      y: 50,
    };
    this.waveBarPos = {
      x: this.coinPos.x + this.coinBarSize.w + 50,
      y: this.coinPos.y,
    };
    this.scoreBarPos = {
      x: this.waveBarPos.x + this.coinBarSize.w + 50,
      y: this.coinPos.y,
    };
    this.uiBuldingBarPos = {
      x: 0,
      y: canvas.height / 2 - this.uiBuldingBarSize.h / 2,
    };
    this.uiVahgePos = {
      x: this.uiBuldingBarPos.x,
      y: this.uiBuldingBarPos.y + 10,
    };
    this.uiKudagePos = {
      x: this.uiBuldingBarPos.x,
      y: this.uiVahgePos.y + this.uiBuldingSize,
    };
    this.uiMedhugePos = {
      x: this.uiBuldingBarPos.x,
      y: this.uiKudagePos.y + this.uiBuldingSize,
    };
    this.gameNamePos = {
      x: canvas.width / 2 - this.gameNameSize.w / 2,
      y: canvas.height / 2 - this.gameNameSize.h / 2 - this.startBtnSize.h,
    };
    this.gameOverPos = {
      x: canvas.width / 2 - this.gameOverSize.w / 2,
      y: canvas.height / 2 - this.gameOverSize.h / 2 - this.tryAgainBtnSize.h,
    };
    this.startBtnPos = {
      x: this.gameNamePos.x + this.gameNameSize.w / 2 - this.startBtnSize.w / 2,
      y: this.gameNamePos.y + this.startBtnSize.h + 35,
    };
    this.tryAgainBtnPos = {
      x:
        this.gameOverPos.x +
        this.gameOverSize.w / 2 -
        this.tryAgainBtnSize.w / 2,
      y: this.gameOverPos.y + this.tryAgainBtnSize.h + 55,
    };

    this.coinImage = document.getElementById("coin");
    this.coinBar = document.getElementById("uiCoinBar");
    this.waveBar = document.getElementById("uiWaveBar");
    this.scoreBar = document.getElementById("uiScoreBar");
    this.uiBuldingBar = document.getElementById("uiBuldingBar");
    this.uiVahge = document.getElementById("uiVahge");
    this.uiKudage = document.getElementById("uiKudage");
    this.uiMedhuge = document.getElementById("uiMedhuge");
    this.gameName = document.getElementById("gameName");
    this.gameOverImg = document.getElementById("gameOver");
    this.startBtn = document.getElementById("startBtn");
    this.tryAgainBtn = document.getElementById("tryAgainBtn");

    this.game = game;
    this.coinAmount = 100;
    this.score = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.coinBar,
      this.coinPos.x,
      this.coinPos.y,
      this.coinBarSize.w,
      this.coinBarSize.h
    );
    ctx.fillStyle = "white";
    ctx.font = "bold 20px roboto";
    ctx.fillText(
      this.coinAmount,
      this.coinPos.x + 55,
      this.coinPos.y + this.coinBarSize.h / 2 + 7
    );

    ctx.drawImage(
      this.waveBar,
      this.waveBarPos.x,
      this.waveBarPos.y,
      this.coinBarSize.w,
      this.coinBarSize.h
    );

    ctx.fillText(
      this.game.wave,
      this.waveBarPos.x + 55,
      this.waveBarPos.y + this.coinBarSize.h / 2 + 7
    );

    ctx.drawImage(
      this.scoreBar,
      this.scoreBarPos.x,
      this.scoreBarPos.y,
      this.coinBarSize.w,
      this.coinBarSize.h
    );

    ctx.fillText(
      this.score,
      this.scoreBarPos.x + 55,
      this.scoreBarPos.y + this.coinBarSize.h / 2 + 7
    );

    ctx.drawImage(
      this.uiBuldingBar,
      this.uiBuldingBarPos.x,
      this.uiBuldingBarPos.y,
      this.uiBuldingBarSize.w,
      this.uiBuldingBarSize.h
    );

    ctx.drawImage(
      this.uiVahge,
      this.uiVahgePos.x,
      this.uiVahgePos.y,
      this.uiBuldingSize,
      this.uiBuldingSize
    );

    ctx.drawImage(
      this.uiKudage,
      this.uiKudagePos.x,
      this.uiKudagePos.y,
      this.uiBuldingSize,
      this.uiBuldingSize
    );

    ctx.drawImage(
      this.uiMedhuge,
      this.uiMedhugePos.x,
      this.uiMedhugePos.y,
      this.uiBuldingSize,
      this.uiBuldingSize
    );
  }

  welcome(ctx) {
    ctx.drawImage(
      this.gameName,
      this.gameNamePos.x,
      this.gameNamePos.y,
      this.gameNameSize.w,
      this.gameNameSize.h
    );

    ctx.drawImage(
      this.startBtn,
      this.startBtnPos.x,
      this.startBtnPos.y,
      this.startBtnSize.w,
      this.startBtnSize.h
    );
  }

  gameOver(ctx) {
    ctx.drawImage(
      this.gameOverImg,
      this.gameOverPos.x,
      this.gameOverPos.y,
      this.gameOverSize.w,
      this.gameOverSize.h
    );

    ctx.drawImage(
      this.tryAgainBtn,
      this.tryAgainBtnPos.x,
      this.tryAgainBtnPos.y,
      this.tryAgainBtnSize.w,
      this.tryAgainBtnSize.h
    );

    this.resetGame();
  }

  resetGame() {
    this.game.enemies = [];
    this.game.island.buldings = [];
    this.game.boxes = [];
    this.score = 0;
    this.coinAmount = 100;
    this.game.wave = 1;
    this.game.boxDroppingChance = 2.5;
    this.game.nextWave = 20;
    this.game.nextEnemy = 7000;
    this.game.numberOfEnemies = 5;
    this.game.numberOfEnemiesKilled = 0;
  }
}
