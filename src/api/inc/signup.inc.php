<?php

if (isset($_POST["submit"])) {

    //get the data

    $name = $_POST["name"];
    $email = $_POST["email"];
    $pass = $_POST["pass"];
    $repass = $_POST["repass"];

    //instantiat signup controller

    include '../classes/dbh.classes.php';
    include '../classes/signup.classes.php';
    include '../classes/signup_controller.classes.php';

    $signup = new SignupController($name, $email, $pass, $repass);

    //Error handler
    $signup->signupUser();

    //send to home

    header('location:../index.php?message=signupSucceed');
}
