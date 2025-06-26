import { audioElements, audio } from './audio.js';

const screamer = document.getElementById('screamer');
const gameOver = document.getElementById('game-over');

const { screamerAudio } = audioElements;

let timerId = null;
let remainingTime = 0;
let lastStartTime = 0;
let isRunning = false;

function showScreamer() {
  screamer.classList.remove('is-hidden');
  audio.play(screamerAudio);
  setTimeout(() => {
    gameOver.classList.remove('is-hidden');
    audio.stopAll();
  }, 10000);
}

function executeScreamer() {
  timerId = null;
  isRunning = false;
  remainingTime = 0;

  showScreamer();
}

function start(duration) {
  stop();
  remainingTime = duration;
  resume();
}

function stop() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
  isRunning = false;
  remainingTime = 0;
}

function resume() {
  if (isRunning || remainingTime <= 0 ) {
    return;
  }

  isRunning = true;
  lastStartTime = Date.now();

  timerId = setTimeout(() => executeScreamer(), remainingTime);
}

function pause() {
  if (!isRunning || !timerId) {
    return;
  }

  clearTimeout(timerId);
  timerId = null;
  isRunning = false;

  const elapsedTime = Date.now() - lastStartTime;
  remainingTime -= elapsedTime;

  if (remainingTime < 0) {
    remainingTime = 0;
  }
}

function adjustTime(milliseconds) {
  const wasRunning = isRunning;

  if (wasRunning) {
    pause();
  }

  remainingTime += milliseconds;

  if (remainingTime < 0) {
    remainingTime = 0;
  }

  if (remainingTime <= 0) {
    executeScreamer();
  } else if (wasRunning) {
    resume();
  }
}

function getRemainingTime() {
  if (!isRunning) {
    return remainingTime;
  }
  return remainingTime - (Date.now() - lastStartTime);
}

export { start, stop, resume, pause, adjustTime, getRemainingTime, showScreamer };