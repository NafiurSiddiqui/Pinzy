<?php

//get the user type
session_start();

$userLogged = false;

if(isset($_SESSION["id"])) {

    $userLogged = true;

} else {
    $userLogged= false;

}
$pageTitle = 'Guest';
include './layout/header-pin.php';
?>


<!-- nav -->

<nav class="py-4 px-4 drop-shadow-sm shadow-zinc-100 bg-zinc-500">
    <ul class="flex justify-around">
        <li
            class="border-r border-r-1 border-r-zinc-400 w-4/5 text-center text-zinc-400 font-semibold  text-base  hover:text-zinc-100 ">
            <a href="../api/pins.php">Pins</a>
        </li>
        <li class="font-semibold w-4/5 text-center nav-active text-base">
            Profile
        </li>
    </ul>
</nav>

<!-- user info -->
<div class="guest-user-profile_container flex w-full pt-4 pb-2 px-5 items-center justify-between bg-zinc-500">
    <!-- placeholder -->
    <div
        class="user-profile_header-user-image border border-zinc-400 w-16 h-16 rounded-full p-2 bg-zinc-500 flex justify-center items-center">

        <i class="fa-regular fa-user fa-2xl text-zinc-400"></i>
    </div>
    <span class="user-profile-header_user-name ml-2 inline-block font-semibold text-zinc-100 text-2xl">
        Anonymous
    </span>
    <div class="guest-profile__pin-count-wrapper border border-zinc-400  rounded-sm px-2 py-1 text-center">
        <span class="guest-profile__pin-count font-semibold tablet:text-sm max-w-[2rem] text-zinc-200">
            0
        </span>
        <i class="fa-solid fa-location-dot text-zinc-300"></i>
    </div>
</div>

<!-- pins -->
<div class="guest-pin-container-wrapper bg-zinc-400 h-76vh laptop:h-76vh/20 relative z-10">
    <p class="default-msg text-center text-zinc-200 font-semibold text-lg top-8 relative italic">

    </p>
    <ul class="guest-pin-container  hidden px-4 pt-8 pb-16 flex items-center flex-col bg-zinc-600 h-68vh overflow-y-scroll"
        data-userLogged="
    <?php
      echo $userLogged ? 'true':'false';
?>
    
    ">
        <!-- placeholder -->
    </ul>
</div>
</div>

<?php
$logoutPath = '../../index.php';
include './layout/bottom-pin.php';
?>
