import './bulma.js';

document.addEventListener('DOMContentLoaded', () => {
  /* Elements */

  // Intro Section
  const intro = document.getElementById('intro');
  const themeAudio = document.getElementById('theme-audio');
  const mute = document.getElementById('mute');
  const unmute = document.getElementById('unmute');

  const continueButton = document.getElementById('continue');
  const instructions = document.getElementById('instructions');
  const startGame = document.getElementById('start-game');
  const startGameAudio = document.getElementById('start-game-audio');
  const mask = document.querySelector('.white-mask');

  // Game Section
  const game = document.getElementById('game');

  /* Variables */
  let audioStarted = false;

  /* Init */
  init();

  /* Functions */
  function init() {
    instructions.classList.add('is-active');
  }

  function startAudio() {
    if (!audioStarted) {
      themeAudio.volume = 0.1;
      themeAudio.play()
        .then(() => {
          console.log('Audio de juego iniciado correctamente.');
          audioStarted = true;
        })
        .catch(error => {
          console.error('Error al intentar reproducir el audio:', error);
        });
    }
  }

  function muteAudio() {
    themeAudio.muted = true;
    mute.style.display = 'none';
    unmute.style.display = 'block';
  }

  function unmuteAudio() {
    themeAudio.muted = false;
    mute.style.display = 'block';
    unmute.style.display = 'none';
  }

  /* Event listeners */
  mute.addEventListener('click', () => muteAudio());
  unmute.addEventListener('click', () => unmuteAudio());
  continueButton.addEventListener('click', () => {
    instructions.classList.remove('is-active');
    startAudio();
  });
  startGame.addEventListener('click', () => {
    themeAudio.pause();
    startGameAudio.volume = 0.5;
    startGameAudio.play();
    intro.style.display = 'none';
    mask.style.display = 'none';
    game.style.display = 'block';
  });
});