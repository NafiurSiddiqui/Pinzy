<?php

//get the user type
session_start();

$userLogged = false;

if(isset($_SESSION["id"])) {

    $userLogged = true;

} else {
    $userLogged= false;

}
$pageTitle = 'Pins';
include './layout/header-pin.php';


?>



<!-- nav -->
<nav class="py-4 px-4 drop-shadow-md shadow-zinc-100 bg-zinc-600">
  <ul class="flex justify-around">
    <li class="border-r border-r-1 border-r-gray-300 w-4/5 text-center text-base nav-active">
      Pins
    </li>
    <li
      class="font-semibold w-4/5 text-center text-base text-zinc-100 opacity-40 hover:font-semibold hover:opacity-100">
      <a href="
              <?php
                echo $userLogged? "./user.php": "../html/guest.html";
?>
              
              ">Profile</a>
    </li>
  </ul>
</nav>

<!-- pins -->
<div class="pin-container-wrapper__global bg-zinc-700 h-90vh">
  <p class="default-msg text-center text-zinc-400 font-semibold text-lg top-8 relative italic">
    No pins created yet.
  </p>
  <ul
    class="guest-pin-container global-pin-container hidden px-4 pt-8 pb-4 flex items-center flex-col bg-zinc-700 h-76vh overflow-y-scroll">
    <!-- placeholder -->
  </ul>
</div>
</div>
<!-- actions -->

<div
  class="user-profile-footer hidden w-full tablet:flex justify-center absolute bottom-0 left-0 px-4 py-5 bg-zinc-600 tablet:justify-between">
  <a class="btn-user-logout font-semibold px-4 text-lg flex justify-center rounded-sm ring-4 ring-zinc-300 text-zinc-300 items-center transition-all hover:text-zinc-50 hover:font-bold hover:ring-zinc-200 hover:shadow-lg hover:shadow-zinc-800 hidden tablet:flex"
    href="../../index.php">Logout</a>

  <i
    class="btn-sidebar fa-solid fa-chevron-left tablet:fa-flip-horizontal rounded-sm ring-4 ring-zinc-300 text-zinc-300 p-3 hover:text-zinc-100 hover:font-bold hover:ring-zinc-100 cursor-pointer transition-transform hover:shadow-lg hover:shadow-zinc-800"></i>
</div>
</aside>

<div
  class="user-profile-footer-mobile w-full flex justify-between fixed bottom-0 bg-zinc-600 left-0 px-4 py-4 tablet:justify-between  tablet:hidden z-30">
  <a class="btn-user-logout font-semibold px-4 text-lg flex justify-center rounded-sm ring-4 ring-zinc-300 text-zinc-300 items-center transition-all hover:text-zinc-50 hover:font-bold hover:ring-zinc-200 hover:shadow-lg hover:shadow-zinc-800 tablet:flex"
    href="../../index.php">Logout</a>

  <i
    class="btn-sidebar-mobile fa-solid fa-chevron-left fa-rotate-90 tablet:fa-flip-horizontal rounded-sm ring-4 ring-zinc-300 text-zinc-300 p-3 hover:text-zinc-100 hover:font-bold hover:ring-zinc-100 cursor-pointer transition-transform hover:shadow-lg hover:shadow-zinc-800"></i>
