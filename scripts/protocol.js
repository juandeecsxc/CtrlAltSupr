import { startTyping, showMessage, updatePlayerStats, showRoomInfo, hideRoomInfo } from './utils.js';
import { protocolStory } from './story.js';
import { playerStatus, backpackItems, playerDamage } from './player.js';
import { init as initLabyrinth } from './labyrinth.js';
import { audioElements, audio } from './audio.js';
import * as crudy from './crudy.js';

const protocol = document.getElementById('protocol');

const btnContinue = document.getElementById('protocol-continue');
const typewriterText = document.querySelector('.typewriter-text');
const boxInfo = document.querySelector('.box-info');

const boxOptions = document.querySelector('.box-options');
const optNucleo = document.getElementById('optNucleo');
const optEspacio = document.getElementById('optEspacio');
const optSimulado = document.getElementById('optSimulado');

// Audio
const { protocolAudio, alarmAudio } = audioElements;

let currentStep = 0;
let player = {};

export function init(playerStats) {
  protocol.classList.remove('is-hidden');
  setTimeout(() => {
    player = playerStats;
    updatePlayerStats(player);
    audio.play(protocolAudio);
    showInfoBox();
    // crudy.start(20 * 1000);
    showRoomInfo('Inicio del Protocolo - La Bienvenida de la Corrupción', 'A-101', '22/06/2025', '10:00 AM');
  }, 2000);
}

function showInfoBox() {
  const textToType = protocolStory[currentStep];
  btnContinue.style.display = 'none';
  typewriterText.textContent = '';
  boxInfo.style.display = 'flex';

  startTyping(textToType, typewriterText, btnContinue);
}

function endProtocol() {
  audio.stop(alarmAudio);
  audio.stop(protocolAudio);
  protocol.classList.add('is-hidden');
  initLabyrinth(player);
  hideRoomInfo();
  document.removeEventListener('keydown', keyDownEvent);
}

function keyDownEvent(event) {
  if (event.key === 'Enter') {
    btnContinue.click();
  }
}
document.addEventListener('keydown', keyDownEvent);

btnContinue.addEventListener('click', () => {
  if (btnContinue.style.display === 'block') {
    currentStep++;
    if (currentStep < protocolStory.length) {
      showInfoBox();
    } else {
      boxInfo.style.display = 'none';
      audio.play(alarmAudio);
      boxOptions.style.display = 'flex';
    }
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