<?php

// Start a new session to store user data
session_start();

// Check if the form has been submitted
if (isset($_POST['submit'])) {
    
    echo "IT IS A SUBMIT";
    // // Validate form data
    // $email = trim($_POST['email']);
    // $password = $_POST['password'];
    // $confirm_password = $_POST['confirm_password'];
    
    // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    //     $_SESSION['error'] = 'Please enter a valid email address.';
    //     header('Location: signup.php');
    //     exit();
    // }
    
    // if ($password !== $confirm_password) {
    //     $_SESSION['error'] = 'The passwords you entered do not match.';
    //     header('Location: signup.php');
    //     exit();
    // }
    
    // // Connect to the database using PDO
    // $dsn = 'mysql:host=localhost;dbname=pintzt_users';
    // $username = 'username';
    // $password = 'password';
    // $options = array(
    //     PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    // );
    
    // try {
    //     $pdo = new PDO($dsn, $username, $password, $options);
    // } catch (PDOException $e) {
    //     $_SESSION['error'] = 'There was an error connecting to the database: ' . $e->getMessage();
    //     header('Location: signup.php');
    //     exit();
    // }
    
    // // Check if the email address is already registered
    // $stmt = $pdo->prepare('SELECT COUNT(*) FROM users WHERE email = ?');
    // $stmt->execute([$email]);
    // $count = $stmt->fetchColumn();
    
    // if ($count > 0) {
    //     $_SESSION['error'] = 'An account with that email address already exists.';
    //     header('Location: signup.php');
    //     exit();
    // }
    
    // // Generate a hash of the password using PHP's password_hash() function
    // $password_hash = password_hash($password, PASSWORD_DEFAULT);
    
    // // Insert the new user's data into the database
    // $stmt = $pdo->prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    // $stmt->execute([$email, $password_hash]);
    
    // // Redirect the user to the login page
    // $_SESSION['success'] = 'Your account has been created. Please log in.';
    // header('Location: login.php');
    exit();
}
