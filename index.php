<?php

if(isset($_GET["error"])) {
    $nameIsEmpty = isset($_GET["nameValidationMessage"]) ? $_GET["nameValidationMessage"]: '';
    $passwordIsEmpty = isset($_GET["passwordValidationMessage"]) ? $_GET["passwordValidationMessage"]:null;

}

if(isset($_GET['error'])) {
    $userErrorMsg = $_GET['error'];

}

$pathToIcon = './src/assets/logo.svg';
$pathToCss = './dist/output.css';
$pathToFaAll = './src/style/fontawesome/all.min.css';
$pathToFaMin = './src/style/fontawesome/fontawesome.min.css';
$pathToJs = './src/js/view/Auth.view.js';
$pageTitle = 'login';

include './src/api/layout/header-auth.php';

?>


<form action="./src/api/inc/login.inc.php"
  class="px-8 py-8 border-2 rounded border-zinc-200 w-full mt-4 flex justify-center flex-col items-center android-md/2:w-80 tablet-md:w-[21rem] tablet-md:px-6"
  method="POST">
  <div class="flex flex-col  w-full ">

    <div
      class="text-zinc-400 relative -bottom-[1.8rem] left-[0.4rem] max-w-max bg-white transition-all duration-300 px-[0.2rem]">
      Username/Email</div>
    <input type="text" spellcheck="false" name="userName" aria-label="User name" class="input-field border border-zinc-300 p-1 rounded !appearance-none bg-transparent z-10  focus:!outline-none focus:ring-2 focus:ring-green-400
      
      <?php
      echo !empty($nameIsEmpty) ? 'border-red-400': '';
?> 
      " />

    <span class="input-error-msg text-xs text-red-300 mt-1 ml-1">
      <?php
echo !empty($nameIsEmpty) ? "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>$nameIsEmpty</span>" : null;
?>
    </span>

  </div>
  <div class="flex flex-col w-full">

    <div
      class="text-zinc-400 relative -bottom-[1.8rem] left-[0.4rem] max-w-max bg-white transition-all duration-300 px-[0.2rem] ">
      Password
    </div>
    <input type="password" name="password" aria-label="Password" class="input-field border border-zinc-300 p-1 rounded !appearance-none bg-transparent  focus:!outline-none focus:ring-2 
                        focus:ring-green-400 z-10
                         <?php
      echo !empty($passwordIsEmpty) ? 'border-red-400': '';
?>
                        
                        " />
    <span class="input-error-msg text-xs text-red-300 mt-1 ml-1">
      <?php
                            echo !empty($passwordIsEmpty) ? "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>$passwordIsEmpty</span>" : '';
?>
    </span>
  </div>
  <button
    class="btn-user-input-login relative -bottom-4 w-full mt-10 mb-3 h-10 rounded font-semibold text-m text-zinc-50  android-md/2:w-52 android-md:rounded-2xl  border-4 border-green-400  bg-green-400 laptop:bg-transparent laptop:text-zinc-400 laptop:border-zinc-300  laptop:hover:bg-green-400 laptop:hover:text-zinc-100 laptop:hover:border-green-400 transition-colors active:text-zinc-100 "
    type="submit" name="submit">
    Login
  </button>
</form>
<!-- optional actions -->
<div class="flex android-md/2:w-80 tablet-md:w-[21rem]  w-full mt-8 laptop:mt-10">
  <!-- create account -->
  <div class="text-center flex flex-col  w-full  text-zinc-500">
    <span class="text-xs">Have account?</span>
    <a href="./src/api/signup-form.php"
      class="ml-1 font-bold  text-green-500 laptop:text-green-400 laptop:hover:text-green-500 hover:underline hover:text-green-600 transition-colors">Signup</a>
  </div>
  <!-- or -->
  <div class="text-center  w-full my-1 text-zinc-400 flex justify-center items-center">
    <span class="inline-block border w-8 border-zinc-300"></span>
    or
    <span class="inline-block border w-8 border-zinc-300"></span>
  </div>
  <!-- actions -->
  <div class="text-center  flex flex-col  w-full   text-zinc-500">
    <span class="text-xs">Explore as a</span>
    <a href="./src/api/guest.php"
      class="ml-1 font-bold  text-green-500 laptop:text-green-400 laptop:hover:text-green-500 hover:underline hover:text-green-600 transition-colors">Guest</a>
  </div>
</div>
</section>
</div>
</body>

</html>
