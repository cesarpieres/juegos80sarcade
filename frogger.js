// frogger.js - by César Pieres

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 448;
canvas.height = 512;
document.getElementById("game").appendChild(canvas);

const tileSize = 32;
let lives = 5;
let gameRunning = false;

const frog = {
  x: 6 * tileSize,
  y: 15 * tileSize,
  width: tileSize,
  height: tileSize,
  reset: function () {
    this.x = 6 * tileSize;
    this.y = 15 * tileSize;
  },
};

const cars = [];
const logs = [];

function createObstacles() {
  cars.length = 0;
  logs.length = 0;
  for (let i = 0; i < 3; i++) {
    cars.push({ x: i * 160, y: 12 * tileSize, speed: 2 });     // Línea 1
    cars.push({ x: i * 180, y: 11 * tileSize, speed: -2.5 });  // Línea 2 (nueva)
    logs.push({ x: i * 180, y: 6 * tileSize, speed: -1.5 });
  }
}

function drawFrog() {
  ctx.fillStyle = "lime";
  ctx.fillRect(frog.x, frog.y, frog.width, frog.height);
}

function drawCars() {
  ctx.fillStyle = "red";
  for (let car of cars) {
    ctx.fillRect(car.x, car.y, tileSize * 2, tileSize);
  }
}

function drawLogs() {
  ctx.fillStyle = "saddlebrown";
  for (let log of logs) {
    ctx.fillRect(log.x, log.y, tileSize * 2, tileSize);
  }
}

function drawLives() {
  ctx.fillStyle = "lime";
  ctx.font = "16px monospace";
  ctx.fillText("Vidas: " + lives, 10, 20);
}

function update() {
  if (!gameRunning) return;

  for (let car of cars) {
    car.x += car.speed;
    if (car.speed > 0 && car.x > canvas.width) car.x = -tileSize * 2;
    if (car.speed < 0 && car.x < -tileSize * 2) car.x = canvas.width;
    if (collision(frog, { x: car.x, y: car.y, width: tileSize * 2, height: tileSize })) {
      loseLife();
    }
  }

  for (let log of logs) {
    log.x += log.speed;
    if (log.x < -tileSize * 2) log.x = canvas.width;
  }

  if (frog.y === 6 * tileSize) {
    const onLog = logs.some(log =>
      collision(frog, { x: log.x, y: log.y, width: tileSize * 2, height: tileSize })
    );
    if (!onLog) loseLife();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrog();
  drawCars();
  drawLogs();
  drawLives();
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

function collision(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

const audioPath = "audio/";
const musica = new Audio(audioPath + "forever_young_remix.mp3");
const sonidoCoin = new Audio(audioPath + "insert-coin.wav");
const sonidoSalto = new Audio(audioPath + "jump.wav");
const sonidoMuerte = new Audio(audioPath + "death.wav");

musica.loop = true;
musica.volume = 0.5;

document.getElementById("insertButton").onclick = function () {
  lives = 5;
  frog.reset();
  createObstacles();
  gameRunning = true;
  document.getElementById("vidas").innerText = "Vidas: " + lives;

  sonidoCoin.play();
  musica.play();
};

document.addEventListener("keydown", function (e) {
  if (!gameRunning) return;

  if (e.key === "ArrowUp") frog.y -= tileSize;
  if (e.key === "ArrowDown") frog.y += tileSize;
  if (e.key === "ArrowLeft") frog.x -= tileSize;
  if (e.key === "ArrowRight") frog.x += tileSize;

  sonidoSalto.play();
});

function loseLife() {
  lives--;
  sonidoMuerte.play();

  if (lives <= 0) {
    gameRunning = false;
    musica.pause();
    alert("¡Juego terminado! Presioná 'Insertar Ficha' para reiniciar");
    document.getElementById("vidas").innerText = "Vidas: 0";
  } else {
    frog.reset();
  }
}

loop();
