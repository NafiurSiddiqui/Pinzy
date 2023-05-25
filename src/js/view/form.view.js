/**
 * @params  {HTMLelements}
 */

export default class FormView {
  constructor(eventTypeEl, messageEl, btnSubmit, formBg, form) {
    this.eventTypeEl = eventTypeEl;
    this.messageEl = messageEl;
    this.btnSubmit = btnSubmit;
    this.formBg = formBg;
    this.form = form;
    this.hideForm = this.hideForm.bind(this);
    this.debounceValidation = this.debounceValidation.bind(this);
    this.FormValidationHandler();
  }

  FormValidationHandler() {
    //call debouncer once
    const debouncedValidation = this.debounceValidation();
    //pass debouncedValidation
    this.eventTypeEl.addEventListener('input', debouncedValidation);
    this.messageEl.addEventListener('input', debouncedValidation);
    //without calling it like this either debounce renders mulitple times or validate form lose 'this' instance of form.
    //debouncedValidaion.bind(this) = DOES NOT call debounce at all. can't figure out why.
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
    console.log('validating event type');
    const event = this.eventTypeEl.value;
    if (event === 'none') {
      this.eventTypeEl.classList.add('validation-error');
    } else {
      this.eventTypeEl.classList.remove('validation-error');
    }
  }

  validateMessage() {
    const message = this.messageEl.value;

    if (message === '') {
      this.messageEl.classList.add('validation-error');
      // this.btnSubmitEdit?.setAttribute('disabled', true);
    } else {
      this.messageEl.classList.remove('validation-error');
      // this.btnSubmitEdit?.removeAttribute('disabled');
    }
  }

  validateForm() {
    const event = this.eventTypeEl.value;
    const message = this.messageEl.value;
    console.log(event, message);
    if (
      (event === 'none' && message === '') ||
      event === 'none' ||
      message === ''
    ) {
      console.log('fields can not be empty!');
      this.btnSubmit.setAttribute('disabled', '');
    }

    if (event !== 'none' && message !== '') {
      console.log('field are NOT empty');
      this.btnSubmit.removeAttribute('disabled');
    }

    this.validateMessage();
    this.validateEventType();
  }

  showForm(mapE, newMapEvhandler) {
    // this.mapEvent = mapE;

    this.formBg.classList.remove('hidden');
    // if (!this.btnSubmit.hasAttribute('disabled')) {
    //   this.btnSubmit.setAttribute('disabled', '');
    // }
    //store coords
    newMapEvhandler(mapE);
  }

  hideForm() {
    this.formBg.addEventListener('click', event => {
      //prevent click on form element
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
