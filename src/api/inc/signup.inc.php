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
    // include '../db/db-connector.php';
    // include 'db-connector.php';
    include '../classes/signup.classes.php';
    include '../classes/signup_controller.classes.php';
 

    $host = 'localhost';
    $db   = 'pintzy_users';
    $user = 'root';
    $pass = '';
    $charset = 'utf8mb4';

    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";

    $options = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];

    try {
        $pdo = new \PDO($dsn, $user, $pass, $options);
        $signUp = new Signup($pdo);

    } catch (\PDOException $e) {
        // throw new \PDOException($e->getMessage(), (int)$e->getCode());
        // echo 'PDO Connection failed: ' . $e->getMessage();

        // Log the error message to a file or error tracking system
        error_log('PDO Connection Error: ' . $e->getMessage());

        // Redirect or display an error message to the user
        header('location: ../../api/error-view.php?message=' . urlencode($e->getMessage()) . '&errorCode=' . urlencode($e->getCode()));
        exit();


    }

    // var_dump($pdo);




    // $signUpPdo->testConn();
    
    $signup = new SignupController($userName, $email, $userPassword, $confirmPassword, $signUp);
    
    $signup->signupUser();
    

    //redirect to user page
    header("location:../../api/user.php?signup=successful&username=$userName");
    // header("location:../../api/inc/signup.inc.php");
    // header("location:../../api/signup-form.php");
    // header("location:../../api/classes/signup.classes.php");
    

}
