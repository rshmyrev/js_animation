//spriteSheet definition
var spriteSheet = document.getElementById("man");
const
    spriteSheetWidth = 1142,
    spriteSheetHeight = 635,
    spriteSheetColumns = 12,
    spriteSheetRows = 4,
    spriteWidth = 95.7,
    spriteHeight = spriteSheetHeight / spriteSheetRows,
    sprites = spriteSheetColumns,
    spriteStepLength = spriteWidth //difference between two sprites
;
// console.log(spriteSheetWidth / spriteSheetColumns, spriteSheetHeight / spriteSheetRows);
console.log(spriteWidth, spriteHeight);


//figure definition
const figureStepLength = 10;
console.log(figureStepLength);

//start position
const
    spriteStartPos = 0,
    spriteFinishPos = spriteSheetWidth - spriteStepLength,
    figureStartX = parseInt(getComputedStyle(spriteSheet).left, 10),
    figureStartY = parseInt(getComputedStyle(spriteSheet).top, 10),
    figureMinX = 0,
    figureMinY = 0,
    figureMaxX = parseInt(getComputedStyle(spriteSheet.parentNode).width, 10) - spriteWidth,
    figureMaxY = parseInt(getComputedStyle(spriteSheet.parentNode).height, 10) - spriteHeight;
var spritePosX = spriteStartPos, //start position for the image
    spritePosY = 0,
    figurePosX = figureStartX,
    figurePosY = figureStartY,
    direction = 'down';

console.log(figureStartX, figureStartY, figureMaxX, figureMaxY)

//time control
var animationInterval;
var isPaused = true;
const
    cycleDuration = 1, //time for full cycle
    delay = cycleDuration / sprites * 1000; //in millisecond(ms)


function calcSpritePosition() {
    if (spritePosX < spriteFinishPos) {
        spritePosX += spriteStepLength;
    } else {
        spritePosX = spriteStartPos;
    }
}

function calcFigurePosition() {
    if (direction === 'down') {
        figurePosY += figureStepLength;
    } else if (direction === 'up') {
        figurePosY -= figureStepLength;
    } else if (direction === 'left') {
        figurePosX -= figureStepLength;
    } else if (direction === 'right') {
        figurePosX += figureStepLength;
    }
    if (figurePosY > figureMaxY) {
        figurePosY = figureMaxY;
    }
    if (figurePosY < figureMinY) {
        figurePosY = figureMinY;
    }
    if (figurePosX > figureMaxX) {
        figurePosX = figureMaxX;
    }
    if (figurePosX < figureMinX) {
        figurePosX = figureMinX;
    }
}

function stepAnimation() {
    calcSpritePosition();
    calcFigurePosition();

    spriteSheet.style.backgroundPosition = `-${spritePosX}px -${spritePosY}px`;
    spriteSheet.style.left = `${figurePosX}px`;
    spriteSheet.style.top = `${figurePosY}px`;
    // console.log(spritePosY, figurePosY);
}

const directionMap = {
    'down': 0,
    'left': 159,
    'right': 159 * 2,
    'up': 159 * 3
}

function changeDirection(new_direction) {
    if (direction !== new_direction) {
        spritePosY = directionMap[new_direction]
        spritePosX = spriteStartPos
        direction = new_direction
    }
}

function stepDirection(new_direction) {
    changeDirection(new_direction);
    stepAnimation();
}

function startAnimation() {
    animationInterval = setInterval(() => {
        if (!isPaused) {
            stepAnimation()
        }
    }, delay);
}

function startRandomWalk() {
    animationInterval = setInterval(() => {
        var index = Math.floor(Math.random() * 4),
            new_direction = Object.keys(directionMap)[index];
        changeDirection(new_direction);
        console.log(direction);
    }, delay * 10);
}

function stopAnimation() {
    clearInterval(animationInterval);
}

function onClick() {

}


document.onkeydown = function (e) {
    if (e.code === 'Space') {
        isPaused = !isPaused;
    } else if (e.code === 'ArrowLeft') {
        stepDirection('left')
    } else if (e.code === 'ArrowRight') {
        stepDirection('right')
    } else if (e.code === 'ArrowUp') {
        stepDirection('up')
    } else if (e.code === 'ArrowDown') {
        stepDirection('down')
    }
}

// function get_mouse_position(e) {
document.onclick = function (e) {
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    console.log("Left? : " + x + " ; Top? : " + y + ".");
}

// spriteSheet.onmousemove = null;

//Start animation
startAnimation();
// startRandomWalk();
