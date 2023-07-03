<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


session_start();

//make sure user is authenticated
if (!isset($_SESSION["user_id"])) {
    header('Location:../../../index.php?message=access_denied'); //redirect to login page if not logged in
    exit();
}



//get the submitted data
$submittedPins = json_decode(file_get_contents('php://input'), true);

$userId = $_SESSION["user_id"];

//--------debug
//! Putting these debugger in production mess up with sql
// include '../config/config.php';


// reqRecieveLogger();
// filelogger('./edit_pin_submission.log', $submittedPins);
//
//--------debugEnd


if (!$submittedPins) {
    // Redirect user to the user.php
    header('Location: ../../api/user.php?pins=No pins were submitted');
    exit();
}


require '../db/db-connector.php';

// insert into database

$sqlUpdate = 'UPDATE pintzy_user_pin SET pin_event = ?, pin_color = ? , pin_icon = ?, pin_message = ? WHERE user_id = ? AND id = ?';


$conn = $pdo;

try {


    $pinId = $submittedPins['editedData']['id'];
    $event = $submittedPins['editedData']['pin_event'];
    $color = $submittedPins['editedData']['pin_color'];
    $icon = $submittedPins['editedData']['pin_icon'];
    $message = $submittedPins['editedData']['pin_message'];


    //prepare and exec
    $conn->prepare($sqlUpdate)->execute([$event, $color, $icon, $message, $userId, $pinId]);

    

    // $stmt->exec()
} catch (PDOException $e) {
    throw new Exception("Data not subimitted. Something went wrong!". $e->getMessage(), $e->getCode());


}
