<?php

//make sure user is authenticated
// if (!isset($_SESSION["id"])) {
//     header('Location: index.php'); //redirect to login page if not logged in
//     exit();
// }

// / Log the request to verify it reaches this endpoint
// file_put_contents('request.log', 'Request received: ' . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);

//get the submitted data
$submittedPins = json_decode(file_get_contents('php://input'), true);

//get the value dynamically

$numberOfElements = count($submittedPins);
$coords = $submittedPins['coords'];

// $latitude = $coords[0];
// $longitude = $coords[1];
// $point = sprintf('POINT(%f, %f)', $latitude, $longitude);



//--------debug
$logFilePath = './pin_submission.log';
$logMessage = var_export($submittedPins, true) . PHP_EOL;
// $logMessage = var_export($loopedPins, true) . PHP_EOL;
// $logMessage = var_export($point, true) . PHP_EOL;

// Open the log file in append mode (create if it doesn't exist)
$logFile = fopen($logFilePath, 'a');

// Write the log message to the file
fwrite($logFile, $logMessage);

// Close the log file
fclose($logFile);

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
    // $coords = json_encode($submittedPins['coords']);
    $coords = $submittedPins['coords'];
    $lat = $coords[0];
    $lng = $coords[1];
    // $point = sprintf('POINT(%f, %f)', $latitude, $longitude);

    $time = $submittedPins['time'];
    $date = $submittedPins['date'];


    //prepare and exec
    $conn->prepare($sqlInsert)->execute([$userId, $event, $color, $icon, $message, $lat, $lng,$time, $date]);

    

    // $stmt->exec()
} catch (PDOException $e) {
    throw new Exception("Data not subimitted. Something went wrong");
}
