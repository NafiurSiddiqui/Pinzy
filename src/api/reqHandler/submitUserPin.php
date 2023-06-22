<?php

//make sure user is authenticated
// if (!isset($_SESSION["id"])) {
//     header('Location: index.php'); //redirect to login page if not logged in
//     exit();
// }

$submittedPins = json_decode($_POST['pin']);

if(!$submittedPins) {
    throw new Error('Pin submitted is empty!');

    //log error
    $errorLog->addError("No pins were sent!");

    //redirect user to the user.php
    header('location:../../api/user.php?pins=No pins were submitted');
    
    exit();
}

require '../db/db-connector.php';

//insert into database table with all of the information from form submission


$sqlInsert = 'INSERT INTO pintzy_user_pin (user_id, pin_type, pin_message, pin_latitude, pin_longitude, pin_date,pin_time) VALUES (?, ?, ?, ?, ?,?,?)';
$stmt = $pdo;

try {
    //code...
    // $stmt->prepare()
} catch (PDOException $e) {
    //throw $th;
}
