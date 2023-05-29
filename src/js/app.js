'use strict';
import { guestEdit, userEdit } from './edit-pin.js';

// const inputPopUp = document.querySelector('.user-input-bg');
// const eventTypeEl = document.getElementById('eventType');
// const messageEl = document.getElementById('message');
// const btnSubmit = document.querySelector('.btn-user-input');
// const guestPinContainer = document.querySelector('.guest-pin-container');
// const userPinContainer = document.querySelector('.user-pin-container');
// const globalPinContainer = document.querySelector('.global-pin-container');
// const userPinCountEl = document.querySelector(
//   '.user-profile__pin-count__digit'
// );
// const guestPinCountEl = document.querySelector(
//   '.guest-profile__pin-count__digit'
// );
// const pinContainer = document.querySelector('.pin-container');
// // const spinner = document.querySelector('.spinner');
// const userInputBg = document.querySelector('.user-input-bg');
// const userInputBgEdit = document.querySelector('.user-input-bg__edit');
// const userInputForm = document.querySelector('.user-input-form');

class App {
  // #map;
  // #mapZoomLevel = 13;
  #mapEvent;
  #pins = [];
  eventError = false;
  textError = false;
  userType = '';
  // mapInitiated = false;
  pagePin = null;
  userName = 'userName';
  hasGuestPins = false;

  constructor() {
    this.debounceValidation = this.debounceValidation.bind(this);

    // Get user's position
    this._getPosition();
    // this.pinCountEl = pinCountEl;
    //detect page type
    this.getURLpath('pins.php')
      ? (this.pagePin = true)
      : (this.pagePin = false);

    //usertype
    // this.getURLpath('user.php')
    //   ? (this.userType = 'user')
    //   : (this.userType = 'guest');
    this.userType = userLogged === true ? 'user' : 'guest';

    //set user name
    this.getUserName();

    // Get data from local storage
    this._getLocalStorage();

    //watch out for pins changes
    this.#watchPinsLength();

    //default profile message
    this._defaultProfileMsgHandler();

    //move view to the pin
    pinContainer?.addEventListener('click', this._moveToPopup.bind(this));

    //event on select event type
    eventTypeEl.addEventListener('input', this.debounceValidation());
    //run event on message
    messageEl.addEventListener('input', this.debounceValidation());
    //submit to db
    btnSubmit.addEventListener('click', this.submitToDb.bind(this));

    //render pin count
    this._renderPinCount();

    //handle editing
    guestEdit.editBoxHandler();
    if (this.userType === 'user') {
      userEdit.editBoxHandler();
    }
    //closes on 'esc'
    this.formUi_KeyHandler();

    this._hideInput();
  }

  // _getPosition() {
  //   if (navigator.geolocation)
  //     navigator.geolocation.getCurrentPosition(
  //       this._loadMap.bind(this),
  //       function () {
  //         alert('Please allow to locate your position.');
  //       }
  //     );
  // }

  // _loadMap(position) {
  //   this.mapInitiated = false;
  //   const { latitude } = position.coords;
  //   const { longitude } = position.coords;
  //   const coords = [latitude, longitude];

  //   this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

  //   if (this.#map) {
  //     this.mapInitiated = true;
  //     spinner.classList.add('hidden');
  //     spinner.classList.remove('spin');
  //     spinner.classList.remove('z-20');
  //   }

  //   L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  //     attribution:
  //       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  //   }).addTo(this.#map);

  //   // Handling clicks on map
  //   this.#map.on('click', this.showInputPopUP.bind(this));

  //   //render marker
  //   this.#pins.forEach(pin => {
  //     this._renderPinMarker(pin);
  //   });
  // }

  // showInputPopUP(mapE) {
  //   this.#mapEvent = mapE;

  //   inputPopUp?.classList.remove('hidden');
  //   if (!btnSubmit.hasAttribute('disabled')) {
  //     btnSubmit.setAttribute('disabled', '');
  //   }
  // }

  // submitToDb() {
  //   //DID not prevent default refresh, since without refresh the content editor does not work.

  //   //get the values
  //   const event = eventTypeEl.value;
  //   const message = messageEl.value;

