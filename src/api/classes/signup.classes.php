<?php


class Signup
{

    private $conn;
    //check of recreation of data
    private $sql = 'SELECT user_name FROM pintzy_user_info WHERE user_name = ? OR user_email = ?;';
    private $sqlInsert = 'INSERT INTO pintzy_user_info (user_name, user_email, user_password) VALUES (?, ?, ?)';


    public function __construct(\PDO $pdo)
    {
        $this->conn = $pdo;
      
    }

 

    public function setUser($name, $email, $pass)
    {

        

        // $statement = $this->connect()->prepare($this->sqlInsert);

        $statement = $this->conn->prepare($this->sqlInsert);

        //HASH THE PASS
        $hashedPass = password_hash($pass, PASSWORD_DEFAULT);

        if (!$statement->execute(array($name, $email, $hashedPass))) {
            //if this fails, close the conn

            $statement = null;
            header("location:../../../index.php?error=statmentfailed");
            exit(); //exit the entire script
        }
        
        //get the user id
        $userId = $this->conn->lastInsertId();
        
      
        //Close the conn
        $statement = null;
     
        session_start();

        //on success
        $_SESSION['signupSuccessful'] = true;
        $_SESSION['user_name'] = $name;
        $_SESSION['user_id'] = $userId;

    }

    public function checkUser($name, $email)
    {

        var_dump($this->conn);

        $statement = $this->conn->prepare($this->sql);

        //execute is a predefined method that for PDO
        //checks for conenction
        if (!$statement->execute(array($name, $email))) {
            //if this fails, close the conn

            $statement = null;
            header("location:../../../index.php?error=statmentfailed");
            exit(); //exit the entire script
        }

        $result = false;

        if ($statement->rowCount() > 0) {
            $result = false;
        } else {
            $result = true;
        }
        return $result;
    }

}
