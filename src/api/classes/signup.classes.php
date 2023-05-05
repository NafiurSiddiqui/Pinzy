<?php

//This makes sure, we can not manually get to these pages. (e.g - typing in the URL)

class Signup extends Dbh
{

    //check of recreation of data
    private $sql = 'SELECT user_name FROM users WHERE user_name = ? OR user_email = ?;';
    
    //store error messages
    private $error = '';

    protected function setUser($userName, $email, $password)
    {

        $stmt = $this->connect()->prepare('INSERT INTO users (user_name, user_email, user_pass) VALUES (?, ?, ?)');

        //HASH THE PASS
        $hashedPass = password_hash($password, PASSWORD_DEFAULT);

        if (!$stmt->execute(array($userName, $email, $hashedPass))) {
            //if this fails, set error message

            $this->error = 'Failed to create user.';
            $stmt = null;
            return false;
        }

        //Close the conn
        $stmt = null;
        return true;

    }

    protected function checkUser($userName, $email)
    {
        $stmt = $this->connect()->prepare($this->sql);

        //checks for connection
        if (!$stmt->execute(array($userName, $email))) {
            // if this fails, set error message
            $this->error = 'Failed to check user.';
            $stmt = null;
            return false;
        }

        // fetch the number of rows returned by the SELECT statement
        $rowCount = $stmt->fetchColumn();

        // if the row count is greater than 0, a user with the same user name or email exists
        $result = ($rowCount > 0) ? false : true;

        // close the connection
        $stmt = null;

        return $result;
    }


    public function getError()
    {
        return $this->error;
    }
}
