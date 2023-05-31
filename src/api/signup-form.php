<?php

if(isset($_GET['signupError'])) {
    $signupError = $_GET['signupError'];
    $userNameHasError = !empty($_GET['userNameIsEmpty']) ? $_GET['userNameIsEmpty']:'';
    $emailHasError = !empty($_GET['emailHasError']) ? $_GET['emailHasError'] :'' ;
    $passwordHasError = !empty($_GET['passwordHasError']);
    $confirmPasswordHasError = !empty($_GET['confirmPasswordHasError']);
    $emptyFields = !empty($_GET['fieldsAreEmpty']);
    $userExists = !empty($_GET['userExists']);
}


function echoErrorStyle($hasError, $emptyFields)
{
    if($hasError || $emptyFields) {
        echo "border-red-500";
    } else {
        echo "";
    }
}


$pathToIcon = '../assets/logo.svg';
$pathToCss = '../../dist/output.css';
$pathToFaAll = '../style/fontawesome/all.min.css';
$pathToFaMin = '../style/fontawesome/fontawesome.min.css';
$pathToJs = '../js/ui.js';
$pageTitle = 'Signup';

include './layout/header-auth.php';

?>

<form action="inc/signup.inc.php" method="post"
    class="px-8 py-8 border-2 rounded border-zinc-200 w-full mt-4 flex justify-center flex-col items-center android-md/2:w-80 tablet-md:w-[21rem] tablet-md:px-6">
    <div class="flex flex-col my-2 w-full">
        <div class="text-zinc-400 relative -bottom-[1.8rem] left-[0.4rem] max-w-max transition-all duration-300  ">
            Username</div>
        <input type="text" spellcheck="false" name="userName" aria-label="User name" class="input-field z-10 bg-transparent border border-zinc-300 p-1 rounded !appearance-none  focus:!outline-none focus:ring-2  focus:ring-green-400
        <?php echoErrorStyle($userNameHasError, $emptyFields)   ?>
        " />
    </div>
    <div class="flex flex-col my-2 w-full">
        <div
            class="text-zinc-400 relative -bottom-[1.8rem] left-[0.4rem] max-w-max transition-all duration-300 px-[0.2rem]">
            Email</div>
        <input type="email" name="email" aria-label="Email" spellcheck="false" class="input-field z-10 bg-transparent border border-zinc-300 p-1 rounded !appearance-none  focus:!outline-none focus:ring-2 focus:ring-green-400 
        <?php echoErrorStyle($emailHasError, $emptyFields); ?>

        " />

    </div>
    <div class="flex flex-col my-2 w-full">
        <div
            class="text-zinc-400 relative -bottom-[1.8rem] left-[0.4rem] max-w-max transition-all duration-300 px-[0.2rem] ">
            Password
        </div>
        <input type="password" name="password" aria-label="Password" class="input-field z-10 bg-transparent border border-zinc-300 p-1 rounded !appearance-none  focus:!outline-none focus:ring-2  focus:ring-green-400
            <?php echoErrorStyle($passwordHasError, $emptyFields); ?>
        
        " />
    </div>
    <div class="flex flex-col my-2 w-full">
        <div
            class="text-zinc-400 relative -bottom-[1.8rem] left-[0.4rem] max-w-max transition-all duration-300 px-[0.2rem]">
            Confirm
            Password</div>
        <input type="password" name="confirm-password" aria-label="Confirm Password" class="input-field z-10 bg-transparent border border-zinc-300 p-1 rounded !appearance-none  focus:!outline-none focus:ring-2  focus:ring-green-400
            <?php echoErrorStyle($confirmPasswordHasError, $emptyFields); ?>
        
        " />
    </div>
    <button
        class="btn-user-input-login relative -bottom-4 w-full mt-10 mb-3 h-10 rounded font-semibold text-m text-zinc-50  android-md/2:w-52 android-md:rounded-2xl  border-4 border-green-400  bg-green-400 laptop:bg-transparent laptop:text-zinc-400 laptop:border-zinc-300  laptop:hover:bg-green-400 laptop:hover:text-zinc-100 laptop:hover:border-green-400 transition-colors active:text-zinc-100 "
        type="submit" name="submit">
        Signup
    </button>
</form>
<!-- optional actions -->
<div class="flex  android-md/2:w-80 tablet-md:w-[21rem]  w-full mt-8 laptop:mt-10">
    <!-- create account -->
    <div class="text-center  flex flex-col  w-full  text-zinc-500">
        <span class="text-xs">Have account?</span>
        <a href="../../index.php"
            class="ml-1 font-bold  text-green-500 hover:underline hover:text-green-600 transition-colors">Login</a>
    </div>
    <!-- or -->
    <div class="text-center  w-full my-1 text-zinc-400 flex justify-center items-center">
        <span class="inline-block border w-8 border-zinc-300"></span>
        or
        <span class="inline-block border w-8 border-zinc-300"></span>
    </div>
    <!-- actions -->
    <div class="text-center  flex flex-col  w-full  text-zinc-500">
        <span class="text-xs">Explore as a</span>
        <a href="./guest.php"
            class="ml-1 font-bold  text-green-500 hover:underline hover:text-green-600 transition-colors">Guest</a>
    </div>
</div>
</section>
</div>
</body>

</html>
