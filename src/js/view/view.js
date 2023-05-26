import { formElements, pinElements } from '../helper.js';
import FormView from './form.view.js';
import FormEditorView from './formEditor.view.js';
import Map from './map.view.js';

const {
  eventTypeEl,
  messageEl,
  btnSubmit,
  formBg,
  form,
  eventTypeEditEl,
  messageEditEl,
  btnEditSubmit,
  formEditBg,
  formEdit,
} = formElements;

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
    this.form = new FormView(eventTypeEl, messageEl, btnSubmit, formBg, form);
    // this.formEditor = new FormEditorView(
    //   eventTypeEditEl,
    //   messageEditEl,
    //   btnEditSubmit,
    //   formEditBg,
    //   formEdit
    // );
    this.renderForm = this.renderForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.map = new Map(this.data, this.renderForm, this.renderSpinner);
    this.newEvHandler = this.map.newMapEvHandler;
    //hide form
    this.hideForm();
  }

  renderMap() {
    this.map.getPosition();
  }

  renderForm(mapEvent) {
    this.form.showForm(mapEvent, this.newEvHandler);
  }

  hideForm() {
    this.form.hideForm();
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

const view = new View();

export default view;
