<?php

 

//This makes sure, we can not manually get to these pages. (e.g - typing in the URL)


class Login extends Dbh
{


    protected $loginData;
    //store error messages
    private $error = '';
    
    protected function getUser($userName, $password)
    {
        //set the session for manual URL prevention
        session_start();


        $stmt = $this->connect()->prepare('SELECT user_password FROM pintzy_user_info WHERE user_name=? OR user_email= ?');
        
        //to check by email or username

        if (!$stmt->execute(array($userName, $userName))) {
            //if this fails, close the conn

            $stmt = null;
            $_SESSION['loginSuccessful'] = false;
            $this->error = "user does not exist.";

            // header("location:../index.php?error=statmentfailed");
            header("location:/projects/pintzy/index.php");

            exit(); //exit the entire script
        }

        // $this->loginData = $stmt->fetchAll(PDO::FETCH_ASSOC); //Param,  we say how we want the data to be returned.

        $passwordHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $checkPass = password_verify($password, $passwordHashed[0]['user_password']);
        

        if (count($passwordHashed) == 0) {
            $stmt = null;
            $_SESSION['loginSuccessful'] = false;
            $this->error = 'user not found';
            // header("location:login.inc.php?error=usernotfound");
            header("location:/projects/pintzy/src/api/inc/login.inc.php");
            exit();
        }


        if ($checkPass == false) {
            $stmt = null;
            $_SESSION['loginSuccessful'] = false;
            $this->error = 'wrong password';
            // header('location:../index.php?error=wrongPassword');
            header("location:/projects/pintzy/src/api/inc/index.inc.php");
            exit();
        } elseif ($checkPass == true) {

            $stmt = $this->connect()->prepare('SELECT * FROM pintzy_users WHERE user_name = ? OR user_email = ? AND user_password = ?;');

            if (!$stmt->execute(array($userName, $userName, $checkPass[0]['user_password']))) {
                //if this fails, close the conn
                $stmt = null;
                $_SESSION['loginSuccessful'] = false;
                $this->error = "invalid login.";
                header("location:/projects/pintzy/src/api/inc/index.inc.php");
                exit(); //exit the entire script
            }

            //check for empty rows

            if (count($passwordHashed) == 0) {

                $stmt = null;
                $_SESSION['loginSuccessful'] = false;
                $this->error = 'user not found';
                // header('location:../index.php?error=noUsers');
                header('location:/projects/pintzy/src/api/inc/index.inc.php');
                exit();
            }

            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

            session_start();
            $_SESSION["id"] = $user[0]["user_id"];
            $_SESSION["name"] = $user[0]["user_name"];

            $stmt = null;
        }

        //Close the conn
        $stmt = null;

    }

      //expose error
     public function getError()
     {
         return $this->error;
     }

}
