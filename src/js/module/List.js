/* eslint-disable no-console */
export default class List {
  constructor({ data, id, html, on }) {
    this.data = data;
    this.target = document.getElementById(id);
    this.html = html;
    this.event = on;

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
  }
}
