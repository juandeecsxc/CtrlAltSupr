import { audioElements, audio } from './audio.js';

export function startTyping(textToType, elementText, button = null, typingSpeed = 50) {
  const { keyboardAudio } = audioElements;
  let charIndex = 0;

  if (button) {
    const waitTime = textToType.length * typingSpeed + 5000;
    setTimeout(() => {
      if (btnContinue.style.display === 'none') {
        btnContinue.style.display = 'block';
      }
    }, waitTime);
  }

  let stopTyping = false;
  let event = (event) => {
    if (event.key === 'Enter') {
      stopTyping = true;
    }
  };
  document.addEventListener('keydown', event);

  function typeWriter() {
    if (charIndex === textToType.length) {
      return;
    }

    if (stopTyping) {
      charIndex = textToType.length;
      audio.stop(keyboardAudio);
      elementText.textContent = textToType;
      if (button) {
        button.style.display = 'block';
      }
      document.removeEventListener('keydown', event);
    }
    
    if (charIndex < textToType.length) {
      elementText.textContent += textToType.charAt(charIndex);
      charIndex++;
      audio.play(keyboardAudio);
      setTimeout(typeWriter, typingSpeed);
    }
  }
  typeWriter();
}

export function updatePlayerStats(player) {
  const playerStats = document.getElementById('player-stats');
  const healthStats = document.getElementById('health-stats');
  const inventoryStats = document.getElementById('inventory-stats');
  const mentalStateStats = document.getElementById('mental-state-stats');

  playerStats.style.display = 'none';

  healthStats.querySelector('span').textContent = player.health.join('');
  if (player.backpack.length > 0) {
    inventoryStats.querySelector('strong').textContent = `🎒 Inventario (${player.backpack.length}/10):`;
    inventoryStats.querySelector('span').textContent = player.backpack.toString();
  } else {
    inventoryStats.querySelector('strong').textContent = '🎒 Inventario (0/10):';
    inventoryStats.querySelector('span').textContent = '';
  }

  mentalStateStats.querySelector('span').textContent = player.mentalState;
  setTimeout(() => {
    playerStats.style.display = 'block';
  }, 200);
}



export function showMessage(message, time = 7000) {
  const messageBox = document.querySelector('.message-box');
  if (!messageBox.style.display || messageBox.style.display === 'none') {
    const messageHTML = message.replace(/\n/g, '<br>');
    messageBox.querySelector('p').innerHTML = messageHTML;
    messageBox.style.display = 'block';
    setTimeout(() => messageBox.style.display = 'none', time);
  }
}

export function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}