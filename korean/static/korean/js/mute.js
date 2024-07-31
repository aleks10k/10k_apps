
let muted = localStorage['muted'] && ['true', 'false'].includes(localStorage['muted']) ? JSON.parse(localStorage['muted']) : false;

let htmlMuteBtn = document.getElementById('js-mute-btn');
htmlMuteBtn.addEventListener('click', () => {switchMuting();});

if (muted === true) {mute();};

const correctAnswer = new Audio('/static/korean/sounds/correct.mp3');
const incorrectAnswer = new Audio('/static/korean/sounds/incorrect.mp3');

function playSound(sound) {
    if (muted == true) {} else {sound.play();};
};

function mute() {
    htmlMuteBtn.innerText = 'volume_off';
    localStorage['muted'] = true;
    muted = true;
};
  
function unmute() {
    htmlMuteBtn.innerText = 'volume_up';
    localStorage['muted'] = false;
    muted = false;
};
  
function switchMuting() {
    if (muted == false) {mute();} else {unmute();};
};
