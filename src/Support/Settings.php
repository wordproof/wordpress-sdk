<?php

namespace WordProof\SDK\Support;

use WordProof\SDK\Helpers\SDK;

class Settings
{
    public static function redirect($redirectUrl = null)
    {
        if (!Authentication::isAuthenticated())
            return;
        
        $sourceId = get_option('wordproof_source_id');
        
        if (!$sourceId)
            return;
        
        $endpoint = "/sources/" . $sourceId . "/settings";
        Authentication::redirect($endpoint, [
            'redirect_uri' => $redirectUrl,
            'partner' => SDK::getPartner()
        ]);
    }
    
}