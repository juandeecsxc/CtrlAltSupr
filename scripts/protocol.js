import { startTyping, showMessage, playerDamage, updatePlayerStats } from './utils.js';
import { protocolStory } from './story.js';
import { playerStatus, backpackItems } from './player.js';
import { init as initLabyrinth } from './labyrinth.js';
import { audio } from './audio.js';

const protocol = document.getElementById('protocol');

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
  protocol.classList.remove('is-hidden');
  setTimeout(() => {
    player = playerStats;
    updatePlayerStats(player);
    audio.protocolAudio.play();
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

  startTyping(textToType, typewriterText, btnContinue, typingSpeed);

  setTimeout(() => {
    if (btnContinue.style.display === 'none') {
      btnContinue.style.display = 'block';
    }
  }, waitTime);
}

function endProtocol() {
  audio.alarmAudio.pause();
  audio.protocolAudio.pause();
  protocol.classList.add('is-hidden');
  initLabyrinth(player);
}

btnContinue.addEventListener('click', () => {
  currentStep++;
  if (currentStep < protocolStory.length) {
    showInfoBox();
  } else {
    boxInfo.style.display = 'none';
    audio.alarmAudio.play();
    boxOptions.style.display = 'flex';
  }
});

optNucleo.addEventListener('click', () => {
  player.backpack.push(backpackItems.KEY_MASTER);
  player.mentalState = playerStatus.CONFIDENT;
  showMessage('Has encontrado la llave maestra.\nTu estado mental ha cambiado.');
  endProtocol();
});

optEspacio.addEventListener('click', () => {
  playerDamage(player, 2);
  player.backpack.push(backpackItems.CORRUPTION_MARK);
  player.mentalState = playerStatus.DISTRESSED;
  showMessage('Has recibido corrupción, CRUDY te rastrea.\nHas perdido 2 de vida.\nTu estado mental ha cambiado.');
  endProtocol();
});

optSimulado.addEventListener('click', () => {
  playerDamage(player, 1);
  player.mentalState = playerStatus.NORMAL;
  showMessage('Has perdido 1 de vida.\nTu estado mental ha cambiado.');
  endProtocol();
});