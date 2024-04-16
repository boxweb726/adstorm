import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import dataList from '../data.json';
import List from './module/List';

// const portfolioList = new List({
//   data: dataList.result,
//   id: 'portfolio-list',
//   render(data) {
//     return `<li>${data.title} : ${data.date}</li>`;
//   },
// });

// main 포트폴리오 영역 스와이퍼
const swiper = new Swiper('#main-portfolio"', {
  slidesPerView: 'auto',
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
