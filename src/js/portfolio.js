import Swiper from 'swiper';
import 'swiper/css';
import dataList from '../data.json';
import List from './module/List';

// const portfolioList = new List({
//   data: dataList.result,
//   id: 'portfolio-list',
//   render(data) {
//     return `<li>${data.title} : ${data.date}</li>`;
//   },
// });

const tabSwiper = new Swiper('#portfolioTab', {
  slidesPerView: 'auto',
});
