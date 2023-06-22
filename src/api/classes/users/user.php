<?php
namespace User;

use \Pins\Pins;

//a user class
/**
 * SIGNED user -
   * sends pin to the BE
   *userName
   * CRUD featues
   *** for pins, account deletion, editing name
   * sends pin to the FE
 */

/**
 * GUEST:
 * sends pin to the BE, with expiry date
 * sends pin to the FE
 */

abstract class User
{
    protected int $id;
    protected string $username;
    protected Pins $pins;

    public function __construct(
        int $id,
        string $username,
        Pins  $pins
    ) {
        //* you can also try Promotional properties here as well.
        $this->id = $id;
        $this->username = $username;
        $this->pins = $pins;
        
    }

    //send pin to the mysql db
    

}
