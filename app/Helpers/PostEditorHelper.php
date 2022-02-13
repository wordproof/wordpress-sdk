<?php

namespace WordProof\SDK\Helpers;

class PostEditorHelper
{
    /**
     * Returns the post editor that is in use.
     *
     * @return bool The post editor the user is using..
     */
    public static function getPostEditor()
    {
        if (!function_exists('get_current_screen')) {
            return null;
        }
        
        $screen = get_current_screen();
        
        if (!self::isPostEdit($screen->base)) {
            return null;
        }
        
        // Start with Elementor, otherwise the block editor will be returned.
        $action = \filter_input(\INPUT_GET, 'action', \FILTER_SANITIZE_STRING);
        if ($action === 'elementor') {
            return 'elementor';
        }
        
        if (method_exists($screen, 'is_block_editor') && $screen->is_block_editor()) {
            return 'block';
        }
        
        return 'classic';
    }
    
    
    /**
     * Returns if the page is a post edit page.
     *
     * @param string $page The page to check.
     * @return bool If the current page is a post edit page.
     */
    public static function isPostEdit($page)
    {
        switch ($page) {
            case 'post.php':
            case 'post':
            case 'post-new.php':
            case 'post-new':
                return true;
            default:
                return false;
        }
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
                'origin'                            => EnvironmentHelper::get('url'),
                'is_authenticated'                  => AuthenticationHelper::isAuthenticated(),
                'popup_redirect_authentication_url' => admin_url('admin.php?page=wordproof-redirect-authenticate'),
                'popup_redirect_settings_url'       => admin_url('admin.php?page=wordproof-redirect-settings'),
                'settings'                          => SettingsHelper::get(),
                'timestamp_url'                     => RestApiHelper::getRestRoute('timestamp', [$post->ID]),
                'current_post_id'                   => $post->ID,
                'post_editor'                       => self::getPostEditor(),

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
