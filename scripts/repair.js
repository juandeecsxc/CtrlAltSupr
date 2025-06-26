import { showMessage, updatePlayerStats, randomNumber } from './utils.js';
import { backpackItems, playerDamage, playerStatus } from './player.js';
import { showRoomInfo, hideRoomInfo } from './utils.js';
import { openModal, closeModal } from './bulma.js';
import { audioElements, audio } from './audio.js';
// import { init as initCore } from './core.js';
import { init as initLogic } from './logic.js';

const repair = document.getElementById('repair');

// Game elements
const patternCells = document.querySelectorAll('.pattern-cell');
const startRepairBtn = document.getElementById('start-repair');
const resetRepairBtn = document.getElementById('reset-repair');
const exitRepairBtn = document.getElementById('exit-repair');

// Status indicators
const difficultyIndicator = document.getElementById('difficulty-indicator');
const attemptsIndicator = document.getElementById('attempts-indicator');
const sequenceIndicator = document.getElementById('sequence-indicator');
const repairStatusText = document.getElementById('repair-status-text');

// Modals
const repairSuccessModal = document.getElementById('repair-success-modal');
const repairFailureModal = document.getElementById('repair-failure-modal');
const repairExitModal = document.getElementById('repair-exit-modal');
const successContinue = document.getElementById('success-continue');
const failureContinue = document.getElementById('failure-continue');
const exitConfirm = document.getElementById('exit-confirm');
const exitCancel = document.getElementById('exit-cancel');
const failureMessage = document.getElementById('failure-message');

// Audio
const { keyboardAudio, alarmAudio, keyUnlockedAudio, keyLockedAudio, painAudio } = audioElements;

// Game state
let player = {};
let gameState = {
  difficulty: 1, // 1: Easy, 2: Medium, 3: Hard
  maxAttempts: 3,
  currentAttempts: 0,
  sequence: [],
  playerSequence: [],
  sequenceLength: 3,
  isShowingSequence: false,
  isPlayerTurn: false,
  gameActive: false,
  sequenceIndex: 0
};

const difficulties = {
  1: { name: 'Fácil', length: 3, speed: 1000, attempts: 3 },
  2: { name: 'Medio', length: 5, speed: 800, attempts: 2 },
  3: { name: 'Difícil', length: 7, speed: 600, attempts: 1 }
};

export function init(playerStats) {
  console.log('Inicializando sección de reparación...');
  repair.classList.remove('is-hidden');
  player = playerStats;
  // resetGame();
  // updateUI();
  
  // Determine difficulty based on player's mental state
  if (player.mentalState === playerStatus.SCARED) {
    gameState.difficulty = 2;
  } else if (player.mentalState === playerStatus.TERRIFIED) {
    gameState.difficulty = 3;
  }
  
  setTimeout(() => {
    updatePlayerStats(player);
    initAudio();
    showRoomInfo('Centro de Reparación - Desafío de Reconstrucción', 'R-303', '24/06/2025', '02:30 AM');
  }, 2000);
}

function initAudio() {
  // audio.play(alarmAudio);
}

function resetGame() {
  gameState.currentAttempts = 0;
  gameState.sequence = [];
  gameState.playerSequence = [];
  gameState.isShowingSequence = false;
  gameState.isPlayerTurn = false;
  gameState.gameActive = false;
  gameState.sequenceIndex = 0;
  
  const diff = difficulties[gameState.difficulty];
  gameState.sequenceLength = diff.length;
  gameState.maxAttempts = diff.attempts;
  
  // Reset cell states
  patternCells.forEach(cell => {
    cell.classList.remove('active', 'correct', 'incorrect', 'disabled');
  });
  
  // Reset interface
  repair.querySelector('.repair-interface').classList.remove('showing-sequence', 'player-turn', 'game-over');
  
  updateUI();
}

