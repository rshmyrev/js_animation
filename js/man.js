const spriteSheet = document.getElementById("man");
const SPRITE_SHEET_WIDTH = 1142;
const SPRITE_SHEET_HEIGHT = 635;
const SPRITE_SHEET_COLUMNS = 12;
const SPRITE_SHEET_ROWS = 4;
const SPRITE_WIDTH = 95.7;
const SPRITE_HEIGHT = SPRITE_SHEET_HEIGHT / SPRITE_SHEET_ROWS;
const SPRITES = SPRITE_SHEET_COLUMNS;
const SPRITE_STEP_LENGTH = SPRITE_WIDTH;

console.log(SPRITE_WIDTH, SPRITE_HEIGHT);

const FIGURE_STEP_LENGTH = 10;
console.log(FIGURE_STEP_LENGTH);

const SPRITE_START_POS = 0;
const SPRITE_FINISH_POS = SPRITE_SHEET_WIDTH - SPRITE_STEP_LENGTH;
const FIGURE_START_X = parseInt(getComputedStyle(spriteSheet).left, 10);
const FIGURE_START_Y = parseInt(getComputedStyle(spriteSheet).top, 10);
const FIGURE_MIN_X = 0;
const FIGURE_MIN_Y = 0;
const FIGURE_MAX_X = parseInt(getComputedStyle(spriteSheet.parentNode).width, 10) - SPRITE_WIDTH;
const FIGURE_MAX_Y = parseInt(getComputedStyle(spriteSheet.parentNode).height, 10) - SPRITE_HEIGHT;
let spritePosX = SPRITE_START_POS;
let spritePosY = 0;
let figurePosX = FIGURE_START_X;
let figurePosY = FIGURE_START_Y;
let direction = "down";

console.log(FIGURE_START_X, FIGURE_START_Y, FIGURE_MAX_X, FIGURE_MAX_Y);

let animationInterval;
let isPaused = true;
const CYCLE_DURATION = 1;
const DELAY = CYCLE_DURATION / SPRITES * 1000;

function calcSpritePosition() {
  if (spritePosX < SPRITE_FINISH_POS) {
    spritePosX += SPRITE_STEP_LENGTH;
  } else {
    spritePosX = SPRITE_START_POS;
  }
}

function calcFigurePosition() {
  if (direction === "down") {
    figurePosY += FIGURE_STEP_LENGTH;
  } else if (direction === "up") {
    figurePosY -= FIGURE_STEP_LENGTH;
  } else if (direction === "left") {
    figurePosX -= FIGURE_STEP_LENGTH;
  } else if (direction === "right") {
    figurePosX += FIGURE_STEP_LENGTH;
  }
  figurePosY = Math.min(Math.max(figurePosY, FIGURE_MIN_Y), FIGURE_MAX_Y);
  figurePosX = Math.min(Math.max(figurePosX, FIGURE_MIN_X), FIGURE_MAX_X);
}

function stepAnimation() {
  calcSpritePosition();
  calcFigurePosition();

  spriteSheet.style.backgroundPosition = `-${spritePosX}px -${spritePosY}px`;
  spriteSheet.style.left = `${figurePosX}px`;
  spriteSheet.style.top = `${figurePosY}px`;
}

const directionMap = {
  "down": 0,
  "left": 159,
  "right": 159 * 2,
  "up": 159 * 3,
};

function changeDirection(newDirection) {
  if (direction !== newDirection) {
    spritePosY = directionMap[newDirection];
    spritePosX = SPRITE_START_POS;
    direction = newDirection;
  }
}

function stepDirection(newDirection) {
  changeDirection(newDirection);
  stepAnimation();
}

function startAnimation() {
  animationInterval = setInterval(() => {
    if (!isPaused) {
      stepAnimation();
    }
  }, DELAY);
}

function stopAnimation() {
  clearInterval(animationInterval);
}

document.onkeydown = function (e) {
  if (e.code === "Space") {
    isPaused = !isPaused;
  } else if (e.code.startsWith("Arrow")) {
    stepDirection(e.key.toLowerCase().replace("arrow", ""));
  }
};

startAnimation();
