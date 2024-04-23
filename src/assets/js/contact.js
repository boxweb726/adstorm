import Scroll from './module/Scroll';

const $scrollBox = document.querySelectorAll('.js-scroll');

Array.from($scrollBox).forEach((item) => {
  const scroll = new Scroll({
    target: item,
  });
});
