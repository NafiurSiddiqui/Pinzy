/**
 * form UI
 * Sidebar UI
 * map
 */

class View {
  formEditIsopen = false;
  formBg = document.querySelector('.user-input-bg');
  form = document.querySelector('.user-input-form');
  btnSubmit = document.querySelector('.btn-user-input');
  guestPinContainer = document.querySelector('.guest-pin-container');
  userPinContainer = document.querySelector('.user-pin-container');
  globalPinContainer = document.querySelector('.global-pin-container');

  constructor() {}

  //get position
  getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this.loadMap.bind(this),
        function () {
          alert('Please allow to locate your position.');
        }
      );
  }

  //load the map
  loadMap(position) {
    this.mapInitiated = false;
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    if (this.#map) {
      this.mapInitiated = true;
      spinner.classList.add('hidden');
      spinner.classList.remove('spin');
      spinner.classList.remove('z-20');
    }

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

  debounceValidation() {
    let timer;
    const validateInput = this.validateInput.bind(this);
    return function () {
      clearTimeout(timer);
      timer = setTimeout(validateInput, 1000);
    };
  }

  validateEventType() {
    const event = this.eventTypeEl.value;

    if (event === 'none') {
      this.eventTypeEl.classList.add('validation-error');
    } else {
      this.eventTypeEl.classList.remove('validation-error');
    }
  }

  validateMessage() {
    const text = this.messageEl.value;

    if (text === '') {
      this.messageEl.classList.add('validation-error');
      // this.btnSubmitEdit?.setAttribute('disabled', true);
    } else {
      this.messageEl.classList.remove('validation-error');
      // this.btnSubmitEdit?.removeAttribute('disabled');
    }
  }

  validateInput() {
    const event = eventTypeEl.value;
    const text = messageEl.value;

    if ((event === 'none' && text === '') || event === 'none' || text === '') {
      console.log('fields can not be empty!');
      btnSubmit.setAttribute('disabled', '');
    }

    if (event !== 'none' && text !== '') {
      btnSubmit.removeAttribute('disabled');
    }
  }

  showForm(mapE) {
    this.#mapEvent = mapE;

    this.formBg.classList.remove('hidden');
    if (!this.btnSubmit.hasAttribute('disabled')) {
      this.btnSubmit.setAttribute('disabled', '');
    }
  }

  showEditForm() {
    this.setFormEditIsOpen(true);
    editForm.classList.remove('hidden');
    this.btnSubmitEdit?.removeAttribute('disabled');
  }

  hideForm() {
    this.formBg.addEventListener('click', event => {
      // Check if the clicked element is the user-input form or not

      if (!this.form.contains(event.target)) {
        // Close the user-input
        this.formBg.classList.add('hidden');
      }
    });
  }

  renderPinMarker(values) {
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

  renderPin(values) {
    // guest? keep count, less than 10? render inside guestPinContainer + pinPage
    // user? keep count, render inside userPinContainer + pinPage
    const isGuest = values.userType === 'guest';
    const userName = isGuest ? 'Anonymous' : values.userName;
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
                  class="pin-card-header_event-icon border border-slate-200 bg-white rounded-sm px-1 py-1 text-center flex-grow-0"
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
                  ${this.getDate()}
                </span>
                <!-- edit -->
                <div class="pin-edit-box__container relative z-40" data-id="${
                  values.id
                }">
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
                  ${this.getTime()}
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
      //inject inside the respective profile
      pinContainer?.insertAdjacentHTML('beforeend', html);

      // attachEditBtnListener;
      const editBtn = pinContainer?.querySelector(
        `[data-id="${values.id}"] .pin-edit-box__container i`
      );

      this.attachEditBtnListener(editBtnGlobal);
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
    if (this.pagePin) {
      return;
    }

    if (this.hasGuestPins) {
      guestPinCountEl.textContent = this.#pins.length;
    } else {
      userPinCountEl ? (userPinCountEl.textContent = this.#pins.length) : null;
    }
  }

  _moveToPopup(e) {
    if (!this.#map) return;
    const pinEl = e.target.closest('.user-pin');

    if (!pinEl) return;

    //convert ID to number since data-id is string
    const pin = this.#pins.find(pin => pin.id === +pinEl.dataset.id);

    this.#map.setView(pin.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  attachEditBtnListener(editBtn) {
    editBtn?.addEventListener('click', e => {
      e.stopPropagation();
      const editBox = e.currentTarget.nextElementSibling;
      editBox.classList.toggle('hidden');
    });
  }

  formUi_KeyHandler() {
    document?.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        userInputBg?.classList.add('hidden');
        userInputBgEdit?.classList.add('hidden');
      }
    });
  }

  _defaultProfileMsgHandler() {
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

  refreshContent() {
    window.location.reload();
  }

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
