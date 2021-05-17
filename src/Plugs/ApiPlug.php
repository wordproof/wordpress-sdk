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
        
        register_rest_route('wordproof/v1', '/webhook', [
            'methods'  => 'POST',
            'callback' => [$this, 'webhook'],
        ]);
    }
    
    public function oauthCallback()
    {
        Authentication::token();
        //TODO what now?
    }
    
    public function webhook(\WP_REST_Request $request)
    {
        ray($request);
    }

}