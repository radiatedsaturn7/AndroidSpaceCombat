const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const overlay = document.getElementById("overlay");
const startButton = document.getElementById("start");
const scoreEl = document.getElementById("score");
const healthEl = document.getElementById("health");
const waveEl = document.getElementById("wave");
const weaponEl = document.getElementById("weapon");

const ASSET_ROOT = "app/src/main/res/drawable";
const ASSETS = {
  player: ["ppaladin.png", "pexemplar.png", "phunter.png", "psentinel.png"],
  enemies: ["enemy.png", "escort.png", "char2.png"],
  bosses: ["boss2.png", "boss3.png", "boss4.png", "boss5.png"],
  bullets: ["particle.png", "helaser.png", "hmgun.png", "hpulse.png"],
  explosions: ["exp1.png"],
  powerups: ["powerup.png", "shield.png"],
  backgrounds: [
    "level1.png",
    "level2.png",
    "level3.png",
    "level4.png",
    "level5.png",
  ],
};

const weaponModes = [
  { name: "Laser", rate: 7, speed: 10, spread: 0, damage: 1, sprite: 1 },
  { name: "Pulse", rate: 12, speed: 8, spread: 6, damage: 2, sprite: 3 },
  { name: "Machine", rate: 4, speed: 12, spread: 8, damage: 1, sprite: 2 },
  { name: "Charged", rate: 18, speed: 7, spread: 0, damage: 3, sprite: 0 },
];

const gameState = {
  running: false,
  paused: false,
  score: 0,
  health: 100,
  wave: 1,
  weaponIndex: 0,
  backgroundIndex: 0,
};

const input = {
  keys: new Set(),
  pointer: { x: canvas.width / 2, y: canvas.height * 0.75, active: false },
  firing: false,
};

const stars = Array.from({ length: 220 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.8 + 0.2,
  speed: Math.random() * 1.2 + 0.3,
}));

const player = {
  x: canvas.width / 2,
  y: canvas.height * 0.78,
  speed: 5.4,
  size: 56,
  shield: 0,
  spriteIndex: 0,
};

const bullets = [];
const enemies = [];
const bosses = [];
const powerups = [];
const explosions = [];

const images = {};

function resolveAsset(path) {
  return `${ASSET_ROOT}/${path}`;
}

function loadImages() {
  const entries = [];
  for (const key of Object.keys(ASSETS)) {
    ASSETS[key].forEach((asset, index) => {
      entries.push({ name: `${key}:${index}`, src: resolveAsset(asset) });
    });
  }

  return Promise.all(
    entries.map(
      ({ name, src }) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            images[name] = img;
            resolve();
          };
          img.onerror = reject;
        })
    )
  );
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function addScore(amount) {
  gameState.score += amount;
  scoreEl.textContent = gameState.score;
}

function applyDamage(amount) {
  if (player.shield > 0) {
    const absorbed = Math.min(player.shield, amount);
    player.shield -= absorbed;
    amount -= absorbed;
  }
  gameState.health = Math.max(0, gameState.health - amount);
  healthEl.textContent = gameState.health;
  if (gameState.health <= 0) {
    endGame();
  }
}

function setWeapon(index) {
  gameState.weaponIndex = clamp(index, 0, weaponModes.length - 1);
  weaponEl.textContent = weaponModes[gameState.weaponIndex].name;
}

function spawnEnemy() {
  const size = 48 + Math.random() * 24;
  const enemy = {
    x: Math.random() * (canvas.width - size) + size / 2,
    y: -size,
    size,
    speed: 1.4 + Math.random() * 1.4 + gameState.wave * 0.08,
    health: 2 + Math.floor(gameState.wave * 0.35),
    spriteIndex: Math.floor(Math.random() * ASSETS.enemies.length),
  };
  enemies.push(enemy);
}

function spawnBoss() {
  const size = 180 + gameState.wave * 8;
  const boss = {
    x: canvas.width / 2,
    y: -size,
    size,
    speed: 0.6 + gameState.wave * 0.05,
    health: 40 + gameState.wave * 10,
    spriteIndex: (gameState.wave - 1) % ASSETS.bosses.length,
  };
  bosses.push(boss);
}

function spawnPowerup(x, y) {
  powerups.push({
    x,
    y,
    size: 42,
    speed: 2,
    type: Math.random() > 0.5 ? "shield" : "score",
    spriteIndex: Math.random() > 0.5 ? 1 : 0,
  });
}

function spawnExplosion(x, y) {
  explosions.push({ x, y, life: 28 });
}

function updateStars() {
  stars.forEach((star) => {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = -4;
      star.x = Math.random() * canvas.width;
    }
  });
}

