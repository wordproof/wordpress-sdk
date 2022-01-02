<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Support\Settings;

class SettingsController
{
    public function __construct()
    {}
    
    public function redirect($redirectUrl = null)
    {
        return Settings::redirect($redirectUrl);
    }
    
    public function addRedirectPage()
    {
        add_submenu_page(
            null,
            'WordProof Settings',
            'WordProof Settings',
            'manage_options',
            'wordproof-redirect-settings',
            [$this, 'redirectOnLoad']
        );
    }
    
    public function redirectOnLoad() {
        do_action('wordproof_settings', admin_url('admin.php?page=wordproof-close-after-redirect'));
    }

    
}