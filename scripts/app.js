import './bulma.js';
import { init as initProtocol } from './protocol.js';
import { playerStatus } from './player.js';
import { audio, audioActions } from './audio.js';

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
  const { themeAudio, startGameAudio } = audio;

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
    instructions.classList.add('is-active');
  }

  function initAudio() {
    audioActions.playAudio(themeAudio);
  }

  function muteAudio() {
    audioActions.muteAudio(themeAudio);
    mute.style.display = 'none';
    unmute.style.display = 'block';
  }

  function unmuteAudio() {
    audioActions.unmuteAudio(themeAudio);
    mute.style.display = 'block';
    unmute.style.display = 'none';
  }

  /* Event listeners */
  mute.addEventListener('click', () => muteAudio());
  unmute.addEventListener('click', () => unmuteAudio());
  
  continueButton.addEventListener('click', () => {
    instructions.classList.remove('is-active');
    initAudio();
  });

  startGame.addEventListener('click', () => {
    audioActions.stopAudio(themeAudio);
    audioActions.playAudio(startGameAudio);
    intro.classList.add('is-hidden');
    mask.classList.add('is-hidden');
    initProtocol(player);
  });
});