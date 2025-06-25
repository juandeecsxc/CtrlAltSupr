import { audioElements, audio } from './audio.js';

export const backpackItems = {
  CORRUPTION_MARK: 'CORRUPCIÓN 😈',
  KEY_MASTER: 'LLAVE MAESTRA 🔑',
  KEY_1: 'LLAVE PUERTA 1 🗝️',
  KEY_2: 'LLAVE PUERTA 2 🗝️',
  KEY_3: 'LLAVE PUERTA 3 🗝️',
}

export const playerStatus = {
  HAPPY: 'Feliz 😊',
  SAD: 'Triste 😢',
  DYING: 'Muriendo 🩸',
  HURT: 'Dolorido 🤕',
  SCARED: 'Asustado 🫨',
  CONFUSED: 'Confundido 🤔',
  NORMAL: 'Normal 😐',
  DISTRESSED: 'Angustiado 😰',
  CONFIDENT: 'Seguro 😌',
  TERRIFIED: 'Aterrado 🤯',
  AGONIZED: 'Agonizado 😫',
}

export function playerDamage(player, damage) {
  const { painAudio } = audioElements;
  if (player.health.length === 0) return;
  for (let i = 0; i < damage; i++) {
    player.health.pop();
  }

  if (player.health.length === 1) {
    player.mentalState = playerStatus.DYING;
  }
  audio.play(painAudio);
}