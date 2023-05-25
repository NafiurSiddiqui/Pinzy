import { formElements, pinElements } from '../helper';
import Map from '../map.class';
import Form from './form.view';
import FormEditor from './formEditor.view';

/**
 * form UI
 * Sidebar UI
 * map
 */

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

export default class View {
  form;
  formEditor;
  map;

  constructor() {
    this.form = new Form(eventTypeEl, messageEl, btnSubmit, formBg, form);
    this.formEditor = new FormEditor(
      eventTypeEditEl,
      messageEditEl,
      btnEditSubmit,
      formEditBg,
      formEdit
    );
    this.map = new Map();
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
}
