import dataList from '../data.json';
import List from './module/List';

const portfolioList = new List({
  data: dataList.result,
  el: 'portfolio-list',
  html: '***title*** : ***date***',
});

portfolioList.init();
