import { helper } from '../helper.js';

export default class BaseFormView {
  mapEvent;
  form;
  formBg;

  constructor() {
    this.baseHideForm = this.baseHideForm.bind(this);
    this.baseDebounceValidation = this.baseDebounceValidation.bind(this);
  }

  baseFormValidationHandler(eventTypeEl, messageEl, btnSubmit) {
    //call debouncer once
    const debouncedValidation = this.baseDebounceValidation(
      eventTypeEl,
      messageEl,
      btnSubmit
    );
    //pass debouncedValidation
    eventTypeEl.addEventListener('input', debouncedValidation);
    messageEl.addEventListener('input', debouncedValidation);
  }

  baseDebounceValidation(eventTypeEl, messageEl, btnSubmit) {
    let timer;

    const baseValidateForm = this.baseValidateForm.bind(this);

    return function () {
      clearTimeout(timer);
      timer = setTimeout(
        () => baseValidateForm(eventTypeEl, messageEl, btnSubmit),
        300
      );
    };
  }

  baseValidateEventType(eventTypeEl) {
    const event = eventTypeEl.value;
    if (event === 'none') {
      eventTypeEl.classList.add('validation-error');
    } else {
      eventTypeEl.classList.remove('validation-error');
    }
  }

  baseValidateMessage(messageEl) {
    const message = messageEl.value;

    if (message === '') {
      messageEl.classList.add('validation-error');
    } else {
      messageEl.classList.remove('validation-error');
    }
  }

  baseValidateForm(eventTypeEl, messageEl, btnSubmit) {
    const event = eventTypeEl.value;
    const message = messageEl.value;

    if (
      (event === 'none' && message === '') ||
      event === 'none' ||
      message === ''
    ) {
      btnSubmit?.setAttribute('disabled', '');
    }

    if (event !== 'none' && message !== '') {
      btnSubmit.removeAttribute('disabled');
    }

    this.baseValidateMessage(messageEl);
    this.baseValidateEventType(eventTypeEl);
  }

  baseShowForm(mapEvent, formEditBgEl = null) {
    //store coords here, since submission needs it.
    this.mapEvent = mapEvent;
    formEditBgEl !== null || undefined
      ? formEditBgEl.classList.remove('hidden')
      : this.formBg.classList.remove('hidden');
  }

  baseHideForm(formEditBgEl = null, formEditEl = null) {
    if (formEditBgEl !== null || undefined) {
      formEditBgEl.addEventListener('click', event => {
        //prevent click on form element
        if (!formEditEl.contains(event.target)) {
          // Close the user-input
          formEditBgEl.classList.add('hidden');
        }
      });
    } else {
      this.formBg.addEventListener('click', event => {
        //prevent click on form element
        if (!this.form.contains(event.target)) {
          // Close the user-input
          this.formBg.classList.add('hidden');
        }
      });
    }

    document?.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        this.formBg?.classList.add('hidden');
        // userInputBgEdit?.classList.add('hidden');
        formEditBgEl?.classList.add('hidden');
      }
    });
  }

  //submit form
  baseDataHandler(handler) {
    this.form.addEventListener('submit', e => {
      // e.preventDefault();

      //get the values
      const pin_event = this.eventTypeEl.value;
      const pin_message = this.messageEl.value;
      const eventTypeIcon =
        this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.icon;
      const eventTypeColor =
        this.eventTypeEl.options[this.eventTypeEl.selectedIndex].dataset.color;
      const { lat, lng } = this.mapEvent.latlng;
      //sanitize input
      const sanitizedTextAreaValue = pin_message.trim().replace(/<[^>]*>/g, '');
      const timeOfCreation = helper.getTime();
      const dateOfCreation = helper.getDate();

      //check for userType
      const userLoggedIn = helper.checkUserLoggedIn();

      const formUserData = {
        pin_event,
        pin_color: eventTypeColor,
        pin_icon: eventTypeIcon,
        pin_message: sanitizedTextAreaValue,
        pin_lat: lat,
        pin_lng: lng,
        pin_time: timeOfCreation,
        pin_date: dateOfCreation,
      };

      if (!userLoggedIn) {
        formUserData.id = Math.floor(Math.random() * 100) + 1;
      }

      //pass it to the controller
      handler(formUserData);

      //clear inputs
      this.eventTypeEl.value = this.messageEl.value = '';
      //hideInput
      this.baseHideForm();

      //refresh manually
      this.baseRefreshContent();
    });
  }

  //refresh Content
  baseRefreshContent() {
    window.location.reload();
  }
}
