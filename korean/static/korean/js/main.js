
const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

let questions = [];

let difficulty = localStorage['difficulty'] ? localStorage['difficulty'] : 'medium';

let hasLetters1 = localStorage['letters_1'] ? JSON.parse(localStorage['letters_1']) : true;
let hasLetters2 = localStorage['letters_2'] ? JSON.parse(localStorage['letters_2']) : true;
let hasLetters3 = localStorage['letters_3'] ? JSON.parse(localStorage['letters_3']) : true;
let hasLetters4 = localStorage['letters_4'] ? JSON.parse(localStorage['letters_4']) : true;

let hasSyllables1 = localStorage['syllables_1'] ? JSON.parse(localStorage['syllables_1']) : true;
let hasSyllables2 = localStorage['syllables_2'] ? JSON.parse(localStorage['syllables_2']) : true;
let hasSyllables3 = localStorage['syllables_3'] ? JSON.parse(localStorage['syllables_3']) : true;
let hasSyllables4 = localStorage['syllables_4'] ? JSON.parse(localStorage['syllables_4']) : true;

let bodyEasy = {
    'letters_1': localStorage['letters_1'] ? JSON.parse(localStorage['letters_1']) : true, 
    'letters_2': localStorage['letters_2'] ? JSON.parse(localStorage['letters_2']) : true, 
    'letters_3': localStorage['letters_3'] ? JSON.parse(localStorage['letters_3']) : true, 
    'letters_4': localStorage['letters_4'] ? JSON.parse(localStorage['letters_4']) : true, 
};

let bodyMedium = {
    'syllables_1': localStorage['syllables_1'] ? JSON.parse(localStorage['syllables_1']) : true, 
    'syllables_2': localStorage['syllables_2'] ? JSON.parse(localStorage['syllables_2']) : true, 
    'syllables_3': localStorage['syllables_3'] ? JSON.parse(localStorage['syllables_3']) : true, 
    'syllables_4': localStorage['syllables_4'] ? JSON.parse(localStorage['syllables_4']) : true,
};

let bodyHard = {};

class RequestSettings {

  constructor(difficulty) {
    this.domain = DOMAIN; 
    this.URL = 'korean/difficulty/';
    this.difficulty = ['easy', 'medium', 'hard', ].includes(difficulty) ? difficulty : 'medium';
  };

  getBody() {

    if (this.difficulty === 'easy') {

      return bodyEasy;

    } else if (this.difficulty === 'meduim') {

      return bodyMedium;

    } else if (this.difficulty === 'hard') {

      return bodyHard;

    } else {

      return bodyMedium;

    };
  };

  getURL() {
      return this.domain + this.URL + this.difficulty + '/';
    };
};

function getQuestions() {

  let request = new XMLHttpRequest();

  let parameters = new RequestSettings(difficulty);
  
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
    this.totalScore = localStorage['totalScore'] ? Number(localStorage['totalScore']) : 0;
    this.correctScore = localStorage['correctScore'] ? Number(localStorage['correctScore']) : 0;
  }


  increaseTotal() {
    this.totalScore += 1;
    localStorage['totalScore'] = this.totalScore;
  }

  increaseCorrect() {
    this.correctScore += 1;
    localStorage['correctScore'] = this.correctScore;
  }

  setup() {
    let percentage = Math.round(this.correctScore / this.totalScore * 100); 
    if (percentage > 79) {
  
      htmlScoreFiller.style.backgroundColor = '';
    };
    if (percentage < 80 && percentage > 59) {
      htmlScoreFiller.style.backgroundColor = '#ff8906';
    };
    if (percentage < 60) {
      htmlScoreFiller.style.backgroundColor = '#e16162';
    };
    if (this.correctScore == 0 && this.totalScore == 0) {
  
      htmlScoreText.innerText = 'Answers: 0.';
      htmlScoreFiller.style.width = '0';
    
    } else {
      htmlScoreText.innerText =
        `Total: ${this.totalScore}. Correct: ${this.correctScore} (${percentage}%).`;
      htmlScoreFiller.style.width = `${percentage}%`;
    };
  }

  reset() {
    this.totalScore = 0;
    localStorage['totalScore'] = 0;
    this.correctScore = 0;
    localStorage['correctScore'] = 0;
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
    
  let parameters = new RequestSettings(difficulty);

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
