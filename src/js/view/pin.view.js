import PinCard from './pinCard.view.js';
import { helper, pinElements, editElements } from '../helper.js';
import FormEditorView from './formEditor.view.js';

const {
  globalPinContainer,
  userPinContainer,
  guestPinContainer,
  userPinCountEl,
  guestPinCountEl,
} = pinElements;

const { editBoxes, editBox } = editElements;

export default class Pin extends FormEditorView {
  /**
   * @property {boolean} isGlobalPinPage
   */
  map;
  isGlobalPinPage;
  userPinContainer = userPinContainer;
  guestPinContainer = guestPinContainer;
  globalPinContainer = globalPinContainer;
  pinCard;
  guestPins;

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
    // this.editBtnHandler = this.editBtnHandler;
    this.guestPins = guestPins;
    this.pinCard = new PinCard();

    //detect page type
    helper.checkURL('pins.php')
      ? (this.isGlobalPinPage = true)
      : (this.isGlobalPinPage = false);

    this.editBtnHandlerGlobal();
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

  // //editBtn listener on card
  // editBtnHandler(editBtn) {
  //   editBtn?.addEventListener('click', e => {
  //     e.stopPropagation();
  //     const editBox = e.currentTarget.nextElementSibling;
  //     editBox.classList.toggle('hidden');
  //   });
  // }

  // //close the edit on global click
  // editBtnHandlerGlobal() {
  //   console.log('global click');
  //   document.body.addEventListener('click', e => {
  //     !e.target.classList.contains('.pin-edit-box_item')
  //       ? this.toggleEditBox(close)
  //       : null;
  //   });
  // }

  // toggleEditBox(closeBox = false) {
  //   console.log('editor runs');
  //   // to prevent from toggling and simply hide if closeBox
  //   if (closeBox) {
  //     const editBoxes = document.querySelectorAll('.pin-edit-box');
  //     editBoxes.forEach(box => box.classList.add('hidden'));
  //   } else {
  //     const editBox = document.querySelector('.pin-edit-box:not(.hidden)');
  //     if (editBox) {
  //       editBox.classList.add('hidden');
  //     }
  //   }
  // }

  //get guest pins
  getGuestPins(guestState) {
    if (guestState) {
      this.guestPins = guestState;
    } else {
      console.log('No guest pins found in Pin Class');
    }
  }
}
