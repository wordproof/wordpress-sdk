<?php

namespace WordProof\SDK\Plugs;

use WordProof\SDK\Support\Authentication;

class AuthenticationPlug
{
    public function __construct()
    {
        if (!session_id()) {
            session_start();
        }
    }
    
    public function authenticate()
    {
        return Authentication::authorize();
    }
    
}