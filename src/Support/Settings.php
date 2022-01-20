<?php

namespace WordProof\SDK\Support;

use WordProof\SDK\Helpers\AuthenticationHelper;
use WordProof\SDK\Helpers\Options;
use WordProof\SDK\Helpers\SDK;

class Settings
{
    public static function redirect($redirectUrl = null)
    {
        if (!AuthenticationHelper::isAuthenticated())
            return false;
    
        $options = Options::all();
        
        if (!$options->source_id)
            return false;
        
        $endpoint = "/sources/" . $options->source_id . "/settings";
        
        if (SDK::getPartner() === 'yoast')
            $endpoint = '/yoast/dashboard';
        
        Authentication::redirect($endpoint, [
            'redirect_uri' => $redirectUrl,
            'partner' => SDK::getPartner(),
            'source_id' => $options->source_id,
            'access_token_login' => $options->access_token
        ]);
    }
    
}