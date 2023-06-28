<?php
$hasError = false;



if (isset($_GET["error"])) {
    $hasError = true;

    $emptyName = $_GET['error'] == 'name is required'? $_GET["error"] : '';
    $invalidUserName = $_GET['error'] == 'invalid username' ? $_GET['error'] : '';
    $emptyEmail = $_GET['error'] == 'email is required'? $_GET['error']: '';
    $invalidEmail = $_GET['error'] == 'invalid email'? $_GET['error'] : '';
    $emptyPass = $_GET["error"] == 'password is required' ? $_GET['error'] : '';
    $emptyRepass = $_GET['error'] == 'confirm password'? $_GET['error']: '';
    $passMismatched = $_GET['error'] == 'passwords do not match' ? $_GET['error'] : '';
    $emptyInput = $_GET['error'] == 'empty input' ? $_GET['error'] : '';
    $userExists = $_GET['error']  == 'user already exists'? $_GET['error']: '';

}




function echoErrorStyle($hasError, $emptyInput)
{
    if($hasError || $emptyInput) {
        echo "border-red-500";
    } else {
        echo "";
    }
}


$pathToIcon = '../assets/logo.svg';
$pathToCss = '../../dist/output.css';
$pathToFaAll = '../style/fontawesome/all.min.css';
$pathToFaMin = '../style/fontawesome/fontawesome.min.css';
$pathToJs = '../js/view/Auth.view.js';

$pageTitle = 'Signup';

include './layout/header-auth.php';

?>

<form action="inc/signup.inc.php" method="post"
    class="px-8 py-8 border-2 rounded border-zinc-400/80  w-full mt-4 flex justify-center flex-col items-center android-md/2:w-80 tablet-md:w-[21rem] tablet-md:px-6">
    <div class="flex flex-col my-2 w-full">
        <div class="text-zinc-400 relative -bottom-[2rem] left-[0.4rem] max-w-max transition-all duration-300  ">
            Username</div>
        <input type="text" spellcheck="false" name="userName" aria-label="User name" class="input-field z-10 bg-transparent border-2 border-zinc-400 p-2 rounded !appearance-none  focus:!outline-none focus:ring-2  focus:ring-green-400  
        
        <?php echo (!empty($invalidUserName) || !empty($emptyName) || !empty($emptyInput)) ? 'ring ring-red-400': ''  ?>
        " />
        <span class="input-error-msg text-xs text-red-500 mt-1 ml-1">
            <?php
                if(!empty($emptyName)) {
                    echo "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>
                        $emptyName
                </span>";
                }

                if(!empty($invalidUserName)) {
                    echo "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>
                        $invalidUserName
                </span>";
                }


?>
        </span>
    </div>
    <div class="flex flex-col my-2 w-full">
        <div
            class="text-zinc-400 relative -bottom-[2rem] left-[0.4rem] max-w-max transition-all duration-300 px-[0.2rem]">
            Email</div>
        <input type="email" name="email" aria-label="Email" spellcheck="false"
            class="input-field z-10 bg-transparent border-2 border-zinc-400 p-2 rounded !appearance-none  focus:!outline-none focus:ring-2 focus:ring-green-400  
        <?php echo (!empty($invalidEmail) ||!empty($emptyEmail) || !empty($emptyInput)) ? 'ring ring-red-400': ''  ?> " />
        <span class="input-error-msg text-xs text-red-500 mt-1 ml-1">
            <?php

                if(!empty($emptyEmail)) {
                    echo "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>$emptyEmail</span>";
                }


                
                if(!empty($invalidEmail)) {
                    echo "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>$invalidEmail</span>";
                }

?>
        </span>
    </div>
    <div class="flex flex-col my-2 w-full">
        <div
            class="text-zinc-400 relative -bottom-[2rem] left-[0.4rem] max-w-max transition-all duration-300 px-[0.2rem] ">
            Password
        </div>
        <input type="password" name="password" aria-label="Password"
            class="input-field z-10 bg-transparent border-2 border-zinc-400 p-2 rounded !appearance-none  focus:!outline-none focus:ring-2  focus:ring-green-400 
            <?php echo (!empty($emptyPass)  || !empty($emptyInput)) ? 'ring ring-red-400': ''; ?> " />
        <span class="input-error-msg text-xs text-red-500 mt-1 ml-1">
            <?php
            echo !empty($emptyPass) ? "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>$emptyPass</span>" : null;?>
        </span>
    </div>
    <div class="flex flex-col my-2 w-full">
        <div
            class="text-zinc-400 relative -bottom-[2rem] left-[0.4rem] max-w-max transition-all duration-300 px-[0.2rem]">
            Confirm
            Password</div>
        <input type="password" name="confirm-password" aria-label="Confirm Password"
            class="input-field z-10 bg-transparent border-2 border-zinc-400 p-2 rounded !appearance-none  focus:!outline-none focus:ring-2  focus:ring-green-400 
            <?php echo (!empty($passMismatched) || !empty($emptyRepass)  || !empty($emptyInput)) ? 'ring ring-red-400': ''; ?> " />
        <span class="input-error-msg text-xs text-red-500 mt-1 ml-1">
            <?php
                if(!empty($emptyRepass)) {
                    echo  "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>$emptyRepass</span>";
                }
                
                if(!empty($passMismatched)) {
                    echo  "<i class='fa-solid fa-triangle-exclamation'></i><span class='ml-1'>$passMismatched</span>";
                }
                

?>
        </span>
    </div>
    <button class="btn-user-input-login relative -bottom-4 w-full mt-10 mb-3 h-10 rounded font-semibold text-m text-zinc-50  android-md/2:w-52 android-md:rounded-2xl  border-4 border-green-400  bg-green-400   laptop:hover:bg-green-500 laptop:hover:border-green-500
        laptop:h-full laptop:py-2 laptop:px-4 
        transition-colors active:text-zinc-100 " type="submit" name="submit">
        Signup
    </button>
</form>
<!-- optional actions -->
<div class="flex justify-between android-md/2:w-80 tablet-md:w-[21rem]  w-full mt-8 laptop:mt-10">

    <div class="text-center flex flex-col   w-24 whitespace-nowrap  ">
        <span class="text-xs text-zinc-600">Have account?</span>
        <a href="../../index.php"
            class="ml-1 font-bold  text-green-500 hover:underline hover:text-green-600 transition-colors">Login</a>
    </div>

    <div class="text-center  my-1 text-zinc-500 flex justify-center items-center">
        <span class="inline-block border w-8 border-zinc-400 mr-1"></span>
        or
        <span class="inline-block border w-8 border-zinc-400 ml-1"></span>
    </div>

    <div class="text-center  flex flex-col  w-24 whitespace-nowrap   text-zinc-500">
        <span class="text-xs text-zinc-600">Explore as a</span>
        <a href="./guest.php"
            class="ml-1 font-bold  text-green-500 hover:underline hover:text-green-600 transition-colors">Guest</a>
    </div>
</div>
</section>
</div>
</body>

</html>
