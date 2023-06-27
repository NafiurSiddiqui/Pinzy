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
    this.controlDelReq = this.controlDelReq.bind(this);
    this.view = new View(
      this.model._guestPins,
      this.model._userPins,
      this.model._globalState
    );

    this.view.renderMap();
    this.userId = this.model._userId;
    this.userPins = this.model._userPins;
    this.controlLstorageAlert = this.controlLstorageAlert.bind(this);
  }

  controlUserData(data) {
    //storage guard for guest
    if (this.controlLstorageAlert() === true) return;
    console.log(data);
    this.model.userType
      ? this.model.sendPinToServer(data)
      : this.model.saveGuestToLocalStorage(data);
  }

  controlEditData(data) {
    if (this.controlLstorageAlert() === true) return;
    console.log(data);
    this.model.userType
      ? this.model.sendEditedPinToServer(data)
      : this.model.saveGuestEditToLocalStorage(data);
  }

  controlDelReq(reqType, id) {
    console.log(id);
    reqType === 'single'
      ? this.model.reqToDelPin('single', id)
      : this.model.reqToDelPin('all');
  }

  controlLstorageAlert() {
    if (
      this.model.localStorageIsNotAvailable === null ||
      this.model.localStorageIsNotAvailable === true
    ) {
      alert(this.model.GUEST_LSTORAGE_MESSAGE);
      return true;
    }
  }
}

const controller = new Controller();
export default controller;
