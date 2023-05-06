<?php

class LoginController extends login
{
    private $userName;
    private $password;
    public $emptyName;
    public $emptyPass;

    //construct
    public function __construct($userName, $password)
    {
        $this->userName = $userName;
        $this->password = $password;

    }

    //throw error

    public function loginUser()
    {
        
 
        if($this->nameIsEmpty() && $this->loginPassIsEmpty()) {
            $this->emptyName = "⚠️ Name is required. ";
            $this->emptyPass = "⚠️ Password is required ";
        } else {
            //  check for empty name
            if ($this->nameIsEmpty()) {
                $this->emptyName = "⚠️ Name is required. ";
            }
            // check for empty pass
            if ($this->loginPassIsEmpty()) {
                $this->emptyPass = "⚠️ Password is required ";
            }
        }

   


        if(!empty($this->emptyName) || !empty($this->emptyPass) ||(!empty($this->emptyName) && !empty($this->emptyPass))) {
            header("location:../index.php?error=&emptyName=". urlencode($this->emptyName). "&emptyPass=". urlencode($this->emptyPass));
            exit();
        }


        

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
