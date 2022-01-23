<?php

namespace WordProof\SDK\Helpers;

class PostEditorHelper
{
    public static function isPostEdit($page)
    {
        return $page === 'post.php'
            || $page === 'post-new.php';
    }

    public static function getPostEditorData()
    {
        global $post;

        $currentPostType = self::getCurrentPostType();

        return [
            'data' => [
                'is_authenticated'                  => AuthenticationHelper::isAuthenticated(),
                'popup_redirect_authentication_url' => admin_url('admin.php?page=wordproof-redirect-authenticate'),
                'popup_redirect_settings_url'       => admin_url('admin.php?page=wordproof-redirect-settings'),
                'settings'                          => SettingsHelper::get(),
                'timestamp_current_post_type'       => SettingsHelper::postTypeIsInSelectedPostTypes($currentPostType),
                'current_post_type'       => $currentPostType,
                'timestamp_url' => RestApiHelper::getRestRoute('timestamp', [$post->ID])
            ],
        ];
    }

    public static function getCurrentPostType()
    {
        global $post, $typenow, $current_screen;

        if ($post && $post->post_type) {
            return $post->post_type;
        }

        if ($typenow) {
            return $typenow;
        }

        if ($current_screen && $current_screen->post_type) {
            return $current_screen->post_type;
        }

        if (isset($_REQUEST['post_type'])) {
            return sanitize_key($_REQUEST['post_type']);
        }

        return null;
    }
}
