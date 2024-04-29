import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
// import dataList from './data.json';
import dataList from './dataList';
import StickyHeader from './module/StickyHeader';
import List from './module/List';
import Scroll from './module/Scroll';

const header = new StickyHeader();

const portfolioList = new List({
  data: dataList.result.slice(0, 12),
  id: 'portfolioList',
  setImgUrl(id) {
    const imgVer = {};

    return {
      pc: `./assets/images/main_thumb_${id}_pc${imgVer[id]?.pc ? imgVer[id].pc : ''}.jpg`,
      mo: `./assets/images/main_thumb_${id}_mo${imgVer[id]?.mo ? imgVer[id].mo : ''}.jpg`,
    };
  },
  renderHtml(data) {
    const { category } = data;

    return `<div class="swiper-slide portfolio-swiper__item">
      <a href="./portfolio/detail/?id=${data.id}" class="img-box portfolio-swiper__img">
        <img src="${data.imgUrl.pc}" alt="" class="m-hide">
        <img src="${data.imgUrl.mo}" alt="" class="m-show">
      </a>

      <div class="portfolio-swiper__txt">
        <p class="portfolio-swiper__title pc-mb-25 mo-mb-35 fade-in-up fade-in-up--01">${data.title.replace('<br>', '')}</p>
        <dl class="portfolio-swiper__desc en">
          <div class="portfolio-swiper__cont fade-in-up fade-in-up--02">
            <dt class="portfolio-swiper__info portfolio-swiper__info--typea">Date:</dt>
            <dd class="portfolio-swiper__info">${data.date}</dd>
          </div>
          <div class="portfolio-swiper__cont fade-in-up fade-in-up--03">
            <dt class="portfolio-swiper__info portfolio-swiper__info--typea">Brand:</dt>
            <dd class="portfolio-swiper__info portfolio-swiper__info--typeb">${data.brand}</dd>
          </div>
          <div class="portfolio-swiper__cont fade-in-up fade-in-up--04">
            <dt class="portfolio-swiper__info portfolio-swiper__info--typea">Type:</dt>
            <dd class="portfolio-swiper__info">${category.replace(/^[a-z]/, (char) => char.toUpperCase())}</dd>
          </div>
        </dl>
      </div>
    </div>
    `;
  },
  // listLimit: 12,
});

// main 포트폴리오 영역 스와이퍼
const swiper = new Swiper('#mainPortfolio', {
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // observer: true,
  // observeParents: true,
  resizeObserver: true,
});

const $scrollBox = document.querySelectorAll('.js-scroll');

Array.from($scrollBox).forEach((item) => {
  const scroll = new Scroll({
    target: item,
  });
});
