<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\WordPressSDK;

class SDK
{
    public static function getPartner()
    {
        $sdk = WordPressSDK::getInstance();
        
        if ($sdk)
            return $sdk->partner;
        
        return null;
    }
}
