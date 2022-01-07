<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\PostEditor;
use WordProof\SDK\Helpers\Settings;
use WordProof\SDK\Support\Authentication;

class PostEditorController
{
    
    public function __construct() {}
    
    public function localizeScripts($hook)
    {
        if ( ! PostEditor::isPostEdit($hook) )
            return;
        
        //make retrievable via ajax
        
        $currentPostType = PostEditor::getCurrentPostType();
        $data = [
            'data' => [
                'is_authenticated'                  => Authentication::isAuthenticated(),
                'popup_redirect_authentication_url' => admin_url('admin.php?page=wordproof-redirect-authenticate'),
                'popup_redirect_settings_url'       => admin_url('admin.php?page=wordproof-redirect-settings'),
                'settings'                          => Settings::get(),
                'timestamp_current_post_type'       => Settings::postTypeIsInSelectedPostTypes($currentPostType),
                'current_post_type'       => $currentPostType,
            ],
        ];
        
        //TODO Register own script
        wp_localize_script('yoast-seo-post-edit', 'wordproofSdk', $data);
        wp_localize_script('yoast-seo-post-edit-classic', 'wordproofSdk', $data);
        wp_localize_script('yoast-seo-elementor', 'wordproofSdk', $data);
    }
}