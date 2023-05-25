import Form from './form.view';

/**
 * @params {HTMLelements} - Which are only relevant to the form__edit elements.
 */
export default class FormEditorView extends Form {
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

  //used inside Render(guest/user/global)pin
  static editBtnHandler(editBtn) {
    editBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const editBox = e.currentTarget.nextElementSibling;
      editBox.classList.toggle('hidden');
    });
  }
}
