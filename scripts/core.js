import { startTyping, showMessage, updatePlayerStats } from './utils.js';
import { playerStatus } from './player.js';
import { coreQuestions, coreEndings } from './coreStory.js';

const core = document.getElementById('core');
const coreInfoBox = document.getElementById('core-info-box'); 
const coreTypewriterText = document.getElementById('core-typewriter-text');
const coreContinueButton = document.getElementById('core-continue-button');
const coreOptionsBox = document.getElementById('core-options-box'); 
const coreAnswerButtonsContainer = document.getElementById('core-answer-buttons');

const themeAudio = document.getElementById('theme-audio');

let player = {};
let currentQuestionIndex = 0;
let score = 0;
const PASSING_SCORE = 3;

export function init(playerStats) {
  core.classList.remove('is-hidden');
  player = playerStats;
  currentQuestionIndex = 0;
  score = 0;
  updatePlayerStats(player);
  displayQuestion();

  if (themeAudio) {
    themeAudio.play();
  }
}

function displayQuestion() {
  if (currentQuestionIndex < coreQuestions.length) {
    const questionData = coreQuestions[currentQuestionIndex];

    coreInfoBox.style.display = 'block'; 
    coreTypewriterText.textContent = '';
    coreContinueButton.style.display = 'none'; 
    coreOptionsBox.style.display = 'flex'; 

    startTyping(questionData.question, coreTypewriterText, null, 30);

    coreAnswerButtonsContainer.innerHTML = ''; 

    questionData.options.forEach((option, index) => {
      const columnDiv = document.createElement('div');    
      columnDiv.classList.add('column', 'is-half', 'has-text-centered'); 
      const button = document.createElement('button');
      button.classList.add('button', 'is-large', 'is-fullwidth', 'mt-2');
      button.textContent = option;
      button.addEventListener('click', () => handleAnswer(index, questionData.correctAnswerIndex, questionData.feedback));
      columnDiv.appendChild(button);
      coreAnswerButtonsContainer.appendChild(columnDiv);
    });
  } else {
    endCoreLevel();
  }
}

function handleAnswer(selectedIndex, correctAnswerIndex, feedback) {
  Array.from(coreAnswerButtonsContainer.children).forEach(columnDiv => {
    columnDiv.querySelector('button').disabled = true;
  });

  if (selectedIndex === correctAnswerIndex) {
    score++;
    showMessage(`Respuesta correcta: ${feedback}`, 2000);
    player.mentalState = playerStatus.CONFIDENT;
  } else {
    showMessage(`Respuesta incorrecta. ${feedback}`, 2000);
    player.mentalState = playerStatus.DISTRESSED;
  }
  updatePlayerStats(player);

  setTimeout(() => {
    currentQuestionIndex++;
    displayQuestion();
  }, 2500);
}

function endCoreLevel() {
  coreOptionsBox.style.display = 'none'; 
  coreInfoBox.style.display = 'block'; 
  coreTypewriterText.textContent = '';
  coreContinueButton.style.display = 'block'; 
  coreContinueButton.textContent = 'Ver Resultado';

  if (themeAudio) {
    themeAudio.pause();
    themeAudio.currentTime = 0;
  }

  let endingMessage = '';
  if (score >= PASSING_SCORE) {
    endingMessage = coreEndings.liberation;
    player.mentalState = playerStatus.HAPPY;
  } else if (score > 0) {
    endingMessage = coreEndings.loop;
    player.mentalState = playerStatus.SAD;
  } else {
    endingMessage = coreEndings.elimination;
    player.mentalState = playerStatus.AGONIZED;
  }
  updatePlayerStats(player);
  startTyping(`Fin del Juicio. Tu puntuación final es: ${score} de ${coreQuestions.length}. ${endingMessage}`, coreTypewriterText, coreContinueButton, 30);

  coreContinueButton.onclick = () => {
    core.classList.add('is-hidden');
    showMessage("¡Juego Terminado! Gracias por jugar.", 5000);
  };
}