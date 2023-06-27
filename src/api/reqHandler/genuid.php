<?php

// file_put_contents('request.log', 'Request received: ' . date('Y-m-d H:i:s') . PHP_EOL, FILE_APPEND);

use Ramsey\Uuid\Uuid;

require __DIR__ . '/../../../vendor/autoload.php'; //!NOTE: your filepath is always starting from the root dir rather than root project from here. In any case inside production test, you might will have to set the path with __DIR__ like this.


$uuid4 = Uuid::uuid4()->toString();

// Create an associative array with the UUID string
$response = array('uuid' => $uuid4);
// $response = array('uuid' => '1234566');

// Set the appropriate content type for JSON response
header('Content-Type: application/json');

// Encode the response array as JSON and echo it
echo json_encode($response);
