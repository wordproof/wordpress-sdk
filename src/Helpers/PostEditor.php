<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\Support\Authentication;

class PostEditor
{
    public static function isPostEdit($page)
    {
        return $page === 'post.php'
            || $page === 'post-new.php';
    }
    
    public static function getPostEditorData() {
        $currentPostType = self::getCurrentPostType();
        
        return [
            'data' => [
                'is_authenticated'                  => AuthenticationHelper::isAuthenticated(),
                'popup_redirect_authentication_url' => admin_url('admin.php?page=wordproof-redirect-authenticate'),
                'popup_redirect_settings_url'       => admin_url('admin.php?page=wordproof-redirect-settings'),
                'settings'                          => Settings::get(),
                'timestamp_current_post_type'       => Settings::postTypeIsInSelectedPostTypes($currentPostType),
                'current_post_type'       => $currentPostType,
            ],
        ];
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