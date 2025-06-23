export function startTyping(textToType, elementText, typingSpeed = 50) {
  let charIndex = 0;

  function typeWriter() {
    if (charIndex < textToType.length) {
      elementText.textContent += textToType.charAt(charIndex);
      charIndex++;
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
    inventoryStats.querySelector('span').textContent = player.backpack.toString();
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

export function showMessage(message) {
  const messageBox = document.querySelector('.message-box');
  messageBox.textContent = message;
  messageBox.style.display = 'block';
  setTimeout(() => messageBox.style.display = 'none', 3000);
}