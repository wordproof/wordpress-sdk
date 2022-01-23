<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\WordPressSDK;

class SdkHelper
{
    public static function getPartner()
    {
        $sdk = WordPressSDK::getInstance();
        
        if ($sdk)
            return $sdk->partner;
        
        return null;
    }
    public static function getEnvironment()
    {
        $sdk = WordPressSDK::getInstance();
        
        if ($sdk)
            return $sdk->environment;
        
        return null;
    }
}
