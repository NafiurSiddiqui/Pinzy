<?php
if(isset($_GET["error"])) {
    $nameIsEmpty = isset($_GET["nameValidationMessage"]) ? $_GET["nameValidationMessage"]: '';
    $passwordIsEmpty = isset($_GET["passwordValidationMessage"]) ? $_GET["passwordValidationMessage"]:null;

}

?>



<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="shortcut icon" type="image/png" href="./src/assets/logo.svg" />

    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
      integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
      crossorigin="" />
    <script defer src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
      integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
      crossorigin=""></script>
    <script src="https://kit.fontawesome.com/cf32b5773d.js" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="./dist/output.css" />
    <script type="module" src="./src/js/ui.js"></script>

    <title>Pinzy - login</title>
  </head>

  <body class="flex justify-center items-center flex-col">
    <header class="w-full p-2">
      <div><span class="font-semibold desktop:ml-6">Pinzy</span></div>
    </header>
    <section class="flex flex-col items-center w-4/5 h-screen pt-4">
      <div class="flex justify-center w-28">
        <img src="./src/assets/logo.svg" alt="Pinzy Icon" class="!w-28" />
      </div>
      <form action="src/api/inc/login.inc.php"
        class="pt-4 pb-14 px-2 border-2 rounded border-zinc-200 w-full mt-4 flex justify-center flex-col items-center android-md/2:w-80 tablet-md:w-[21rem] tablet-md:px-6"
        method="POST">
        <div class="flex flex-col  w-full">

          <div
            class="text-zinc-500 relative -bottom-[1.8rem] left-[0.4rem] max-w-max bg-white transition-all duration-300 px-[0.2rem]">
            Username/Email</div>
          <input type="text" spellcheck="false" name="userName" aria-label="User name"
            class="input-field border border-zinc-300 p-1 rounded !appearance-none bg-transparent z-10  focus:!outline-none focus:ring-2 focus:ring-green-400 " />

          <span class="text-xs text-red-300 mt-1 ml-1">
            <?php
                            echo !empty($nameIsEmpty) ? "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>$nameIsEmpty</span>" : null;
?>
          </span>

        </div>
        <div class="flex flex-col w-full">

          <div
            class="text-zinc-500 relative -bottom-[1.8rem] left-[0.4rem] max-w-max bg-white transition-all duration-300 px-[0.2rem] ">
            Password
          </div>
          <input type="password" name="password" aria-label="Password" class="input-field border border-zinc-300 p-1 rounded !appearance-none bg-transparent  focus:!outline-none focus:ring-2 
                        focus:ring-green-400 z-10 " />
          <span class="text-xs text-red-300 mt-1 ml-1">
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
      <div class="flex android-md/2:w-80 tablet-md:w-[21rem]  w-full mt-4 ">
        <!-- create account -->
        <div class="text-center  w-full  text-zinc-500">
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
        <div class="text-center  w-full  text-zinc-500">
          <span class="text-xs">Explore as a</span>
          <a href="../html/guest.html"
            class="ml-1 font-bold  text-green-500 laptop:text-green-400 laptop:hover:text-green-500 hover:underline hover:text-green-600 transition-colors">Guest</a>
        </div>
      </div>
    </section>
  </body>

</html>
