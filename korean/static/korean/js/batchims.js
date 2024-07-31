const DOMAIN = 'http://127.0.0.1:8000/';


const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

let questions = [];

// let difficulty = localStorage['difficulty'] ? localStorage['difficulty'] : 'medium';

let hasBatchims1 = localStorage['batchims_1'] ? JSON.parse(localStorage['batchims_1']) : true;
let hasBatchims2 = localStorage['batchims_2'] ? JSON.parse(localStorage['batchims_2']) : true;
let hasBatchims3 = localStorage['batchims_3'] ? JSON.parse(localStorage['batchims_3']) : true;

let body = {
    'batchims_1': localStorage['batchims_1'] ? JSON.parse(localStorage['batchims_1']) : true,
    'batchims_2': localStorage['batchims_2'] ? JSON.parse(localStorage['batchims_2']) : true,
    'batchims_3': localStorage['batchims_3'] ? JSON.parse(localStorage['batchims_3']) : true,
};

class RequestSettings {

  constructor() {
    this.domain = DOMAIN;
    this.URL = 'korean/difficulty/batchims';
  };

  getBody() {

    return body;
  };

  getURL() {
      return this.domain + this.URL + '/';
    };
};

function getQuestions() {

  let request = new XMLHttpRequest();

  let parameters = new RequestSettings();

  let URL = parameters.getURL();

  request.open('POST', URL, true,);
  request.responseType = 'json';
  request.setRequestHeader('X-CSRFToken', `${csrftoken}`);
  request.setRequestHeader('Content-Type', 'json');

  request.onreadystatechange = () => {

    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {

      questions = request.response;

      for (i in questions) {

        showQuestion();
      };

    };
  };

  request.send(JSON.stringify(parameters.getBody()));
};

getQuestions();

class Score {
  constructor() {
    this.totalScore2 = localStorage['totalScore2'] ? Number(localStorage['totalScore2']) : 0;
    this.correctScore2 = localStorage['correctScore2'] ? Number(localStorage['correctScore2']) : 0;
  }


  increaseTotal() {
    this.totalScore2 += 1;
    localStorage['totalScore2'] = this.totalScore2;
  }

  increaseCorrect() {
    this.correctScore2 += 1;
    localStorage['correctScore2'] = this.correctScore2;
  }

  setup() {
    let percentage = Math.round(this.correctScore2 / this.totalScore2 * 100);
    if (percentage > 79) {

      htmlScoreFiller.style.backgroundColor = '';
    };
    if (percentage < 80 && percentage > 59) {
      htmlScoreFiller.style.backgroundColor = '#ff8906';
    };
    if (percentage < 60) {
      htmlScoreFiller.style.backgroundColor = '#e16162';
    };
    if (this.correctScore2 == 0 && this.totalScore2 == 0) {

      htmlScoreText.innerText = 'Answers: 0.';
      htmlScoreFiller.style.width = '0';

    } else {
      htmlScoreText.innerText =
        `Total: ${this.totalScore2}. Correct: ${this.correctScore2} (${percentage}%).`;
      htmlScoreFiller.style.width = `${percentage}%`;
    };
  }

  reset() {
    this.totalScore2 = 0;
    localStorage['totalScore2'] = 0;
    this.correctScore2 = 0;
    localStorage['correctScore2'] = 0;
    this.setup();
  }
}

let htmlScoreFiller = document.getElementById('js-score-filler');
let htmlScoreText = document.getElementById('js-score-text');
let htmlResetBtn = document.getElementById('js-reset-score');

let score = new Score();

score.setup();

let htmlQuetsionText = document.getElementById('js-question');
let htmlOptionBtn1 = document.getElementById('js-option-1');
let htmlOptionBtn2 = document.getElementById('js-option-2');
let htmlOptionBtn3 = document.getElementById('js-option-3');
let htmlOptionBtn4 = document.getElementById('js-option-4');

htmlResetBtn.addEventListener('click', ()=> { score.reset(); });
addOptionBtnEventListener(htmlOptionBtn1);
addOptionBtnEventListener(htmlOptionBtn2);
addOptionBtnEventListener(htmlOptionBtn3);
addOptionBtnEventListener(htmlOptionBtn4);

function showQuestion() {
  htmlQuetsionText.innerText = questions[0]['question'];
  htmlOptionBtn1.innerText = questions[0]['answer_options'][0];
  htmlOptionBtn2.innerText = questions[0]['answer_options'][1];
  htmlOptionBtn3.innerText = questions[0]['answer_options'][2];
  htmlOptionBtn4.innerText = questions[0]['answer_options'][3];
};

