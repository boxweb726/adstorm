/* eslint-disable no-console */
export default class List {
  constructor({ data, id, html }) {
    this.data = data;
    this.target = document.getElementById(id);
    this.html = html;

    console.log(this.target);

    this.init();
  }

  setExp() {
    const regExp = /\*{3}\w+\*{3}/g;

    this.regExp = this.html.match(regExp);
  }

  renderItem(item) {
    const itemHtml = this.html;

    this.regExp.forEach((exp) => {
      const name = exp.replaceAll('***', '');
      console.log(exp, item[name]);
      itemHtml.replace(exp, item[name]);
    });

    return itemHtml;
  }

  init() {
    this.setExp();

    let listHtml = '';

    this.data.forEach((item) => {
      listHtml += this.renderItem(item);
    });

    this.target.innerHTML = listHtml;

    // this.target.innerHTML = `${this.data.title} : ${this.data.date}`;
  }
}
