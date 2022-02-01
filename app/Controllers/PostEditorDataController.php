<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\PostEditorHelper;

class PostEditorDataController
{
    
    /**
     * Localizes the post edit scripts.
     *
     * @param string $hook The current page.
     */
    public function localizePostEditors($hook)
    {
        if (! PostEditorHelper::isPostEdit($hook)) {
            return;
        }

        $data = PostEditorHelper::getPostEditorData();

        //TODO Register own script
        wp_localize_script('yoast-seo-post-edit', 'wordproofSdk', $data);
        wp_localize_script('yoast-seo-post-edit-classic', 'wordproofSdk', $data);
    }
    
    /**
     * Localizes the elementor script.
     */
    public function localizeElementor()
    {
        $data = PostEditorHelper::getPostEditorData();
        wp_localize_script('yoast-seo-elementor', 'wordproofSdk', $data);
    }
}
