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
