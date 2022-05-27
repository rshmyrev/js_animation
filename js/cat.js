//spriteSheet definition
var spriteSheet = document.getElementById("cat");
const sprites = 12,
    spriteSheetHeight = 2400,
    spriteHeight = spriteSheetHeight / sprites,
    spriteStep = spriteHeight, //difference between two sprites
    spriteWidth = 400;

//path definition
const pathLength = 350,
    pathStepLength = pathLength / sprites,
    pathStartPosition = parseInt(getComputedStyle(spriteSheet).left, 10)

//time control
var animationInterval;
var isPaused = false;
var isStopped = false;
const cycleDuration = 1.5, //time for full cycle
    delay = cycleDuration / sprites * 1000; //in millisecond(ms)

//start position
var position = spriteHeight; //start position for the image
var wayPosition = pathStartPosition;

function stepAnimation(direction = 'left') {
    spriteSheet.style.backgroundPosition = `0px -${position}px`;
    spriteSheet.style.left = `${wayPosition}px`;

    if (position < spriteSheetHeight) {
        //increment the position by the width of each sprite each time
        position = position + spriteStep;
    } else {
        //reset the position to show first sprite after the last one
        position = spriteHeight;
    }

    if (wayPosition > spriteWidth * -1) {
        wayPosition = wayPosition - pathStepLength;
    } else {
        wayPosition = pathStartPosition;
    }
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
    document.getElementById("stopped").style.visibility = 'visible';
}

function catClick() {
    if (isStopped) {
        startAnimation();
        isStopped = false;
    } else {
        stopAnimation();
        isStopped = true;
    }
}

document.onkeydown = function (e) {
    console.log(e.code)
    if (e.code === 'Space') {
        isPaused = !isPaused
    } else if (e.code === 'ArrowLeft') {
        isPaused = true
        stepAnimation()
    }
}

//Start animation
startAnimation();
