<?php


//start session
session_start();


if (isset($_POST["submit"])) {

    //get the data
    $userName = filter_input(INPUT_POST, 'userName', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $userPassword = $_POST["password"];
    $confirmPassword = $_POST["confirm-password"];

    //instantiate signup controller
    include '../db/db-connector.php';
    include '../classes/signup.classes.php';
    include '../classes/signup_controller.classes.php';
 
    $signUp = new Signup($pdo);
    $signup = new SignupController($userName, $email, $userPassword, $confirmPassword, $signUp);
    
    $signup->signupUser();
    

    //redirect to user page
    header("location:../../api/user.php?signup=successful&username=$userName");
 
    

}
