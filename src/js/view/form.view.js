import { helper } from '../helper.js';

/**
 * @params  {HTMLelements}
 */

export default class FormView {
  mapEvent;
  form;
  formBg;
  testData;
  constructor(eventTypeEl, messageEl, btnSubmit, formBg, form) {
    this.eventTypeEl = eventTypeEl;
    this.messageEl = messageEl;
    this.btnSubmit = btnSubmit;
    this.formBg = formBg;
    this.form = form;
    this.hideForm = this.hideForm.bind(this);
    this.debounceValidation = this.debounceValidation.bind(this);
    this.FormValidationHandler();
    // this.dataHandlerOnSubmit();
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
    // console.log(event, message);
    if (
      (event === 'none' && message === '') ||
      event === 'none' ||
      message === ''
    ) {
      // console.log('fields can not be empty!');
      this.btnSubmit.setAttribute('disabled', '');
    }

    if (event !== 'none' && message !== '') {
      // console.log('field are NOT empty');
      this.btnSubmit.removeAttribute('disabled');
    }

    this.validateMessage();
    this.validateEventType();
  }

  showForm(mapEvent, newMapEvhandler) {
    //store coords here, since submission needs it.
    this.mapEvent = mapEvent;
    this.formBg.classList.remove('hidden');
    // if (!this.btnSubmit.hasAttribute('disabled')) {
    //   this.btnSubmit.setAttribute('disabled', '');
    // }
    //store coords
    // newMapEvhandler(mapEvent);
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

  //submit form
  dataHandlerOnSubmit(handler) {
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      //DID not prevent default refresh, since without refresh the content editor does not work.
      //get the values
      const event = this.eventTypeEl.value;
      const message = this.messageEl.value;
      const eventTypeIcon =
        this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.icon;
      const eventTypeColor =
        this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.color;
      const { lat, lng } = this.mapEvent.latlng;
      //sanitize input
      const sanitizedTextAreaValue = message.trim().replace(/<[^>]*>/g, '');
      //values would be different if user
      /**
       * id: user? from Db : generateId
       */
      const isGuest = helper.checkURL('guest.html') ? true : false;
      const formUserData = userName => {
        const userData = {
          event,
          id: Math.floor(Math.random() * 100) + 1,
          icon: eventTypeIcon,
          color: eventTypeColor,
          message: sanitizedTextAreaValue,
          coords: [lat, lng],
          userType: isGuest ? 'guest' : 'user',
          userName: isGuest ? 'Anonymous' : userName,
        };
        return userData;
      };
      //pass it to the controller
      // this._setLocalStorage();
      handler(formUserData);
      //clear inputs
      this.eventTypeEl.value = this.messageEl.value = '';
      //render pin count
      // this._renderPinCount();
      //hideInput
      // this._hideInput();
    });
  }
}
