<?php
// include '../classes/dbh.classes.php';
//This makes sure, we can not manually get to these pages. (e.g - typing in the URL)

class Login extends Dbh
{


    protected $loginData;
    //store error messages
    private $errorMsg = '';
    

    protected function getUser($userName, $password)
    {
        

        $stmt = $this->connect()->prepare('SELECT user_password FROM pintzy_user_info WHERE user_name=? OR user_email= ?');
        
        //to check by email or username
        if (!$stmt->execute(array($userName, $userName))) {
            //if this fails, close the conn
            $this->errorHandler($stmt, "User Does Not Exist");
        
            exit();
        }

        $passwordHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
       
        $checkPass = password_verify($password, $passwordHashed[0]['user_password']);
       

        if (count($passwordHashed) == 0) {
     
            $this->errorHandler($stmt, "User Not Found");
            exit();
        }


        if ($checkPass == false) {
            

            $this->errorHandler($stmt, "Wrong Password.");

     
            exit();
        } elseif ($checkPass == true) {
          
            $stmt = $this->connect()->prepare('SELECT * FROM pintzy_user_info WHERE user_name = ? OR user_email = ? AND user_password = ?;');

        
            if (!$stmt->execute(array($userName, $userName, $passwordHashed[0]['user_password']))) {
                //if this fails, close the conn
                $this->errorHandler($stmt, "Invalid Login");
            }

            //check for empty rows

            if (count($passwordHashed) == 0) {

                $stmt = null;
                $this->errorMsg = 'user not found';
                header("location:../../../index.php?error=$this->errorMsg");
          
                exit();
            }

            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // var_dump($user);

            session_start();

            $_SESSION["id"] = $user[0]['id'];
            $_SESSION["userName"] = $user[0]["user_name"];

            // var_dump($user[0]['id']);
            // var_dump($user[0]["user_name"]);
            // header('locaton:./login.classes.php');
            $stmt = null;
            // exit();
        }

        //Close the conn
        $stmt = null;

    }

    protected function errorHandler($stmt, $msg)
    {
        $stmt = null;
        $this->errorMsg = "$msg";
        header("location:../../../index.php?error=$this->errorMsg");
        exit();
        

    }
   

}
