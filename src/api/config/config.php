<?php

function filelogger(string $filePath, mixed $data)
{
    $logFilePath = $filePath;
    $logMessage = var_export($data, true).PHP_EOL;
    $logFile = fopen($logFilePath, 'a');
    // Open the log file in append mode (create if it doesn't exist)
    fwrite($logFile, $logMessage);
    // Close the log file
    fclose($logFile);


}



// / Log the request to verify it reaches this endpoint
function reqRecieveLogger()
{
    file_put_contents('request.log', 'Request received: ' . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);

}
