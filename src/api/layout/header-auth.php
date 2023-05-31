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

// if(!empty($userErrorMsg) || !empty($nameIsEmpty) || !empty($passwordIsEmpty) || !empty($errorMsg) || !empty($signupError) || !empty($fieldsAreEmpty) ||!empty($userNameHasError) || !empty($emailHasError) || !empty($passwordHasError) || !empty($confirmPasswordHasError) || !empty($userExists)) {

    if(isset($_GET['error']) || isset($_GET['signupError'])) {

        
        echo  "
            <div  class='toast-notification rounded-md bg-red-200 py-4 px-4 border border-red-500 w-full android-md/2:w-80  tablet-md:w-[21rem]  flex justify-between items-center'>
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

        if(!empty($errorMsg)) {
            echo $errorMsg;
        }

        //signup page

        // $userNameIsEmpty = !empty($_GET['userNameIsEmpty']) ? urldecode($_GET['userNameIsEmpty']) : '';
        // $emailHasError = !empty($_GET['emailHasError'])? urldecode($_GET['emailHasError']): '';
        // $passwordHasError = !empty($_GET['passwordHasError'])? urldecode($_GET['passwordHasError']): '';
        // $confirmPasswordHasError = !empty($_GET['confirmPasswordHasError']) ?  urldecode($_GET['confirmPasswordHasError']): '';
        // $userExists = !empty($_GET['userExists'])? urldecode($_GET['userExists']):'';
        // $fieldsAreEmpty = !empty($_GET['fieldsAreEmpty'])? urldecode($_GET['fieldsAreEmpty']):'';

        echo !empty($signupError)? $signupError : '';

      



   
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
