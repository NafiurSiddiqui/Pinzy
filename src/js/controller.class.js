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

    // this.formEditor = new FormEditorView(this.model._userPins);

    // this.formEditor.actionHandler(this.controlEditData);
  }

  controlUserData(data) {
    console.log(data);
    this.model.sendPinToServer(data);
  }

  controlEditData(data) {
    this.model.sendEditedPinToServer(data);
  }

  controlDelReq(reqType, id) {
    console.log(id);
    reqType === 'single'
      ? this.model.reqToDelPin('single', id)
      : this.model.reqToDelPin('all');
  }
}

const controller = new Controller();
export default controller;
