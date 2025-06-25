import './bulma.js';
import { init as initProtocol } from './protocol.js';
import { playerStatus } from './player.js';
import { audio } from './audio.js';

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


  /* Variables */
  let audioStarted = false;

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

  function startAudio() {
    if (!audioStarted) {
      
      audio.themeAudio.play()
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
    audio.themeAudio.muted = true;
    mute.style.display = 'none';
    unmute.style.display = 'block';
  }

  function unmuteAudio() {
    audio.themeAudio.muted = false;
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
    audio.themeAudio.pause();
    audio.startGameAudio.play();
    intro.classList.add('is-hidden');
    mask.classList.add('is-hidden');
    initProtocol(player);
  });
});