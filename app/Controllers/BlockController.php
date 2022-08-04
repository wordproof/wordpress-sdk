<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\BlocksHelper;
use WordProof\SDK\Helpers\PostMetaHelper;
use WordProof\SDK\Helpers\SettingsHelper;

class BlockController
{
    /**
     * @return string
     */
    private function getBlockSlug() {
        return 'wordproof/certificate-button';
    }
    
    /**
     * Register blocks
     *
     * @return void
     */
    public function registerBlocks() {
        \register_block_type( $this->getBlockSlug(), [
            'render_callback' => [$this, 'renderBlock'],
        ]);
    }
    
    /**
     * @param $attributes
     * @param $content
     * @return void
     */
    public function renderBlock($attributes, $content) {
        return apply_filters('wordproof_certificate_button', false);
    }
    
    /**
     * @return void
     */
    public function savePost($post_id, \WP_Post $post)
    {
        $slug = $this->getBlockSlug();
        $contains = str_contains($post->post_content, "<!-- wp:$slug /-->");
        BlocksHelper::setContainsBlock($post_id, $contains);
    }
}