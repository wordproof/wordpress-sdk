<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Support\Authentication;

class AuthenticationController
{
    public function __construct()
    {}
    
    public function authenticate()
    {
        ray('SDK: authenticate');
        return Authentication::authorize();
    }
    
    public function redirect_on_load_page()
    {
        add_submenu_page(
            null,
            'WordProof Authenticate',
            'WordProof Authenticate',
            'manage_options',
            'wordproof-redirect-authenticate',
            [$this, 'redirect_on_load']
        );
        ray('SDK: redirect_on_load');
    }
    
    public function redirect_on_load() {
        do_action('wordproof_authenticate');
    }
    
}