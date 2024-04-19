import { getUrlParams } from './utill';

export default class Project {
  constructor({ ...prop }) {
    this.data = prop.data;
    this.target = document.querySelector(prop.target);
    this.renderHtml = prop.renderHtml;
    this.id = getUrlParams('id');

    this.init();
  }

  init() {
    if (this.id) {
      [this.selectedProject] = this.data.filter((item) => item.id === this.id);

      this.target.insertAdjacentHTML(
        'beforeend',
        this.renderHtml(this.selectedProject),
      );
    } else {
      window.location = window.location.href.replace('detail/', '');
    }
  }
}
