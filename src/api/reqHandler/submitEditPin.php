<?php

session_start();

//make sure user is authenticated
if (!isset($_SESSION["user_id"])) {
    header('Location:../../../index.php?message=access_denied'); //redirect to login page if not logged in
    exit();
}

// / Log the request to verify it reaches this endpoint
file_put_contents('request.log', 'Request received: ' . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);

//get the submitted data
$submittedPins = json_decode(file_get_contents('php://input'), true);

//get the value dynamically

// $numberOfElements = count($submittedPins);
// $coords = $submittedPins['coords'];

// $latitude = $coords[0];
// $longitude = $coords[1];
// $point = sprintf('POINT(%f, %f)', $latitude, $longitude);

$userId = $_SESSION["user_id"];



//--------debug
include '../config/config.php';

// function filelogger(string $filePath, mixed $data)
// {
//     $logFilePath = $filePath;
//     $logMessage = var_export($data, true).PHP_EOL;
//     $logFile = fopen($logFilePath, 'a');
//     // Open the log file in append mode (create if it doesn't exist)
//     fwrite($logFile, $logMessage);
//     // Close the log file
//     fclose($logFile);


// }
// $logFilePath = './edit_pin_submission.log';
// $logMessage = var_export($submittedPins, true) . PHP_EOL;
// // $logMessage = var_export($loopedPins, true) . PHP_EOL;
// // $logMessage = var_export($point, true) . PHP_EOL;

// // Open the log file in append mode (create if it doesn't exist)
// $logFile = fopen($logFilePath, 'a');

// // Write the log message to the file
// fwrite($logFile, $logMessage);

// // Close the log file
// fclose($logFile);

filelogger('./edit_pin_submission.log', $submittedPins);

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

    filelogger('./data-check.log', [
        'Pin Id' => $pinId,
        "Event" => $event,
        "Color" => $color,
        "Icon" => $icon,
        "Message"=> $message
    ]);
    
    //prepare and exec
    $conn->prepare($sqlUpdate)->execute([$event, $color, $icon, $message, $userId, $pinId]);

    

    // $stmt->exec()
} catch (PDOException $e) {
    throw new Exception("Data not subimitted. Something went wrong!". $e->getMessage(), $e->getCode());


}
