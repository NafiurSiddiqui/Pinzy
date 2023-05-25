import Map from './map.class';

/**
 * @init {function} - Init the app`
 */

class Controller {
  map;

  constructor() {
    this.map = new Map();
  }

  init() {
    this.map.getPosition();
  }
}
