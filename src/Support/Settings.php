<?php

namespace WordProof\SDK\Support;

use WordProof\SDK\Helpers\Options;
use WordProof\SDK\Helpers\SDK;

class Settings
{
    public static function redirect($redirectUrl = null)
    {
        if (!Authentication::isAuthenticated())
            return;
    
        $options = Options::all();
        
        if (!$options->source_id)
            return;
        
        $endpoint = "/sources/" . $options->source_id . "/settings";
        
        if (SDK::getPartner() === 'yoast')
            $endpoint = '/yoast/dashboard';
        
        Authentication::redirect($endpoint, [
            'redirect_uri' => $redirectUrl,
            'partner' => SDK::getPartner(),
            'source_id' => $options->source_id,
            'access_token' => $options->access_token
        ]);
    }
    
}