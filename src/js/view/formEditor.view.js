import Form from './form.view';

/**
 * @params {HTMLelements} - Which are only relevant to the form__edit elements.
 */
export default class FormEditor extends Form {
  formEditIsopen = false;

  constructor(eventTypeEl, messageEl, btnSubmit, formBg, form) {
    super(eventTypeEl, messageEl, btnSubmit, formBg, form);
    this.eventTypeEl = eventTypeEl;
    this.messageEl = messageEl;
    this.btnSubmit = btnSubmit;
    this.formBg = formBg;
    this.form = form;
  }

  setFormEditIsOpen(value) {
    this.formEditIsopen = value;
  }
}
