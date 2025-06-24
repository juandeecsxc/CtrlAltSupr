export function startTyping(textToType, elementText, button = null, typingSpeed = 50) {
  const keyboardAudio = document.getElementById('keyboard-audio');
  keyboardAudio.volume = 0.2;
  let charIndex = 0;

  function typeWriter() {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        keyboardAudio.pause();
        charIndex = textToType.length;
        elementText.textContent = textToType;
        if (button) {
          button.style.display = 'block';
        }
      }
    });

    if (charIndex < textToType.length) {
      elementText.textContent += textToType.charAt(charIndex);
      charIndex++;
      keyboardAudio.play();
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

export function playerDamage(player, damage) {
  const painAudio = document.getElementById('pain-audio');
  painAudio.volume = 1;
  if (player.health.length === 0) return;
  for (let i = 0; i < damage; i++) {
    player.health.pop();
  }

  if (player.health.length === 1) {
    player.mentalState = playerStatus.MURIENDO;
  }
  painAudio.play();
  return player;
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