<?php

class SignupController extends Signup
{

    private $userName;
    private $email;
    private $password;
    private $confirmPassword;

    //construct
    public function __construct($userName, $email, $password, $confirmPassword)
    {
        $this->userName = $userName;
        $this->email = $email;
        $this->password = $password;
        $this->confirmPassword = $confirmPassword;
    }

    //throw error

    public function signupUser()
    {

        //empty input
        if ($this->emptyInput() == false) {

            header("location:../index.php?error=emptyinput");
            exit();
        }
        //user validity
        if ($this->userNameValidation() == false) {

            header("location:../index.php?error=invaliduserName");
            exit();
        }
        //email
        if ($this->emailValidation() == false) {

            header("location:../index.php?error=invalidemail");
            exit();
        }
        //confirmPassword match
        if ($this->confirmPasswordValidation() == false) {

            header("location:../index.php?error=passworddoesnotmatch");
            exit();
        }
        //userName or password exists
        if ($this->userExists() == false) {

            header("location:../index.php?error=userAlreadyExists");
            exit();
        }

        $this->setUser($this->userName, $this->email, $this->password);

    }

    //validate for empty inputs
    private function emptyInput()
    {

        if (
            empty($this->userName) ||
            empty($this->email) ||
            empty($this->password) ||
            empty($this->confirmPassword)
        ) {
            $validation = false;
        } else {
            $validation = true;
        }

        return $validation;
    }

    private function userNameValidation()
    {
        //some regExp
        if (!preg_match("/^[a-zA-Z0-9_]*$/", $this->userName)) {

            $userNameIsValid = false;
        } else {
           
            $userNameIsValid = true;
        }

        return $userNameIsValid;

    }

    private function emailValidation()
    {

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {

            $emailIsValid = false;

        } else {
           
            $emailIsValid = true;
        }

        return $emailIsValid;

    }

    private function confirmPasswordValidation()
    {

        if ($this->password !== $this->confirmPassword) {
            $confirmPasswordMatched = false;
        } else {
            $confirmPasswordMatched = true;
        }

        return $confirmPasswordMatched;

    }

    private function userExists()
    {
       
        if (!$this->checkUser($this->userName, $this->email)) {
            $userExists = false;
        } else {
            $userExists = true;
        }

        return $userExists;

    }

}
