<?php

namespace WordProof\SDK\Helpers;

class PostMeta
{
    public static function add($postId, $key, $value)
    {
        return add_post_meta($postId, $key, $value, false);
    }
    public static function update($postId, $key, $value)
    {
        return update_post_meta($postId, $key, $value);
    }
    
    public static function get($postId, $key, $single = true)
    {
        return get_post_meta($postId, $key, $single);
    }
    
    public static function has($postId, $key)
    {
        return boolval(self::get($postId, $key));
    }
}