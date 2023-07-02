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
// filelogger('./genid.log', $userId);

//connect to DB
require '../db/db-connector.php';

$conn = $pdo;

//prepare SQL statement with the userId
$sqlFetch = 'SELECT * FROM pintzy_user_pin WHERE user_id = ?';


try {
    //bind value and fetch data
    $stmt = $conn->prepare($sqlFetch);
    $stmt->execute([$userId]);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


    //set header
    header('Content-Type:application/json');
  
    //conditional for custom response.
    if(empty($result)) {
        http_response_code(404);
        $result = [
            "message" => "No pins found for this user.",
            "status" => false
        ];

        echo json_encode($result);
    } else {
        echo json_encode($result);
    }

} catch (Error $e) {
   
    throw new Exception("Error fetching data", 1);

}