</div>
<section class="map-content w-full">
  <!-- main content -->

  <div class="ml-4 bg-slate-500">
    <span
      class="font-semibold font-caveat text-zinc-500 text-2xl desktop:ml-6 fixed top-2 right-4 z-20 bg-zinc-400/30 backdrop-blur-sm p-3 rounded-sm">Pinzy</span>
  </div>

  <!-- pop up for input-->

  <section
    class="user-input-bg flex flex-col justify-center left-0 items-center h-screen bg-gradient-to-r from-zinc-700/50 to-zinc-800/60 absolute w-full z-30 hidden"
    role="dialog">
    <span class="btn-close__user-input absolute bottom-16 tablet-md:top-16 cursor-pointer" role="button"
      aria-label="Close">
      <i class="fa-sharp fa-regular fa-circle-xmark fa-2xl text-zinc-400 laptop:text-zinc-500 hover:text-zinc-300"></i>
    </span>

    <form action="#"
      class="user-input-form p-4 rounded-sm pb-8 relative border border-zinc-600/50 bg-zinc-400/60 backdrop-blur-sm w-4/5 mt-4 flex justify-center flex-col items-center android-md/2:w-80 tablet-md:w-[26rem] tablet-md:rounded tablet-md:px-6 laptop:h-96"
      id="form-user-input">
      <div class="flex flex-col my-4 w-full">
        <label class="text-gray-600 text-xs mb-1" for="eventType">Pin type</label>
        <select name="eventType" id="eventType" class="p-1 cursor-pointer border border-zinc-300">
          <option value="none">---</option>
          <option value="emergency" data-icon="🚨" data-color="-red-500">
            Emergency 🚨
          </option>
          <option value="alert" data-icon="&#9888;" data-color="-yellow-500">
            Alert &#9888;
          </option>
          <option value="event" data-icon="&#9733;" data-color="-orange-500">
            Event &#9733;
          </option>
          <option value="review" data-icon="🤔" data-color="-violet-500">
            Review 🤔
          </option>
          <option value="touristAttraction" data-icon="🌐" data-color="-teal-500">
            Tourist Attraction 🌐
          </option>
          <option value="reacreational" data-icon="😎" data-color="-yellow-900">
            Recreational 😎
          </option>
        </select>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-gray-600 text-xs mb-1" for="message">Message</label>
        <textarea class="rounded-sm border border-zinc-300 p-2 resize-none" name="message" id="message" cols="30"
          rows="4"></textarea>
      </div>
      <button
        class="btn-user-input w-full mt-10 mb-3 h-10 rounded font-semibold text-m text-zinc-300 android-md/2:w-52 android-md:rounded-2xl ring-4 ring-zinc-300 transition-all hover:text-zinc-50 hover:font-bold hover:ring-zinc-200 active:text-zinc-100 disabled:ring-zinc-400 disabled:!text-zinc-500 disabled:!font-normal disabled:!bg-transparent disabled:hover:shadow-none laptop:hover:bg-zinc-400 laptop:hover:text-zinc-100 laptop:hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-700"
        type="submit" name="guest-submit" disabled>
        Pin
      </button>
    </form>
    ;
  </section>
  <!-- pop up for edit -->
  <section
    class="hidden user-input-bg__edit flex flex-col justify-center left-0 items-center h-screen bg-gradient-to-r from-zinc-700/50 to-zinc-800/60 absolute w-full z-30"
    role="dialog">
    <span class="btn-close__user-input absolute bottom-16 tablet-md:top-16 cursor-pointer" role="button"
      aria-label="Close">
      <i class="fa-sharp fa-regular fa-circle-xmark fa-2xl text-zinc-400 laptop:text-zinc-500 hover:text-zinc-300"></i>
    </span>

    <form action="#"
      class="user-input-form__edit p-4 rounded-sm pb-8 relative border border-gray-300 bg-zinc-300 w-4/5 mt-4 flex justify-center flex-col items-center android-md/2:w-80 tablet-md:w-[26rem] tablet-md:rounded tablet-md:px-6 laptop:h-96"
      id="form-user-input__edit">
      <div class="flex flex-col my-4 w-full">
        <label class="text-gray-600 text-xs mb-1" for="eventType__edit">Pin type</label>
        <select name="eventType__edit" id="eventType__edit" class="p-1 cursor-pointer border border-zinc-300">
          <option value="none">---</option>
          <option value="emergency" data-icon="🚨" data-color="-red-500">
            Emergency 🚨
          </option>
          <option value="alert" data-icon="&#9888;" data-color="-yellow-500">
            Alert &#9888;
          </option>
          <option value="event" data-icon="&#9733;" data-color="-orange-500">
            Event &#9733;
          </option>
          <option value="review" data-icon="🤔" data-color="-violet-500">
            Review 🤔
          </option>
          <option value="touristAttraction" data-icon="🌐" data-color="-teal-500">
            Tourist Attraction 🌐
          </option>
          <option value="reacreational" data-icon="😎" data-color="-yellow-900">
            Recreational 😎
          </option>
        </select>
      </div>
      <div class="flex flex-col w-full">
        <label class="text-gray-600 text-xs mb-1" for="message__edit">Message</label>

        <textarea class="rounded-sm border border-zinc-300 p-2 resize-none" name="message__edit" id="message__edit"
          cols="30" rows="4"></textarea>
      </div>
      <button
        class="btn-user-input w-full mt-10 mb-3 h-10 rounded font-semibold text-m text-zinc-300 android-md/2:w-52 android-md:rounded-2xl ring-4 ring-zinc-300 transition-all hover:text-zinc-50 hover:font-bold hover:ring-zinc-200 active:text-zinc-100 disabled:ring-zinc-400 disabled:!text-zinc-500 disabled:!font-normal disabled:!bg-transparent disabled:hover:shadow-none laptop:hover:bg-zinc-400 laptop:hover:text-zinc-100 laptop:hover:border-zinc-400 hover:shadow-lg hover:shadow-zinc-700"
        type="submit" name="guest-submit-edit" disabled>
        Pin
      </button>
    </form>
    ;
  </section>
  <!-- map -->
  <div class="map-container h-screen z-10 flex justify-center items-center">
    <div class="loader-wrapper flex justify-between items-center w-60 absolute top-80">
      <div class="spinner spin z-20">
        <img src="../assets/spinner.svg" alt="globe" class="w-16" />
      </div>

      <span class="text-4xl text-zinc-600"> Loading...</span>
    </div>
    <div id="map" class="h-screen z-10 w-full"></div>
  </div>
</section>
</div>
</body>

</html>
