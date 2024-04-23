export default class Scroll {
  constructor({ ...prop }) {
    this.target = prop.target;

    this.init();
  }

  reset() {
    this.offsetTop = this.target.offsetTop;
    this.buffer = window.innerHeight / 2;
  }

  addClassActive() {
    if (window.scrollY > this.offsetTop - this.buffer) {
      this.target.classList.add('js-active');
      window.removeEventListener('scroll', this.handleScrollEvt);
    }
  }

  addScrollEvt() {
    this.handleScrollEvt = this.addClassActive.bind(this);
    window.addEventListener('scroll', this.handleScrollEvt);
  }

  addResizeEvt() {
    window.addEventListener('resize', this.reset.bind(this));
  }

  init() {
    this.reset();
    this.addScrollEvt();
    this.addClassActive();
    this.addResizeEvt();
  }
}
