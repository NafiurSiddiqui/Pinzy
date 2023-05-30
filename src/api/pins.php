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
                echo $userLogged? "./user.php": "./guest.php";
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
  <ul class="global-pin-container hidden px-4 pt-8 pb-4 flex items-center flex-col bg-zinc-700 h-76vh overflow-y-scroll"
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
