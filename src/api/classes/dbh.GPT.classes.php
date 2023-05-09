<?php

class DbhGPT
{
    private $host;
    private $user;
    private $pwd;
    private $dbName;

    protected function connect()
    {
        $this->host = "localhost";
        $this->user = "root";
        $this->pwd = "";
        $this->dbName = "pintzy_users";

        try {
            $dsn = "mysql:host=" . $this->host . ";dbname=" . $this->dbName;
            $pdo = new PDO($dsn, $this->user, $this->pwd);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $pdo;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }
}
