'use strict';

class User {
  // prettier-ignore
  _type;
  _time;
  _date;
  _icon;
  _message;
  _id;
  _userName;
  constructor(type, time, date, icon, message, id, userName) {
    this._type = type;
    this._time = time;
    this._date = date;
    this._icon = icon;
    this._message = message;
    this._id = id;
    this._userName = userName;
    this._renderPinToProfile();
    this._renderPinToPins();
  }

  _renderPinToProfile() {
    const userPinContainer = document?.querySelector('.user-pin-container');
    const guestPinContainer = document?.querySelector('.guest-pin-container');

    let html = `
     <li
            class="${this._type}-pin flex my-1 android-md:w-[22rem] tablet:w-72 rounded-md border border-zinc-200 w-full bg-zinc-100 overflow-hidden" data-id=${this._id}
          >
            <!-- flag -->
            <span class="pin-card_flag inline-block w-3 bg-yellow-200"></span>
            <div
              class="user-profile-wrapper w-full tablet:w-[98%] pl-3 pr-2 py-2 flex flex-col justify-center"
            >
              <div class="flex justify-between">
                <!-- date -->
                <span
                  class="pin-date w-32 text-[0.6rem] text-gray-400 font-semibold"
                >
                  <img src="../assets/calendar.svg" class="inline-block" />
                  ${this._date}
                </span>
                <!-- time -->
                <span
                  class="pin-time w-32 text-[0.6rem] text-right text-gray-400 font-semibold mr-2"
                >
                  <img src="../assets/time.svg" class="inline-block" />
                  ${this._time}
                </span>
                <!-- Type -->
                <div
                  class="user-profile-user__pin-count border border-slate-200 bg-white rounded-sm px-1 py-1 text-center flex-grow-0"
                >
                  ${this._icon}
                </div>
              </div>
              <!-- content -->
              <p
                class="user-profile-text py-2 mt-4 px-2 border border-slate-300 bg-white text-zinc-600 text-sm"
              >
                ${this._message}
              </p>
            </div>
          </li>
    `;

    this._type === 'guest'
      ? guestPinContainer?.insertAdjacentHTML('afterbegin', html)
      : userPinContainer?.insertAdjacentHTML('afterbegin', html);
  }

  _renderPinToPins() {
    const globalPinContainer = document.querySelector('.global-pin-container');

    const html = `
       <li class="user-pin flex my-1 android-md:w-[22rem] tablet:w-72 rounded-md w-full  overflow-hidden">
            <!-- flag -->
            <span
              class="pin-card_flag inline-block w-3 bg-yellow-200 h-full"
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
                    ${this._type === 'guest' ? 'Anonymous' : this._userName}
                  </div>
                </div>

                <!-- Type -->
                <div
                  class="user-profile-user__pin-count border border-slate-200 bg-white rounded-sm px-1 py-1 text-center flex-grow-0"
                >
                  ${this._icon}
                </div>
              </section>
              <div class="flex mt-4 mb-1">
                <!-- date -->
                <span
                  class="pin-date text-gray-400 w-4/5 font-semibold text-[0.6rem]"
                >
                  <img src="../assets/calendar.svg" class="inline-block" />
                  ${this._date}
                </span>
                <!-- time -->
                <span
                  class="pin-time w-4/5 text-[0.6rem] text-right text-gray-400 font-semibold"
                >
                  <img src="../assets/time.svg" class="inline-block" />
                  ${this._time}
                </span>
              </div>

              <p
                class="pin-card-text py-2 px-2 border border-slate-300 bg-white text-zinc-700 text-sm"
              >
                ${this._message}
              </p>
            </div>
          </li>
    `;

    globalPinContainer?.insertAdjacentHTML('afterbegin', html);
  }
}

class SignedUser extends User {
  _userPinCount;
  constructor(type, time, date, icon, message, id, userName, usrePinCount) {
    super(type, time, date, icon, message, id, userName);

    this._userPinCount = usrePinCount;
    this._renderUserInfo();
  }

