import { helper } from '../helper';
import PinCard from './pinCard.view';

export default class Pin {
  map;
  pins;
  editBtnHandler;
  pagePin;
  constructor(pins, map, editBtnHandler) {
    this.pins = pins;
    this.map = map;
    this.editBtnHandler = editBtnHandler;
    //detect page type
    helper.checkURL('pins.php')
      ? (this.pagePin = true)
      : (this.pagePin = false);
  }

  //renderPinOnMap
  renderPinOnMap(values) {
    L.marker(values.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${values.event}-popup`,
        })
      )
      .setPopupContent(` ${values.message}`)
      .openPopup();
  }
  //renderUserPin
  /**
   *
   * @param {Object} data
   */
  renderPinOnProfile(data, pinContainer) {
    // guest? keep count, less than 10? render inside guestPinContainer + pinPage
    // user? keep count, render inside userPinContainer + pinPage
    const isGuest = values.userType === 'guest';
    // const userName = isGuest ? 'Anonymous' : values.userName;
    // const pinContainer = isGuest ? guestPinContainer : userPinContainer;
    const pinLimit = isGuest ? 10 : 100;

    if (this.pins.length < pinLimit) {
      //render pin card
      pinContainer?.insertAdjacentHTML(
        'beforeend',
        PinCard.generatePinCard(data)
      );

      // attach edit btn to the card

      const editBtn = pinContainer?.querySelector(
        `[data-id="${data.id}"] .pin-edit-box__container i`
      );

      this.editBtnHandler(editBtn);
    } else {
      alert(
        isGuest
          ? 'You have reached the guest pin limit. Please signup for unlimited pins.'
          : 'You have reached the pin limit. Please upgrade your account.'
      );
    }

    if (this.#pins.length === 1) {
      this._defaultProfileMsgHandler();
    }
  }

  renderGlobalPins() {
    //fetch data for user
    //fetch data for guest
    //map over the global pins and render cardMarkup
  }
  //render Pin Count
  /**
   *
   * @param {HTMLelement} pinEl
   *
   */
  renderPinCount(pinEl) {
    if (this.pagePin) {
      return;
    }
    pinEl.textContent = this.pins.length;
  }

  //default Pin Msg
  defaultPinMsgHandler() {
    const profileMsgEl = document.querySelector('.default-msg');

    if (this.#pins.length) {
      profileMsgEl.classList.add('hidden');
      userPinContainer?.classList.remove('hidden');
      globalPinContainer?.classList.remove('hidden');
      guestPinContainer?.classList.remove('hidden');
    } else {
      profileMsgEl.classList.remove('hidden');
      pinContainer?.classList.add('hidden');
      globalPinContainer?.classList.add('hidden');
      guestPinContainer?.classList.add('hidden');
    }
  }
  //pin watcher
  watchPinsLength() {
    const handler = {
      set: (obj, prop, value) => {
        obj[prop] = value;
        if (prop === 'length') {
          console.log('Pins length changed:', value);

          //timeout in 2 seconds
          setTimeout(() => {
            this.refreshContent();
          }, 100);
        }
        return true;
      },
    };

    //Was having an uncaught error.
    try {
      this.#pins = new Proxy(this.#pins, handler);
    } catch (error) {
      console.log(error);
    }
  }
}
