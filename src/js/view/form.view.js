import { formElements } from '../helper.js';
import BaseFormView from './BaseForm.view.js';

/**
 * @params  {HTMLelements}
 */

const { eventTypeEl, messageEl, btnSubmit, formBg, form } = formElements;

export default class FormView extends BaseFormView {
  eventTypeEl = eventTypeEl;
  messageEl = messageEl;
  btnSubmit = btnSubmit;
  formBg = formBg;
  form = form;

  constructor() {
    super();
    this.baseFormValidationHandler = this.baseFormValidationHandler.bind(this);

    this.baseFormValidationHandler(
      this.eventTypeEl,
      this.messageEl,
      this.btnSubmit
    );
  }

  debounceValidationHandler() {
    this.baseDebounceValidation();
  }

  validateEventTypeHandler() {
    this.baseValidateEventType();
  }

  validateMessageHandler() {
    this.baseValidateMessage();
  }

  validateFormHandler() {
    this.baseValidateForm();
  }

  showFormHandler(mapEvent, newMapEvhandler) {
    this.baseShowForm(mapEvent, newMapEvhandler);
  }

  hideFormHandler() {
    this.baseHideForm();
  }

  //submit form
  dataHandler(handler) {
    this.baseDataHandler(handler);
  }
}
