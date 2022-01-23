<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\PostEditorHelper;

class PostEditorController
{
    public function __construct()
    {
    }

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

    public function localizeElementor($hook)
    {
        $data = PostEditorHelper::getPostEditorData();
        wp_localize_script('yoast-seo-elementor', 'wordproofSdk', $data);
    }
}
