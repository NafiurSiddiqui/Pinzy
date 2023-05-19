<?php

class SignupController extends Signup
{

    private $userName;
    private $email;
    private $password;
    private $confirmPassword;
    private $errorMsg;

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

        //empty input
        if ($this->emptyInput() == true) {
            $this->errorHandlerController("Please fill out all of the fields.");
           
        }
        //user validity
        if ($this->userNameValidation() == false) {

            $this->errorHandlerController('Invalid Username');
        }
        //email
        if ($this->emailValidation() == false) {
            
            $this->errorHandlerController('Invalid Email');
        }
        //confirmPassword match
        if ($this->confirmPasswordValidation() == false) {

           
            $this->errorHandlerController('Passwords do not match');
        }
        //userName or password exists
        if ($this->userExists() == false) {

           
            $this->errorHandlerController('User Already Exists');
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
            $userExists = true;
        } else {
            $userExists = false;
        }

        return $userExists;

    }

     protected function errorHandlerController($msg)
     {
             
         $this->errorMsg = "$msg";
         header("location:../../api/signup-form.php?error=$this->errorMsg");
         exit();

     }

}