  //   const eventTypeIcon =
  //     eventTypeEl.options[eventTypeEl.selectedIndex].dataset.icon;
  //   const eventTypeColor =
  //     eventTypeEl.options[eventTypeEl.selectedIndex].dataset.color;
  //   const { lat, lng } = this.#mapEvent.latlng;
  //   //sanitize input
  //   const sanitizedTextAreaValue = message.trim().replace(/<[^>]*>/g, '');

  //   const values = {
  //     event,
  //     id: Math.floor(Math.random() * 100) + 1,
  //     icon: eventTypeIcon,
  //     color: eventTypeColor,
  //     message: sanitizedTextAreaValue,
  //     coords: [lat, lng],
  //   };

  //   //check the usertype
  //   // this.userType === 'user'? //send to connectToDb(user):connectToDb(guest);

  //   // Add new object to pin array
  //   this.#pins.push(values);

  //   //set to local storage
  //   this._setLocalStorage();

  //   // Render pin on map as marker
  //   this._renderPinMarker(values);

  //   // Render pin on the list
  //   this._renderPin(values);
  //   //clear inputs
  //   eventTypeEl.value = messageEl.value = '';
  //   //render pin count
  //   this._renderPinCount();

  //   //hideInput
  //   this._hideInput();
  // }

  // _hideInput() {
  //   userInputBg?.addEventListener('click', event => {
  //     // Check if the clicked element is the user-input form or not

  //     if (!userInputForm?.contains(event.target)) {
  //       // Close the user-input
  //       userInputBg.classList.add('hidden');
  //     }
  //   });
  // }

  // debounceValidation() {
  //   let timer;
  //   const validateInput = this._validateInput.bind(this);
  //   return function () {
  //     clearTimeout(timer);
  //     timer = setTimeout(validateInput, 1000);
  //   };
  // }

  // _validateInput() {
  //   const event = eventTypeEl.value;
  //   const text = messageEl.value;

  //   if ((event === 'none' && text === '') || event === 'none' || text === '') {
  //     console.log('fields can not be empty!');
  //     btnSubmit.setAttribute('disabled', '');
  //   }

  //   if (event !== 'none' && text !== '') {
  //     btnSubmit.removeAttribute('disabled');
  //   }
  // }

  // _renderPinMarker(values) {
  //   L.marker(values.coords)
  //     .addTo(this.#map)
  //     .bindPopup(
  //       L.popup({
  //         maxWidth: 250,
  //         minWidth: 100,
  //         autoClose: false,
  //         closeOnClick: false,
  //         className: `${values.event}-popup`,
  //       })
  //     )
  //     .setPopupContent(` ${values.message}`)
  //     .openPopup();
  // }

  // getUserName() {
  //   //get username from URL
  //   const queryString = window.location.search;
  //   let urlParams = new URLSearchParams(queryString);
  //   let userName = urlParams.get('username');
  //   let getUserNameFromStorage = localStorage.getItem('userName');

  //   if (userName) {
  //     //capitalize the first character
  //     userName = userName.charAt(0).toUpperCase() + userName.slice(1);
  //     //set to the localStorage
  //     localStorage.setItem('userName', userName);
  //     this.userName = userName;
  //   } else if (getUserNameFromStorage) {
  //     //get from localStorage
  //     this.userName = getUserNameFromStorage;
  //   } else {
  //     //remove name from local Storage
  //     localStorage.removeItem('userName');
  //     this.username = 'userName';
  //   }
  // }

  // getDate() {
  //   //get current date
  //   function getOrdinalIndicator(day) {
  //     var indicator = 'th';
  //     if (day === 1 || day === 21 || day === 31) {
  //       indicator = 'st';
  //     } else if (day === 2 || day === 22) {
  //       indicator = 'nd';
  //     } else if (day === 3 || day === 23) {
  //       indicator = 'rd';
  //     }
  //     return indicator;
  //   }

  //   var currentDate = new Date();
  //   var day = currentDate.getDate();
  //   var ordinalIndicator = getOrdinalIndicator(day);
  //   var formattedDate = `
  //     ${day}
  //     ${ordinalIndicator}

  //     ${currentDate.toLocaleDateString('en-US', {
  //       month: 'long',
  //       year: 'numeric',
  //     })}`;
  //   return formattedDate;
  // }

