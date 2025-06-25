import { audioElements, audio } from './audio.js';

const screamer = document.getElementById('screamer');
const gameOver = document.getElementById('game-over');

const { screamerAudio } = audioElements;

export function showScreamer() {
  screamer.classList.remove('is-hidden');
  audio.play(screamerAudio);
  setTimeout(() => {
    gameOver.classList.remove('is-hidden');
  }, 6000);
}