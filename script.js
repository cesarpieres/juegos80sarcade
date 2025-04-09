window.addEventListener('DOMContentLoaded', () => {
  const loading = document.getElementById('loading-screen');
  const container = document.querySelector('.container');
  setTimeout(() => {
    loading.style.display = 'none';
    container.classList.remove('hidden');
  }, 2000);

  const hoverSound = new Audio('audio/hover.wav');
  const clickSound = new Audio('audio/click.wav');
  const bgMusic = new Audio('audio/bg-music.mp3');
  bgMusic.loop = true;
  bgMusic.volume = 0.5;
  bgMusic.play();

  document.getElementById('mute-button').addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
  });

  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('mouseover', () => hoverSound.play());
    link.addEventListener('click', () => clickSound.play());
  });
});
