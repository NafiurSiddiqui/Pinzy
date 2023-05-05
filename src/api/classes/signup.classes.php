<?php

//This makes sure, we can not manually get to these pages. (e.g - typing in the URL)

class Signup extends Dbh
{
    private $sql_check_user = 'SELECT user_name FROM pintzy_user_info WHERE user_name = ? OR user_email = ?;';
    private $sql_insert_user = 'INSERT INTO pintzy_user_info (user_name, user_email, user_password) VALUES (?, ?, ?);';

    //store error messages
    private $error = '';
    
    protected function setUser($userName, $email, $password)
    {
        // Check if the user already exists
        $stmt_check = $this->connect()->prepare($this->sql_check_user);
        if (!$stmt_check->execute([$userName, $email])) {
            $this->error = 'Failed to check user.';
            $stmt_check = null;
            return false;
        }
        if ($stmt_check->rowCount() > 0) {
            $this->error = 'User already exists.';
            $stmt_check = null;
            return false;
        }

        // Insert the new user into the database
        $stmt_insert = $this->connect()->prepare($this->sql_insert_user);
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
        if (!$stmt_insert->execute([$userName, $email, $hashedPassword])) {
            $this->error = 'Failed to insert user.';
            $stmt_insert = null;
            return false;
        }

        // Close the statements and return success
        $stmt_check = null;
        $stmt_insert = null;
        return true;
    }


     protected function checkUser($userName, $email)
     {
         $stmt = $this->connect()->prepare($this->sql_check_user);

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

}
