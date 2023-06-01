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
  globalPins = [];
  userType;

  /**
   *
   * @param {Object} map
   * @param {HTMLElement} userPinContainer
   * @param {HTMLElement} globalPinContainer
   * @param {HTMLElement} guestPinContainer
   */
  constructor(map, guestPins, userPins, globalPins, userType) {
    super();
    this.map = map;
    this.guestPins = guestPins;
    this.userPins = userPins;
    this.globalPins = globalPins;
    this.pinCard = new PinCard();
    this.handlePinRenderer = this.handlePinRenderer.bind(this);
    //detect page type
    helper.checkURL('pins.php')
      ? (this.isGlobalPinPage = true)
      : (this.isGlobalPinPage = false);
    this.userType = userType;
  }

  renderPinOnMap(values) {
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

  /**
   *
   * @param {Array} pins
   * @param {Object} pinData
   * @param {HTMLUListElement}
   */
  renderPinOnProfile(pins, pinData, pinContainer) {
    const isGuest = pinData.userType === 'guest';
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

  handleGlobalPinRenderer() {
    this.globalPins.forEach(pin => {
      // let isGuest = pin.userType === 'guest';

      //render on map
      this.renderPinOnMap(pin);

      //generate global pinCard
      this.globalPinContainer.insertAdjacentHTML(
        'beforeend',
        // this.pinCard.generatePinCard(pin, isGuest)
        this.pinCard.generatePinCard(pin, this.userType)
      );

      //attach editBtn to the card if this pin.userType = loggedUser
      const editBtn = globalPinContainer.querySelector(
        `[data-id="${pin.id}"] .pin-edit-box__container i`
      );

      //call editBtn handler
      this.editBtnHandler(editBtn);
    });

    this.defaultPinMsgHandler();
  }

  /**
   *
   * @param {string} userType
   * @returns {void}
   */
  renderPinCount(userType) {
    if (this.isGlobalPinPage) {
      console.log('global Pin Page');
      return;
    }

    if (userType === 'guest') {
      if (this.guestPinCountEl && this.guestPins) {
        this.guestPinCountEl.textContent = this.guestPins.length;
      }
    } else {
      if (this.userPinCountEl && this.userPins) {
        this.userPinCountEl.textContent = this.userPins.length;
      }
    }
  }

  /**
   *
   * @param {Array} pinType
   * @param {string} userType
   * @param {HTMLUListElement} pinContainerType
   */
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

  /**
   *
   * @param {HTMLElement} userPinContainer
   * @param {HTMLElement} globalPinContainer
   * @param {HTMLElement} guestPinContainer
   */
  defaultPinMsgHandler() {
    const profileMsgEl = document.querySelector('.default-msg');
    //Guest
    if (this.guestPins.length) {
      profileMsgEl.classList.add('hidden');
      this.guestPinContainer?.classList.remove('hidden');
    } else {
      profileMsgEl.classList.remove('hidden');

      this.guestPinContainer?.classList.add('hidden');
    }
    //User
    if (this.userPins.length) {
      profileMsgEl.classList.add('hidden');
      this.userPinContainer?.classList.remove('hidden');
    } else {
      profileMsgEl.classList.remove('hidden');
      this.userPinContainer?.classList.add('hidden');
    }
    //global management
    if (this.globalPins.length) {
      profileMsgEl.classList.add('hidden');
      this.globalPinContainer?.classList.remove('hidden');
    } else {
      profileMsgEl.classList.remove('hidden');
      this.globalPinContainer?.classList.add('hidden');
    }
  }
  //pin watcher - ! MIGHT NOT NEED THIS
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

  //get guest pins
  getGuestPins(guestState) {
    if (guestState) {
      this.guestPins = guestState;
    } else {
      console.log('No guest pins found in Pin Class');
    }
  }
}
