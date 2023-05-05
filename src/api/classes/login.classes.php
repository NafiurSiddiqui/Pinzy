<?php

 

//This makes sure, we can not manually get to these pages. (e.g - typing in the URL)


class Login extends Dbh
{

    //check of recreation of data

    protected $loginData;

    protected function getUser($name, $pass)
    {

        $stmt = $this->connect()->prepare('SELECT user_pass FROM users WHERE user_name=? OR user_email= ?');

        if (!$stmt->execute(array($name, $name))) {
            //if this fails, close the conn

            $stmt = null;
            header("location:../index.php?error=statmentfailed");
            exit(); //exit the entire script
        }

        // $this->loginData = $stmt->fetchAll(PDO::FETCH_ASSOC); //Param,  we say how we want the data to be returned.

        $passHashed = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $checkPass = password_verify($pass, $passHashed[0]['user_pass']);
        

        if (count($passHashed) == 0) {
            $stmt = null;
            header("location:login.inc.php?error=usernotfound");
            exit();
        }


        if ($checkPass == false) {
            $stmt = null;
            header('location:../index.php?error=wrongPassword');
            exit();
        } elseif ($checkPass == true) {

            $stmt = $this->connect()->prepare('SELECT * FROM users WHERE user_name = ? OR user_email = ? AND user_pass = ?;');

            if (!$stmt->execute(array($name, $name, $checkPass[0]['user_pass']))) {
                //if this fails, close the conn

                $stmt = null;
                header("location:../index.php?error=statmentfailed");
                exit(); //exit the entire script
            }

            //check for empty rows

            if (count($passHashed) == 0) {

                $stmt = null;
                header('location:../index.php?error=noUsers');
                exit();
            }

            $user = $stmt->fetchAll(PDO::FETCH_ASSOC);

            session_start();

           

            $_SESSION["id"] = $user[0]["id"];
            $_SESSION["name"] = $user[0]["user_name"];

            $stmt = null;
        }

        //Close the conn
        $stmt = null;

    }

}
