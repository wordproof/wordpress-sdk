<?php

namespace WordProof\SDK\Helpers;

class TransientHelper
{
    public static function set($key, $value, $expiration = 0)
    {
        return set_site_transient($key, $value, $expiration);
    }
    
    public static function getOnce($key)
    {
        $value = get_site_transient($key);
        delete_site_transient($key);
        
        return $value;
    }
    
    public static function get($key)
    {
        return get_site_transient($key);
    }
    
}