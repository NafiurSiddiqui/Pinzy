import { formElements } from '../helper.js';
import BaseForm from './BaseForm.view.js';

const { eventTypeEditEl, messageEditEl, btnEditSubmit, formEditBg, formEdit } =
  formElements;

/**
 * @params {HTMLelements} - Which are only relevant to the form__edit elements.
 */
export default class FormEditorView extends BaseForm {
  formEditIsopen = false;
  eventTypeEditEl = eventTypeEditEl;
  messageEditEl = messageEditEl;
  btnEditSubmit = btnEditSubmit;
  formEditBg = formEditBg;
  formEdit = formEdit;

  constructor() {
    super();
  }

  setFormEditIsOpen(value) {
    this.formEditIsopen = value;
  }

  //editBtn listener on card
  editBtnHandler(editBtn) {
    editBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const editBox = e.currentTarget.nextElementSibling;
      editBox.classList.toggle('hidden');
    });
  }

  //close the edit on global click
  editBtnHandlerGlobal() {
    document.body.addEventListener('click', e => {
      !e.target.classList.contains('.pin-edit-box_item')
        ? this.toggleEditBox(close)
        : null;
    });
  }

  toggleEditBox(closeBox = false) {
    console.log('editor runs');
    // to prevent from toggling and simply hide if closeBox
    if (closeBox) {
      const editBoxes = document.querySelectorAll('.pin-edit-box');
      editBoxes.forEach(box => box.classList.add('hidden'));
    } else {
      const editBox = document.querySelector('.pin-edit-box:not(.hidden)');
      if (editBox) {
        editBox.classList.add('hidden');
      }
    }
  }
}
