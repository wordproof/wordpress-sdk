<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Support\Authentication;

class AuthenticationController
{
    public function __construct()
    {}
    
    public function authenticate()
    {
        return Authentication::authorize();
    }
    
}