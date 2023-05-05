<?php

//start session
session_start();

if (isset($_POST["submit"])) {

    //get the data

    $userName = $_POST["userName"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $confirmPassword = $_POST["confirm-password"];

    //instantiate signup controller

    include '../classes/dbh.classes.php';
    include '../classes/signup.classes.php';
    include '../classes/signup_controller.classes.php';

    $signup = new SignupController($userName, $email, $password, $confirmPassword);

    //Error handler
    $signup->signupUser();
    
    //send to home
    // header('location:../index.php?message=signupSucceed');

 

    if($_SESSION['signupSuccessful'] === true) {
        //redirect to user page
        header('location:/projects/pintzy/src/api/user.php');

    } else {
        //redirect to signup page
        header('location:/projects/pintzy/src/api/signup-form.php');
    }

}
