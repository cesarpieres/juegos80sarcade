
let vidas = 0;
let mute = false;
const musica = new Audio("audio/forever_young_remix.mp3");
const sonidoCoin = new Audio("audio/insert-coin.wav");
const sonidoSalto = new Audio("audio/jump.wav");
const sonidoMuerte = new Audio("audio/death.wav");

musica.loop = true;
musica.volume = 0.4;

function insertCoin() {
  vidas = 5;
  document.getElementById("vidas").textContent = "Vidas: " + vidas;
  if (!mute) {
    sonidoCoin.play();
    musica.play();
  }
  iniciarJuego();
}

function toggleMute() {
  mute = !mute;
  musica.muted = mute;
  sonidoCoin.muted = mute;
  sonidoSalto.muted = mute;
  sonidoMuerte.muted = mute;
}

function iniciarJuego() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "lime";
  ctx.fillRect(180, 180, 40, 40);
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.fillText("¡Frogger listo!", 140, 230);
}
