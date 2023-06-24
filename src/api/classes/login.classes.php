<?php


class Login
{
    private $sqlNameAndMail = 'SELECT user_password FROM pintzy_user_info WHERE user_name=? OR user_email= ?';
    private $sqlNameMailAndpass = 'SELECT * FROM pintzy_user_info WHERE user_name = ? OR user_email = ? AND user_password = ?;';
    protected $loginData;
    private $errorMsg = '';
    private $dbh;

    public function __construct(\PDO $pdo)
    {
       
        $this->dbh = $pdo;
    }

    public function getUser($userName, $password)
    {
        

        // $stmt = $this->connect()->prepare('SELECT user_password FROM pintzy_user_info WHERE user_name=? OR user_email= ?');
        $stmt = $this->dbh->prepare($this->sqlNameAndMail);
        
        //to check by email or username
        if (!$stmt->execute(array($userName, $userName))) {
            //if this fails, close the conn
            $this->errorHandler($stmt, "User Does Not Exist");
        
        }

        $passwordHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
       
        $checkPass = password_verify($password, $passwordHashed[0]['user_password']);
       

        if (count($passwordHashed) == 0) {
     
            $this->errorHandler($stmt, "User Not Found");
            // exit();
        }


        if ($checkPass == false) {
            

            $this->errorHandler($stmt, "Wrong Password.");

     
        // exit();
        } elseif ($checkPass == true) {
          
            $stmt = $this->dbh->prepare($this->sqlNameMailAndpass);

        
            if (!$stmt->execute(array($userName, $userName, $passwordHashed[0]['user_password']))) {
                //if this fails, close the conn
                $this->errorHandler($stmt, "Invalid Login");
            }

            //check for empty rows

            if (count($passwordHashed) == 0) {

                $stmt = null;
                $this->errorHandler($stmt, "User Not Found");
                
            }

            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);
            session_start();

            $_SESSION["user_id"] = $user[0]['id'];
            $_SESSION["user_name"] = $user[0]["user_name"];
            $stmt = null;
            
        }

        //Close the conn
        $stmt = null;

    }

    public function errorHandler($stmt, $msg)
    {
        $stmt = null;
        $this->errorMsg = "$msg";
        header("location:../../../index.php?loginError=$this->errorMsg");
        exit();
        

    }
   

}
