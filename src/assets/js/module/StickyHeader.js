import { isMobile } from './utill';

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

    $btnOpen.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.target.classList.contains('js-open')) {
        this.target.classList.remove('js-open');
        document.body.style.cssText =
          'height: initial; overflow: initial; position: initial;';
      } else {
        this.target.classList.add('js-open');
        document.body.style.cssText =
          'height: 100%; overflow: hidden; position: fixed; top:0; left:0;';
      }
    });
  }

  addResizeEvt() {
    let timer;

    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (isMobile() === 'pc') {
          this.target.classList.remove('js-open');
          document.body.style.cssText = 'height: initial; overflow: initial;';
        }
      }, 100);
    });
  }

  init() {
    this.addScrollEvt();
    this.addClickEvt();
    this.addResizeEvt();
  }
}
