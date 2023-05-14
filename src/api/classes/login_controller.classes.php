<?php

class LoginController extends login
{
    private $userName;
    private $password;
    public $nameValidationMessage;
    public $passwordValidationMessage;

    //construct
    public function __construct($userName, $password)
    {
        //sanitize input
        // $this->userName = htmlspecialchars($userName);
        // $this->password = htmlspecialchars($password);
        $this->userName = $userName;
        $this->password = $password;

    }

    //throw error

    public function loginUser()
    {
        
 
        if($this->nameIsEmpty() && $this->loginPassIsEmpty()) {
            $this->nameValidationMessage = "⚠️ Name is required. ";
            $this->passwordValidationMessage = "⚠️ Password is required ";
        } else {
            //  check for empty name
            if ($this->nameIsEmpty()) {
                $this->nameValidationMessage = "⚠️ Name is required. ";
            }
            // check for empty pass
            if ($this->loginPassIsEmpty()) {
                $this->passwordValidationMessage = "⚠️ Password is required ";
            }
        }

   


        if(!empty($this->nameValidationMessage) || !empty($this->passwordValidationMessage) ||(!empty($this->nameValidationMessage) && !empty($this->passwordValidationMessage))) {
            header("location:../../../index.php?error=&nameValidationMessage=". urlencode($this->nameValidationMessage). "&passwordValidationMessage=". urlencode($this->passwordValidationMessage));
            exit();
        }


        //get user data and run user authnetication
        $this->getUser($this->userName, $this->password);

    }

  

    protected function nameIsEmpty()
    {

        return  empty($this->userName)  ;

   
    }

    protected function loginPassIsEmpty()
    {
     
        return empty($this->password) ;
   
    }


}