function updatePlayer() {
  let dx = 0;
  let dy = 0;
  if (input.keys.has("arrowleft") || input.keys.has("a")) dx -= 1;
  if (input.keys.has("arrowright") || input.keys.has("d")) dx += 1;
  if (input.keys.has("arrowup") || input.keys.has("w")) dy -= 1;
  if (input.keys.has("arrowdown") || input.keys.has("s")) dy += 1;

  if (input.pointer.active) {
    const lerp = 0.12;
    player.x += (input.pointer.x - player.x) * lerp;
    player.y += (input.pointer.y - player.y) * lerp;
  } else {
    player.x += dx * player.speed;
    player.y += dy * player.speed;
  }

  player.x = clamp(player.x, player.size / 2, canvas.width - player.size / 2);
  player.y = clamp(player.y, player.size / 2, canvas.height - player.size / 2);
}

let shotCooldown = 0;
function updateBullets() {
  const weapon = weaponModes[gameState.weaponIndex];
  if (input.firing && shotCooldown <= 0) {
    const spread = weapon.spread ? (Math.random() - 0.5) * weapon.spread : 0;
    bullets.push({
      x: player.x,
      y: player.y - player.size / 2,
      speed: weapon.speed,
      size: 20,
      damage: weapon.damage,
      spriteIndex: weapon.sprite,
      angle: spread,
    });
    shotCooldown = weapon.rate;
  }
  if (shotCooldown > 0) shotCooldown -= 1;

  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    bullets[i].y -= bullets[i].speed;
    bullets[i].x += bullets[i].angle;
    if (bullets[i].y < -30) bullets.splice(i, 1);
  }
}

let spawnTimer = 0;
function updateEnemies() {
  spawnTimer -= 1;
  if (spawnTimer <= 0) {
    spawnEnemy();
    spawnTimer = Math.max(28 - gameState.wave * 2, 12);
  }

  for (let i = enemies.length - 1; i >= 0; i -= 1) {
    const enemy = enemies[i];
    enemy.y += enemy.speed;

    if (enemy.y > canvas.height + enemy.size) {
      enemies.splice(i, 1);
      applyDamage(6);
    }
  }
}

function updateBosses() {
  for (let i = bosses.length - 1; i >= 0; i -= 1) {
    const boss = bosses[i];
    boss.y += boss.speed;
    if (boss.y > 120) {
      boss.y = 120;
    }
  }
}

function updatePowerups() {
  for (let i = powerups.length - 1; i >= 0; i -= 1) {
    powerups[i].y += powerups[i].speed;
    if (powerups[i].y > canvas.height + powerups[i].size) {
      powerups.splice(i, 1);
    }
  }
}

function updateExplosions() {
  for (let i = explosions.length - 1; i >= 0; i -= 1) {
    explosions[i].life -= 1;
    if (explosions[i].life <= 0) {
      explosions.splice(i, 1);
    }
  }
}

function checkCollisions() {
  for (let i = enemies.length - 1; i >= 0; i -= 1) {
    const enemy = enemies[i];
    const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y);
    if (dist < enemy.size * 0.45 + player.size * 0.4) {
      spawnExplosion(enemy.x, enemy.y);
      enemies.splice(i, 1);
      applyDamage(14);
      continue;
    }

    for (let b = bullets.length - 1; b >= 0; b -= 1) {
      const bullet = bullets[b];
      const bd = Math.hypot(enemy.x - bullet.x, enemy.y - bullet.y);
      if (bd < enemy.size * 0.4) {
        bullets.splice(b, 1);
        enemy.health -= bullet.damage;
        if (enemy.health <= 0) {
          spawnExplosion(enemy.x, enemy.y);
          if (Math.random() < 0.18) spawnPowerup(enemy.x, enemy.y);
          enemies.splice(i, 1);
          addScore(120);
          if (gameState.score % 1600 === 0) {
            gameState.wave += 1;
            gameState.backgroundIndex =
              (gameState.backgroundIndex + 1) % ASSETS.backgrounds.length;
            if (gameState.wave % 3 === 0) {
              spawnBoss();
            }
          }
        }
        break;
      }
    }
  }

  for (let i = bosses.length - 1; i >= 0; i -= 1) {
    const boss = bosses[i];
    const dist = Math.hypot(boss.x - player.x, boss.y - player.y);
    if (dist < boss.size * 0.4 + player.size * 0.4) {
      spawnExplosion(boss.x, boss.y);
      applyDamage(24);
    }

    for (let b = bullets.length - 1; b >= 0; b -= 1) {
      const bullet = bullets[b];
      const bd = Math.hypot(boss.x - bullet.x, boss.y - bullet.y);
      if (bd < boss.size * 0.45) {
        bullets.splice(b, 1);
        boss.health -= bullet.damage;
        if (boss.health <= 0) {
          spawnExplosion(boss.x, boss.y);
          addScore(1200);
          bosses.splice(i, 1);
        }
        break;
      }
    }
  }

  for (let i = powerups.length - 1; i >= 0; i -= 1) {
    const powerup = powerups[i];
    const dist = Math.hypot(powerup.x - player.x, powerup.y - player.y);
    if (dist < powerup.size * 0.5 + player.size * 0.4) {
      if (powerup.type === "shield") {
        player.shield = Math.min(40, player.shield + 20);
      } else {
        addScore(300);
      }
      powerups.splice(i, 1);
    }
  }
}

