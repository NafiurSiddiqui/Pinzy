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


    public function signupUser()
    {

        //NOTE: we do not need to start the session here again since we are inheritng the session start from the parent sigup class here. MAYBE? TEST

        //empty input
        if ($this->emptyInput() == true) {

            $_SESSION['error'] = "please fill out all the fields";
            // header("location:../index.php?error=emptyinput");
            header("location:../index.php");
            exit();
        }
        //user validity
        if ($this->userNameValidation() == false) {

            $_SESSION['error'] = "invalid user name";
            header("location:../index.php");
            exit();
        }
        //email
        if ($this->emailValidation() == false) {
            $_SESSION['error'] = "invalid email";
            // header("location:../index.php?error=invalidemail");
            header("location:../index.php");
            exit();
        }
        //confirmPassword match
        if ($this->confirmPasswordValidation() == false) {

            $_SESSION['error'] = "password does not match";
            header("location:../index.php");
            exit();
        }
        //userName or password exists
        if ($this->userExists() == false) {

            $_SESSION['error'] = "user already exists";
            header("location:../index.php");
            exit();
        }

        //set user
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
            $inputsAreEmpty = true;
        } else {
            $inputsAreEmpty = false;
        }

        return $inputsAreEmpty;
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
