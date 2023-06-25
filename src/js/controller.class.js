import Model from './model.class.js';
import View from './view/view.js';

/**
 * @init {function} - Init the app`
 */

class Controller {
  model;
  view;
  map;
  _userId;

  constructor() {
    this.init();
  }

  controlUserData(data) {
    // let userData = data();

    // if (data().userType === 'guest') {
    //   //guest data

    //   this.model.saveGuestToLocalStorage(userData);
    // } else {
    //set data with dynamic username
    // let userDataWithName = data(this.model._userName);
    //store userData
    // this.model.saveUserToLocalStorage(userDataWithName);
    // this.model.saveUserToLocalStorage(data);

    this.model.sendPinToServer(data);
    // }
  }

  controlEditData(data) {
    console.log('Controller: ', data);
    this.model.sendEditedPinToServer(data);
  }

  controlPinOutput() {
    //run the view.renderPinOnMap
    // this.view.renderPinOnMapHandler(this.model._guestState);
  }

  async init() {
    this.model = new Model();
    // Wait for the user pins data to be fetched
    await this.model.fetchUserData();

    this.view = new View(
      this.model._guestState,
      this.model._userPins,
      this.model._globalState,
      this.controlEditData
    );

    this.view.renderMap();
    this.userId = this.model._userId;
    this.userPins = this.model._userPins;
    this.controlUserData = this.controlUserData.bind(this);
    this.controlEditData = this.controlEditData.bind(this);
  }
}

const controller = new Controller();
export default controller;
