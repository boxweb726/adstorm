export default class List {
  constructor({ ...prop }) {
    this.data = prop.data;
    this.categoryData = this.data;
    this.target = document.getElementById(prop.id);
    this.renderHtml = prop.renderHtml;
    this.category = !prop.category ? false : prop.category;

    this.init();
  }

  printList() {
    let listHtml = '';

    this.categoryData.forEach((item) => {
      listHtml += this.renderHtml(item);
    });

    this.target.innerHTML = listHtml;
  }

  init() {
    console.log(this.category);
    this.printList();
  }
}
