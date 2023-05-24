import FormEditor from './view/formEditor.view';

export default class Pin {
  map;
  pins;
  editBtnHandler;

  constructor(pins, map, editBtnHandler) {
    this.pins = pins;
    this.map = map;
    this.editBtnHandler = editBtnHandler;
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
  renderPinOnProfile(data) {
    // guest? keep count, less than 10? render inside guestPinContainer + pinPage
    // user? keep count, render inside userPinContainer + pinPage
    // const isGuest = values.userType === 'guest';
    // const userName = isGuest ? 'Anonymous' : values.userName;
    // const pinContainer = isGuest ? guestPinContainer : userPinContainer;
    const pinLimit = isGuest ? 10 : 100;

    if (this.pins.length < pinLimit) {
      let html = `
     <li
            class="flex user-pin android-md:w-[22rem] rounded-md border my-2 border-zinc-300 w-full bg-zinc-200 overflow-hidden tablet:w-full grow-0 shrink-0" 
            data-id="${data.id}"
          >
            <!-- flag -->
            <span
              class="pin-card_flag inline-block w-3 flag-${data.event} "
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
                  ${data.icon}
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
                  data.id
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
                ${data.message}
              </p>
            </div>
          </li>
    `;
      //inject inside the respective profile
      pinContainer?.insertAdjacentHTML('beforeend', html);

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
  //render Pin Count
  renderPinCount() {
    if (this.pagePin) {
      return;
    }

    if (this.hasGuestPins) {
      guestPinCountEl.textContent = this.#pins.length;
    } else {
      userPinCountEl ? (userPinCountEl.textContent = this.#pins.length) : null;
    }
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
