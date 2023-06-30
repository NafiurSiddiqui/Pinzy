export default class PinCard {
  /**
   *
   * @param {Object} data
   * @returns {HTMLUListElement}
   */

  generatePinCard(data, guest = null) {
    if (!data) return;

    let userName =
      data?.user_name?.charAt(0).toUpperCase() + data?.user_name?.slice(1);

    let html = `
     <li
            class="group flex user-pin android-md:w-[22rem] rounded-md  my-2  w-full bg-transparent border border-zinc-500  overflow-hidden tablet:w-full grow-0 shrink-0 drop-shadow-sm laptop:cursor-pointer laptop:hover:bg-zinc-500" 
            data-id="${data.id}"
          >
            <!-- flag -->
            <span
              class="pin-card_flag inline-block w-3 flag-${data.pin_event} "
            ></span>
            <div
              class="pin-card-wrapper w-full pl-3 pr-2 py-4 flex flex-col justify-center"
            >
              <section class="pin-card_header flex items-start justify-between">
                <div class="user-profile_container flex">
                  <span
                    class="pin-card_header-user-image border border-zinc-300 inline-block rounded-full py-[0.6rem] px-[0.7rem] bg-zinc-600 laptop:group-hover:bg-zinc-500"
                  >
                    <i class="fa-regular fa-user fa-xl text-zinc-400"></i>
                  </span>
                  <div
                    class="pin-card-header_user-name ml-2 font-semibold text-zinc-200 text-sm laptop:group-hover:text-zinc-100"
                  >
                    ${data.user_name ? userName : 'Anonymous'}
                  </div>
                </div>
              
                <div
                  class="pin-card-header_event-icon border border-zinc-500 bg-transparent rounded-sm px-1 py-1 text-center flex-grow-0"
                >
                  ${data.pin_icon}
                </div>
              </section>
              <div class="flex mt-4 mb-1">
                <!-- date -->
                <span
                  class="pin-date text-zinc-300 w-4/5  text-[0.6rem]"
                >
                  <i class="fa-regular fa-calendar"></i>
                  ${data.pin_date}
                </span>
                <!-- edit -->
                <div class="pin-edit-box__container relative z-40
               
                " data-id="${data.id}">
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
                  class="pin-time w-4/5 text-[0.6rem] text-right text-zinc-300 "
                >
                  
                  <i class="fa-regular fa-clock text-zinc-300"></i>
                  ${data.pin_time}
                </span>
              </div>
              <p
                class="pin-card-text py-2 px-2 border border-zinc-200 bg-white text-zinc-800 text-sm"
              >
                ${data.pin_message}
              </p>
            </div>
          </li>
    `;

    return html;
  }
}
