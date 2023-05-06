<?php

class LoginController extends Login
{
    private $username;
    private $password;

    public function __construct($username, $password)
    {
        $this->username = $username;
        $this->password = $password;
    }

    public function loginUser()
    {
        if ($this->isUsernameEmpty() && $this->isPasswordEmpty()) {
            return ['success' => false, 'message' => 'Both username and password are required.'];
        } elseif ($this->isUsernameEmpty()) {
            return ['success' => false, 'message' => 'Username is required.'];
        } elseif ($this->isPasswordEmpty()) {
            return ['success' => false, 'message' => 'Password is required.'];
        }

        $user = $this->getUser($this->username, $this->password);

        if ($user) {
            $_SESSION['userId'] = $user['id'];
            $_SESSION['loginSuccessful'] = true;
            return ['success' => true, 'message' => 'Login successful.'];
        } else {
            return ['success' => false, 'message' => 'Invalid username or password.'];
        }
    }

    protected function isUsernameEmpty()
    {
        return empty($this->username);
    }

    protected function isPasswordEmpty()
    {
        return empty($this->password);
    }
}
