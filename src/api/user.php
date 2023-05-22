<?php

// You need to start the session where you need to have a session access.
session_start();

$userName = "Someting_wong";
$userLogged = false;

if(isset($_SESSION["id"]) || (isset($_SESSION['signupSuccessful']) && isset($_SESSION['signupSuccessful'])== true)) {

   
    if (isset($_SESSION["userName"])) {
        $userName = $_SESSION["userName"];
        $userLogged = true;
    }



} else {
    $userLogged= false;
    header("location:../../index.php?message=access_denied");
    exit();
}

$pageTitle = 'Profile';

include './layout/header-pin.php';

?>



<!-- nav -->
<nav class=" py-4 px-4 drop-shadow-md shadow-zinc-100 bg-zinc-600">
  <ul class="flex justify-around">
    <li
      class=" border-r border-r-1 border-r-gray-300 w-4/5 text-center text-zinc-100 opacity-40 text-base hover:font-semibold hover:opacity-100 ">
      <a href="./pins.php">Pins</a>
    </li>
    <li class="font-semibold w-4/5 text-center nav-active text-base">
      Profile
    </li>
  </ul>
</nav>

<!-- user info -->
<div class="signed-user-profile_container flex w-full my-4  px-5 items-center justify-between ">
  <!-- placeholder -->
  <div
    class="user-profile_header-user-image border border-slate-300 w-16 h-16 rounded-full p-2 bg-white flex justify-center items-center">
    <img src="../assets/user-icon-large.svg" alt="user profile" />
  </div>
  <span class="user-profile-header_user-name ml-2  inline-block font-semibold text-zinc-100 text-2xl">
    <?php
           
echo $userLogged? $userName: '';
?>
  </span>

  <div class="user-profile__user-pin-count border border-slate-300 bg-zinc-300 rounded-sm px-1 py-1 text-center">
    <span class="user-profile__pin-count__digit font-semibold tablet:text-sm max-w-[2rem]">

    </span>
    <i class="fa-solid fa-location-dot text-slate-500"></i>
  </div>
</div>

<!-- pins -->
<div class="pin-container-wrapper__global bg-zinc-700 h-76vh laptop:h-76vh/20">
  <p class="default-msg text-center text-zinc-400 font-semibold text-lg top-8 relative italic">
    No pins created yet.
  </p>
  <ul class="user-pin-container  hidden px-4 pt-8 pb-4 flex items-center flex-col bg-zinc-700 h-65vh overflow-y-scroll">
    <!-- placeholder -->
  </ul>

</div>
</div>


<?php
  $logoutPath = './inc/logout.inc.php';
include './layout/bottom-pin.php';
?>
