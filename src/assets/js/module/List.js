import { list } from 'postcss';

export default class List {
  constructor({ ...prop }) {
    this.data = prop.data;
    this.target = document.getElementById(prop.id);
    this.renderHtml = prop.renderHtml;
    this.category = { default: 'all', ...prop.category };
    this.currentCategory = this.category.default;
    this.categoryData =
      this.currentCategory === 'all'
        ? this.data
        : this.data.filter((item) => item.category === this.category.default);
    this.btnMore = {
      id: false,
      increase: 6,
      pcInitNum: 9,
      moInitNum: 6,
      currentPage: 0,
      ...prop.btnMore,
    };
    this.isInit = false;

    this.init();
  }

  static isMobile() {
    return window.innerWidth <= 768;
  }

  findList(category) {
    this.categoryData = this.data.filter((item) => item.category === category);
  }

  printList() {
    let listHtml = '';

    if (this.btnMore.id) {
      const length = List.isMobile()
        ? this.btnMore.moInitNum
        : this.btnMore.pcInitNum;

      for (let i = 0; i < length; i += 1) {
        console.log(i);
        listHtml += this.renderHtml(this.categoryData[i]);
      }
    } else {
      this.categoryData.forEach((item) => {
        listHtml += this.renderHtml(item);
      });
    }

    this.target.innerHTML = listHtml;
  }

  handleResize() {
    this.printList();
  }

  addResizeEvt() {
    let timer;

    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => this.handleResize(), 100);
    });
  }

  addCategoryEvt() {
    const $categoryTab = document.getElementById(this.category.id);

    $categoryTab.addEventListener('click', (e) => {
      const category = e.target.getAttribute('data-category');

      if (category && category !== this.currentCategory) {
        this.currentCategory = category;

        if (category === 'all') {
          this.categoryData = this.data;
        } else {
          this.findList(category);
        }

        this.printList();
      }
    });
  }

  init() {
    this.printList();
    this.isInit = true;
    this.addResizeEvt();
    if (this.category.id) this.addCategoryEvt();
  }
}
