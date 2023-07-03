<?php

if(isset($_GET["message"])) {

    $message = !empty($_GET["message"]) ? $_GET["message"]: '';
    $code = !empty($_GET["errorCode"]) ? $_GET["errorCode"]: '';

}


$pathToIcon = '../assets/logo.svg';
$pathToCss = '../../dist/output.css';
$pathToFaAll = '../style/fontawesome/all.min.css';
include './layout/header-auth.php';

?>


<div class="error-container border border-red-200 py-8 px-4 mt-24 rounded-md bg-rose-100 shadow-md tablet-md:max-h-56 ">
    <h1 class="text-2xl mb-8 text-center">Something went wrong! 🤦</h1>

    <div class="text-zinc-700 px-2 ">
        <?php echo !empty($message)? $message: '';?>
    </div>

    <div class="font-semibold text-2xl text-zinc-800 mt-4 text-center">
        Error code:
        <?php echo !empty($code)? $code: '';?> 🤔
    </div>
</div>
</div>
</body>

</html>
