import Model from './model.class.js';
import FormEditorView from './view/formEditor.view.js';
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

  async init() {
    this.model = new Model();
    // Wait for the user pins data to be fetched
    await this.model.fetchUserData();

    this.controlUserData = this.controlUserData.bind(this);
    this.controlEditData = this.controlEditData.bind(this);
    this.view = new View(
      this.model._guestState,
      this.model._userPins,
      this.model._globalState,
      this.controlEditData
    );

    // this.view.form.dataHandler(this.controlUserData, this._userId);
    // this.view.formEditor.actionHandler(this.controlEditData);

    this.view.renderMap();
    this.userId = this.model._userId;
    this.userPins = this.model._userPins;

    this.formEditor = new FormEditorView(this.model._userPins);

    this.formEditor.actionHandler(this.controlEditData);
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
    // this.view.formEditor.actionHandler(this.controlEditData);
    // this.model.sendEditedPinToServer(data);
  }

  controlPinOutput() {
    //run the view.renderPinOnMap
    // this.view.renderPinOnMapHandler(this.model._guestState);
  }
}

const controller = new Controller();
export default controller;
