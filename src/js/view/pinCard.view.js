const userNameEl = document.querySelector('.user-profile-header_user-name');
let userName = userNameEl.dataset.username.trim();

export default class PinCard {
  /**
   *
   * @param {Object} data
   * @returns {HTMLUListElement}
   */

  generatePinCard(data, guest = null) {
    if (!data) return;

    let html = `
     <li
            class="flex user-pin android-md:w-[22rem] rounded-md  my-2  w-full bg-zinc-50 border  overflow-hidden tablet:w-full grow-0 shrink-0 drop-shadow-sm" 
            data-id="${data[0].id}"
          >
            <!-- flag -->
            <span
              class="pin-card_flag inline-block w-3 flag-${data[0].pin_event} "
            ></span>
            <div
              class="pin-card-wrapper w-full pl-3 pr-2 py-4 flex flex-col justify-center"
            >
              <section class="pin-card_header flex items-start justify-between">
                <div class="user-profile_container flex">
                  <span
                    class="pin-card_header-user-image border border-slate-300 inline-block rounded-full py-[0.6rem] px-[0.7rem] bg-zinc-100"
                  >
                    <i class="fa-regular fa-user fa-xl text-zinc-400"></i>
                  </span>
                  <div
                    class="pin-card-header_user-name ml-2 font-semibold text-zinc-500 text-sm"
                  >
                    ${userName}
                  </div>
                </div>
              
                <div
                  class="pin-card-header_event-icon border border-zinc-200 bg-zinc-50 rounded-sm px-1 py-1 text-center flex-grow-0"
                >
                  ${data[0].pin_icon}
                </div>
              </section>
              <div class="flex mt-4 mb-1">
                <!-- date -->
                <span
                  class="pin-date text-zinc-400 w-4/5  text-[0.6rem]"
                >
                  <i class="fa-regular fa-calendar"></i>
                  ${data[0].pin_date}
                </span>
                <!-- edit -->
                <div class="pin-edit-box__container relative z-40
               
                " data-id="${data[0].id}">
                <i class="fa-solid fa-ellipsis p-1 rounded-sm hover:cursor-pointer text-zinc-300 hover:text-zinc-400 
                 ${guest ? 'hidden' : 'inline-block'}
                "></i>
                <ul class=" pin-edit-box hidden absolute border bg-zinc-200 -top-[4rem] -right-[6rem] text-zinc-600 rounded-sm py-1">
                  <li class="pin-edit-box_item cursor-pointer hover:bg-zinc-100 p-2 text-center">
                  Edit
                  </li>
                  <li class="pin-edit-box_item cursor-pointer hover:bg-zinc-100 p-2 text-center">
                  Delete
                  </li>
                  <li class="pin-edit-box_item cursor-pointer hover:bg-zinc-100 p-2 text-center">
                  Delete all
                  </li>
                </ul>

                </div>
                <!-- time -->
                <span
                  class="pin-time w-4/5 text-[0.6rem] text-right text-zinc-500 "
                >
                  
                  <i class="fa-regular fa-clock text-zinc-400"></i>
                  ${data[0].pin_time}
                </span>
              </div>
              <p
                class="pin-card-text py-2 px-2 border border-zinc-200 bg-white text-zinc-500 text-sm"
              >
                ${data[0].pin_message}
              </p>
            </div>
          </li>
    `;

    return html;
  }
}
