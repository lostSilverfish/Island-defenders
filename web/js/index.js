//Game starts when document is fully loaded
window.onload = () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let prevTime = 0;

  const game = new Game(canvas.width, canvas.height);

  const animate = (timeStamp) => {
    //calculating delta time
    let dt = timeStamp - prevTime;
    prevTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (game.gameState === "playing") {
      game.update(dt);
      game.draw(ctx);
      if (game.island.placingBulding === "Kudage") {
        game.island.kudagePrev.draw(ctx);
      } else if (game.island.placingBulding === "Vahge") {
        game.island.vahgePrev.draw(ctx);
      } else if (game.island.placingBulding === "Medhuge") {
        game.island.medhugePrev.draw(ctx);
      }
      game.island.checkEnemy(dt);
      game.checkForBulding(dt);
    } else if (game.gameState === "welcome") {
      game.ui.welcome(ctx);
    } else if (game.gameState === "gameOver") {
      game.ui.gameOver(ctx);
    }

    window.requestAnimationFrame(animate);
  };

  document.addEventListener("click", (e) => {
    let mousePos = {
      x: e.clientX,
      y: e.clientY,
    };

    if (game.gameState === "playing") {
      if (
        game.island.pos.x < mousePos.x &&
        game.island.w + game.island.pos.x > mousePos.x &&
        game.island.pos.y < mousePos.y &&
        game.island.h + game.island.pos.y > mousePos.y
      ) {
        game.island.placeBulding(mousePos);
      } else {
        //cannot place building in the water
      }

      if (
        game.ui.uiKudagePos.x < mousePos.x &&
        game.ui.uiBuldingSize + game.ui.uiKudagePos.x > mousePos.x &&
        game.ui.uiKudagePos.y < mousePos.y &&
        game.ui.uiBuldingSize + game.ui.uiKudagePos.y > mousePos.y
      ) {
        game.island.placingBulding = "Kudage";
        game.island.placeBuildingSound.play();
      } else if (
        game.ui.uiMedhugePos.x < mousePos.x &&
        game.ui.uiBuldingSize + game.ui.uiMedhugePos.x > mousePos.x &&
        game.ui.uiMedhugePos.y < mousePos.y &&
        game.ui.uiBuldingSize + game.ui.uiMedhugePos.y > mousePos.y
      ) {
        game.island.placingBulding = "Medhuge";
        game.island.placeBuildingSound.play();
      } else if (
        game.ui.uiVahgePos.x < mousePos.x &&
        game.ui.uiBuldingSize + game.ui.uiVahgePos.x > mousePos.x &&
        game.ui.uiVahgePos.y < mousePos.y &&
        game.ui.uiBuldingSize + game.ui.uiVahgePos.y > mousePos.y
      ) {
        game.island.placingBulding = "Vahge";
        game.island.placeBuildingSound.play();
      }

      game.boxes.forEach((box) => {
        if (
          box.pos.x < mousePos.x &&
          box.size + box.pos.x > mousePos.x &&
          box.pos.y < mousePos.y &&
          box.size + box.pos.y > mousePos.y
        ) {
          box.open();
        }
      });
    } else if (game.gameState === "welcome") {
      if (
        game.ui.startBtnPos.x < mousePos.x &&
        game.ui.startBtnSize.w + game.ui.startBtnPos.x > mousePos.x &&
        game.ui.startBtnPos.y < mousePos.y &&
        game.ui.startBtnSize.h + game.ui.startBtnPos.y > mousePos.y
      ) {
        game.gameState = "playing";
      }
    } else if (game.gameState === "gameOver") {
      if (
        game.ui.tryAgainBtnPos.x < mousePos.x &&
        game.ui.tryAgainBtnSize.w + game.ui.tryAgainBtnPos.x > mousePos.x &&
        game.ui.tryAgainBtnPos.y < mousePos.y &&
        game.ui.tryAgainBtnSize.h + game.ui.tryAgainBtnPos.y > mousePos.y
      ) {
        game.gameState = "playing";
        game.island.buldings.push(
          new Boduge(game, {
            x: game.island.pos.x + game.island.w / 2 - 128 / 2,
            y: game.island.pos.y + game.island.h / 2 - 128 / 2,
          })
        );
      }
    }
  });

  document.addEventListener("mousemove", (e) => {
    let mousePos = {
      x: e.clientX,
      y: e.clientY,
    };

    if (game.gameState === "playing") {
      if (
        game.island.pos.x < mousePos.x &&
        game.island.w + game.island.pos.x > mousePos.x &&
        game.island.pos.y < mousePos.y &&
        game.island.h + game.island.pos.y > mousePos.y
      ) {
        if (game.island.placingBulding === "Kudage") {
          game.island.kudagePrev.update(mousePos);
        } else if (game.island.placingBulding === "Vahge") {
          game.island.vahgePrev.update(mousePos);
        } else if (game.island.placingBulding === "Medhuge") {
          game.island.medhugePrev.update(mousePos);
        }
      }
    }
  });

  animate(0);
};
