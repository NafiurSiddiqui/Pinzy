import Model from './model.class.js';

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
    this.controlPinOutput();
  }

  controlUserData(data) {
    let userData = data();

    if (data().userType === 'guest') {
      //guest data

      this.model.saveGuestToLocalStorage(userData);
    } else {
      //set data with dynamic username
      let userDataWithName = data(this.model._userName);
      //store userData
      this.model.saveUserToLocalStorage(userDataWithName);
    }
  }

  controlPinOutput() {
    //run the view.renderPinOnMap
    // this.view.renderPinOnMapHandler(this.model._dataState);
  }

  init() {
    console.log('init runs');
    this.view.renderMap();
  }
}

const controller = new Controller();
export default controller;
