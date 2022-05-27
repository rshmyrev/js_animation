// Source: https://levelup.gitconnected.com/three-ways-to-animate-sprite-sheet-image-a5c000f0c579

var animationInterval;
var spriteSheet = document.getElementById("cat");
const frames = 12;
const cycleTime = 1.5; // time for full cycle
var lengthOfSpriteSheet = 2400;
const lengthOfEachSprite = lengthOfSpriteSheet / frames;
var isPaused = false;
const speed = frames / cycleTime; // fps
const delay = 1 / speed * 1000; //in millisecond(ms)
console.log(delay);

function stopAnimation() {
    clearInterval(animationInterval);
    document.getElementById("stopped").style.visibility = 'visible';
}

function startAnimation() {
    var position = lengthOfEachSprite; //start position for the image
    const diff = lengthOfEachSprite; //difference between two sprites

    animationInterval = setInterval(() => {
        if (!isPaused) {
            spriteSheet.style.backgroundPosition = `0px -${position}px`;

            if (position < lengthOfSpriteSheet) {
                position = position + diff;
            } else {
                //increment the position by the width of each sprite each time
                position = lengthOfEachSprite;
            }
            //reset the position to show first sprite after the last one
        }
    }, delay);
}

//Start animation
startAnimation();
