export default class List {
  constructor({ data, id, render }) {
    this.data = data;
    this.target = document.getElementById(id);
    this.render = render;

    this.init();
  }

  init() {
    let listHtml = '';

    this.data.forEach((item) => {
      listHtml += this.render(item);
    });

    this.target.innerHTML = listHtml;
  }
}
