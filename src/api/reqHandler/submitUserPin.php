<?php

//make sure user is authenticated
// if (!isset($_SESSION["id"])) {
//     header('Location: index.php'); //redirect to login page if not logged in
//     exit();
// }

// / Log the request to verify it reaches this endpoint
// file_put_contents('request.log', 'Request received: ' . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);

// $submittedPins = json_decode($_POST['pin'], true);
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

//--------debugEnd


if (!$submittedPins) {
    // Redirect user to the user.php
    header('Location: ../../api/user.php?pins=No pins were submitted');
    exit();
}





// require '../db/db-connector.php';

//breakdown values


// insert into database

// $sqlInsert = 'INSERT INTO pintzy_user_pin (user_id, pin_color, pin_icon, pin_message, pin_coords, pin_time, pin_date) VALUES (?, ?, ?, ?, ?,?,?)';
// $stmt = $pdo;

// try {
//     //code...
//     // $stmt->prepare()
// } catch (PDOException $e) {
//     //throw $th;
// }
