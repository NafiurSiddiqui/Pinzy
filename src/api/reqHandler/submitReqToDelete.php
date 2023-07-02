<?php

session_start();

//guard
if(!isset($_SESSION["user_id"])) {
    header("location:../../../index.php?message=access_denied");
    exit();
}



if($_SERVER['REQUEST_METHOD'] == 'DELETE') {

    // Get the request body as JSON
    $requestData = json_decode(file_get_contents('php://input'), true);

    //check if id isset
    if(isset($requestData['id'])) {

        //get uid & pinId
        $userId = $_SESSION['user_id'];
        $pinId = $requestData['id'];//eiter pin_id or 'all'
       
        require '../db/db-connector.php';

        try {

            if($pinId == 'all') {

                $sqlDelAll = 'DELETE FROM pintzy_user_pin';

                $pdo->prepare($sqlDelAll)->execute();
            
            } else {
                //prepare sql for deletion where id = pin_id and user_id = userId;

                $sqlDel = 'DELETE FROM pintzy_user_pin WHERE id = ? and user_id = ?';

                $pdo->prepare($sqlDel)->execute([$pinId, $userId]);

            }

            // Send a response indicating the deletion was successful
            header('Content-Type: application/json');
            echo json_encode(['message' => 'Pin(s) deleted successfully']);
            exit();

        } catch (Error $e) {
            // Handle the database connection or query errors
            header('Content-Type: application/json');
            echo json_encode(['error' => 'Database error']);
            exit();
        }

    }

} else {
    // filelogger('./delete-req-check.log', 'NOT A REQ METHOD');
    // If the request does not match the DELETE method or the 'id' parameter is missing
    http_response_code(400); // Bad Request
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid request']);
    exit();

}