function addOptionBtnEventListener(button) {

  button.addEventListener('click', (event) => {

    makeButtonsInactive();
    checkAnswer();
    score.setup();

    setTimeout(function() {

      event.target.style.backgroundColor = '';
      event.target.style.color = '';

      makeButtonsActive();
      deleteAnsweredQuestion();
      showQuestion();

      if (questions.length == 1) {

        addQuestions();
      };
    }, 700);
  });
};

function makeButtonsInactive() {
  htmlOptionBtn1['disabled'] = true;
  htmlOptionBtn2['disabled'] = true;
  htmlOptionBtn3['disabled'] = true;
  htmlOptionBtn4['disabled'] = true;
};

function makeButtonsActive() {
  htmlOptionBtn1['disabled'] = false;
  htmlOptionBtn2['disabled'] = false;
  htmlOptionBtn3['disabled'] = false;
  htmlOptionBtn4['disabled'] = false;
};

function checkAnswer() {
  if (event.target.innerText == questions[0].answer) {
    playSound(correctAnswer);
    setColorCorrect();
    score.increaseTotal();
    score.increaseCorrect();
  } else {
    playSound(incorrectAnswer);
    setColorIncorrect();
    score.increaseTotal();
  };
};

function setColorCorrect() {
  event.target.style.backgroundColor = '#2cb67d';
  event.target.style.color = '#f8f5f2';
};

function setColorIncorrect() {
  event.target.style.backgroundColor = '#f45d48';
  event.target.style.color = '#f8f5f2'
};

function deleteAnsweredQuestion() {
  questions.shift();
};

function addQuestions() {

  let request = new XMLHttpRequest();

  let parameters = new RequestSettings();

  let URL = parameters.getURL();

  request.open('POST', URL, true,);
  request.responseType = 'json';
  request.setRequestHeader('X-CSRFToken', `${csrftoken}`);
  request.setRequestHeader('Content-Type', 'json');

  request.onreadystatechange = () => {

    if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {

      for (i in request.response) {
        questions.push(request.response[i]);
      };
    };
  };

  request.send(JSON.stringify(parameters.getBody()));
};


class ApplyButton {

  constructor(
      title,
      id,
  ) {
      this.title = title;
      this.id = id;
      this.button = document.getElementById(this.id);
  }

  getDisabled() {
      this.button.disabled = true;
      this.button.style.opacity = '0.25';
  }

  getEnabled() {
      this.button.disabled = false;
      this.button.style.opacity = '';
  }

  apply() {
    // if (easyBtn.isActive === true) {
      // difficulty = 'easy';
      // localStorage['difficulty'] = 'easy';

      body['batchims_1'] = batchims1Btn.isActive;
      body['batchims_2'] = batchims2Btn.isActive;
      body['batchims_3'] = batchims3Btn.isActive;
      localStorage['batchims_1'] = batchims1Btn.isActive;
      localStorage['batchims_2'] = batchims2Btn.isActive;
      localStorage['batchims_3'] = batchims3Btn.isActive;

      // localStorage['letters_4'] = letters4Btn.isActive;
      // bodyEasy['letters_4'] = letters4Btn.isActive;

      getQuestions();

    // } else if (mediumBtn.isActive === true) {
    //   difficulty = 'medium';
    //   localStorage['difficulty'] = 'medium';

    //   bodyMedium['syllables_1'] = syllables1Btn.isActive;
    //   bodyMedium['syllables_2'] = syllables2Btn.isActive;
    //   bodyMedium['syllables_3'] = syllables3Btn.isActive;
    //   bodyMedium['syllables_4'] = syllables4Btn.isActive;
    //   localStorage['syllables_1'] = syllables1Btn.isActive;
    //   localStorage['syllables_2'] = syllables2Btn.isActive;
    //   localStorage['syllables_3'] = syllables3Btn.isActive;
    //   localStorage['syllables_4'] = syllables4Btn.isActive;

    //   getQuestions();

    // } else if (hardBtn.isActive === true) {
    //   difficulty = 'hard';
    //   localStorage['difficulty'] = 'hard';
    //   getQuestions();
    // };

    sidebar.close();
  }
}


class CheckButton {

  constructor(
      title,
      id,
      isActive,
      activeStyleClass,
  ) {
      this.title = title;
      this.id = id;
      this.isActive = isActive;
      this.activeStyleClass = activeStyleClass;
      this.button = document.getElementById(this.id);
  }

  getActive() {
    this.isActive = true;
  }

  getInactive() {
    this.isActive = false;
  }

  setActiveStyle() {

    this.button.classList.add(this.activeStyleClass);
    this.button.innerText = 'done';
  }

  setDefaultStyle() {

    this.button.classList.remove(this.activeStyleClass);
    this.button.innerText = 'clear';
  }

