import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import dataList from './data.json';
import List from './module/List';

const portfolioList = new List({
  data: dataList.result,
  id: 'portfolioList',
  renderHtml(data) {
    const { category } = data;
    const imgVer = {};

    return `<div class="swiper-slide portfolio-swiper__item">
      <a href="/portfolio/detail/?id=${data.id}" class="img-box">
        <img src="./assets/images/main_thumb_${data.id}_pc${imgVer[data.id]?.pc ? imgVer[data.id].pc : ''}.jpg" alt="" class="m-hide">
        <img src="./assets/images/main_thumb_${data.id}_mo${imgVer[data.id]?.mo ? imgVer[data.id].mo : ''}.jpg" alt="" class="m-show">
      </a>

      <!-- 슬라이드 내 텍스트 -->
      <div class="portfolio-swiper__txt">
        <p class="portfolio-swiper__title fadeInUp--01">${data.title}</p>
        <dl class="portfolio-swiper__desc en">
          <div class="portfolio-swiper__cont fadeInUp--02">
            <dt class="portfolio-swiper__info portfolio-swiper__info--typea">Date : </dt>
            <dd class="portfolio-swiper__info">${data.date}</dd>
          </div>
          <div class="portfolio-swiper__cont fadeInUp--03">
            <dt class="portfolio-swiper__info portfolio-swiper__info--typea">Brand : </dt>
            <dd class="portfolio-swiper__info kr">${data.brand}</dd>
          </div>
          <div class="portfolio-swiper__cont fadeInUp--04">
            <dt class="portfolio-swiper__info portfolio-swiper__info--typea">Type : </dt>
            <dd class="portfolio-swiper__info">${category.replace(/^[a-z]/, (char) => char.toUpperCase())}</dd>
          </div>
        </dl>
      </div>
    </div>`;
  },
});

function slideReset(el) {
  const $active = el.querySelectorAll('.active');
  Array.from($active).forEach((item) => {
    item.classList.remove('active');
  });
}

// main 포트폴리오 영역 스와이퍼
const swiper = new Swiper('#mainPortfolio', {
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // centeredSlides: true,
  // observer: true,
  on: {
    init() {
      const $slides = this.slides;

      $slides[0].classList.add('active');
    },
    slideChangeTransitionStart() {
      const $slides = this.slides;

      slideReset(this.el);
      $slides[this.snapIndex].classList.add('active');
    },
    // transitionEnd() {
    //   const $slides = this.slides;

    //   if (this.isEnd) {
    //     slideReset(this.el);
    //     $slides[$slides.length - 1].classList.add('active');
    //   }
    // },
  },
});
