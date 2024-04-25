import { isMobile } from './utill';

export default class List {
  constructor({ ...prop }) {
    this.originData = prop.data;
    this.target = document.getElementById(prop.id);
    this.renderHtml = prop.renderHtml;
    this.useCategory = { default: 'all', ...prop.useCategory };
    this.currentCategory = this.useCategory.default;
    this.useCategoryData =
      this.currentCategory === 'all'
        ? this.originData
        : this.originData.filter(
            (item) => item.category === this.useCategory.default,
          );
    this.listLimit = prop.listLimit;
    this.usePaging = {
      id: false,
      increase: 6,
      initNum: {
        pc: 9,
        mo: 6,
      },
      currentPage: 0,
      ...prop.usePaging,
    };

    if (this.usePaging.id) {
      this.usePaging.target = document.getElementById(this.usePaging.id);
      this.usePaging.maxPage = this.getMaxPage();
    }

    this.init();
  }

  getMaxPage() {
    const listLength = this.useCategoryData.length;
    const initLength = this.usePaging.initNum[isMobile()];

    return listLength > initLength
      ? Math.ceil((listLength - initLength) / this.usePaging.increase)
      : 0;
  }

  findCategoryList(category) {
    this.useCategoryData = this.originData.filter(
      (item) => item.category === category,
    );
  }

  findPagingList() {
    let result = [...this.useCategoryData];
    const initEndIdx = this.usePaging.initNum[isMobile()];
    let startIdx = 0;
    let endIdx = 0;

    if (this.usePaging.currentPage === 0) {
      endIdx = initEndIdx;
    } else {
      startIdx =
        initEndIdx + (this.usePaging.currentPage - 1) * this.usePaging.increase;
      endIdx = startIdx + this.usePaging.increase;

      if (this.usePaging.currentPage === this.usePaging.maxPage) {
        endIdx = result.length;
      }
    }

    result = result.slice(startIdx, endIdx);

    return result;
  }

  printList(listArr) {
    let result = '';
    const arrlength = listArr.length;

    for (let i = 0; i < arrlength; i += 1) {
      result += this.renderHtml(listArr[i]);

      this.target.insertAdjacentHTML('beforeend', this.renderHtml(listArr[i]));
    }

    if (
      this.usePaging.id &&
      this.usePaging.currentPage === this.usePaging.maxPage
    )
      this.usePaging.target.classList.add('blind');

    return result;
  }

  addList() {
    this.usePaging.currentPage += 1;

    this.printList(this.findPagingList());
  }

  initList() {
    let listArr = this.listLimit
      ? this.useCategoryData.slice(0, this.listLimit)
      : this.useCategoryData;

    if (this.usePaging.id) {
      listArr = this.findPagingList();
      this.usePaging.target.classList.remove('blind');
    }

    this.target.innerHTML = '';
    this.printList(listArr);
  }

  reset() {
    this.usePaging.currentPage = 0;
    this.usePaging.maxPage = this.getMaxPage();
  }

  handleResize() {
    this.reset();
    this.initList();
  }

  addResizeEvt() {
    let timer;

    window.addEventListener('resize', () => {
      clearTimeout(timer);
      timer = setTimeout(() => this.handleResize(), 100);
    });
  }

  addCategoryEvt() {
    const $categoryTab = document.getElementById(this.useCategory.id);

    $categoryTab.addEventListener('click', (e) => {
      const $this = e.target;
      const category = $this.getAttribute('data-category');

      if (category && category !== this.currentCategory) {
        const $active = $categoryTab.querySelector('.active');

        $active.classList.remove('active');
        $this.classList.add('active');

        this.currentCategory = category;
        if (category === 'all') {
          this.useCategoryData = this.originData;
        } else {
          this.findCategoryList(category);
        }

        this.reset();
        this.initList();
      }
    });
  }

  addMoreEvt() {
    const $btnMore = this.usePaging.target;

    $btnMore.addEventListener('click', (e) => {
      this.addList();
    });
  }

  init() {
    this.initList();
    this.addResizeEvt();
    if (this.useCategory.id) this.addCategoryEvt();
    if (this.usePaging.id) this.addMoreEvt();
  }
}