// function updateUI() {
//   const diff = difficulties[gameState.difficulty];
//   difficultyIndicator.textContent = `Nivel: ${diff.name}`;
//   attemptsIndicator.textContent = `Intentos: ${gameState.maxAttempts - gameState.currentAttempts}`;
//   sequenceIndicator.textContent = `Secuencia: ${gameState.playerSequence.length}/${gameState.sequenceLength}`;
  
//   // Update button states
//   startRepairBtn.disabled = gameState.gameActive;
//   resetRepairBtn.disabled = !gameState.gameActive;
  
//   // Update attempt indicator color
//   const remainingAttempts = gameState.maxAttempts - gameState.currentAttempts;
//   if (remainingAttempts <= 1) {
//     attemptsIndicator.className = 'tag is-danger';
//   } else if (remainingAttempts <= 2) {
//     attemptsIndicator.className = 'tag is-warning';
//   } else {
//     attemptsIndicator.className = 'tag is-info';
//   }
// }

function generateSequence() {
  gameState.sequence = [];
  for (let i = 0; i < gameState.sequenceLength; i++) {
    gameState.sequence.push(randomNumber(0, patternCells.length - 1));
  }
}

function showSequence() {
  gameState.isShowingSequence = true;
  gameState.isPlayerTurn = false;
  repair.querySelector('.repair-interface').classList.add('showing-sequence');
  
  repairStatusText.textContent = 'Memoriza la secuencia que CRUDY te muestra...';
  
  // Disable all cells
  patternCells.forEach(cell => {
    cell.classList.add('disabled');
  });
  
  let index = 0;
  const diff = difficulties[gameState.difficulty];
  
  function showNextCell() {
    if (index < gameState.sequence.length) {
      const cellIndex = gameState.sequence[index];
      const cell = patternCells[cellIndex];
      
      // Activate cell
      cell.classList.add('active', 'sequence-display');
      audio.play(keyboardAudio);
      
      setTimeout(() => {
        cell.classList.remove('active', 'sequence-display');
        index++;
        
        if (index < gameState.sequence.length) {
          setTimeout(showNextCell, diff.speed / 2);
        } else {
          setTimeout(startPlayerTurn, diff.speed);
        }
      }, diff.speed / 2);
    }
  }
  
  setTimeout(showNextCell, 1000);
}

function startPlayerTurn() {
  gameState.isShowingSequence = false;
  gameState.isPlayerTurn = true;
  gameState.playerSequence = [];
  gameState.sequenceIndex = 0;
  
  repair.querySelector('.repair-interface').classList.remove('showing-sequence');
  repair.querySelector('.repair-interface').classList.add('player-turn');
  
  // Enable all cells
  patternCells.forEach(cell => {
    cell.classList.remove('disabled');
  });
  
  repairStatusText.textContent = 'Ahora replica la secuencia haciendo clic en las celdas...';
  updateUI();
}

function handleCellClick(cellIndex) {
  if (!gameState.isPlayerTurn || gameState.isShowingSequence) return;
  
  const cell = patternCells[cellIndex];
  const expectedIndex = gameState.sequence[gameState.sequenceIndex];
  
  // Visual feedback
  cell.classList.add('active');
  audio.play(keyboardAudio);
  
  setTimeout(() => {
    cell.classList.remove('active');
  }, 200);
  
  // Check if correct
  if (cellIndex === expectedIndex) {
    gameState.playerSequence.push(cellIndex);
    gameState.sequenceIndex++;
    
    cell.classList.add('correct');
    setTimeout(() => cell.classList.remove('correct'), 500);
    
    updateUI();
    
    // Check if sequence is complete
    if (gameState.playerSequence.length === gameState.sequenceLength) {
      handleSuccess();
    }
  } else {
    // Wrong cell
    cell.classList.add('incorrect');
    setTimeout(() => cell.classList.remove('incorrect'), 500);
    
    audio.play(painAudio);
    handleFailure();
  }
}

