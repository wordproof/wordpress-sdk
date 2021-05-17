<?php

namespace WordProof\SDK\Plugs;

use WordProof\SDK\Support\Authentication;

class AuthenticationPlug
{
    
    public function authenticate() {
        return Authentication::authorize();
    }

}