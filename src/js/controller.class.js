import Model from './model.class.js';
import Pin from './view/pin.view.js';
import View from './view/view.js';

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
    this.model = new Model();
    this.view = new View(this.model._guestState);

    this.init();
    this.controlUserData = this.controlUserData.bind(this);
    this.view.form.dataHandler(this.controlUserData);
    this.controlPinOutput();
  }

  controlUserData(data) {
    let userData = data();
    console.log(userData);
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
    // this.view.renderPinOnMapHandler(this.model._guestState);
  }

  init() {
    console.log('init runs');

    this.view.renderMap();
  }
}

const controller = new Controller();
export default controller;