function handleSuccess() {
  gameState.gameActive = false;
  gameState.isPlayerTurn = false;
  
  repair.querySelector('.repair-interface').classList.remove('player-turn');
  
  // Disable all cells
  patternCells.forEach(cell => {
    cell.classList.add('disabled');
  });
  
  repairStatusText.textContent = '¡Secuencia completada correctamente!';
  audio.play(keyUnlockedAudio);
  
  // Add repair item to backpack
  if (!player.backpack.includes(backpackItems.REPAIR_COMPONENT)) {
    player.backpack.push(backpackItems.REPAIR_COMPONENT);
  }
  
  // Improve mental state slightly
  if (player.mentalState === playerStatus.TERRIFIED) {
    player.mentalState = playerStatus.SCARED;
  } else if (player.mentalState === playerStatus.SCARED) {
    player.mentalState = playerStatus.NORMAL;
  }
  
  setTimeout(() => {
    openModal(repairSuccessModal);
  }, 1500);
}

function handleFailure() {
  gameState.currentAttempts++;
  gameState.isPlayerTurn = false;
  
  repair.querySelector('.repair-interface').classList.remove('player-turn');
  
  // Disable all cells
  patternCells.forEach(cell => {
    cell.classList.add('disabled');
  });
  
  const remainingAttempts = gameState.maxAttempts - gameState.currentAttempts;
  
  if (remainingAttempts > 0) {
    repairStatusText.textContent = `Secuencia incorrecta. Te quedan ${remainingAttempts} intentos.`;
    failureMessage.textContent = `Te quedan ${remainingAttempts} intentos más.`;
    
    setTimeout(() => {
      openModal(repairFailureModal);
    }, 1000);
  } else {
    // Game over
    gameState.gameActive = false;
    repair.querySelector('.repair-interface').classList.add('game-over');
    
    repairStatusText.textContent = 'Reparación fallida. CRUDY permanece dañado.';
    failureMessage.textContent = 'Has agotado todos los intentos. El sistema permanece dañado.';
    
    // Damage player and worsen mental state
    playerDamage(player, 1);
    if (player.mentalState === playerStatus.NORMAL) {
      player.mentalState = playerStatus.SCARED;
    } else if (player.mentalState === playerStatus.SCARED) {
      player.mentalState = playerStatus.TERRIFIED;
    }
    
    setTimeout(() => {
      openModal(repairFailureModal);
    }, 1000);
  }
  
  updateUI();
}

function startGame() {
  endRepair();
  // if (gameState.gameActive) return;
  
  // gameState.gameActive = true;
  // generateSequence();
  // updateUI();
  
  // repairStatusText.textContent = 'Iniciando diagnóstico del sistema...';
  
  // setTimeout(() => {
  //   showSequence();
  // }, 1500);
}

function endRepair() {
  // audio.stop(alarmAudio);
  repair.classList.add('is-hidden');
  // initCore(player);
  initLogic(player);
  hideRoomInfo();
}

// Event listeners
startRepairBtn.addEventListener('click', startGame);

// resetRepairBtn.addEventListener('click', () => {
//   resetGame();
//   repairStatusText.textContent = 'Reparación reiniciada. Presiona "Iniciar Reparación" para comenzar.';
// });

// exitRepairBtn.addEventListener('click', () => {
//   openModal(repairExitModal);
// });

patternCells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    handleCellClick(index);
  });
});

// Modal event listeners
successContinue.addEventListener('click', () => {
  closeModal(repairSuccessModal);
  endRepair();
});

failureContinue.addEventListener('click', () => {
  closeModal(repairFailureModal);
  
  const remainingAttempts = gameState.maxAttempts - gameState.currentAttempts;
  if (remainingAttempts > 0) {
    // Reset for next attempt
    gameState.playerSequence = [];
    gameState.sequenceIndex = 0;
    setTimeout(() => {
      showSequence();
    }, 1000);
  } else {
    endRepair();
  }
});

// exitConfirm.addEventListener('click', () => {
//   closeModal(repairExitModal);
//   endRepair();
// });

// exitCancel.addEventListener('click', () => {
//   closeModal(repairExitModal);
// });