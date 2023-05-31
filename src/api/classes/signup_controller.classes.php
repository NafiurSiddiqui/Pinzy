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
        //userInput check
        if ($this->userNameIsEmpty()) {

            $this->errorHandlerController('Must have a Username');
        }

        //email input handler
        if($this->emailIsEmpty()) {
            $this->errorHandlerController('Must have an Email');
        }

        //email validation
        if ($this->emailValidation() == false) {
            
            $this->errorHandlerController('Invalid Email');
        }
       

        //password input handler
        if ($this->passwordIsEmpty()) {
            $this->errorHandlerController('Must have a Password');
        }

        //confirm password handler
        if ($this->confirmPasswordIsEmpty()) {
            $this->errorHandlerController('Must Confirm Password');
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
            empty($this->userName) &&
            empty($this->email) &&
            empty($this->password) &&
            empty($this->confirmPassword)
        ) {
            $inputsAreEmpty = true;
        } else {
            $inputsAreEmpty = false;
        }

        return $inputsAreEmpty;
    }

    private function userNameIsEmpty()
    {
        return  empty($this->userName)  ;

        
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

    private function emailIsEmpty()
    {
        return empty($this->email);
    }

    private function passwordIsEmpty()
    {
        return empty($this->password);
    }

    private function confirmPasswordIsEmpty()
    {
        return empty($this->confirmPassword);
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
