import { showMessage, updatePlayerStats, showRoomInfo, hideRoomInfo } from './utils.js';
import { playerStatus, playerDamage } from './player.js';
import { audioElements, audio } from './audio.js';
import * as crudy from './crudy.js';
import { init as initCore } from './core.js';

const logic = document.getElementById('logic');

// Elementos del juego
let candle;
let symbols;
let keyInput;
let confirmBtn;
let attemptsDisplay;
let jumpscare;
let darknessOverlay;

// Configuración del juego
const correctKey = '1028'; // 👁️💀🌙⚡ = 1028
const revealDistance = 80; // Distancia para revelar símbolos
let attemptsLeft = 3;
let discoveredSymbols = new Set();
let gameWon = false;
let player = {};
const symbolsValues = {
  '👁️': 1,
  '💀': 0,
  '🌙': 2,
  '⚡': 8
}

// Sonidos (simulados con Web Audio API)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playTone(frequency, duration, type = 'sine') {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = type;
  
  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// Función para crear efecto de linterna
function updateCandleLight(x, y) {
  const lightRadius = 150;
  const gradient = `radial-gradient(circle at ${x}px ${y}px, 
    transparent 0%, 
    rgba(0,0,0,0.3) ${lightRadius * 0.3}px, 
    rgba(0,0,0,0.7) ${lightRadius * 0.6}px, 
    rgba(0,0,0,0.95) ${lightRadius}px)`;
  
  darknessOverlay.style.background = gradient;
}

// Función para calcular distancia
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Función para revelar símbolos
function revealSymbols(candleX, candleY) {
  symbols.forEach((symbol, index) => {
    const rect = symbol.getBoundingClientRect();
    const symbolX = rect.left + rect.width / 2;
    const symbolY = rect.top + rect.height / 2;
    
    const distance = getDistance(candleX, candleY, symbolX, symbolY);
    
    if (distance < revealDistance) {
      if (!symbol.classList.contains('revealed')) {
        symbol.classList.add('revealed');
        if (!discoveredSymbols.has(index)) {
          discoveredSymbols.add(index);
          playTone(440 + index * 110, 0.3); // Sonido de descubrimiento
        }
      }
      showMessage(`¡Símbolo revelado! ${symbol.textContent} = ${symbolsValues[symbol.textContent]}`, 2000);
    } else {
      // Efecto de desvanecimiento gradual
      const fadeDistance = revealDistance * 1.5;
      if (distance < fadeDistance) {
        const opacity = 1 - (distance - revealDistance) / (fadeDistance - revealDistance);
        symbol.style.opacity = Math.max(0, opacity);
      } else {
        symbol.classList.remove('revealed');
        symbol.style.opacity = 0;
      }
    }
  });
}

// Función para manejar el movimiento del mouse
function handleMouseMove(e) {
  if (gameWon) return;
  
  const candleX = e.clientX - 20;
  const candleY = e.clientY - 20;
  
  candle.style.left = candleX + 'px';
  candle.style.top = candleY + 'px';
  
  updateCandleLight(e.clientX, e.clientY);
  revealSymbols(e.clientX, e.clientY);
}

// Función para manejar el movimiento táctil
function handleTouchMove(e) {
  if (gameWon) return;
  
  e.preventDefault();
  const touch = e.touches[0];
  const candleX = touch.clientX - 20;
  const candleY = touch.clientY - 20;
  
  candle.style.left = candleX + 'px';
  candle.style.top = candleY + 'px';
  
  updateCandleLight(touch.clientX, touch.clientY);
  revealSymbols(touch.clientX, touch.clientY);
}

// Función para manejar la confirmación de la clave
function handleConfirmClick() {
  const enteredKey = keyInput.value;
  
  if (enteredKey.length !== 4) {
    showMessage('La clave debe tener 4 dígitos');
    return;
  }
  
  if (enteredKey === correctKey) {
    gameWon = true;
    showMessage('¡La puerta se abre con un crujido lúgubre! Has escapado de la habitación...', 5000);
    confirmBtn.disabled = true;
    keyInput.disabled = true;
    
    // Sonido de éxito
    playTone(523, 0.5); // Do
    setTimeout(() => playTone(659, 0.5), 200); // Mi
    setTimeout(() => playTone(784, 0.8), 400); // Sol
    
    // Efecto de apertura de puerta
    const doorContainer = document.querySelector('.logic-door-container');
    doorContainer.style.transform = 'translateY(-50%) translateX(100px)';
    doorContainer.style.transition = 'transform 2s ease';
    
    nextLevel();
  } else {
    attemptsLeft--;
    attemptsDisplay.textContent = `Intentos restantes: ${attemptsLeft}`;
    
    if (attemptsLeft <= 0) {
      endLogic();
      crudy.showScreamer();
    } else {
      showMessage(`Un escalofrío te recorre. La clave es incorrecta. (${attemptsLeft} intentos restantes)`, 2000);
      playTone(150, 0.8, 'sawtooth'); // Sonido de error
    }
    
    keyInput.value = '';
  }
}

function handleKeyPress(e) {
  if (e.key === 'Enter') {
    confirmBtn.click();
  }
}

function handleContextMenu(e) {
  e.preventDefault();
}

function endLogic() {
  audio.stop(audioElements.protocolAudio);
  logic.classList.add('is-hidden');
  hideRoomInfo();
  
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('touchmove', handleTouchMove);
  document.removeEventListener('contextmenu', handleContextMenu);
}

function nextLevel() {
  endLogic();
  initCore(player);
}

export function init(playerStats) {
  logic.classList.remove('is-hidden');
  player = playerStats;

  candle = document.querySelector('.logic-candle');
  symbols = document.querySelectorAll('.logic-symbol');
  keyInput = document.getElementById('logic-key-input');
  confirmBtn = document.getElementById('logic-confirm-btn');
  attemptsDisplay = document.getElementById('logic-attempts');
  jumpscare = document.getElementById('logic-jumpscare');
  darknessOverlay = document.querySelector('.logic-darkness-overlay');
  
  attemptsLeft = 3;
  discoveredSymbols = new Set();
  gameWon = false;
  
  candle.style.left = '50px';
  candle.style.top = '50px';
  updateCandleLight(70, 70);
  
  // Event listeners
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleTouchMove);
  document.addEventListener('contextmenu', handleContextMenu);
  
  confirmBtn.addEventListener('click', handleConfirmClick);
  keyInput.addEventListener('keypress', handleKeyPress);
  
  // Mostrar información de la habitación
  showRoomInfo('La Clave en la Oscuridad - El Cuarto Encuentro', 'D-404', '25/06/2025', '03:00 AM');
  
  // Mensaje inicial
  setTimeout(() => {
    logicInfoBox.classList.remove('is-hidden');
    // showMessage('Usa la vela para explorar la habitación oscura. Encuentra los símbolos ocultos...', 4000);
  }, 1000);
}