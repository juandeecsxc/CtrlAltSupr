document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('theme-audio');
  const mute = document.getElementById('mute');
  const unmute = document.getElementById('unmute');

  let audioStarted = false;

  function startAudio() {
    audio.volume = 0.15;
    if (!audioStarted) {
      audio.play()
        .then(() => {
          console.log('Audio de juego iniciado correctamente.');
          audioStarted = true;
        })
        .catch(error => {
          console.error('Error al intentar reproducir el audio:', error);
        });
    }
  }
  startAudio();

  mute.addEventListener('click', () => {
    audio.muted = true;
    mute.style.display = 'none';
    unmute.style.display = 'block';
  });

  unmute.addEventListener('click', () => {
    audio.muted = false;
    mute.style.display = 'block';
    unmute.style.display = 'none';
  });
});