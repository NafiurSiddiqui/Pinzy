/**
 * @formElemnts - all of the DOM elements of forms
 * @pinElements - all of the DOM elements of pins
 */

const formElements = {
  form: document.querySelector('.user-input-form'),
  formBg: document.querySelector('.user-input-bg'),
  formEditEl: document.querySelector('.user-input-form__edit'),
  formEditBgEl: document.querySelector('.user-input-bg__edit'),
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

// const editElements = {
//   //!SHOULD BE SELECTED RIGHT WHERE IT NEEDS, OTHERWISE DOES NOT EXIST
//   editBoxes: document.querySelectorAll('.pin-edit-box'),
//   editBox: document.querySelector('.pin-edit-box'),
// };

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

  getDate() {
    //get current date
    function getOrdinalIndicator(day) {
      var indicator = 'th';
      if (day === 1 || day === 21 || day === 31) {
        indicator = 'st';
      } else if (day === 2 || day === 22) {
        indicator = 'nd';
      } else if (day === 3 || day === 23) {
        indicator = 'rd';
      }
      return indicator;
    }

    var currentDate = new Date();
    var day = currentDate.getDate();
    var ordinalIndicator = getOrdinalIndicator(day);
    var formattedDate = `
      ${day} 
      ${ordinalIndicator} 
      
      ${currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })}`;
    return formattedDate;
  }

  getTime() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var formattedTime = ` ${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} hrs`;

    return formattedTime;
  }

  // checkUserStatus() {
  //   let userLogged;
  //   if (pinElements.globalPinContainer) {
  //     console.log('from the global');
  //     userLogged = pinElements.globalPinContainer?.dataset.userlogged.trim();
  //   }

  //   if (pinElements.guestPinContainer) {
  //     console.log('From guest');
  //     userLogged = pinElements.guestPinContainer.dataset.userlogged.trim();
  //   }

  //   if (pinElements.userPinContainer) {
  //     console.log('from User');
  //     userLogged = pinElements.userPinContainer.dataset.userlogged.trim();
  //   }

  //   return userLogged;
  // }

  checkUserLoggedIn() {
    const elementKeys = [
      'globalPinContainer',
      'guestPinContainer',
      'userPinContainer',
    ];

    for (const key of elementKeys) {
      const element = pinElements[key];
      if (element) {
        // console.log(`From ${key}`);
        let dataEl = element.dataset.userlogged?.trim();

        if (element && dataEl === 'true') {
          return true;
        }
      }
    }

    return false;
  }
}

const helper = new Helper();

export { formElements, pinElements, helper };
