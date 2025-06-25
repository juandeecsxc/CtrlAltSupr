import { showMessage,updatePlayerStats, randomNumber } from './utils.js';
import { playerStatus, backpackItems } from './player.js';
import { openModal, closeModal } from './bulma.js';
import { audio } from './audio.js';

const labyrinth = document.getElementById('labyrinth');

// Doors
const doors = document.querySelectorAll('.door-container');

// Key
const throwedKey = document.getElementById('throwed-key');
const keyModal = document.getElementById('key-modal');
const keyDescription = document.getElementById('key-description');
const keyContinue = document.getElementById('key-continue');
const keyCancel = document.getElementById('key-cancel');

// Confirm modal
const confirmModal = document.getElementById('confirm-modal');
const confirmContinue = document.getElementById('confirm-continue');
const confirmCancel = document.getElementById('confirm-cancel');

const currentDoors = ["closed-door_1", "closed-door_2", "closed-door_3"];
const maxDoors = currentDoors.length;
const keys = [ backpackItems.KEY_1, backpackItems.KEY_2, backpackItems.KEY_3 ];
const { womanScreamAudio, babyScreamAudio, crowdScreamAudio, manScreamAudio, roarAudio } = audio;
const screamsAudio = [ [womanScreamAudio, babyScreamAudio], crowdScreamAudio, [manScreamAudio, roarAudio] ];

let player = {};
let closedDoors = [];
let screams = [];
let throwed_key = "";

export function init(playerStats) {
  labyrinth.classList.remove('is-hidden');
  player = playerStats;
  if (player.backpack.includes(backpackItems.CORRUPTION_MARK)) {
    // TODO: Crudy starts walking to the player, player has 30 seconds to leave the room
  }

  if (player.backpack.includes(backpackItems.KEY_MASTER)) {
    throwedKey.style.display = 'none';
  }

  closedDoors = randomizeClosedDoors();
  screams = randomizeScreams();
  updateKeyDescription();
  setTimeout(() => {
    updatePlayerStats(player);
    initAudio();
  }, 2000);
}

function initAudio() {
  audio.waterDropAudio.play();
  audio.labyrinthAudio.play();
}

function randomizeScreams() {
  let screamsUnordered = [];
  while (screamsUnordered.length < screamsAudio.length) {
    const scream = getRandomScream();
    if (!screamsUnordered.includes(scream)) {
      screamsUnordered.push(scream);
    }
  }
  return screamsUnordered;
}

function randomizeClosedDoors() {
  let doorsRandomized = [];
  while (doorsRandomized.length < maxDoors - 1) {
    const door = getRandomClosedDoor();
    if (!doorsRandomized.includes(door)) {
      doorsRandomized.push(door);
    }
  }
  return doorsRandomized;
}

function updateKeyDescription() {
  throwed_key = getRandomKey();
  keyDescription.textContent = `Has recogido una llave:  "${throwed_key}".`;
}

function getRandomKey() {
  return keys[randomNumber(0, keys.length - 1)];
}

function getRandomScream() {
  return screamsAudio[randomNumber(0, screamsAudio.length - 1)];
}

function getRandomClosedDoor() {
  return currentDoors[randomNumber(0, maxDoors - 1)];
}

function playScream(index, isDoorOpen) {
  setTimeout(() => {
    if (isDoorOpen[index]) {
      if (Array.isArray(screams[index])) {
        screams[index][0].play();
        screams[index][1].play();
      } else {
        screams[index].play();
      }
    }
  }, 1000);
}

function stopAllScreams() {
  screams.forEach((_, index) => {
    stopScream(index);
  });
}

function stopScream(index) {
  if (Array.isArray(screams[index])) {
    screams[index][0].pause();
    screams[index][0].load();
    screams[index][1].pause();
    screams[index][1].load();
  } else {
    screams[index].pause();
    screams[index].load();
  }
}

function openDoor(index, openedDoor, closedDoor) {
  isDoorOpen[index] = true;
  openedDoor.classList.add('is-active');
  closedDoor.classList.add('is-active');
  audio.doorAudio.play();
}

function closeDoor(index, openedDoor, closedDoor) {
  isDoorOpen[index] = false;
  openedDoor.classList.remove('is-active');
  closedDoor.classList.remove('is-active');
  audio.doorAudio.pause();
  audio.doorAudio.load();
}

function useKey(index) {
  const keyIndex = player.backpack.indexOf(keys[index]);
  player.backpack.splice(keyIndex, 1);
  updatePlayerStats(player);
}

function removeClosedDoor(closedDoor) {
  const doorIndex = closedDoors.indexOf(closedDoor.id);
  closedDoors.splice(doorIndex, 1);
}

function endLabyrinth() {
  audio.labyrinthAudio.pause();
  audio.waterDropAudio.pause();
  audio.doorAudio.pause();
  stopAllScreams();
  labyrinth.classList.add('is-hidden');
}

const isDoorOpen = [false, false, false];
doors.forEach((door, index) => {
  const openedDoor = door.children[0];
  const closedDoor = door.children[1];

  door.addEventListener('mouseenter', () => {
    if (!isDoorOpen[index] && closedDoors.includes(closedDoor.id)) {
      return;
    }
    
    openDoor(index, openedDoor, closedDoor);
    playScream(index, isDoorOpen);
  });

  door.addEventListener('mouseleave', () => {
    if (!isDoorOpen[index]) {
      return;
    }

    closeDoor(index, openedDoor, closedDoor);
    stopScream(index);
  });

  door.addEventListener('click', () => {
    if (isDoorOpen[index]) {
      openModal(confirmModal);
      return;
    }

    if (closedDoors.includes(closedDoor.id)) {
      if (player.backpack.includes(keys[index])) {
        audio.keyUnlockedAudio.play();
        useKey(index);
        removeClosedDoor(closedDoor);
        showMessage(`Has abierto la puerta ${index + 1}.`, 3000);
      }
      else if (player.backpack.includes(backpackItems.KEY_MASTER)){
        audio.keyUnlockedAudio.play();
        removeClosedDoor(closedDoor);
        showMessage("Has abierto la puerta con la llave maestra.", 3000);
      } else {
        audio.keyLockedAudio.play();
        showMessage("La puerta está cerrada, necesitas una llave para abrirla.", 3000);
        return;
      }
    }
    openDoor(index, openedDoor, closedDoor);
    playScream(index, isDoorOpen);
  });
});

keyContinue.addEventListener('click', () => {
  player.backpack.push(throwed_key);
  updatePlayerStats(player);
  closeModal(keyModal);
  throwedKey.style.display = 'none';
});

keyCancel.addEventListener('click', () => {
  closeModal(keyModal);
  throwedKey.style.display = 'block';
});

confirmContinue.addEventListener('click', () => endLabyrinth());
confirmCancel.addEventListener('click', () => closeModal(confirmModal));