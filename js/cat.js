// Source: https://levelup.gitconnected.com/three-ways-to-animate-sprite-sheet-image-a5c000f0c579

var animationInterval;
var spriteSheet = document.getElementById("cat");
var lengthOfSpriteSheet = 2400;
var lengthOfEachSprite = 200;

function stopAnimation() {
    clearInterval(animationInterval);
}

function startAnimation() {
    var position = lengthOfEachSprite; //start position for the image
    const speed = 100; //in millisecond(ms)
    const diff = lengthOfEachSprite; //difference between two sprites

    animationInterval = setInterval(() => {
        spriteSheet.style.backgroundPosition = `0px -${position}px`;

        if (position < lengthOfSpriteSheet) {
            position = position + diff;
        } else {
            //increment the position by the width of each sprite each time
            position = lengthOfEachSprite;
        }
        //reset the position to show first sprite after the last one
    }, speed);
}

//Start animation
startAnimation();