  getActivated() {
    this.getActive();
    this.setActiveStyle();
  }

  switch() {

    if (this.isActive === true) {
      this.getInactive();
      this.setDefaultStyle();
    } else {
      this.getActive();
      this.setActiveStyle();
    };
      sidebar.check();
  }
}


// class DiffucultyButton {

//   constructor(
//       title,
//       id,
//       activeStyleClass,
//     ) {
//         this.title = title;
//         this.id = id;
//         this.activeStyleClass = activeStyleClass;

//         // this.deactivatedBtns = null;
//         // this.hiddenElements = null;
//         // this.unhiddenElements = null;
//         // this.isActive = difficulty === this.title ? true : false;
//         this.button = document.getElementById(this.id);
//       }

//   getActive() {
//     this.isActive = true;
//   }

//   deactivateButtons() {

//     let button;

//     for (let i in this.deactivatedBtns) {

//         button = this.deactivatedBtns[i];

//         button.isActive = false;

//         button.setDefaultStyle();
//     }
//   }

//   hideElements() {

//     let element;

//     for (let i in this.hiddenElements) {

//       element = this.hiddenElements[i];

//       element.hidden = true;
//     }
//   }

//   unhideElements() {

//     let element;

//     for (let i in this.unhiddenElements) {

//       element = this.unhiddenElements[i];

//       element.hidden = false;
//     }
//   }

//   setActiveStyle() {
//     this.button.classList.add(this.activeStyleClass);
//   }

//   setDefaultStyle() {
//     this.button.classList.remove(this.activeStyleClass);
//   }

//   setup() {
//     this.getActive();
//     this.deactivateButtons();
//     this.unhideElements();
//     this.hideElements();
//     this.setActiveStyle();
//     sidebar.check();
//   }
// }

class Sidebar {

  constructor(
    id,
  ) {
    this.id = id;
    this.sidebar = document.getElementById(this.id);
  }

  open() {

    if (window.innerWidth < 550) {
      this.sidebar.style.width = '85%';
      this.sidebar.style.borderWidth = '2px';
    } else if  (window.innerWidth >= 550 && window.innerWidth < 1200 ) {
      this.sidebar.style.width = '45%';
      this.sidebar.style.borderWidth = '2px';

    } else {
      this.sidebar.style.width = '34%';
      this.sidebar.style.borderWidth = '3px';
    };
  }

  close() {

    this.sidebar.style.width = '';
    this.sidebar.style.borderWidth = '0px';
  }

  switch() {

    if (this.sidebar.style.width === '') {
      this.open();
    } else {
      this.close();
    };
  }

  check() {

    if (
        batchims1Btn.isActive === false &&
        batchims2Btn.isActive === false &&
        batchims3Btn.isActive === false 
      ) {
          applyButton.getDisabled();
          sidebar.showWarning();
        } else {
          applyButton.getEnabled();
          sidebar.hideWarning();
        }
  }

  setup() {

    // if (difficulty === 'easy') {
    //   easyBtn.setup();
    // };
    // if (difficulty === 'medium') {
    //   mediumBtn.setup();
    // };
    // if (difficulty === 'hard') {
    //   hardBtn.setup();
    // };

    if (batchims1Btn.isActive === true) { batchims1Btn.getActivated() };
    if (batchims2Btn.isActive === true) { batchims2Btn.getActivated() };
    if (batchims3Btn.isActive === true) { batchims3Btn.getActivated() };
    // if (letters4Btn.isActive === true) {letters4Btn.getActivated()};
    // if (syllables1Btn.isActive === true) {syllables1Btn.getActivated()};
    // if (syllables2Btn.isActive === true) {syllables2Btn.getActivated()};
    // if (syllables3Btn.isActive === true) {syllables3Btn.getActivated()};
    // if (syllables4Btn.isActive === true) {syllables4Btn.getActivated()};
  }

  showWarning() {

    htmlWarningMsg.innerText = 'At least one of the options has to be selected!';
    htmlWarningMsg.style.padding = '0 0.25rem';
  }

  hideWarning() {

    htmlWarningMsg.innerText = '';
    htmlWarningMsg.style.padding = '';
  }
}


