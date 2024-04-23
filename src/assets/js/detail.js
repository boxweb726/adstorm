import dataList from './data.json';
import Project from './module/Project';
import Scroll from './module/Scroll';

const project = new Project({
  data: dataList.result,
  target: 'main',
  renderHtml(data) {
    return `<section class="width-full">
    <div class="detail pc-pb-160 mo-pb-120">
      <div class="inner-1240">
        <div class="js-scroll">
          <div class="detail__txt-box pc-pb-60 mo-pb-55 scroll-wrapper">
            <h2 class="detail__title pc-pt-115 pc-pb-120 mo-pt-90 mo-pb-105 scroll-inner scroll-inner--up">${data.title}</h2>
            <dl class="detail__info scroll-inner scroll-inner--step01 scroll-inner--up">
              <dt>Date.</dt>
              <dd>${data.date}</dd>
              <dt>Brand.</dt>
              <dd class="detail__info--space">${data.brand}</dd>
              <dt>Type.</dt>
              <dd>${data.category}</dd>
            </dl>
          </div>
        </div>
      </div>
      <!--// 상단 타이틀 -->
  
      <div class="detail__contents">
        <div class="img-box detail__img-box">
          <img src="/assets/images/detail_${data.id}_01_pc.jpg" alt="" class="m-hide">
          <img src="/assets/images/detail_${data.id}_01_mo.jpg" alt="" class="m-show">
        </div>
        <!-- overview -->
        <div class="inner-1240">
          <div class="detail__overview pc-pt-120 pc-pb-130 mo-pt-100 mo-pb-90">
            <h3 class="detail__sub pc-pb-45 mo-pb-50">OVERVIEW</h3>
            <p class="detail_desc">${data.overview}</p>
          </div>
        </div>
        <!--// overview -->
        <div class="img-box detail__img-box">
          <img src="/assets/images/detail_${data.id}_02_pc.jpg" alt="" class="m-hide">
          <img src="/assets/images/detail_${data.id}_02_mo.jpg" alt="" class="m-show">
        </div>
      </div>
    </div>
  </section>`;
  },
});

const $scrollBox = document.querySelectorAll('.js-scroll');

Array.from($scrollBox).forEach((item) => {
  const scroll = new Scroll({
    target: item,
  });
});
