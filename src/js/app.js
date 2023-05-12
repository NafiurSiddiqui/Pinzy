'use strict';
import { GuestEdit } from './edit-pin.js';

//wihout dom loaded, guest is not loaded due to deferring scripts

// APPLICATION ARCHITECTURE
const inputPopUp = document.querySelector('.user-input-bg');

const eventTypeEl = document.getElementById('eventType');
const messageEl = document.getElementById('message');
const btnSubmit = document.querySelector('.btn-user-input');
const guestPinContainer = document.querySelector('.guest-pin-container');
const guestPinCount = document.querySelector(
  '.guest-profile-guest__pin-count_number'
);
const userPinContainer = document.querySelector('.user-pin-container');
const userPinCount = document.querySelector(
  '.user-profile-user__pin-count_number'
);
const pinContainer = document.querySelector('.pin-container');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #pins = [];
  eventError = false;
  textError = false;
  userType = '';

  constructor() {
    // Get user's position
    this._getPosition();

    //usertype
    window.location.pathname.includes('user.php')
      ? (this.userType = 'user')
      : (this.userType = 'guest');

    // Get data from local storage
    this._getLocalStorage();

    //watch out for pins changes
    this.#watchPinsLength();

    //default profile message
    this._defaultProfileMsgHandler();

    //move view to the related pin
    guestPinContainer.addEventListener('click', this._moveToPopup.bind(this));
    //event on select event type
    eventTypeEl.addEventListener('input', this._validateInput.bind(this));
    //run event on message
    messageEl.addEventListener('input', this._validateInput.bind(this));

    //submit to db
    btnSubmit.addEventListener('click', this.submitToDb.bind(this));

    // attachEditBtnListener();

    //render pin count
    this._renderPinCount();
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Please allow to locate your position.');
        }
      );
  }

  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    // console.log(`https://www.google.pt/maps/@${latitude},${longitude}`);
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this.showInputPopUP.bind(this));

    //render marker
    this.#pins.forEach(pin => {
      this._renderPinMarker(pin);
    });
  }

  showInputPopUP(mapE) {
    this.#mapEvent = mapE;

    inputPopUp.classList.remove('hidden');
    if (!btnSubmit.hasAttribute('disabled')) {
      btnSubmit.setAttribute('disabled', '');
    }
  }

  submitToDb() {
    //DID not prevent default refresh, since without refresh the content editor does not work.

    //get the values
    const event = eventTypeEl.value;
    const message = messageEl.value;
    const eventTypeIcon =
      eventTypeEl.options[eventTypeEl.selectedIndex].dataset.icon;
    const eventTypeColor =
      eventTypeEl.options[eventTypeEl.selectedIndex].dataset.color;
    const { lat, lng } = this.#mapEvent.latlng;
    //sanitize input
    const sanitizedTextAreaValue = message.trim().replace(/<[^>]*>/g, '');

    const values = {
      event,
      id: Math.floor(Math.random() * 100) + 1,
      icon: eventTypeIcon,
      color: eventTypeColor,
      message: sanitizedTextAreaValue,
      coords: [lat, lng],
    };

    //check the usertype
    // this.userType === 'user'? //send to connectToDb(user):connectToDb(guest);

    // Add new object to pin array
    this.#pins.push(values);

    //set to local storage
    this._setLocalStorage();

    // Render pin on map as marker
    this._renderPinMarker(values);

    // Render pin on the list
    this._renderPin(values);
    //clear inputs
    eventTypeEl.value = messageEl.value = '';
    //render pin count
    this._renderPinCount();

    //refresh
    // window.location.reload();
    //hideInput
    this._hideInput();
  }

  _hideInput() {
    const userInputBg = document.querySelector('.user-input-bg');
    userInputBg.classList.add('hidden');
  }

  _validateEventType() {
    const event = eventTypeEl.value;

    if (event === 'none') {
      eventTypeEl.classList.add('validation-error');
    } else {
      eventTypeEl.classList.remove('validation-error');
      btnSubmit.removeAttribute('disabled');
    }
  }

  _validateMessage() {
    const text = messageEl.value;
    console.log('runs');
    if (text === '') {
      console.log('text can not be empty!');
      messageEl.classList.add('validation-error');
    } else {
      messageEl.classList.remove('validation-error');
      btnSubmit.removeAttribute('disabled');
    }
  }

  _validateInput() {
    const event = eventTypeEl.value;
    const text = messageEl.value;
    const eventFieldActive = document.activeElement === eventTypeEl;
    const messageFieldActive = document.activeElement === messageEl;

    if (event === 'none' && text === '') {
      console.log('fields can not be empty!');
    }

    if (event !== 'none' && text !== '') {
      // btnSubmit.classList.remove('btn-disabled');
      btnSubmit.removeAttribute('disabled');
    }
  }

  _renderPinMarker(values) {
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

  _renderPin(values) {
    // guest? keep count, less than 10? render inside guestPinContainer + pinPage
    // user? keep count, render inside userPinContainer + pinPage
    const isGuest = this.userType === 'guest';
    const userName = isGuest ? 'Anonymous' : 'userName';
    const pinContainer = isGuest ? guestPinContainer : userPinContainer;
    const pinLimit = isGuest ? 10 : 100;

    if (this.#pins.length < pinLimit) {
      let html = `
     <li
            class="flex user-pin android-md:w-[22rem] rounded-md border my-2 border-zinc-300 w-full bg-zinc-200 overflow-hidden tablet:w-full grow-0 shrink-0" 
            data-id="${values.id}"
          >
            <!-- flag -->
            <span
              class="pin-card_flag inline-block w-3 flag-${values.event} "
            ></span>
            <div
              class="pin-card-wrapper w-full pl-3 pr-2 py-4 flex flex-col justify-center"
            >
              <section class="pin-card_header flex items-start justify-between">
                <div class="user-profile_container flex">
                  <span
                    class="pin-card_header-user-image border border-slate-300 inline-block rounded-full p-2 bg-white"
                  >
                    <img
                      src="../assets/user-icon-mini.svg"
                      alt="user profile"
                    />
                  </span>
                  <div
                    class="pin-card-header_user-name ml-2 font-semibold text-zinc-600 text-sm"
                  >
                    ${userName}
                  </div>
                </div>
              
                <div
                  class="user-profile-user__pin-count border border-slate-200 bg-white rounded-sm px-1 py-1 text-center flex-grow-0"
                >
                  ${values.icon}
                </div>
              </section>
              <div class="flex mt-4 mb-1">
                <!-- date -->
                <span
                  class="pin-date text-gray-400 w-4/5 font-semibold text-[0.6rem]"
                >
                  <img src="../assets/calendar.svg" class="inline-block" />
                  19th Jul, 2023
                </span>
                <!-- edit -->
                <div class="pin-edit-box__container relative z-40" data-id="${values.id}">
                <i class="fa-solid fa-ellipsis p-1 rounded-sm hover:cursor-pointer hover:bg-zinc-50 "></i>
                <ul class=" pin-edit-box hidden absolute bg-zinc-300 -top-[4rem] -right-[6rem] text-zinc-800 rounded-sm py-1">
                  <li class="pin-edit-box_item hover:bg-zinc-200 p-2 text-center">
                  edit
                  </li>
                  <li class="pin-edit-box_item hover:bg-zinc-200 p-2 text-center">
                  delete
                  </li>
                  <li class="pin-edit-box_item hover:bg-zinc-200 p-2 text-center">
                  delete all
                  </li>
                </ul>

                </div>
                <!-- time -->
                <span
                  class="pin-time w-4/5 text-[0.6rem] text-right text-gray-400 font-semibold"
                >
                  <img src="../assets/time.svg" class="inline-block" />
                  19:15 hrs
                </span>
              </div>
              <p
                class="pin-card-text py-2 px-2 border border-slate-300 bg-white text-zinc-700 text-sm"
              >
                ${values.message}
              </p>
            </div>
          </li>
    `;
      pinContainer.insertAdjacentHTML('beforeend', html);
      // attachEditBtnListener();
      const editBtn = pinContainer.querySelector(
        `[data-id="${values.id}"] .pin-edit-box__container i`
      );
      this.attachEditBtnListener(editBtn);
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

  _renderPinCount() {
    this.userType === 'guest'
      ? (guestPinCount.textContent = this.#pins.length)
      : (userPinCount.textContent = this.#pins.length);
  }

  attachEditBtnListener(editBtn) {
    editBtn.addEventListener('click', e => {
      e.stopPropagation();
      const editBox = e.currentTarget.nextElementSibling;
      editBox.classList.toggle('hidden');
    });
  }

  _moveToPopup(e) {
    if (!this.#map) return;
    const pinEl = e.target.closest('.user-pin');

    if (!pinEl) return;

    //we convert to number since data-id is string
    const pin = this.#pins.find(pin => pin.id === +pinEl.dataset.id);

    this.#map.setView(pin.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem(this.userType, JSON.stringify(this.#pins));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem(this.userType));

    if (!data) return;

    this.#pins = data;

    this.#pins.forEach(pin => {
      this._renderPin(pin);
    });
  }

  _defaultProfileMsgHandler() {
    const profileMsgEl = document.querySelector('.default-msg');

    if (this.#pins.length) {
      profileMsgEl.classList.add('hidden');
      pinContainer.classList.remove('hidden');
    } else {
      profileMsgEl.classList.remove('hidden');
      pinContainer.classList.add('hidden');
    }
  }

  refreshContent() {
    // this._setRefreshState(true);

    window.location.reload();

    // this._setRefreshState(false);
  }

  #watchPinsLength() {
    const handler = {
      set: (obj, prop, value) => {
        obj[prop] = value;
        if (prop === 'length') {
          console.log('Pins length changed:', value);

          //timeout in 2 seconds
          setTimeout(() => {
            location.reload();
          }, 500);
        }
        return true;
      },
    };
    this.#pins = new Proxy(this.#pins, handler);
  }
}

const app = new App();

export default app;

document.addEventListener('DOMContentLoaded', () => {
  // const guest = new GuestEdit();
  const editBoxes = document.querySelectorAll('.pin-edit-box');
  console.log(editBoxes);
});
