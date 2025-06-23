import { startTyping, showMessage, playerDamage, updatePlayerStats } from './utils.js';
import { protocolStory } from './story.js';
import { playerStatus } from './playerStatus.js';

const protocol = document.getElementById('protocol');
const protocolAudio = document.getElementById('protocol-audio');
const alarmAudio = document.getElementById('alarm-audio');

const btnContinue = document.getElementById('protocol-continue');
const typewriterText = document.querySelector('.typewriter-text');
const boxInfo = document.querySelector('.box-info');

const boxOptions = document.querySelector('.box-options');
const optNucleo = document.getElementById('optNucleo');
const optEspacio = document.getElementById('optEspacio');
const optSimulado = document.getElementById('optSimulado');

let currentStep = 0;
let player = {};

export function init(playerStats) {
  protocol.style.display = 'block';
  setTimeout(() => {
    player = playerStats;
    updatePlayerStats(player);
    protocolAudio.play();
    showInfoBox();
  }, 2000);
}

function showInfoBox() {
  const textToType = protocolStory[currentStep];
  btnContinue.style.display = 'none';
  typewriterText.textContent = '';
  boxInfo.style.display = 'flex';

  const typingSpeed = 50;
  const waitTime = textToType.length * typingSpeed + 5000;

  startTyping(textToType, typewriterText, typingSpeed);

  setTimeout(() => {
    btnContinue.style.display = 'block';
  }, waitTime);
}

btnContinue.addEventListener('click', () => {
  currentStep++;
  if (currentStep < protocolStory.length) {
    showInfoBox();
  } else {
    boxInfo.style.display = 'none';
    alarmAudio.volume = 0.5;
    alarmAudio.play();
    boxOptions.style.display = 'flex';
  }
});

optNucleo.addEventListener('click', () => {
  player.backpack.push('LLAVE MAESTRA 🔑');
  player.mentalState = playerStatus.SEGURO;
  updatePlayerStats(player);
  showMessage('Has encontrado la llave maestra.\nTu estado mental ha cambiado.');
});

optEspacio.addEventListener('click', () => {
  playerDamage(player, 2);
  player.backpack.push('CORRUPCIÓN 😈');
  player.mentalState = playerStatus.ANGUSTIADO;
  updatePlayerStats(player);
  showMessage('Has recibido corrupción, CRUDY te rastrea.\nHas perdido 2 de vida.\nTu estado mental ha cambiado.');
});

optSimulado.addEventListener('click', () => {
  playerDamage(player, 1);
  player.mentalState = playerStatus.NEUTRAL;
  updatePlayerStats(player);
  showMessage('Has perdido 1 de vida.\nTu estado mental ha cambiado.');
});