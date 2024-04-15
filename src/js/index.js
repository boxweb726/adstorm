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

const swiper = new Swiper('#main-portfolio', {
  slidesPerView: 'auto',
});
