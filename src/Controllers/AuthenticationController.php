<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Support\Authentication;

class AuthenticationController
{
    public function __construct()
    {}
    
    public function authenticate($redirectUrl = null)
    {
        return Authentication::authorize($redirectUrl);
    }
    
    public function addRedirectPage()
    {
        add_submenu_page(
            null,
            'WordProof Authenticate',
            'WordProof Authenticate',
            'manage_options',
            'wordproof-redirect-authenticate',
            [$this, 'redirectOnLoad']
        );
    }
    
    public function addSelfDestructPage()
    {
        add_submenu_page(
            null,
            'WordProof After Authenticate',
            'WordProof After Authenticate',
            'manage_options',
            'wordproof-close-after-redirect',
            [$this, 'closeOnLoad']
        );
    }
    
    public function redirectOnLoad() {
        do_action('wordproof_authenticate', admin_url('admin.php?page=wordproof-close-after-redirect'));
    }
    
    public function closeOnLoad() {
        echo '<script type="text/javascript">';
        echo 'window.close();';
        echo '</script>';
    }
    
}