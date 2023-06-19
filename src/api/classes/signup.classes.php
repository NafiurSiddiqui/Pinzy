<?php




class Signup
{

    //check of recreation of data
    private $sql = 'SELECT user_name FROM pintzy_user_info WHERE user_name = ? OR user_email = ?;';
    private $sqlInsert = 'INSERT INTO pintzy_user_info (user_name, user_email, user_password) VALUES (?, ?, ?)';

    private $conn;


    public function __construct(\PDO $pdo)
    {
        $this->conn = $pdo;
        var_dump($this->conn);

        
    }

    public function testConn()
    {
        var_dump($this->conn);
    }


    public function setUser($name, $email, $pass)
    {

        var_dump($this->conn);

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

        //Close the conn

        $statement = null;
     
        session_start();

        //on success
        $_SESSION['signupSuccessful'] = true;
        $_SESSION['userName'] = $name;

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
