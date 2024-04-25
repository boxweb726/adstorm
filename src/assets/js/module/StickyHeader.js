export default class StickyHeader {
  constructor() {
    this.target = document.querySelector('header');
    this.wrapper = document.querySelector('.wrapper');

    this.init();
  }

  addScrollEvt() {
    this.prevScollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 0) {
        this.target.classList.add('js-fixed');

        if (currentScrollY < this.prevScollY) {
          this.target.classList.add('js-show');
        } else {
          this.target.classList.remove('js-show');
        }
      } else {
        this.target.classList.remove('js-fixed');
      }

      this.prevScollY = currentScrollY;
    });
  }

  addClickEvt() {
    const $btnOpen = this.target.querySelector('#btnOpen');

    console.log($btnOpen);
    $btnOpen.addEventListener('click', (e) => {
      e.preventDefault();

      this.target.classList.has('js-open');
    });
  }

  init() {
    this.addScrollEvt();
    this.addClickEvt();
  }
}
