<?php


class SignupController extends Signup
{
    private $userName;
    private $email;
    private $password;
    private $confirmPassword;
    // private $errorMsg;
    // public $userNameIsEmpty;
    public $userErrorMsg;
    public $userNameErrorMsg;
    public $emailErrorMsg;
    // public $emailIsEmpty;
    public $passwordIsEmpty;
    public $passwordErrorMsg;
    public $confirmPasswordIsEmpty;
    public $confirmPasswordErrorMsg;
    public $fieldsAreEmpty;

    public function __construct($userName, $email, $password, $confirmPassword)
    {
        $this->userName = $userName;
        $this->email = $email;
        $this->password = $password;
        $this->confirmPassword = $confirmPassword;
    }

    public function signupUser()
    {
        if ($this->checkFieldsAreEmpty()) {
            // $this->errorHandlerController("Please fill out all of the fields.");
            $this->errorHandlerController();
            
        }

        if ($this->checkUserNameIsEmpty()) {
            // $this->errorHandlerController('Must have a Username');
            $this->errorHandlerController();
           
        }

        if ($this->checkEmailIsEmpty()) {
            // $this->errorHandlerController('Must have an Email');
            $this->errorHandlerController();
           
        }

        if (!$this->validateEmail()) {
            // $this->errorHandlerController('Invalid Email');
            $this->errorHandlerController();
           
        }

        if ($this->checkPasswordIsEmpty()) {
            // $this->errorHandlerController('Must have a Password');
            $this->errorHandlerController();
           
        }

        if ($this->checkConfirmPassIsEmpty()) {
            // $this->errorHandlerController('Must Confirm Password');
            $this->errorHandlerController();
            
        }

        if (!$this->validateConfirmPassword()) {
            // $this->errorHandlerController('Passwords do not match');
            $this->errorHandlerController();
         
        }

        // if (!$this->checkUserExists()) {
        //     $this->errorHandlerController('User Already Exists');
        // }
        if ($this->checkUserExists()) {
            $this->errorHandlerController();
        }

        $this->setUser($this->userName, $this->email, $this->password);
    }

    

    private function checkFieldsAreEmpty()
    {
        return empty($this->userName) && empty($this->email) && empty($this->password) && empty($this->confirmPassword);

       

    }


    private function checkUserNameIsEmpty()
    {
        return empty($this->userName);

        // $this->userNameIsEmpty = empty($this->userName);
        // return $this->userNameIsEmpty;

    }

    private function validateEmail()
    {
   
        return !filter_var($this->email, FILTER_VALIDATE_EMAIL);
        

    }

    private function checkEmailIsEmpty()
    {
      

        return empty($this->email);

    }

    private function checkPasswordIsEmpty()
    {
      
        return empty($this->password);
        

    }

    private function checkConfirmPassIsEmpty()
    {
  
        return empty($this->confirmPassword);
      



    }

    private function validateConfirmPassword()
    {
    
        return ($this->password !== $this->confirmPassword);
  

    }

    private function checkUserExists()
    {
        return $this->checkUser($this->userName, $this->email);
    }

    protected function errorHandlerController()
    {
    
        $this->userNameErrorMsg = $this->checkUserNameIsEmpty()? 'UserName can not be empty': '';
        $this->emailErrorMsg = $this->validateEmail() ? 'Invalid Email': ($this->checkEmailIsEmpty()? 'Email can not be left empty':'');
        $this->passwordErrorMsg = $this->checkPasswordIsEmpty()? 'password is required':'';

        $this->confirmPasswordErrorMsg = $this->validateConfirmPassword()? "Passwords do not match": ($this->checkConfirmPassIsEmpty()? 'Confirm password':'') ;

        $this->fieldsAreEmpty = $this->checkFieldsAreEmpty()? "Fields can not be empty":'';

        $this->userErrorMsg = $this->checkUserExists()? "User Already Exists": '';

        $queryHasError = !empty($this->userNameErrorMsg) || !empty($this->emailErrorMsg) || !empty($this->passwordErrorMsg) || !empty($this->confirmPasswordErrorMsg) ? 'signup error': '';

        $queryString = 'signupError=' . urlencode($queryHasError)
        . '&userNameIsEmpty=' . urlencode($this->userNameErrorMsg)
        . '&emailHasError=' . urlencode($this->emailErrorMsg)
        . '&passwordHasError=' . urlencode($this->passwordErrorMsg)
        . '&confirmPasswordHasError=' . urlencode($this->confirmPasswordErrorMsg)
        . '&fieldsAreEmpty=' . urlencode($this->fieldsAreEmpty)
        . '&userExists='.urlencode($this->userErrorMsg);

        header("location:../../api/signup-form.php?$queryString");
        exit();
    }
}
