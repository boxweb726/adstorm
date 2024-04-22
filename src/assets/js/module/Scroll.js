export default class Scroll {
  constructor({ ...prop }) {
    this.target = prop.target;

    this.init();
  }

  reset() {
    this.offsetTop = this.target.offsetTop;
    this.buffer = window.innerHeight / 3;
  }

  addClassActive() {
    if (window.scrollY > this.offsetTop - this.buffer) {
      this.target.classList.add('js-active');
    }
  }

  handleScrollEvt() {
    this.addClassActive();
  }

  addResizeEvt() {
    window.addEventListener('resize', this.reset.bind(this));
  }

  addScrollEvt() {
    window.addEventListener('scroll', this.handleScrollEvt.bind(this));
  }

  init() {
    this.reset();
    this.addClassActive();
    this.addScrollEvt();
    // this.addResizeEvt();
  }
}
