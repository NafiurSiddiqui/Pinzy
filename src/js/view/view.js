import { formElements, pinElements } from '../helper.js';
import FormView from './form.view.js';
import FormEditorView from './formEditor.view.js';
import Map from './map.view.js';
import Pin from './pin.view.js';

/**
 * form UI
 * Sidebar UI
 * map
 */
class View {
  form;
  formEditor;
  map;
  data;

  constructor() {
    this.form = new FormView();
    // this.formEditor = new FormEditorView(

    // );
    this.renderForm = this.renderForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.map = new Map(this.data, this.renderForm, this.renderSpinner);
    this.pin = new Pin(this.map.map);

    this.newEvHandler = this.map.newMapEvHandler;
    //hide form
    this.hideForm();
  }

  renderMap() {
    this.map.getPosition();
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

  //PINS
  renderPinOnMapHandler(values) {
    this.pin.renderPinOnMap(values);
  }
}

const view = new View();

export default view;
