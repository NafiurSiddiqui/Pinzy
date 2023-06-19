<?php


//start session
session_start();


if (isset($_POST["submit"])) {

    //get the data

    $userName = $_POST["userName"];
    $email = $_POST["email"];
    $userPassword = $_POST["password"];
    $confirmPassword = $_POST["confirm-password"];

    //instantiate signup controller

    // include '../classes/dbh.classes.php';
    include '../db/db-connector.php';
    include '../classes/signup.classes.php';
    include '../classes/signup_controller.classes.php';
 
    $signUp = new Signup($pdo);
    $signup = new SignupController($userName, $email, $userPassword, $confirmPassword, $signUp);
    
    $signup->signupUser();
    

    //redirect to user page
    header("location:../../api/user.php?signup=successful&username=$userName");
 
    

}
