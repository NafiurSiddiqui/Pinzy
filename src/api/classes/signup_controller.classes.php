<?php

class SignupController extends Signup
{

    private $name;
    private $email;
    private $pass;
    private $repass;

    //construct
    public function __construct($name, $email, $pass, $repass)
    {
        $this->name = $name;
        $this->email = $email;
        $this->pass = $pass;
        $this->repass = $repass;
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
        if ($this->nameValidation() == false) {

            header("location:../index.php?error=invalidusername");
            exit();
        }
        //email
        if ($this->emailValidation() == false) {

            header("location:../index.php?error=invalidemail");
            exit();
        }
        //repass match
        if ($this->repassValidation() == false) {

            header("location:../index.php?error=passworddoesnotmatch");
            exit();
        }
        //userName or pass exists
        if ($this->userIsTaken() == false) {

            header("location:../index.php?error=userAlreadyExistsBruh");
            exit();
        }

        $this->setUser($this->name, $this->email, $this->pass);

    }

    //validate for empty inputs
    private function emptyInput()
    {

        if (
            empty($this->name) ||
            empty($this->email) ||
            empty($this->pass) ||
            empty($this->repass)
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
        if (!preg_match("/^[a-zA-Z0-9]*$/", $this->name)) {

            $nameIsValid = false;
        } else {
            // $this->name = filter_input($_POST["name"], FILTER_SANITIZE_SPECIAL_CHARS);
            $nameIsValid = true;
        }

        return $nameIsValid;

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

    private function repassValidation()
    {

        if ($this->pass !== $this->repass) {
            $repassMatched = false;
        } else {
            $repassMatched = true;
        }

        return $repassMatched;

    }

    private function userIsTaken()
    {

        if (!$this->checkUser($this->name, $this->email)) {
            $userExists = false;
        } else {
            $userExists = true;
        }

        return $userExists;

    }

}
