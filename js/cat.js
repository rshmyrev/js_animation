//spriteSheet definition
var spriteSheet = document.getElementById("cat");
const sprites = 12,
    spriteSheetHeight = 2400,
    spriteHeight = spriteSheetHeight / sprites,
    spriteStepLength = spriteHeight, //difference between two sprites
    spriteWidth = 400;

//path definition
const pathLength = 350,
    pathStepLength = pathLength / sprites;

//time control
var animationInterval;
var isPaused = false;
const cycleDuration = 1.5, //time for full cycle
    delay = cycleDuration / sprites * 1000; //in millisecond(ms)

//start position
const spriteStartPosition = 0,
    spriteFinishPosition = spriteSheetHeight - spriteHeight,
    pathStartPosition = parseInt(getComputedStyle(spriteSheet).left, 10),
    pathFinishPosition = 0 - spriteWidth;
var spritePosition = spriteStartPosition, //start position for the image
    wayPosition = pathStartPosition,
    directionForward = true;

function stepAnimation(direction = 'forward') {
    if (directionForward) {
        if (spritePosition < spriteFinishPosition) {
            //increment the position by the width of each sprite each time
            spritePosition = spritePosition + spriteStepLength;
        } else {
            //reset the position to show first sprite after the last one
            spritePosition = spriteStartPosition;
        }

        if (wayPosition > pathFinishPosition) {
            wayPosition = wayPosition - pathStepLength;
        } else {
            wayPosition = pathStartPosition;
        }

    } else {
        if (spritePosition > spriteStartPosition) {
            spritePosition = spritePosition - spriteStepLength;
        } else {
            spritePosition = spriteFinishPosition;
        }

        if (wayPosition < pathStartPosition) {
            wayPosition = wayPosition + pathStepLength;
        } else {
            wayPosition = pathFinishPosition;
        }
    }

    spriteSheet.style.backgroundPosition = `0px -${spritePosition}px`;
    spriteSheet.style.left = `${wayPosition}px`;
}

function startAnimation() {
    animationInterval = setInterval(() => {
        if (!isPaused) {
            stepAnimation()
        }
    }, delay);
}

function stopAnimation() {
    clearInterval(animationInterval);
}

function catClick() {
    directionForward = !directionForward;
}

document.onkeydown = function (e) {
    if (e.code === 'Space') {
        isPaused = !isPaused;
    } else if (e.code === 'ArrowLeft') {
        isPaused = true;
        directionForward = true;
        stepAnimation();
    } else if (e.code === 'ArrowRight') {
        isPaused = true
        directionForward = false;
        stepAnimation('backward');
    }
}

//Start animation
startAnimation();
