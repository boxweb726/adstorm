import Swiper from 'swiper';
import 'swiper/css';
import dataList from '../data.json';
import List from './module/List';

const portfolioList = new List({
  data: dataList.result,
  id: 'portfolio-list',
  renderHtml(data) {
    return `<li>${data.title} : ${data.date}</li>`;
  },
  category: {
    id: 'portfolioTab',
  },
});

const tabSwiper = new Swiper('#portfolioTab', {
  slidesPerView: 'auto',
});
