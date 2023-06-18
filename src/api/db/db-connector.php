<?php

$dsn = 'mysql:host=localhost;dbname=pintzy_users';
$username = 'root';
$password = '';


try {
    $pdo = new PDO($dsn, $username, $password);

} catch (PDOException $e) {
    //log error
    error_log("DB connection error -". $e->getMessage());

    //redirect
    header("location:../../src/api/error-view.php?message=".urlencode($e->getMessage()). "&errorCode=". urlencode($e->getCode()));
    exit();



}
