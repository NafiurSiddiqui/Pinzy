<?php

$host = 'localhost';
$db   = 'pintzy_users';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new \PDO($dsn, $user, $pass, $options);
    

} catch (\PDOException $e) {
    // throw new \PDOException($e->getMessage(), (int)$e->getCode());

    // Log the error message to a file or error tracking system
    error_log('PDO Connection Error: ' . $e->getMessage());

    // Redirect or display an error message to the user
    header('location: ../../api/error-view.php?message=' . urlencode($e->getMessage()) . '&errorCode=' . urlencode($e->getCode()));
    exit();


}