  _renderUserInfo() {
    const userProfileContainer = document.querySelector(
      '.signed-user-profile_container'
    );

    let html = `
     <div
            class="user-profile_header-user-image border border-slate-300 w-16 h-16 rounded-full p-2 bg-white flex justify-center items-center"
          >
            <img src="../assets/user-icon-large.svg" alt="user profile" />
          </div>
          <span
            class="user-profile-header_user-name ml-2 inline-block font-semibold text-zinc-100 text-2xl"
          >
            ${this._userName}
          </span>
          <!-- pin count -->
          <div
            class="user-profile-user__pin-count border border-slate-300 bg-zinc-300 rounded-sm px-1 py-1 text-center"
          >
            <span
              class="user-profile-user__pin-count_number font-semibold tablet:text-sm max-w-[2rem]"
            >
             ${this._userPinCount}
            </span>
            📌
          </div>
    
    `;

    userProfileContainer?.insertAdjacentHTML('afterbegin', html);
  }
}

// let testData = {
//   type: 'guest',
//   time: '10:00',
//   date: '13th July, 2023',
//   icon: '😎',
//   message: 'Event coming up',
//   id: '1',
// };

// const user1 = new User(
//   testData.type,
//   testData.time,
//   testData.date,
//   testData.icon,
//   testData.message,
//   testData.id
// );

// const signUser1 = new SignedUser(
//   'user',
//   testData.time,
//   testData.date,
//   testData.icon,
//   (testData.message = 'I am privileged.'),
//   (testData.id = '2'),
//   'Cool Joe',
//   '123456'
// );
///////////////////////////////////////
// APPLICATION ARCHITECTURE
const inputPopUp = document.querySelector('.user-input-bg');

