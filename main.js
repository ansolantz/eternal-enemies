'use strict'

function main() {

  const mainElement = document.querySelector('main');

  function bulidDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function buildSplashScreen() {     // Building splash screen
    const splashScreen = bulidDom(`
      <section>
      <h1>Eternal Enemies</h1>
      <button class="start-button">Start</button>
      </section>
      `);

    const startButton = document.querySelector('.start-button');

    startButton.addEventListener('click', buildGameScreen)
  }


  function buildGameScreen() {  //Building gameScreen
    // console.log('you are on the game screen')

    const gameScreen = bulidDom(`
      <section class=" game-container">
      <canvas></canvas>
      </section>
      `);

    const gameContainerElement = document.querySelector('.game-container');

    const width = gameContainerElement.offsetWidth;
    const height = gameContainerElement.offsetHeight;

    const canvasElement = document.querySelector('canvas');

    canvasElement.setAttribute('width', width);
    canvasElement.setAttribute('height', height);

    const game = new Game(canvasElement);
    game.startLoop();

    document.addEventListener('keydown', function (event) {
      console.log(event.keyCode)
      if (event.keyCode === 38) {
        game.player.setDirection(-1);
      } else if (event.keyCode === 40) {
        game.player.setDirection(1);
      }
    })
    document.addEventListener('keyup', function (event) {
      if (event.keyCode === 38 || event.keyCode === 40) {
        game.player.setDirection(0);
      }
    });


    // setTimeout(buildGameOverScreen, 3000);
  }



  function buildGameOverScreen() {
    // console.log('game over');
    const gameOverScreen = bulidDom(`
    <section>
    <h1>Game Over</h1>
    <button class="restart-button">Restart</buton>
    </section>
    `);

    const restartButton = document.querySelector('.restart-button');

    restartButton.addEventListener('click', buildGameScreen);
  }


  buildSplashScreen();
}

window.addEventListener('load', main);



