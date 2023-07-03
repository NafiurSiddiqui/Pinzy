<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />

        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

        <link href="https://fonts.googleapis.com/css2?family=Caveat&display=swap" rel="stylesheet">


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
        <link rel="stylesheet" href="
        <?php
    echo !empty($pathToFaAll) ? $pathToFaAll: 'setPath';
?>   
        " />
        <link rel="stylesheet" href="
        <?php
    echo !empty($pathToFaMin) ? $pathToFaMin: 'setPath';
?>   
        " />
        <title>Pinzy -
            <?php
        echo !empty($pageTitle) ? $pageTitle: 'default';
?>

        </title>
        <!-- dynamic ends -->
    </head>

    <body class="flex justify-center items-center flex-col pb-16">
        <div
            class="content-wrapper flex flex-col justify-center items-center laptop:pb-16  relative w-full desktop-md:w-[78rem] desktop-md:px-24 desktop-md:py-8 desktop desktop:px-8 ">
            <header class="w-full p-2 relative">
                <div><span
                        class="font-semibold font-caveat text-zinc-500 text-2xl desktop:ml-6 ml-4 desktop-md:text-4xl ">Pinzy</span>
                </div>
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




    if(isset($_GET['loginError']) || isset($_GET["error"])) {

        
        echo  "
            <div  class='toast-notification rounded-md bg-red-200 py-4 px-4 border-2 border-rose-200 w-full android-md/2:w-80  tablet-md:w-[21rem]  flex justify-between items-center'>
                      <div class='notification-wrapper  flex justify-center items-center'>
                        <span class='flex items-center grow-0  justify-center'>
                     
                        </span>
                        <div class='ml-2'>
                        <span class='text-sm text-zinc-700'>Error</span>
                        <p class='text-zinc-700 text-xs '>
                        ";
        
        // login page
        if(!empty($nameIsEmpty)) {
            echo $nameIsEmpty;
        }

        if(!empty($passwordIsEmpty)) {
            echo $passwordIsEmpty;
        }

        if(!empty($loginError)) {
            echo $loginError;
        }
        // signup page
        if(!empty($emptyInput)) {
            echo $emptyInput;
        }
            
        if(!empty($emptyName)) {
            echo $emptyName;
        }

        if(!empty($invalidUserName)) {
            echo $invalidUserName;
        }

        if(!empty($invalidEmai)) {
            echo $invalidEmai;
        }
        if(!empty($emptyPass)) {
            echo $emptyPass;
        }

        if(!empty($passMismatched)) {
            echo $passMismatched;
        }

        if(!empty($userExists)) {
            echo $userExists;
        }





        echo "
                          </p>
                        </div>
                        <span>
                        </span>
                      </div>
                          <i class='fa-regular fa-circle-xmark text-zinc-500 cursor-pointer hover:text-zinc-600 transition-colors'></i>
                        </div>

";
    }
?>
