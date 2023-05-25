/**
 * @params  {HTMLelements}
 */

export default class Form {
  constructor(eventTypeEl, messageEl, btnSubmit, formBg, form) {
    this.eventTypeEl = eventTypeEl;
    this.messageEl = messageEl;
    this.btnSubmit = btnSubmit;
    this.formBg = formBg;
    this.form = form;
    this.eventValidationHandler();
    this.messageValidationHandler();
    this.FormValidationHandler();
  }

  FormValidationHandler() {
    this.eventTypeEl.addEventListener(
      'input',
      this.debounceValidation.bind(this)
    );
    this.messageEl.addEventListener(
      'input',
      this.debounceValidation.bind(this)
    );
  }

  eventValidationHandler() {
    this.eventTypeEl.addEventListener(
      'input',
      this.validateEventType.bind(this)
    );
  }

  messageValidationHandler() {
    this.messageEl.addEventListener('input', this.validateMessage.bind(this));
  }

  debounceValidation() {
    let timer;
    const validateForm = this.validateForm.bind(this);
    return function () {
      clearTimeout(timer);
      timer = setTimeout(validateForm, 1000);
    };
  }

  validateEventType() {
    const event = this.eventTypeEl.value;

    if (event === 'none') {
      this.eventTypeEl.classList.add('validation-error');
    } else {
      this.eventTypeEl.classList.remove('validation-error');
    }
  }

  validateMessage() {
    const text = this.messageEl.value;

    if (text === '') {
      this.messageEl.classList.add('validation-error');
      // this.btnSubmitEdit?.setAttribute('disabled', true);
    } else {
      this.messageEl.classList.remove('validation-error');
      // this.btnSubmitEdit?.removeAttribute('disabled');
    }
  }

  validateForm() {
    const event = eventTypeEl.value;
    const text = messageEl.value;

    if ((event === 'none' && text === '') || event === 'none' || text === '') {
      console.log('fields can not be empty!');
      btnSubmit.setAttribute('disabled', '');
    }

    if (event !== 'none' && text !== '') {
      btnSubmit.removeAttribute('disabled');
    }
  }

  showForm(mapE) {
    // this.mapEvent = mapE;
    console.log(mapE);
    this.formBg.classList.remove('hidden');
    // if (!this.btnSubmit.hasAttribute('disabled')) {
    //   this.btnSubmit.setAttribute('disabled', '');
    // }
  }

  hideForm() {
    this.formBg.addEventListener('click', event => {
      // Check if the clicked element is the user-input form or not

      if (!this.form.contains(event.target)) {
        // Close the user-input
        this.formBg.classList.add('hidden');
      }
    });

    document?.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.formBg?.classList.add('hidden');
        // userInputBgEdit?.classList.add('hidden');
      }
    });
  }
}