  // getTime() {
  //   var currentTime = new Date();
  //   var hours = currentTime.getHours();
  //   var minutes = currentTime.getMinutes();
  //   var formattedTime = ` ${hours.toString().padStart(2, '0')}:${minutes
  //     .toString()
  //     .padStart(2, '0')} hrs`;

  //   return formattedTime;
  // }

  // _renderPin(values) {
  //   // guest? keep count, less than 10? render inside guestPinContainer + pinPage
  //   // user? keep count, render inside userPinContainer + pinPage
  //   const isGuest = values.userType === 'guest';
  //   const userName = isGuest ? 'Anonymous' : values.userName;
  //   const pinContainer = isGuest ? guestPinContainer : userPinContainer;
  //   const pinLimit = isGuest ? 10 : 100;

  //   if (this.#pins.length < pinLimit) {
  //     let html = `
  //    <li
  //           class="flex user-pin android-md:w-[22rem] rounded-md border my-2 border-zinc-300 w-full bg-zinc-200 overflow-hidden tablet:w-full grow-0 shrink-0"
  //           data-id="${values.id}"
  //         >
  //           <!-- flag -->
  //           <span
  //             class="pin-card_flag inline-block w-3 flag-${values.event} "
  //           ></span>
  //           <div
  //             class="pin-card-wrapper w-full pl-3 pr-2 py-4 flex flex-col justify-center"
  //           >
  //             <section class="pin-card_header flex items-start justify-between">
  //               <div class="user-profile_container flex">
  //                 <span
  //                   class="pin-card_header-user-image border border-slate-300 inline-block rounded-full p-2 bg-white"
  //                 >
  //                   <img
  //                     src="../assets/user-icon-mini.svg"
  //                     alt="user profile"
  //                   />
  //                 </span>
  //                 <div
  //                   class="pin-card-header_user-name ml-2 font-semibold text-zinc-600 text-sm"
  //                 >
  //                   ${userName}
  //                 </div>
  //               </div>

  //               <div
  //                 class="pin-card-header_event-icon border border-slate-200 bg-white rounded-sm px-1 py-1 text-center flex-grow-0"
  //               >
  //                 ${values.icon}
  //               </div>
  //             </section>
  //             <div class="flex mt-4 mb-1">
  //               <!-- date -->
  //               <span
  //                 class="pin-date text-gray-400 w-4/5 font-semibold text-[0.6rem]"
  //               >
  //                 <img src="../assets/calendar.svg" class="inline-block" />
  //                 ${this.getDate()}
  //               </span>
  //               <!-- edit -->
  //               <div class="pin-edit-box__container relative z-40" data-id="${
  //                 values.id
  //               }">
  //               <i class="fa-solid fa-ellipsis p-1 rounded-sm hover:cursor-pointer hover:bg-zinc-50 "></i>
  //               <ul class=" pin-edit-box hidden absolute bg-zinc-300 -top-[4rem] -right-[6rem] text-zinc-800 rounded-sm py-1">
  //                 <li class="pin-edit-box_item hover:bg-zinc-200 p-2 text-center">
  //                 edit
  //                 </li>
  //                 <li class="pin-edit-box_item hover:bg-zinc-200 p-2 text-center">
  //                 delete
  //                 </li>
  //                 <li class="pin-edit-box_item hover:bg-zinc-200 p-2 text-center">
  //                 delete all
  //                 </li>
  //               </ul>

  //               </div>
  //               <!-- time -->
  //               <span
  //                 class="pin-time w-4/5 text-[0.6rem] text-right text-gray-400 font-semibold"
  //               >
  //                 <img src="../assets/time.svg" class="inline-block" />
  //                 ${this.getTime()}
  //               </span>
  //             </div>
  //             <p
  //               class="pin-card-text py-2 px-2 border border-slate-300 bg-white text-zinc-700 text-sm"
  //             >
  //               ${values.message}
  //             </p>
  //           </div>
  //         </li>
  //   `;
  //     //inject inside the respective profile
  //     pinContainer?.insertAdjacentHTML('beforeend', html);
  //     //inject inside the global
  //     if (globalPinContainer) globalPinContainer.textContent = '';
  //     globalPinContainer?.insertAdjacentHTML('beforeend', html);

  //     // attachEditBtnListener;
  //     const editBtn = pinContainer?.querySelector(
  //       `[data-id="${values.id}"] .pin-edit-box__container i`
  //     );
  //     const editBtnGlobal = globalPinContainer?.querySelector(
  //       `[data-id="${values.id}"] .pin-edit-box__container i`
  //     );

