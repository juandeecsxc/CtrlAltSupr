// Audio elements

// Intro audio
const themeAudio = document.getElementById('theme-audio');
const startGameAudio = document.getElementById('start-game-audio');

themeAudio.volume = 0.6;
startGameAudio.volume = 0.5;

// Protocol audio
const protocolAudio = document.getElementById('protocol-audio');
const alarmAudio = document.getElementById('alarm-audio');

protocolAudio.volume = 1;
alarmAudio.volume = 0.25;

// Labyrinth audio
const labyrinthAudio = document.getElementById('labyrinth-audio');
const waterDropAudio = document.getElementById('water-drop-audio');
const doorAudio = document.getElementById('door-audio');
const keyLockedAudio = document.getElementById('key-locked-audio');
const keyUnlockedAudio = document.getElementById('key-unlocked-audio');
const womanScreamAudio = document.getElementById('woman-scream-audio');
const babyScreamAudio = document.getElementById('baby-cry-audio');
const crowdScreamAudio = document.getElementById('crowd-scream-audio');
const manScreamAudio = document.getElementById('man-scream-audio');
const roarAudio = document.getElementById('roar-audio');

labyrinthAudio.volume = 0.8;
waterDropAudio.volume = 0.5;
doorAudio.volume = 0.2;
keyLockedAudio.volume = 0.8;
keyUnlockedAudio.volume = 0.8;
womanScreamAudio.volume = 0.5;
babyScreamAudio.volume = 0.5;
crowdScreamAudio.volume = 0.5;
manScreamAudio.volume = 0.5;
roarAudio.volume = 0.5;

// Other audio
const keyboardAudio = document.getElementById('keyboard-audio');
const painAudio = document.getElementById('pain-audio');

keyboardAudio.volume = 0.2;
painAudio.volume = 1;

function play(audio) {
  audio.play();
}

function mute(audio) {
  audio.muted = true;
}

function unmute(audio) {
  audio.muted = false;
}

function stop(audio) {
  audio.pause();
  audio.load();
}

function setVolume(audio, volume) {
  audio.volume = volume;
}

export const audioElements = {
  themeAudio,
  startGameAudio,
  protocolAudio,
  alarmAudio,
  labyrinthAudio,
  waterDropAudio,
  doorAudio,
  keyLockedAudio,
  keyUnlockedAudio,
  womanScreamAudio,
  babyScreamAudio,
  crowdScreamAudio,
  manScreamAudio,
  roarAudio,
  keyboardAudio,
  painAudio
}

export const audio = {
  play,
  stop,
  setVolume,
  mute,
  unmute
}