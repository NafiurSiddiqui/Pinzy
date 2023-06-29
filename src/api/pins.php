<?php

//get the user type
session_start();

$userLogged = false;

if(isset($_SESSION["user_id"]) || isset($_SESSION['signupSuccessful']) == true) {

    $userLogged = true;

} else {
    $userLogged= false;

}



$pageTitle = 'Pins';
include './layout/header-pin.php';


?>



<!-- nav -->
<nav class="py-4 px-4 drop-shadow-md shadow-zinc-100 bg-zinc-500">
  <ul class="flex justify-around">
    <li class="border-r border-r-1 border-r-zinc-400 w-4/5 text-center text-base nav-active">
      Pins
    </li>
    <li class="font-semibold w-4/5 text-center text-base text-zinc-400 hover:text-zinc-100  ">
      <a href="
              <?php
                echo $userLogged? "./user.php": "./guest.php";?>
              ">Profile</a>
    </li>
  </ul>
</nav>

<!-- pins -->
<div class="pin-container-wrapper__global bg-zinc-400 h-90vh">
  <p class="default-msg text-center text-zinc-100 font-semibold text-lg top-8 relative italic">
    No pins created yet.
  </p>
  <ul
    class="global-pin-container hidden px-4 pt-8 pb-4 flex items-center flex-col bg-zinc-600 h-[84vh] overflow-y-scroll"
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
  $logoutPath = $userLogged ? './inc/logout.inc.php' : null;

include './layout/bottom-pin.php';
?>
