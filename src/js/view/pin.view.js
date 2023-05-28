import PinCard from './pinCard.view.js';
import { helper, pinElements } from '../helper.js';

const {
  globalPinContainer,
  userPinContainer,
  guestPinContainer,
  userPinCountEl,
  guestPinCountEl,
} = pinElements;

export default class Pin {
  /**
   * @property {boolean} isGlobalPinPage
   */
  map;
  isGlobalPinPage;
  userPinContainer = userPinContainer;
  guestPinContainer = guestPinContainer;
  globalPinContainer = globalPinContainer;
  guestPins;

  /**
   *
   * @param {Object} map
   * @param {HTMLElement} userPinContainer
   * @param {HTMLElement} globalPinContainer
   * @param {HTMLElement} guestPinContainer
   */
  constructor(map, guestPins) {
    this.map = map;
    this.editBtnHandler = this.editBtnHandler;
    this.guestPins = guestPins;
    // console.log(map.map);
    //detect page type
    helper.checkURL('pins.php')
      ? (this.isGlobalPinPage = true)
      : (this.isGlobalPinPage = false);
  }

  //renderPinOnMap
  renderPinOnMap(values) {
    // console.log(values);
    L.marker(values.coords)
      .addTo(this.map)
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
    const isGuest = data.userType === 'guest';
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

    if (this.pins.length === 1) {
      this.defaultPinMsgHandler();
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
    if (this.isGlobalPinPage) {
      return;
    }
    pinEl.textContent = this.pins.length;
  }

  //default Pin Msg
  /**
   *
   * @param {HTMLElement} userPinContainer
   * @param {HTMLElement} globalPinContainer
   * @param {HTMLElement} guestPinContainer
   */
  defaultPinMsgHandler() {
    const profileMsgEl = document.querySelector('.default-msg');

    if (this.pins.length) {
      profileMsgEl.classList.add('hidden');
      this.userPinContainer?.classList.remove('hidden');
      this.globalPinContainer?.classList.remove('hidden');
      this.guestPinContainer?.classList.remove('hidden');
    } else {
      profileMsgEl.classList.remove('hidden');
      // pinContainer?.classList.add('hidden');
      this.globalPinContainer?.classList.add('hidden');
      this.guestPinContainer?.classList.add('hidden');
      this.userPinContainer?.classList.add('hidden');
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
      this.pins = new Proxy(this.pins, handler);
    } catch (error) {
      console.log(error);
    }
  }

  //editBtn listener on card
  editBtnHandler(editBtn) {
    editBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const editBox = e.currentTarget.nextElementSibling;
      editBox.classList.toggle('hidden');
    });
  }

  //get guest pins
  getGuestPins(guestState) {
    if (guestState) {
      this.guestPins = guestState;
    } else {
      console.log('No guest pins found in Pin Class');
    }
  }
}