const eventType = document.getElementById('eventType');
const message = document.getElementById('message');
const btnSubmit = document.querySelector('.btn-user-input');
const guestPinContainer = document.querySelector('.guest-pin-container');
const guestPinCount = document.querySelector(
  '.guest-profile-guest__pin-count_number'
);
const userPinCount = document.querySelector(
  '.user-profile-user__pin-count_number'
);
const userPinContainer = document.querySelector('.user-pin-container');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #pins = [];
  eventError = false;
  textError = false;
  #userType = '';

  constructor() {
    // Get user's position
    this._getPosition();

    //usertype
    window.location.pathname.includes('user.php')
      ? (this.#userType = 'user')
      : (this.#userType = 'guest');

    // Get data from local storage
    this._getLocalStorage();
    console.log('runs');
    //render pin count
    this._renderPinCount();
    //move view to the related pin
    guestPinContainer.addEventListener('click', this._moveToPopup.bind(this));
    //event on select event type
    eventType.addEventListener('input', this._validateInput.bind(this));
    //run event on message
    message.addEventListener('input', this._validateInput.bind(this));

    //submit to db
    btnSubmit.addEventListener('click', this._submitToDb.bind(this));

    //render new Pin
    // this._renderPin();
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
    this.#map.on('click', this._showInputPopUP.bind(this));

    //render marker
    this.#pins.forEach(pin => {
      this._renderPinMarker(pin);
    });
  }

  _showInputPopUP(mapE) {
    this.#mapEvent = mapE;

    inputPopUp.classList.remove('hidden');
    if (!btnSubmit.hasAttribute('disabled')) {
      btnSubmit.setAttribute('disabled', '');
    }
  }

  _submitToDb(e) {
    e.preventDefault();

    //get the values
    const event = eventType.value;
    const text = message.value;
    const eventTypeIcon =
      eventType.options[eventType.selectedIndex].dataset.icon;
    const eventTypeColor =
      eventType.options[eventType.selectedIndex].dataset.color;
    const { lat, lng } = this.#mapEvent.latlng;
    //sanitize input
    const sanitizedTextAreaValue = text.trim().replace(/<[^>]*>/g, '');

    const values = {
      event,
      id: Math.floor(Math.random() * 100) + 1,
      icon: eventTypeIcon,
      color: eventTypeColor,
      sanitizedTextAreaValue,
      coords: [lat, lng],
    };

    //check the usertype
    // this.#userType === 'user'? //send to connectToDb(user):connectToDb(guest);

    // Add new object to pin array
    this.#pins.push(values);

    //set to local storage
    this._setLocalStorage();

    // Render pin on map as marker
    this._renderPinMarker(values);

    // Render pin on the list
    this._renderPin(values);
    //clear inputs
    eventType.value = message.value = '';

    //hideInput
    this._hideInput();
  }

  _hideInput() {
    const userInputBg = document.querySelector('.user-input-bg');
    userInputBg.classList.add('hidden');
  }

  _validateEventType() {
    const event = eventType.value;

    if (event === 'none') {
      eventType.classList.add('validation-error');
    } else {
      eventType.classList.remove('validation-error');
      btnSubmit.removeAttribute('disabled');
    }
  }

  _validateMessage() {
    const text = message.value;
    console.log('runs');
    if (text === '') {
      console.log('text can not be empty!');
      message.classList.add('validation-error');
    } else {
      message.classList.remove('validation-error');
      btnSubmit.removeAttribute('disabled');
    }
  }

  _validateInput() {
    const event = eventType.value;
    const text = message.value;
    const eventFieldActive = document.activeElement === eventType;
    const messageFieldActive = document.activeElement === message;

    if (event === 'none' && text === '') {
      console.log('fields can not be empty!');
      // eventType.classList.add('validation-error');
      // message.classList.add('validation-error');
      // btnSubmit.classList.add('disabled:border-zinc-400');
    }
    // if (event === 'none') {
    //   if (!messageFieldActive) {
    //     console.log('choose an event type');
    //     // eventType.classList.add('validation-error');
    //   }
    // } else {
    //   console.log('You have selected an event type');
    //   // eventType.classList.remove('validation-error');
    // }

    // if (text === '') {
    //   if (!eventFieldActive) {
    //     console.log('text can not be empty!');
    //     message.classList.add('validation-error');
    //   }
    // } else {
    //   message.classList.remove('validation-error');
    // }

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
      .setPopupContent(` ${values.sanitizedTextAreaValue}`)
      .openPopup();
  }

  _renderPin(values) {
    // guest? keep count, less than 10? render inside guestPinContainer + pinPage
    // user? keep count, render inside userPinContainer + pinPage
    const isGuest = this.#userType === 'guest';
    const userName = isGuest ? 'Anonymous' : 'userName';
    const pinContainer = isGuest ? guestPinContainer : userPinContainer;
    const pinLimit = isGuest ? 10 : 100;

    if (this.#pins.length < pinLimit) {
      let html = `

     <li
            class="flex user-pin android-md:w-[22rem] rounded-md border my-2 border-zinc-300 w-full bg-zinc-100 overflow-hidden tablet:w-full grow-0 shrink-0" 
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
                ${values.sanitizedTextAreaValue}
              </p>
            </div>
          </li>
    `;
      pinContainer.insertAdjacentHTML('beforeend', html);
    } else {
      alert(
        isGuest
          ? 'You have reached the guest pin limit. Please signup for unlimited pins.'
          : 'You have reached the pin limit. Please upgrade your account.'
      );
    }
  }

  _renderPinCount() {
    this.#userType === 'guest'
      ? (guestPinCount.textContent = this.#pins.length)
      : (userPinCount.textContent = this.#pins.length);
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
    localStorage.setItem(this.#userType, JSON.stringify(this.#pins));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem(this.#userType));

    if (!data) return;

    this.#pins = data;

    this.#pins.forEach(pin => {
      this._renderPin(pin);
    });
  }

  reset() {
    localStorage.removeItem('pins');
    location.reload();
  }
}

const app = new App();
