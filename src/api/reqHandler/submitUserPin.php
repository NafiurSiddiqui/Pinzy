<?php

session_start();

// DEBUG
include '../config/config.php';

reqRecieveLogger();


//make sure user is authenticated
if (!isset($_SESSION["user_id"])) {
    header('Location:../../../index.php?message=access_denied'); //redirect to login page if not logged in
    exit();
}



//DEBUGend

//get the submitted data
$submittedPins = json_decode(file_get_contents('php://input'), true);




//--------debug

filelogger('./pin_submission.log', $submittedPins);

//--------debugEnd

if (!$submittedPins) {
    // Redirect user to the user.php
    header('Location: ../../api/user.php?pins=No pins were submitted');
    exit();
}


require '../db/db-connector.php';


// insert into database

$sqlInsert = 'INSERT INTO pintzy_user_pin (user_id,user_name, pin_event, pin_color, pin_icon, pin_message, pin_lat, pin_lng, pin_time, pin_date) VALUES (?,?,?,?,?,?,?,?,?,?)';


$conn = $pdo;

try {

    $userId = $submittedPins['userId'];
    $userName = $submittedPins['userName'];
    $event = $submittedPins['pin_event'];
    $color = $submittedPins['pin_color'];
    $icon = $submittedPins['pin_icon'];
    $message = $submittedPins['pin_message'];
    $lat = $submittedPins['pin_lat'];
    $lng = $submittedPins['pin_lng'];
    $time = $submittedPins['pin_time'];
    $date = $submittedPins['pin_date'];


    //prepare and exec
    $conn->prepare($sqlInsert)->execute([$userId,$userName, $event, $color, $icon, $message, $lat, $lng,$time, $date]);

    

    // $stmt->exec()
} catch (PDOException $e) {
    // throw new Exception("Data not subimitted. Something went wrong", $e->getMessage(), $e->getCode());
    // Redirect user to the user.php
    // header('Location: ../../api/error-view.php?error='.urlencode($e->getMessage()));
   

}
