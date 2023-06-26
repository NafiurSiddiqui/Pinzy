<?php

session_start();

//make sure user is authenticated
if (!isset($_SESSION["user_id"])) {
    header('Location:../../../index.php?message=access_denied'); //redirect to login page if not logged in
    exit();
}

include '../config/config.php';

// reqRecieveLogger();

file_put_contents('request.log', 'Request received: ' . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);

//get the submitted data
$submittedPins = json_decode(file_get_contents('php://input'), true);




//--------debug
$logFilePath = './pin_submission.log';
$logMessage = var_export($submittedPins, true) . PHP_EOL;

// Open the log file in append mode (create if it doesn't exist)
$logFile = fopen($logFilePath, 'a');

// Write the log message to the file
fwrite($logFile, $logMessage);

// Close the log file
fclose($logFile);

// filelogger('./pin_submission.log', $submittedPins);

//--------debugEnd

if (!$submittedPins) {
    // Redirect user to the user.php
    header('Location: ../../api/user.php?pins=No pins were submitted');
    exit();
}


require '../db/db-connector.php';


// insert into database

$sqlInsert = 'INSERT INTO pintzy_user_pin (user_id, pin_event, pin_color, pin_icon, pin_message, pin_lat, pin_lng, pin_time, pin_date) VALUES (?,?,?,?,?,?,?,?,?)';


$conn = $pdo;

try {


    $userId = $submittedPins['userId'];
    $event = $submittedPins['event'];
    $color = $submittedPins['color'];
    $icon = $submittedPins['icon'];
    $message = $submittedPins['message'];
    $lat = $submittedPins['lat'];
    $lng = $submittedPins['lng'];
    $time = $submittedPins['time'];
    $date = $submittedPins['date'];


    //prepare and exec
    $conn->prepare($sqlInsert)->execute([$userId, $event, $color, $icon, $message, $lat, $lng,$time, $date]);

    

    // $stmt->exec()
} catch (PDOException $e) {
    throw new Exception("Data not subimitted. Something went wrong", $e->getMessage(), $e->getCode());
    // Redirect user to the user.php
    // header('Location: ../../api/error-view.php?error='.urlencode($e->getMessage()));
   

}
