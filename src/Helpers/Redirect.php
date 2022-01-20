<?php

namespace WordProof\SDK\Helpers;

class Redirect
{
    public static function safe($url)
    {
        nocache_headers();
        wp_safe_redirect($url);
        exit;
    }

}
