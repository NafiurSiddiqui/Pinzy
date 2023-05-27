import Model from './model.class.js';
import FormView from './view/form.view.js';
import view from './view/view.js';

/**
 * @init {function} - Init the app`
 */

class Controller {
  map;
  form;
  view;
  model;

  constructor() {
    this.view = view;
    this.model = new Model();
    // this.init = this.init.bind(this);
    //init
    this.init();
    this.controlUserData = this.controlUserData.bind(this);
    this.view.form.dataHandler(this.controlUserData);
  }

  controlUserData(data) {
    let userData = data();
    console.log(typeof userData);
    if (data().userType === 'guest') {
      //guest data
      this.model.saveToLocalStorage('guest', userData);
    } else {
      //set data with dynamic username
      let userDataWithName = data(this.model._userName);
      //store userData
      this.model.setLocalStorage('guest', JSON.stringify(userDataWithName));
    }
  }

  init() {
    console.log('init runs');
    this.view.renderMap();
  }
}

const controller = new Controller();
export default controller;
