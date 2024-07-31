
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
    if (easyBtn.isActive === true) {
      difficulty = 'easy';
      localStorage['difficulty'] = 'easy';
  
      bodyEasy['letters_1'] = letters1Btn.isActive;
      bodyEasy['letters_2'] = letters2Btn.isActive;
      bodyEasy['letters_3'] = letters3Btn.isActive;
      bodyEasy['letters_4'] = letters4Btn.isActive;
      localStorage['letters_1'] = letters1Btn.isActive;
      localStorage['letters_2'] = letters2Btn.isActive;
      localStorage['letters_3'] = letters3Btn.isActive;
      localStorage['letters_4'] = letters4Btn.isActive;

      getQuestions();
  
    } else if (mediumBtn.isActive === true) {
      difficulty = 'medium';
      localStorage['difficulty'] = 'medium';
  
      bodyMedium['syllables_1'] = syllables1Btn.isActive;
      bodyMedium['syllables_2'] = syllables2Btn.isActive;
      bodyMedium['syllables_3'] = syllables3Btn.isActive;
      bodyMedium['syllables_4'] = syllables4Btn.isActive;
      localStorage['syllables_1'] = syllables1Btn.isActive;
      localStorage['syllables_2'] = syllables2Btn.isActive;
      localStorage['syllables_3'] = syllables3Btn.isActive;
      localStorage['syllables_4'] = syllables4Btn.isActive;

      getQuestions();
  
    } else if (hardBtn.isActive === true) {
      difficulty = 'hard';
      localStorage['difficulty'] = 'hard';
      getQuestions();
    };
  
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


class DiffucultyButton {

  constructor(
      title,              
      id,                 
      activeStyleClass,   
    ) {
        this.title = title;
        this.id = id;
        this.activeStyleClass = activeStyleClass;

        this.deactivatedBtns = null;
        this.hiddenElements = null;
        this.unhiddenElements = null;
        this.isActive = difficulty === this.title ? true : false;
        this.button = document.getElementById(this.id);
      }     

  getActive() {
    this.isActive = true;
  }

  deactivateButtons() {

    let button;

    for (let i in this.deactivatedBtns) {

        button = this.deactivatedBtns[i];

        button.isActive = false;

        button.setDefaultStyle();
    }
  }

  hideElements() {

    let element;

    for (let i in this.hiddenElements) {
          
      element = this.hiddenElements[i];

      element.hidden = true; 
    }
  }
  
  unhideElements() {

    let element;

    for (let i in this.unhiddenElements) {
          
      element = this.unhiddenElements[i];

      element.hidden = false; 
    }
  }

  setActiveStyle() {
    this.button.classList.add(this.activeStyleClass);     
  }

  setDefaultStyle() {
    this.button.classList.remove(this.activeStyleClass);
  }

