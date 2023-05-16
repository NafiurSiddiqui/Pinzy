<?php

if (isset($_POST["submit"])) {
    // // Debugging output
    // var_dump($_POST);
    // exit();

    //get the data
    $userName = $_POST["userName"];
    $password = $_POST["password"];

    //instantiate signup controller
    
    include '../classes/dbh.classes.php';
    include '../classes/login.classes.php';
    include '../classes/login_controller.classes.php';
    
    
    $login = new loginController($userName, $password);
    // var_dump($login->userName);
    // var_dump($login->password);
    // exit();
    $userNameErr = $login->nameValidationMessage;
 
    //Error handler
    $login->loginUser();

  

    //send to userPage
    header('location:../user.php?message=loginSuccessful');
    // header('location:/projects/pintzy/src/api/user.php');
}
