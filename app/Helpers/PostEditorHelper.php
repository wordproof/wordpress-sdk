<?php

namespace WordProof\SDK\Helpers;

class PostEditorHelper
{
    /**
     * Returns if the page is a post edit page.
     *
     * @param string $page The page to check.
     * @return bool If the current page is a post edit page.
     */
    public static function isPostEdit($page)
    {
        return $page === 'post.php'
            || $page === 'post-new.php';
    }
    
    /**
     * Returns the data that should be added to the post editor.
     *
     * @return array[] The post editor data.
     */
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
                'current_post_type'                 => $currentPostType,
                'timestamp_url'                     => RestApiHelper::getRestRoute('timestamp', [$post->ID])
            ],
        ];
    }
    
    /**
     * Returns the current post type.
     *
     * @return null|string The current post type.
     */
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

        // phpcs:disable WordPress.Security.NonceVerification
        if (isset($_REQUEST['post_type'])) {
            return sanitize_key($_REQUEST['post_type']);
        }
        // phpcs:enable WordPress.Security.NonceVerification

        return null;
    }
}