  setup() {
    this.getActive();
    this.deactivateButtons();
    this.unhideElements();
    this.hideElements();
    this.setActiveStyle();
    sidebar.check();
  }
} 

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

    // This one could be like:
    // let caseOne = (easyBtn... true ... && ... && ... &&)
    // let caseTwo = (mediumBtn... true ... && ... && ... &&)
    // if (caseOne || caseTwo) { applyButton.getDisabled() } else { ... }.

    if (
      (easyBtn.isActive === true) &&
      (
        letters1Btn.isActive === false &&
        letters2Btn.isActive === false &&
        letters3Btn.isActive === false &&
        letters4Btn.isActive === false
      )
    ) {
        applyButton.getDisabled();
        sidebar.showWarning();
    } else if (
      (mediumBtn.isActive === true) &&
      (
        syllables1Btn.isActive === false &&
        syllables2Btn.isActive === false &&
        syllables3Btn.isActive === false &&
        syllables4Btn.isActive === false
      )
    ) {
        applyButton.getDisabled();
        sidebar.showWarning();
    } else {
      applyButton.getEnabled();
      sidebar.hideWarning();
    };
  }

  setup() {

    if (difficulty === 'easy') {
      easyBtn.setup();
    };
    if (difficulty === 'medium') {
      mediumBtn.setup();
    };
    if (difficulty === 'hard') {
      hardBtn.setup();
    };

    if (letters1Btn.isActive === true) {letters1Btn.getActivated()};
    if (letters2Btn.isActive === true) {letters2Btn.getActivated()};
    if (letters3Btn.isActive === true) {letters3Btn.getActivated()};
    if (letters4Btn.isActive === true) {letters4Btn.getActivated()};
    if (syllables1Btn.isActive === true) {syllables1Btn.getActivated()};
    if (syllables2Btn.isActive === true) {syllables2Btn.getActivated()};
    if (syllables3Btn.isActive === true) {syllables3Btn.getActivated()};
    if (syllables4Btn.isActive === true) {syllables4Btn.getActivated()};
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
let htmlEasyBtn = document.getElementById('js-easy-btn');         
let htmlMediumBtn = document.getElementById('js-medium-btn');     
let htmlHardBtn = document.getElementById('js-hard-btn'); 
let htmlLetters1Btn = document.getElementById('js-letters-1-btn');
let htmlLetters2Btn = document.getElementById('js-letters-2-btn');
let htmlLetters3Btn = document.getElementById('js-letters-3-btn');
let htmlLetters4Btn = document.getElementById('js-letters-4-btn');
let htmlSyllables1Btn = document.getElementById('js-syllables-1-btn');
let htmlSyllables2Btn = document.getElementById('js-syllables-2-btn');
let htmlSyllables3Btn = document.getElementById('js-syllables-3-btn');
let htmlSyllables4Btn = document.getElementById('js-syllables-4-btn');
let htmlApplyButton = document.getElementById('js-apply-btn');
let htmlEasyParameters = document.getElementById('js-easy-params');
let htmlMediumParameters = document.getElementById('js-medium-params');
let htmlHardParameters = document.getElementById('js-hard-params');
let htmlWarningMsg = document.getElementById('js-side-warning');
htmlSettingsBtn.addEventListener('click', ()=> {sidebar.switch();});
htmlCloseSideBtn.addEventListener('click', ()=> {sidebar.close();});
htmlEasyBtn.addEventListener('click', () => {easyBtn.setup();});
htmlMediumBtn.addEventListener('click', () => {mediumBtn.setup();});
htmlHardBtn.addEventListener('click', () => {hardBtn.setup();});
htmlLetters1Btn.addEventListener('click', () => {letters1Btn.switch();}); // Should use event.target instead of the variable name?
htmlLetters2Btn.addEventListener('click', () => {letters2Btn.switch();});
htmlLetters3Btn.addEventListener('click', () => {letters3Btn.switch();});
htmlLetters4Btn.addEventListener('click', () => {letters4Btn.switch();});
htmlSyllables1Btn.addEventListener('click', () => {syllables1Btn.switch();});
htmlSyllables2Btn.addEventListener('click', () => {syllables2Btn.switch();});
htmlSyllables3Btn.addEventListener('click', () => {syllables3Btn.switch();});
htmlSyllables4Btn.addEventListener('click', () => {syllables4Btn.switch();});
htmlApplyButton.addEventListener('click', () => {applyButton.apply();});

let easyBtn = new DiffucultyButton('easy', 'js-easy-btn', 'active--green');
let mediumBtn = new DiffucultyButton('medium', 'js-medium-btn', 'active--orange');
let hardBtn = new DiffucultyButton('hard', 'js-hard-btn', 'active--red');
easyBtn.deactivatedBtns = [mediumBtn, hardBtn];
mediumBtn.deactivatedBtns = [easyBtn, hardBtn];
hardBtn.deactivatedBtns = [easyBtn, mediumBtn];
easyBtn.hiddenElements = [htmlMediumParameters, htmlHardParameters];
mediumBtn.hiddenElements = [htmlEasyParameters, htmlHardParameters];
hardBtn.hiddenElements = [htmlEasyParameters, htmlMediumParameters];
easyBtn.unhiddenElements = [htmlEasyParameters];
mediumBtn.unhiddenElements = [htmlMediumParameters];
hardBtn.unhiddenElements = [htmlHardParameters];
let letters1Btn = new CheckButton('letters_1', 'js-letters-1-btn', hasLetters1, 'active--green');
let letters2Btn = new CheckButton('letters_2', 'js-letters-2-btn', hasLetters2, 'active--green');
let letters3Btn = new CheckButton('letters_3', 'js-letters-3-btn', hasLetters3, 'active--green');
let letters4Btn = new CheckButton('letters_4', 'js-letters-4-btn', hasLetters4, 'active--green');
let syllables1Btn = new CheckButton('syllables_1', 'js-syllables-1-btn', hasSyllables1, 'active--green');
let syllables2Btn = new CheckButton('syllables_2', 'js-syllables-2-btn', hasSyllables2, 'active--green');
let syllables3Btn = new CheckButton('syllables_3', 'js-syllables-3-btn', hasSyllables3, 'active--green');
let syllables4Btn = new CheckButton('syllables_4', 'js-syllables-4-btn', hasSyllables4, 'active--green');
let applyButton = new ApplyButton('apply', 'js-apply-btn');
let sidebar = new Sidebar('js-sidebar');

sidebar.setup();
