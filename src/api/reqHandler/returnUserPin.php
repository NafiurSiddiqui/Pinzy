<?php
//start the session
session_start();

//make sure user is logged in


if (!isset($_SESSION["user_id"])) {

    //send HTTP response
    header('HTTP/1.1 401 Unauthorized');

    //redirect the user
    header('location:../../api/error-view.php');
    //exit script
    exit();

}

//get the userId
$userId = $_SESSION["user_id"];

//get the pdo

require '../db/db-connector.php';

$conn = $pdo;

//prepare SQL statement with the userId

$sqlFetch = 'SELECT * FROM pintzy_user_pin WHERE user_id = ?';


try {
    //bind value and fetch data
    $stmt = $conn->prepare($sqlFetch);
    $stmt->execute([$userId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    //convert to json
    $response = json_encode($result);

    //set header
    header('Content-Type:application/json');
    //echo the data
    echo $response;

} catch (Error $e) {
    //log error
    // error_log($e->getMessage(), 3, 'error.log');

    throw new Exception("Error fetching data", 1);



}
