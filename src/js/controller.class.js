import Model from './model.class.js';
import BaseFormView from './view/BaseForm.view.js';
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
    // Wait for the model promises data to be resolved first
    await Promise.all([this.model.fetchUserData(), this.model.getGlobalPins()]);
    this.controlLstorageAlert = this.controlLstorageAlert.bind(this);
    this.controlUserData = this.controlUserData.bind(this);
    this.controlEditData = this.controlEditData.bind(this);
    this.controlDelReq = this.controlDelReq.bind(this);

    this.view = new View(
      this.model._guestPins,
      this.model._userPins,
      this.model._globalPins
    );

    this.view.renderMap();
    this.userId = this.model._userId;
    this.userPins = this.model._userPins;
  }

  async controlUserData(data) {
    //storage guard for guest
    if (this.controlLstorageAlert() === true) return;

    this.model.userType
      ? await this.model.sendPinToServer(data)
      : this.model.saveGuestToLocalStorage(data);
  }

  controlEditData(pin, id) {
    if (this.controlLstorageAlert() === true) return;

    this.model.userType
      ? this.model.updateEditedPinToServer(pin)
      : this.model.updateGuestEditToLocalStorage(pin, id);
  }

  controlDelReq(reqType, id) {
    if (this.controlLstorageAlert() === true) return;
    console.log(reqType, id);
    if (reqType === 'single') {
      this.model.userType
        ? this.model.reqToDelPin('single', id)
        : this.model.delGuestPin('single', id);
    } else {
      this.model.userType
        ? this.model.reqToDelPin('all')
        : this.model.delGuestPin('all');
    }
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
