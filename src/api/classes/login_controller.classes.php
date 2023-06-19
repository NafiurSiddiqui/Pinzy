<?php



class LoginController
{
    
    public $userName;
    public $password;
    public $nameValidationMessage;
    public $passwordValidationMessage;
    private $login;

    //construct
    public function __construct($userName, $password, $login)
    {
        //sanitize input
        $this->userName = htmlspecialchars($userName);
        $this->password = $password;
        $this->login = $login;

    }

    //throw error

public function loginUser()
{
    if ($this->nameIsEmpty() && $this->loginPassIsEmpty()) {
        $this->nameValidationMessage = "Name is required. ";
        $this->passwordValidationMessage = "Password is required. ";
    } else {
        if ($this->nameIsEmpty()) {
            $this->nameValidationMessage = "Name is required. ";
        }

        if ($this->loginPassIsEmpty()) {
            $this->passwordValidationMessage = "Password is required. ";
        }
    }

    if (!empty($this->nameValidationMessage) || !empty($this->passwordValidationMessage)) {
        header("location:../../../index.php?loginError=&nameValidationMessage=". urlencode($this->nameValidationMessage). "&passwordValidationMessage=". urlencode($this->passwordValidationMessage));
        exit();
    }

    //get user data and run user authentication
    $this->login->getUser($this->userName, $this->password);
}

    protected function nameIsEmpty()
    {
        return  empty($this->userName);
    }

    protected function loginPassIsEmpty()
    {
        return empty($this->password) ;

    }


}
