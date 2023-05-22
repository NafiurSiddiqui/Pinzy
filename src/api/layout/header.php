<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossorigin="" />
        <script defer src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
            integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
            crossorigin=""></script>
        <script src="https://kit.fontawesome.com/cf32b5773d.js" crossorigin="anonymous"></script>

        <!-- dynamic -->
        <link rel="shortcut icon" type="image/png" href="
        <?php
            echo !empty($pathToIcon)? $pathToIcon : 'setPath';
        ?>
        
        " />
        <script type="module" src="
        <?php
        echo !empty($pathToJs)? $pathToJs: 'setPath';

        ?>
        "></script>
        <link rel="stylesheet" href="
        <?php
            echo !empty($pathToCss) ? $pathToCss: 'setPath';
        ?>
        
        " />
        <title>Pinzy -
            <?php
                echo !empty($pageTitle) ? $pageTitle: 'default';
        ?>

        </title>
        <!-- dynamic ends -->
    </head>

    <body class="flex justify-center items-center flex-col">
        <div
            class="content-wrapper flex flex-col justify-center items-center  relative w-full desktop-md:w-4/5 desktop-md:py-8 desktop:px-8">
            <header class="w-full p-2">
                <div><span class="font-semibold font-caveat text-zinc-500 text-2xl desktop:ml-6 ml-4">Pinzy</span></div>
            </header>
            <section class="flex flex-col  items-center w-4/5 h-screen pt-4 laptop:pt-10  desktop-md:mt-16">
                <div class="flex justify-center w-28">
                    <img src="
                     <?php
                        echo !empty($pathToIcon)? $pathToIcon : 'setPath';
        ?>
                    
                    " alt="Pinzy Icon" class="!w-28" />
                </div>
                <?php
       
        echo !empty($userErrorMsg) ? "
            <div  class='toast-notification rounded-md bg-red-300 py-4 px-4 w-full android-md/2:w-80  tablet-md:w-[21rem]  flex justify-between items-center'>
                      <div class='notification-wrapper  flex justify-center items-center'>
                        <span class='flex items-center grow-0  justify-center'>
                        <i class='fa-regular fa-circle-xmark text-zinc-600'></i>
                        </span>
                        <div class='ml-2'>
                        <span class='text-sm text-zinc-700'>Error</span>
                        <p class='text-zinc-700 text-xs '>  $userErrorMsg</p>
                        </div>
                        <span>
                        </span>
                      </div>
                        <i class='fa-regular fa-x text-zinc-600'></i>
                        </div>

": '';
        ?>
