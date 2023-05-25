import { formElements, pinElements } from '../helper.js';
import Form from './form.view.js';
import FormEditor from './formEditor.view.js';
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
    this.form = new Form(eventTypeEl, messageEl, btnSubmit, formBg, form);
    this.formEditor = new FormEditor(
      eventTypeEditEl,
      messageEditEl,
      btnEditSubmit,
      formEditBg,
      formEdit
    );

    this.map = new Map(this.data, this.showForm, this.renderSpinner);
  }

  renderMap() {
    this.map.getPosition();
  }

  renderFormHandler() {
    this.form.showForm();
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
