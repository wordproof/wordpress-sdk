<?php

namespace WordProof\SDK\Helpers;

class PostEditor
{
    public static function isPostEdit($page)
    {
        return $page === 'post.php'
            || $page === 'post-new.php';
    }
    
    public static function getCurrentPostType()
    {
        global $post, $typenow, $current_screen;
        
        if ($post && $post->post_type)
            return $post->post_type;
        
        if ($typenow)
            return $typenow;
        
        if ($current_screen && $current_screen->post_type)
            return $current_screen->post_type;
        
        if (isset($_REQUEST['post_type']))
            return sanitize_key($_REQUEST['post_type']);
        
        return null;
    }
}