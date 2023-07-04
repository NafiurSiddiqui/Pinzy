<?php

class SignupController
{

    private string $userName;
    private string $email;
    private string $password;
    private string $confirmPassword;
    private Signup $signUp;

    //construct
    public function __construct(
        string $userName,
        string $email,
        string $password,
        string $confirmPassword,
        Signup $signup
    ) {
        
        
        $this->userName = $userName;
        $this->email = $email;
        $this->password = $password;
        $this->confirmPassword = $confirmPassword;
        $this->signUp = $signup;

    }

    //throw error

    public function signupUser()
    {
       

        //empty input
        if ($this->emptyInput() == false) {

            header("location:../../api/signup-form.php?error=empty input");
            exit();
        }

        //empty nam
        if($this->nameIsEmpty() == true) {
            header("location:../../api/signup-form.php?error=name is required");
            exit();
        }

        //user validity
        if ($this->nameValidation() == false) {

            header("location:../../api/signup-form.php?error=invalid username");
            exit();
        }

        if($this->emailIsEmpty() == true) {
            header("location:../../api/signup-form.php?error=email is required");
            exit();

        }

        //email validation
        if ($this->emailValidation() == false) {

            header("location:../../api/signup-form.php?error=invalid email");
            exit();
        }
        //pass is empty
        if ($this->passIsEmpty()) {

            // header("location:../../api/signup-form.php?error=password is required");
            header("location:../../api/signup-form.php?error=password is required&pass=".urlencode($this->password)."&name=".urlencode($this->userName));
            exit();
        }
        

        //repass empty
        if($this->confirmPassIsEmpty() == true) {
            
            header("location:../../api/signup-form.php?error=confirm password");
            exit();
        }


        //repass match
        if ($this->repassValidation() == false) {

            header("location:../../api/signup-form.php?error=passwords do not match");
            exit();
        }
        //userName or pass exists
        if ($this->userIsTaken() == false) {

            header("location:../../api/signup-form.php?error=user already exists");
            exit();
        }

        


        $this->signUp->setUser($this->userName, $this->email, $this->password);

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
            $validation = false;
        } else {
            $validation = true;
        }

        return $validation;
    }

    private function nameValidation()
    {
        //some regExp
        if (!preg_match("/^[a-zA-Z0-9 ]*$/", $this->userName)) {

            $nameIsValid = false;
        } else {
           
            $nameIsValid = true;
        }

        return $nameIsValid;

    }

    private function nameIsEmpty()
    {
        if (empty($this->userName)) {
            $nameIsEmpty = true;
        } else {
            $nameIsEmpty = false;
        }
        return $nameIsEmpty;
    }

    private function emailValidation()
    {

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {

            $emailIsValid = false;

        } else {
            // $this->email = filter_input($_POST["email"], FILTER_SANITIZE_EMAIL);
            $emailIsValid = true;
        }

        return $emailIsValid;

    }

    private function emailIsEmpty()
    {

        if(empty($this->email)) {
            $emailIsEmpty = true;
        } else {
            $emailIsEmpty = false;
        }

        return $emailIsEmpty;
    }

    private function passIsEmpty()
    {

        if(empty($this->password)) {
            $passIsEmpty = true;
        } else {
            $passIsEmpty = false;
        }
        return $passIsEmpty;
    }

    private function confirmPassIsEmpty()
    {
        if(empty($this->confirmPassword)) {
            $confirmPasswordIsEmpty = true;
        } else {
            $confirmPasswordIsEmpty = false;
        }
        return $confirmPasswordIsEmpty;
    }

    private function repassValidation()
    {

        if ($this->password !== $this->confirmPassword) {
            $repassMatched = false;
        } else {
            $repassMatched = true;
        }

        return $repassMatched;

    }

    private function userIsTaken()
    {

        if (!$this->signUp->checkUser($this->userName, $this->email)) {
            $userExists = false;
        } else {
            $userExists = true;
        }

        return $userExists;

    }

   

}
