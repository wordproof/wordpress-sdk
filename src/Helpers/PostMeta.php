<?php

namespace WordProof\SDK\Helpers;

class PostMeta
{
    public static function set($postId, $key, $value)
    {
        $value = apply_filters('wordproof_update_post_meta_value', $value);
        return update_post_meta($postId, $key, $value);
    }
    
    public static function get($postId, $key)
    {
        $value = get_post_meta($postId, $key, true);
        return apply_filters('wordproof_get_post_meta_value', $value);
    }
    
    public static function has($postId, $key): bool
    {
        return boolval(self::get($postId, $key));
    }
}