let htmlSettingsBtn = document.getElementById('js-settings-btn');
let htmlCloseSideBtn = document.getElementById('js-close-side-btn');
// let htmlEasyBtn = document.getElementById('js-easy-btn');
// let htmlMediumBtn = document.getElementById('js-medium-btn');
// let htmlHardBtn = document.getElementById('js-hard-btn');
let htmlBatchims1Btn = document.getElementById('js-batchims-1-btn');
let htmlBatchims2Btn = document.getElementById('js-batchims-2-btn');
let htmlBatchims3Btn = document.getElementById('js-batchims-3-btn');
// let htmlLetters4Btn = document.getElementById('js-letters-4-btn');
// let htmlSyllables1Btn = document.getElementById('js-syllables-1-btn');
// let htmlSyllables2Btn = document.getElementById('js-syllables-2-btn');
// let htmlSyllables3Btn = document.getElementById('js-syllables-3-btn');
// let htmlSyllables4Btn = document.getElementById('js-syllables-4-btn');
let htmlApplyButton = document.getElementById('js-apply-btn');
// let htmlEasyParameters = document.getElementById('js-easy-params');
// let htmlMediumParameters = document.getElementById('js-medium-params');
// let htmlHardParameters = document.getElementById('js-hard-params');
let htmlWarningMsg = document.getElementById('js-side-warning');
htmlSettingsBtn.addEventListener('click', ()=> {sidebar.switch();});
htmlCloseSideBtn.addEventListener('click', ()=> {sidebar.close();});
// htmlEasyBtn.addEventListener('click', () => {easyBtn.setup();});
// htmlMediumBtn.addEventListener('click', () => {mediumBtn.setup();});
// htmlHardBtn.addEventListener('click', () => {hardBtn.setup();});
htmlBatchims1Btn.addEventListener('click', () => {batchims1Btn.switch();}); // Should use event.target instead of the variable name?
htmlBatchims2Btn.addEventListener('click', () => {batchims2Btn.switch();});
htmlBatchims3Btn.addEventListener('click', () => {batchims3Btn.switch();});
// htmlLetters4Btn.addEventListener('click', () => {letters4Btn.switch();});
// htmlSyllables1Btn.addEventListener('click', () => {syllables1Btn.switch();});
// htmlSyllables2Btn.addEventListener('click', () => {syllables2Btn.switch();});
// htmlSyllables3Btn.addEventListener('click', () => {syllables3Btn.switch();});
// htmlSyllables4Btn.addEventListener('click', () => {syllables4Btn.switch();});
htmlApplyButton.addEventListener('click', () => {applyButton.apply();});

// let easyBtn = new DiffucultyButton('easy', 'js-easy-btn', 'active--green');
// let mediumBtn = new DiffucultyButton('medium', 'js-medium-btn', 'active--orange');
// let hardBtn = new DiffucultyButton('hard', 'js-hard-btn', 'active--red');
// easyBtn.deactivatedBtns = [mediumBtn, hardBtn];
// mediumBtn.deactivatedBtns = [easyBtn, hardBtn];
// hardBtn.deactivatedBtns = [easyBtn, mediumBtn];
// easyBtn.hiddenElements = [htmlMediumParameters, htmlHardParameters];
// mediumBtn.hiddenElements = [htmlEasyParameters, htmlHardParameters];
// hardBtn.hiddenElements = [htmlEasyParameters, htmlMediumParameters];
// easyBtn.unhiddenElements = [htmlEasyParameters];
// mediumBtn.unhiddenElements = [htmlMediumParameters];
// hardBtn.unhiddenElements = [htmlHardParameters];
let batchims1Btn = new CheckButton('batchims_1', 'js-batchims-1-btn', hasBatchims1, 'active--green');
let batchims2Btn = new CheckButton('batchims_2', 'js-batchims-2-btn', hasBatchims2, 'active--green');
let batchims3Btn = new CheckButton('batchims_3', 'js-batchims-3-btn', hasBatchims3, 'active--green');
// let letters4Btn = new CheckButton('letters_4', 'js-letters-4-btn', hasLetters4, 'active--green');
// let syllables1Btn = new CheckButton('syllables_1', 'js-syllables-1-btn', hasSyllables1, 'active--green');
// let syllables2Btn = new CheckButton('syllables_2', 'js-syllables-2-btn', hasSyllables2, 'active--green');
// let syllables3Btn = new CheckButton('syllables_3', 'js-syllables-3-btn', hasSyllables3, 'active--green');
// let syllables4Btn = new CheckButton('syllables_4', 'js-syllables-4-btn', hasSyllables4, 'active--green');
let applyButton = new ApplyButton('apply', 'js-apply-btn');
let sidebar = new Sidebar('js-sidebar');

sidebar.setup();


let muted = localStorage['muted'] && ['true', 'false'].includes(localStorage['muted']) ? JSON.parse(localStorage['muted']) : false;

let htmlMuteBtn = document.getElementById('js-mute-btn');
htmlMuteBtn.addEventListener('click', () => {switchMuting();});

// if (muted == false) {unmute();} else {mute();};
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
