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
    
 
    //Error handler
    $login->loginUser();

    


    //send to userPage
    header("location:../../api/user.php?login=successful&username=$userName");
 

}
