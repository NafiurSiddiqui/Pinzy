<?php



file_put_contents('request.log', 'Request received: ' . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);

use Ramsey\Uuid\Uuid;

// require '/vendor/autoload.php';
require __DIR__ . '/../../../vendor/autoload.php';


// include '/Backend/Xampp/htdocs/projects/pintzy/src/api/config/config.php';

// reqRecieveLogger();

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



// / Log the request to verify it reaches this endpoint
// function reqRecieveLogger()
// {
//     file_put_contents('request.log', 'Request received: ' . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);

// }


$uuid4 = Uuid::uuid4();
// echo $uuid4;

$uuid4String = $uuid4->toString();
// echo $uuid4String;

// $logFilePath = './genid.log';
// $logMessage = var_export($uuid4String, true).PHP_EOL;
// $logFile = fopen($logFilePath, 'a');
// // Open the log file in append mode (create if it doesn't exist)
// fwrite($logFile, $logMessage);
// // Close the log file
// fclose($logFile);



// filelogger('./genid.log', $uuid4);



// Create an associative array with the UUID string
$response = array('uuid' => $uuid4String);
// $response = array('uuid' => '1234566');

// Set the appropriate content type for JSON response
header('Content-Type: application/json');

// Encode the response array as JSON and echo it
echo json_encode($response);
