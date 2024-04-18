import Swiper from 'swiper';
import 'swiper/css';
import dataList from './data.json';
import List from './module/List';

const portfolioList = new List({
  data: dataList.result,
  id: 'portfolioList',
  renderHtml(data) {
    return `<li class="list__item">
      <a href="./detail/?id=${data.id}" class="list__link">
        <div class="img-box">
          <img src="../assets/images/portfolio_thumb_${data.id}_pc.jpg" alt="" class="m-hide">
          <img src="../assets/images/portfolio_thumb_${data.id}_mo.jpg" alt="" class="m-show">
        </div>
        <div class="list__text">
          <p class="list__title">${data.title}</p>
          <p class="list__data">${data.date}_${data.brand}</p>
        </div>
      </a>
    </li>`;
  },
  category: {
    id: 'portfolioTab',
    default: 'all',
  },
  btnMore: {
    id: 'btnMore',
    increase: 6,
  },
});

const tabSwiper = new Swiper('#portfolioTab', {
  slidesPerView: 'auto',
});
