
class SlideShow {

  constructor(title) {
    this.slideNumber = 1;
    this.title = title;
    this.slides = document.querySelectorAll(`[data-slide="${title}"]`);
    this.slideNextBtn = document.querySelector(`[data-prev-btn=${title}]`);
    this.slidePrevBtn = document.querySelector(`[data-next-btn=${title}]`);

    this.show(this.slideNumber);
    this.addListeners();

  }
  
  addListeners() {

    this.slidePrevBtn.addEventListener('click', () => { this.change(1) });
    this.slideNextBtn.addEventListener('click', () => { this.change(-1) });
  }

  show(n) {

    if (n > this.slides.length) {this.slideNumber = 1}

    if (n < 1) {this.slideNumber = this.slides.length}
  
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.display = "none";
    }
  
    this.slides[this.slideNumber-1].style.display = "block";
  }

  change(n) {
    
    this.show(this.slideNumber += n);
  }
}


slidesKorean = new SlideShow('korean');
slidesAnswer = new SlideShow('answer');
