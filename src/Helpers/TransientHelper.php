<?php

namespace WordProof\SDK\Helpers;

class TransientHelper
{
    public static function getOnce($key)
    {
        $value = get_site_transient($key);
        delete_site_transient($key);
    
        return $value;
    }

}