function drawStars() {
  ctx.fillStyle = "#030617";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(156, 190, 255, 0.9)";
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawBackground() {
  const bg = images[`backgrounds:${gameState.backgroundIndex}`];
  if (!bg) return;
  const scale = Math.max(canvas.width / bg.width, canvas.height / bg.height);
  const w = bg.width * scale;
  const h = bg.height * scale;
  ctx.globalAlpha = 0.35;
  ctx.drawImage(bg, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
  ctx.globalAlpha = 1;
}

function drawSprite(img, x, y, size) {
  if (!img) return;
  ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
}

function drawHUD() {
  if (player.shield > 0) {
    ctx.strokeStyle = "rgba(90, 200, 255, 0.8)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.size * 0.6, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function draw() {
  drawStars();
  drawBackground();

  bullets.forEach((bullet) => {
    drawSprite(images[`bullets:${bullet.spriteIndex}`], bullet.x, bullet.y, 18);
  });

  enemies.forEach((enemy) => {
    drawSprite(images[`enemies:${enemy.spriteIndex}`], enemy.x, enemy.y, enemy.size);
  });

  bosses.forEach((boss) => {
    drawSprite(images[`bosses:${boss.spriteIndex}`], boss.x, boss.y, boss.size);
  });

  powerups.forEach((powerup) => {
    drawSprite(images[`powerups:${powerup.spriteIndex}`], powerup.x, powerup.y, powerup.size);
  });

  drawSprite(images[`player:${player.spriteIndex}`], player.x, player.y, player.size);

  explosions.forEach((explosion) => {
    const size = 40 + (28 - explosion.life) * 2.4;
    ctx.globalAlpha = Math.max(0, explosion.life / 28);
    drawSprite(images["explosions:0"], explosion.x, explosion.y, size);
    ctx.globalAlpha = 1;
  });

  drawHUD();
}

function loop() {
  if (gameState.running && !gameState.paused) {
    updateStars();
    updatePlayer();
    updateBullets();
    updateEnemies();
    updateBosses();
    updatePowerups();
    updateExplosions();
    checkCollisions();
    waveEl.textContent = gameState.wave;
  }

  draw();
  requestAnimationFrame(loop);
}

function endGame() {
  gameState.running = false;
  overlay.classList.remove("hidden");
  overlay.querySelector("h2").textContent = "Mission Failed";
  overlay.querySelector("button").textContent = "Retry";
}

function resetGame() {
  gameState.running = true;
  gameState.paused = false;
  gameState.score = 0;
  gameState.health = 100;
  gameState.wave = 1;
  gameState.backgroundIndex = 0;
  bullets.length = 0;
  enemies.length = 0;
  bosses.length = 0;
  powerups.length = 0;
  explosions.length = 0;
  player.x = canvas.width / 2;
  player.y = canvas.height * 0.78;
  player.shield = 0;
  player.spriteIndex = 0;
  scoreEl.textContent = "0";
  healthEl.textContent = "100";
  waveEl.textContent = "1";
  setWeapon(0);
}

function setPointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width) * canvas.width;
  const y = ((event.clientY - rect.top) / rect.height) * canvas.height;
  input.pointer.x = x;
  input.pointer.y = y;
}

canvas.addEventListener("pointerdown", (event) => {
  input.pointer.active = true;
  input.firing = true;
  setPointerPosition(event);
});

canvas.addEventListener("pointermove", (event) => {
  if (input.pointer.active) setPointerPosition(event);
});

canvas.addEventListener("pointerup", () => {
  input.pointer.active = false;
  input.firing = false;
});

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    input.firing = true;
  }
  if (event.key.toLowerCase() === "p" && gameState.running) {
    gameState.paused = !gameState.paused;
  }
  if (["1", "2", "3", "4"].includes(event.key)) {
    setWeapon(Number(event.key) - 1);
  }
  input.keys.add(event.key.toLowerCase());
});

window.addEventListener("keyup", (event) => {
  if (event.key === " ") {
    input.firing = false;
  }
  input.keys.delete(event.key.toLowerCase());
});

startButton.addEventListener("click", () => {
  resetGame();
  overlay.classList.add("hidden");
});

loadImages()
  .then(() => {
    loop();
  })
  .catch(() => {
    overlay.querySelector("h2").textContent = "Assets missing";
  });
