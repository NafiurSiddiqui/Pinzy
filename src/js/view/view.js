import { formElements, pinElements } from '../helper.js';
import Model from '../model.class.js';
import FormView from './form.view.js';
import FormEditorView from './formEditor.view.js';
import Map from './map.view.js';
import Pin from './pin.view.js';

/**
 * form UI
 * Sidebar UI
 * map
 */
export default class View {
  form;
  formEditor;
  map;
  guestPins;
  pinClass;
  constructor(guestState) {
    this.form = new FormView();
    // this.formEditor = new FormEditorView(

    // );
    this.guestPins = guestState;
    this.renderForm = this.renderForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    // this.pinClass = new Pin(this.map);
    this.map = new Map(this.guestPins, this.renderForm, this.renderSpinner);
    // this.renderMap = this.renderMap.bind(this);
    this.newEvHandler = this.map.newMapEvHandler;
    // this.renderPinOnMapHandler = this.renderPinOnMapHandler.bind(this);
    //hide form
    this.hideForm();
  }

  renderMap() {
    // let map = this.map.getPosition();
    this.map.getPosition(map => {
      if (map) {
        this.pinClass = new Pin(map, this.guestPins); // Initialize Pin with the map instance
      } else {
        console.log('No map');
        // Handle the case where map is not available
      }
    });
  }

  renderForm(mapEvent) {
    this.form.showFormHandler(mapEvent, this.newEvHandler);
  }

  hideForm() {
    this.form.hideFormHandler();
  }

  renderEditFormHandler() {
    this.formEditor.showForm();
  }

  refreshContent() {
    window.location.reload();
  }

  renderSpinner() {
    const spinner = document.querySelector('.spinner');
    spinner.classList.add('hidden');
    spinner.classList.remove('spin');
    spinner.classList.remove('z-20');
  }
}
