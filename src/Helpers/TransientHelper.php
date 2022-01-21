<?php

namespace WordProof\SDK\Helpers;

class TransientHelper
{
    public static function set($key, $value)
    {
        return set_site_transient($key, $value);
    }
    
    public static function getOnce($key)
    {
        $value = get_site_transient($key);
        delete_site_transient($key);
        
        return $value;
    }
    
}