  //     editBtnGlobal
  //       ? this.attachEditBtnListener(editBtnGlobal)
  //       : this.attachEditBtnListener(editBtn);
  //   } else {
  //     alert(
  //       isGuest
  //         ? 'You have reached the guest pin limit. Please signup for unlimited pins.'
  //         : 'You have reached the pin limit. Please upgrade your account.'
  //     );
  //   }

  //   if (this.#pins.length === 1) {
  //     this._defaultProfileMsgHandler();
  //   }
  // }

  // _renderPinCount() {
  //   if (this.pagePin) {
  //     return;
  //   }

  //   if (this.hasGuestPins) {
  //     guestPinCountEl.textContent = this.#pins.length;
  //   } else {
  //     userPinCountEl ? (userPinCountEl.textContent = this.#pins.length) : null;
  //   }
  // }

  // attachEditBtnListener(editBtn) {
  //   editBtn?.addEventListener('click', e => {
  //     e.stopPropagation();
  //     const editBox = e.currentTarget.nextElementSibling;
  //     editBox.classList.toggle('hidden');
  //   });
  // }

  // formUi_KeyHandler() {
  //   document?.addEventListener('keydown', event => {
  //     if (event.key === 'Escape') {
  //       userInputBg?.classList.add('hidden');
  //       userInputBgEdit?.classList.add('hidden');
  //     }
  //   });
  // }

  // _moveToPopup(e) {
  //   if (!this.#map) return;
  //   const pinEl = e.target.closest('.user-pin');

  //   if (!pinEl) return;

  //   //convert ID to number since data-id is string
  //   const pin = this.#pins.find(pin => pin.id === +pinEl.dataset.id);

  //   this.#map.setView(pin.coords, this.#mapZoomLevel, {
  //     animate: true,
  //     pan: {
  //       duration: 1,
  //     },
  //   });
  // }

  // _setLocalStorage() {
  //   localStorage.setItem(this.userType, JSON.stringify(this.#pins));
  // }

  // _getLocalStorage() {
  //   const guestPins = JSON.parse(localStorage.getItem('guest'));
  //   const userPins = JSON.parse(localStorage.getItem('user'));

  //   if (guestPins) {
  //     this.hasGuestPins = true;

  //     this.#pins = guestPins.map(pin => ({
  //       ...pin,
  //       userType: 'guest',
  //       userName: 'Anonymous',
  //     }));
  //   } else {
  //     this.hasGuestPins = false;
  //   }

  //   if (userPins) {
  //     this.#pins = userPins.map(pin => ({
  //       ...pin,
  //       userType: 'user',
  //       userName: this.userName,
  //     }));
  //   }

  //   console.log(this.#pins);

  //   this.#pins.forEach(pin => {
  //     this._renderPin(pin);
  //   });
  // }

  // _defaultProfileMsgHandler() {
  //   const profileMsgEl = document.querySelector('.default-msg');

  //   if (this.#pins.length) {
  //     profileMsgEl.classList.add('hidden');
  //     userPinContainer?.classList.remove('hidden');
  //     globalPinContainer?.classList.remove('hidden');
  //     guestPinContainer?.classList.remove('hidden');
  //   } else {
  //     profileMsgEl.classList.remove('hidden');
  //     pinContainer?.classList.add('hidden');
  //     globalPinContainer?.classList.add('hidden');
  //     guestPinContainer?.classList.add('hidden');
  //   }
  // }

  // refreshContent() {
  //   window.location.reload();
  // }

  // #watchPinsLength() {
  //   const handler = {
  //     set: (obj, prop, value) => {
  //       obj[prop] = value;
  //       if (prop === 'length') {
  //         console.log('Pins length changed:', value);

  //         //timeout in 2 seconds
  //         setTimeout(() => {
  //           this.refreshContent();
  //         }, 100);
  //       }
  //       return true;
  //     },
  //   };

  //   //Was having an uncaught error.
  //   try {
  //     this.#pins = new Proxy(this.#pins, handler);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // getURLpath(pathName) {
  //   return window.location.pathname.includes(pathName);
  // }
}

const app = new App();

export default app;
