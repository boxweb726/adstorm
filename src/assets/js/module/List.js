export default class List {
  constructor({ ...prop }) {
    this.originData = prop.data;
    this.target = document.getElementById(prop.id);
    this.renderHtml = prop.renderHtml;
    this.category = { default: 'all', ...prop.category };
    this.currentCategory = this.category.default;
    this.categoryData =
      this.currentCategory === 'all'
        ? this.originData
        : this.originData.filter(
            (item) => item.category === this.category.default,
          );
    this.btnMore = {
      id: false,
      increase: 6,
      initNum: {
        pc: 9,
        mo: 6,
      },
      currentPage: 0,
      ...prop.btnMore,
    };
    this.isInit = false;

    if (this.btnMore.id) {
      this.btnMore.target = document.getElementById(this.btnMore.id);
      this.btnMore.maxPage = this.getMaxPage();
    }

    this.init();
  }

  static isMobile() {
    return window.innerWidth <= 768 ? 'mo' : 'pc';
  }

  getMaxPage() {
    const listLength = this.categoryData.length;
    const initLength = this.btnMore.initNum[List.isMobile()];

    return listLength > initLength
      ? Math.ceil((listLength - initLength) / this.btnMore.increase)
      : 0;
  }

  findList(category) {
    this.categoryData = this.originData.filter(
      (item) => item.category === category,
    );
  }

  pagingList() {
    let result = [...this.categoryData];
    const initEndIdx = this.btnMore.initNum[List.isMobile()];
    let startIdx = 0;
    let endIdx = 0;

    if (this.btnMore.currentPage === 0) {
      endIdx = initEndIdx;
    } else {
      startIdx =
        initEndIdx + (this.btnMore.currentPage - 1) * this.btnMore.increase;
      endIdx = startIdx + this.btnMore.increase;

      if (this.btnMore.currentPage === this.btnMore.maxPage) {
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

    if (this.btnMore.currentPage === this.btnMore.maxPage)
      this.btnMore.target.classList.add('blind');

    return result;
  }

  addList() {
    this.btnMore.currentPage += 1;

    this.printList(this.pagingList());
  }

  initList() {
    let listArr = this.categoryData;

    if (this.btnMore.id) {
      listArr = this.pagingList();
      this.btnMore.target.classList.remove('blind');
    }

    this.target.innerHTML = '';
    this.printList(listArr);
  }

  reset() {
    this.btnMore.currentPage = 0;
    this.btnMore.maxPage = this.getMaxPage();
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
    const $categoryTab = document.getElementById(this.category.id);

    $categoryTab.addEventListener('click', (e) => {
      const $this = e.target;
      const category = $this.getAttribute('data-category');

      if (category && category !== this.currentCategory) {
        const $active = $categoryTab.querySelector('.active');

        $active.classList.remove('active');
        $this.classList.add('active');

        this.currentCategory = category;
        if (category === 'all') {
          this.categoryData = this.originData;
        } else {
          this.findList(category);
        }

        this.reset();
        this.initList();
      }
    });
  }

  addMoreEvt() {
    const $btnMore = this.btnMore.target;

    $btnMore.addEventListener('click', (e) => {
      this.addList();
    });
  }

  init() {
    this.initList();
    this.isInit = true;
    this.addResizeEvt();
    if (this.category.id) this.addCategoryEvt();
    if (this.btnMore.id) this.addMoreEvt();
  }
}
