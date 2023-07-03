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
  guestPins = null;
  userPins = null;
  globalPins = null;
  userType;
  formEditor;
  /**
   *
   * @param {Object} map
   * @param {HTMLElement} userPinContainer
   * @param {HTMLElement} globalPinContainer
   * @param {HTMLElement} guestPinContainer
   */
  constructor(map, guestPins, userPins, globalPins, userType, formEditor) {
    super();
    this.map = map;
    this.guestPins = guestPins;
    this.userPins = userPins;
    this.globalPins = globalPins;
    this.formEditor = formEditor;
    this.pinCard = new PinCard();
    this.handlePinRenderer = this.handlePinRenderer.bind(this);
    this.renderPinOnProfile = this.renderPinOnProfile.bind(this);
    //detect page type
    helper.checkURL('pins.php')
      ? (this.isGlobalPinPage = true)
      : (this.isGlobalPinPage = false);
    this.userType = userType;
  }

  renderPinOnMap(pin) {
    const lat = pin.pin_lat;
    const lng = pin.pin_lng;
    let coords = [lat, lng];

    L.marker(coords)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${pin.pin_event}-popup`,
        })
      )
      .setPopupContent(` ${pin.pin_message}`)
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

    if (pins?.length < pinLimit) {
      //render pin card
      pinContainer?.insertAdjacentHTML(
        'beforeend',
        this.pinCard.generatePinCard(pinData)
      );

      // attach edit btn to the card
      const editBtn = pinContainer?.querySelector(
        `[data-id="${pinData.id}"] .pin-edit-box__container i`
      );

      this.formEditor.editBtnHandler(editBtn);
    } else {
      alert(
        isGuest
          ? 'You have reached the guest pin limit. Please signup for unlimited pins.'
          : 'You have reached the pin limit. Please upgrade your account.'
      );
    }

    this.pinContainerHandler();
  }

  handleGlobalPinRenderer() {
    // const globalPins = [...this.globalPins, ...this.guestPins];
    if (!this.globalPins.length) return;

    this.globalPins?.forEach(pin => {
      //render on map
      this.renderPinOnMap(pin);
      //generate global pinCard
      this.globalPinContainer.insertAdjacentHTML(
        'beforeend',
        this.pinCard.generatePinCard(pin, this.userType)
      );

      //attach editBtn to the card if this pin.userType = loggedUser
      const editBtn = globalPinContainer.querySelector(
        `[data-id="${pin.id}"] .pin-edit-box__container i`
      );

      //call editBtn handler
      this.editBtnHandler(editBtn);
    });

    this.pinContainerHandler();
  }

  /**
   *
   * @param {string} userType
   * @returns {void}
   */
  renderPinCount(userType) {
    if (this.isGlobalPinPage) {
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
    pinType?.forEach(pin => {
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
  pinContainerHandler() {
    //Guest
    if (this.guestPins?.length) {
      this.guestPinContainer?.classList.remove('hidden');
    } else {
      this.guestPinContainer?.classList.add('hidden');
    }
    //User
    if (this.userPins?.length) {
      this.userPinContainer?.classList.remove('hidden');
    } else {
      this.userPinContainer?.classList.add('hidden');
    }

    //global management
    if (this.globalPins?.length) {
      this.globalPinContainer?.classList.remove('hidden');
    } else {
      this.globalPinContainer?.classList.add('hidden');
    }
  }
  //pin watcher - ! MIGHT NOT NEED THIS
  watchPinsLength() {
    const handler = {
      set: (obj, prop, value) => {
        obj[prop] = value;
        if (prop === 'length') {
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
      console.error(error);
    }
  }

  //get guest pins
  getGuestPins(guestPins) {
    if (guestPins) {
      this.guestPins = guestPins;
    } else {
      console.error('No guest pins found in Pin Class');
    }
  }
}
