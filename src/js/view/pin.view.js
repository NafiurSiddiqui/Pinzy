import PinCard from './pinCard.view.js';
import { helper, pinElements } from '../helper.js';
import FormEditorView from './formEditor.view.js';

const {
  globalPinContainer,
  userPinContainer,
  guestPinContainer,
  userPinCountEl,
  guestPinCountEl,
} = pinElements;

export default class Pin extends FormEditorView {
  /**
   * @property {boolean} isGlobalPinPage
   */
  map;
  isGlobalPinPage;
  userPinContainer = userPinContainer;
  guestPinContainer = guestPinContainer;
  globalPinContainer = globalPinContainer;
  guestPinCountEl = guestPinCountEl;
  userPinCountEl = userPinCountEl;
  pinCard;
  guestPins = [];
  userPins = [];

  /**
   *
   * @param {Object} map
   * @param {HTMLElement} userPinContainer
   * @param {HTMLElement} globalPinContainer
   * @param {HTMLElement} guestPinContainer
   */
  constructor(map, guestPins) {
    super();
    this.map = map;
    this.guestPins = guestPins;
    this.pinCard = new PinCard();
    this.handlePinRenderer = this.handlePinRenderer.bind(this);
    //detect page type
    helper.checkURL('pins.php')
      ? (this.isGlobalPinPage = true)
      : (this.isGlobalPinPage = false);

    // this.editBtnHandlerGlobal();
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
  renderPinOnProfile(pins, pinData, pinContainer) {
    // guest? keep count, less than 10? render inside guestPinContainer + pinPage
    // user? keep count, render inside userPinContainer + pinPage
    const isGuest = pinData.userType === 'guest';
    // const userName = isGuest ? 'Anonymous' : values.userName;
    // const pinContainer = isGuest ? guestPinContainer : userPinContainer;
    const pinLimit = isGuest ? 10 : 100;

    if (pins.length < pinLimit) {
      //render pin card
      pinContainer?.insertAdjacentHTML(
        'beforeend',
        this.pinCard.generatePinCard(pinData)
      );

      // attach edit btn to the card
      const editBtn = pinContainer?.querySelector(
        `[data-id="${pinData.id}"] .pin-edit-box__container i`
      );

      this.editBtnHandler(editBtn);
    } else {
      alert(
        isGuest
          ? 'You have reached the guest pin limit. Please signup for unlimited pins.'
          : 'You have reached the pin limit. Please upgrade your account.'
      );
    }

    this.defaultPinMsgHandler();
  }

  renderGlobalPins() {
    //fetch data for user
    //fetch data for guest
    //map over the global pins and render cardMarkup
  }

  /**
   *
   * @param {HTMLelement} pinEl
   *
   */
  renderPinCount(userType) {
    if (this.isGlobalPinPage) {
      console.log('global Pin Page');
      return;
    }
    console.log(userType, this.guestPins, this.guestPinCountEl);

    userType === 'guest'
      ? (this.guestPinCountEl.textContent = this.guestPins.length)
      : (this.userPinCountEl.textContent = this.userPins.length);
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

    if (this.guestPins.length) {
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

  handlePinRenderer(pinType, userType, pinContainerType) {
    pinType.forEach(pin => {
      //render pin on map
      this.renderPinOnMap(pin);

      //render pin count
      this.renderPinCount(userType);
      //render pin on profile
      this.renderPinOnProfile(pinType, pin, pinContainerType);
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
