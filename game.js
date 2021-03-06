console.log('game')


function Game(canvas) {
  this.player = null;
  this.enemies = [];
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.gameOver = false;
};


Game.prototype.startLoop = function () {

  this.player = new Player(this.canvas)


  console.log('Im in the looooooop');

  const loop = () => {

    if (Math.random() > 0.97) {    //Modifiera for levels
      // this.enemies = new Enemy(this.canvas, 100)
      randomNumber = (Math.random() * this.canvas.height - 15) + 15  // +-  15enemies inside game
      this.enemies.push(new Enemy(this.canvas, randomNumber));
    }
    this.clearCanvas();
    this.updateCanvas();
    this.drawCanvas();
    this.checkCollisions();

    console.log(this.player.direction)

    if (this.gameOver === false) {
      window.requestAnimationFrame(loop);
    }
  }
  window.requestAnimationFrame(loop);
}

Game.prototype.clearCanvas = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

Game.prototype.updateCanvas = function () {
  this.player.update();
  this.enemies.forEach(function (enemy) {
    enemy.update();
  });
  // this.enemies.update();
}

Game.prototype.drawCanvas = function () {
  this.player.draw();
  // this.enemies.draw();
  this.enemies.forEach(function (enemy) {
    enemy.draw();
  });
}


Game.prototype.checkCollisions = function () {

  this.enemies.forEach((enemy, index) => {
    const isColliding = this.player.checkCollisionWithEnemy(enemy);

    if (isColliding) {
      // console.log('colision');
      this.enemies.splice(index, 1);
      this.player.setLives();
      if (this.player.lives === 0) {
        this.gameOver = true;
        this.buildGameOverScreen();
      }
      // this.player.setLives();
    }
  });
  // this.player.CheckCollisionScreen();
  // this.player.CheckInScreen();
}

Game.prototype.setGameOver = function (buildGameOverScreen) {
  this.buildGameOverScreen = buildGameOverScreen;
}

