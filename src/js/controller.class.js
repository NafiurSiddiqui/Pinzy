import View from './view/view.js';
import view from './view/view.js';

/**
 * @init {function} - Init the app`
 */

class Controller {
  map;
  form;
  view;
  constructor() {
    this.view = view;

    //init
    this.init();
  }

  init() {
    this.view.renderMap();
  }
}

const controller = new Controller();
