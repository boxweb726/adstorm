import Swiper from 'swiper';
import 'swiper/css';
import dataList from './data.json';
import Header from './module/Header';
import List from './module/List';
import Scroll from './module/Scroll';

const header = new Header();

const portfolioList = new List({
  data: dataList.result,
  id: 'portfolioList',
  renderHtml(data) {
    const imgVer = {};

    return `<li class="list__item">
      <a href="./detail/?id=${data.id}" class="list__link">
        <div class="img-box">
          <img src="../assets/images/portfolio_thumb_${data.id}_pc${imgVer[data.id]?.pc ? imgVer[data.id].pc : ''}.jpg" alt="" class="m-hide">
          <img src="../assets/images/portfolio_thumb_${data.id}_mo${imgVer[data.id]?.mo ? imgVer[data.id].mo : ''}.jpg" alt="" class="m-show">
        </div>
        <div class="list__text">
          <p class="list__title">${data.title}</p>
          <p class="list__data">${data.date}_${data.brand}</p>
        </div>
      </a>
    </li>`;
  },
  useCategory: {
    id: 'portfolioTab',
    default: 'all',
  },
  usePaging: {
    id: 'btnMore',
    increase: 6,
  },
});

const tabSwiper = new Swiper('#portfolioTab', {
  slidesPerView: 'auto',
});

const $scrollBox = document.querySelectorAll('.js-scroll');

Array.from($scrollBox).forEach((item) => {
  const scroll = new Scroll({
    target: item,
  });
});
