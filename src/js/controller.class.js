import Map from './map.class';
import Form from './view/form.view';
import View from './view/view';

/**
 * @init {function} - Init the app`
 */

class Controller {
  map;
  form;
  constructor() {
    this.view = new View();

    //init
    this.init();
  }

  init() {
    this.view.renderMap();
  }
}

const controller = new Controller();
