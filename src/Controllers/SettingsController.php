<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\Redirect;
use WordProof\SDK\Support\Settings;

class SettingsController
{
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
            [$this, 'redirectPageContent']
        );
    }
    
    /**
     * The content for the redirect page.
     */
    public function redirectPageContent()
    {
    }
    
    /**
     * Gets triggered by the 'load-admin_page_' hook of the redirect page
     */
    public function redirectOnLoad()
    {
        $closeWindowUrl = admin_url('admin.php?page=wordproof-close-after-redirect');
        if ($this->redirect($closeWindowUrl) === false) {
            do_action('wordproof_authenticate', $closeWindowUrl);
        }
    }
}