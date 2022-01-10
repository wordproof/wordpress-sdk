<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\PostEditor;

class PostEditorController
{
    
    public function __construct() {}
    
    public function localizePostEditors($hook)
    {
        if ( ! PostEditor::isPostEdit($hook) )
            return;
        
        $data = PostEditor::getPostEditorData();
        
        //TODO Register own script
        wp_localize_script('yoast-seo-post-edit', 'wordproofSdk', $data);
        wp_localize_script('yoast-seo-post-edit-classic', 'wordproofSdk', $data);
    }
    
    public function localizeElementor($hook) {
        $data = PostEditor::getPostEditorData();
        wp_localize_script('yoast-seo-elementor', 'wordproofSdk', $data);
    }
}