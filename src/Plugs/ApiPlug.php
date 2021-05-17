<?php

namespace WordProof\SDK\Plugs;

use WordProof\SDK\Support\Authentication;

class ApiPlug
{
    
    public function init()
    {
        register_rest_route('wordproof/v1', '/oauth/callback', [
            'methods'  => 'GET',
            'callback' => [$this, 'oauthCallback'],
        ]);
        register_rest_route('wordproof/v1', '/settings', [
            'methods'  => 'POST',
            'callback' => [$this, 'settings'],
        ]);
    }
    
    public function oauthCallback()
    {
        Authentication::token();
    }
    
    public function settings()
    {
        ray('TODO save settings');
    }

}