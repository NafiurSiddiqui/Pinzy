<?php
// include '../classes/dbh.classes.php';
//This makes sure, we can not manually get to these pages. (e.g - typing in the URL)

class Login extends Dbh
{


    protected $loginData;
    //store error messages
    private $error = '';
    
    public function __construct()
    {
        // session_start();
    }

    protected function getUser($userName, $password)
    {
        

        $stmt = $this->connect()->prepare('SELECT user_password FROM pintzy_user_info WHERE user_name=? OR user_email= ?');
        
        //to check by email or username
        if (!$stmt->execute(array($userName, $userName))) {
            //if this fails, close the conn

            $stmt = null;
     
            $this->error = "user does not exist.";
            header("location:../../../index.php?error=statmentFailed");
           

            exit();
        }


        $passwordHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
        // var_dump($passwordHashed[0]);
        $checkPass = password_verify($password, $passwordHashed[0]['user_password']);
        // var_dump($checkPass);

        if (count($passwordHashed) == 0) {
            $stmt = null;
            header("location:../../../index.php?error=userNotFound");
            $this->error = 'user not found';
      
            exit();
        }


        if ($checkPass == false) {
            $stmt = null;
      
            $this->error = 'wrong password';
            header('location:../../../index.php?error=wrongPassword');
     
            exit();
        } elseif ($checkPass == true) {
          
            $stmt = $this->connect()->prepare('SELECT * FROM pintzy_user_info WHERE user_name = ? OR user_email = ? AND user_password = ?;');

        
            if (!$stmt->execute(array($userName, $userName, $passwordHashed[0]['user_password']))) {
                //if this fails, close the conn
                $stmt = null;
    
                $this->error = "invalid login.";
               
                header('location:../../../index.php?error=invalidLogin');

                exit(); //exit the entire script
            }

            //check for empty rows

            if (count($passwordHashed) == 0) {

                $stmt = null;
                $this->error = 'user not found';
                header('location:../../../index.php?error=noUsers');
          
                exit();
            }

            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

            session_start();

            $_SESSION["id"] = $user[0]['id'];
            $_SESSION["userName"] = $user[0]["user_name"];

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
