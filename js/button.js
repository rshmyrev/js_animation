var state = 'stop';

var playButton = document.getElementById("button_play").children[0];

function buttonBackPress() {
    console.log("button back invoked.");
}

function buttonForwardPress() {
    console.log("button forward invoked.");
}

function buttonRewindPress() {
    console.log("button rewind invoked.");
}

function buttonFastforwardPress() {
    console.log("button fast forward invoked.");
}

function buttonPlayPress() {
    if (state === 'stop') {
        state = 'play';
        playButton.setAttribute('class', "fa fa-pause");
    } else if (state === 'play' || state === 'resume') {
        state = 'pause';
        playButton.setAttribute('class', "fa fa fa-play");
    } else if (state === 'pause') {
        state = 'resume';
        playButton.setAttribute('class', "fa fa-pause");
    }
    console.log("button play pressed, play was " + state);
}

function buttonStopPress() {
    state = 'stop';
    playButton.setAttribute('class', "fa fa fa-play");
    console.log("button stop invoked.");
}