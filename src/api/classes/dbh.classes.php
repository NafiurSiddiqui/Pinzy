<?php

class Dbh
{

    protected function connect()
    {

        try {

            $username = "root";
            $password = ""; //For default Xampp
            $dbh = new PDO('mysql:host=localhost;dbname=pintzy_users', $username, $password);
            return $dbh;

        } catch (PDOException $e) {
            echo "Error! " . $e->getMessage() . "<br>";

            die(); //Kill the connection

        }
    }
}
