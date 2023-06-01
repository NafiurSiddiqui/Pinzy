export default class PinCard {
  /**
   *
   * @param {Object} data
   * @returns {HTMLUListElement}
   */

  generatePinCard(data, guest = null) {
    let html = `
     <li
            class="flex user-pin android-md:w-[22rem] rounded-md  my-2  w-full bg-zinc-50 border  overflow-hidden tablet:w-full grow-0 shrink-0 drop-shadow-sm" 
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
                    class="pin-card-header_user-name ml-2 font-semibold text-zinc-500 text-sm"
                  >
                    ${data.userName}
                  </div>
                </div>
              
                <div
                  class="pin-card-header_event-icon border border-zinc-200 bg-zinc-50 rounded-sm px-1 py-1 text-center flex-grow-0"
                >
                  ${data.icon}
                </div>
              </section>
              <div class="flex mt-4 mb-1">
                <!-- date -->
                <span
                  class="pin-date text-zinc-400 w-4/5  text-[0.6rem]"
                >
                  <i class="fa-regular fa-calendar"></i>
                  ${data.date}
                </span>
                <!-- edit -->
                <div class="pin-edit-box__container relative z-40
               
                " data-id="${data.id}">
                <i class="fa-solid fa-ellipsis p-1 rounded-sm hover:cursor-pointer text-zinc-300 hover:text-zinc-400 
                 ${guest ? 'hidden' : 'inline-block'}
                "></i>
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
                  class="pin-time w-4/5 text-[0.6rem] text-right text-zinc-500 "
                >
                  
                  <i class="fa-regular fa-clock text-zinc-400"></i>
                  ${data.time}
                </span>
              </div>
              <p
                class="pin-card-text py-2 px-2 border border-zinc-200 bg-white text-zinc-500 text-sm"
              >
                ${data.message}
              </p>
            </div>
          </li>
    `;

    return html;
  }
}
