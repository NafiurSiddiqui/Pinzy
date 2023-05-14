<?php

if (isset($_POST["submit"])) {

    //get the data
    $userName = $_POST["username"];
    $password = $_POST["password"];


    //instantiate signup controller
   
    include '../classes/dbh.classes.php';
    include '../classes/login.classes.php';
    include '../classes/login_controller.classes.php';

    $login = new loginController($userName, $password);

    $userNameErr = $login->nameValidationMessage;
 
    //Error handler
    $login->loginUser();

    // session_start();

    // $_SESSION['userName'] = $userName;

    //send to userPage
    header('location:../user.php?message=loginSuccessful');
    // header('location:/projects/pintzy/src/api/user.php');
}
