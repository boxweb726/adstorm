export default class Header {
  constructor() {
    this.target = document.querySelector('header');
    this.wrapper = document.querySelector('.wrapper');

    this.init();
  }

  addScrollEvt() {
    this.prevScollY = window.scrollY;
    console.log(this.prevScollY);

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < this.prevScollY) {
        this.target.classList.add('fixed');
      } else {
        this.target.classList.remove('fixed');
      }
      this.prevScollY = currentScrollY;
    });
  }

  // addClickEvt() {

  // }

  init() {
    this.addScrollEvt();
  }
}
