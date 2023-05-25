/**
 * @formElemnts - all of the DOM elements of forms
 * @pinElements - all of the DOM elements of pins
 */

const formElements = {
  form: document.querySelector('.user-input-form'),
  formBg: document.querySelector('.user-input-bg'),
  formEdit: document.querySelector('.user-input-form__edit'),
  formEditBg: document.querySelector('.user-input-bg__edit'),
  eventTypeEl: document.getElementById('eventType'),
  eventTypeEditEl: document.getElementById('eventType__edit'),

  messageEl: document.getElementById('message'),
  messageEditEl: document.getElementById('message__edit'),

  btnSubmit: document.querySelector('.btn-user-input'),
  btnEditSubmit: document.querySelector('.btn-user-input__edit'),
};

const pinElements = {
  globalPinContainer: document.querySelector('.global-pin-container'),
  userPinContainer: document.querySelector('.user-pin-container'),
  guestPinContainer: document.querySelector('.guest-pin-container'),
  userPinCountEl: document.querySelector('.user-profile__pin-count'),
  guestPinCountEl: document.querySelector('.guest-profile__pin-count'),
};

class Helper {
  /**
   *
   * @param {string} pathName
   * @returns {boolean}
   */
  checkURL(pathName) {
    const { pathname } = window.location;
    if (typeof pathname === 'string') {
      return pathname.includes(pathName);
    }
    throw new Error('Unable to retrieve pathname from window.location.');
  }
}

const helper = new Helper();

export { formElements, pinElements, helper };
