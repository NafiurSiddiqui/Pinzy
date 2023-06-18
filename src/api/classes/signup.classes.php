<?php




class Signup
{

    //check of recreation of data
    private $sql = 'SELECT user_name FROM pintzy_user_info WHERE user_name = ? OR user_email = ?;';
    private $sqlInsert = 'INSERT INTO pintzy_user_info (user_name, user_email, user_password) VALUES (?, ?, ?)';

    private $conn;


    public function __construct($pdo)
    {
        $this->conn = $pdo;
    }


    protected function setUser($name, $email, $pass)
    {

       
        // $stmt = $this->connect()->prepare($this->sqlInsert);

        $stmt = $this->conn->prepare($this->sqlInsert);

        //HASH THE PASS
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);

        if (!$stmt->execute(array($name, $email, $hashedPass))) {
            //if this fails, close the conn

            $stmt = null;
            header("location:../../../index.php?error=statmentfailed");
            exit(); //exit the entire script
        }

        //Close the conn

        $stmt = null;

        
        session_start();

        //on success
        $_SESSION['signupSuccessful'] = true;
        $_SESSION['userName'] = $name;

    


    }

    protected function checkUser($name, $email)
    {
        $stmt = $this->connect()->prepare($this->sql);

        //execute is a predefined method that for PDO
        //checks for conenction
        if (!$stmt->execute(array($name, $email))) {
            //if this fails, close the conn

            $stmt = null;
            header("location:../../../index.php?error=statmentfailed");
            exit(); //exit the entire script
        }

        $result = false;

        if ($stmt->rowCount() > 0) {
            $result = false;
        } else {
            $result = true;
        }
        return $result;
    }

}
