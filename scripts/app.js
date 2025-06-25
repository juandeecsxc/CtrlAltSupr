import { openModal, closeModal, isOpened } from './bulma.js';
import { init as initProtocol } from './protocol.js';
import { playerStatus } from './player.js';
import { audioElements, audio } from './audio.js';
import './crudy.js';

document.addEventListener('DOMContentLoaded', () => {
  /* Elements */

  // Intro Section
  const intro = document.getElementById('intro'); 
  const mute = document.getElementById('mute');
  const unmute = document.getElementById('unmute');

  const continueButton = document.getElementById('continue');
  const instructions = document.getElementById('instructions');
  const startGame = document.getElementById('start-game');
  const mask = document.querySelector('.white-mask');

  // Audio
  const { themeAudio, startGameAudio } = audioElements;

  // PJ Stats
  const player = {
    health: ['❤️', '❤️', '❤️', '❤️', '❤️'],
    backpack: [],
    mentalState: playerStatus.CONFUSED
  }

  /* Init */
  init();

  /* Functions */
  function init() {
    openModal(instructions);
  }

  function initAudio() {
    audio.play(themeAudio);
  }

  function muteAudio() {
    audio.mute(themeAudio);
    mute.style.display = 'none';
    unmute.style.display = 'block';
  }

  function unmuteAudio() {
    audio.unmute(themeAudio);
    mute.style.display = 'block';
    unmute.style.display = 'none';
  }

  function keyDownEvent(event) {
    if (event.key === 'Enter') {
      if (isOpened(instructions)) {
        continueButton.click();
      } else {
        startGame.click();
      }
    }
  }

  /* Event listeners */
  document.addEventListener('keydown', keyDownEvent);

  mute.addEventListener('click', () => muteAudio());
  unmute.addEventListener('click', () => unmuteAudio());
  
  continueButton.addEventListener('click', () => {
    closeModal(instructions);
    initAudio();
  });

  startGame.addEventListener('click', () => {
    audio.stop(themeAudio);
    audio.play(startGameAudio);
    intro.classList.add('is-hidden');
    mask.classList.add('is-hidden');
    initProtocol(player);
    document.removeEventListener('keydown', keyDownEvent);
  });
});