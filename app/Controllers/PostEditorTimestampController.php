<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\AssetHelper;
use WordProof\SDK\Helpers\PostMetaHelper;
use WordProof\SDK\Helpers\PostTypeHelper;

class PostEditorTimestampController
{
    
    private $metaKey = '_wordproof_timestamp';
    private $classicEditorNonceKey = 'wordproof_timestamp_classic_nonce';
    
    /**
     * Registers post meta for all public post types.
     *
     * @action init
     */
    public function registerPostMeta()
    {
        foreach (PostTypeHelper::getPublicPostTypes() as $postType) {
            register_post_meta($postType, $this->metaKey, [
                'show_in_rest'  => true,
                'single'        => true,
                'type'          => 'boolean',
                'default'       => false,
                'supports'      => ['editor', 'title', 'custom-fields'],
                'auth_callback' => [$this, 'userCanEditPosts']
            ]);
        }
    }
    
    /**
     * Returns if the current user can edit posts.
     *
     * @return boolean
     */
    public function userCanEditPosts()
    {
        return current_user_can('edit_posts');
    }
    
    /**
     * Enqueues the post-meta-option script.
     *
     * @action enqueue_block_editor_assets
     * @script post-meta-option
     */
    public function enqueueScript()
    {
        AssetHelper::enqueue('post-meta-option');
    }
    
    /**
     * Add Metabox to classic editor.
     *
     * @action add_meta_boxes
     */
    public function addMetaboxToClassicEditor()
    {
        foreach (PostTypeHelper::getPublicPostTypes() as $postType) {
            add_meta_box(
                'wordproof_timestamp_metabox',
                'WordProof Timestamp',
                [$this, 'classicMetaboxHtml'],
                $postType,
                'side',
                'default',
                [
                    '__back_compat_meta_box' => true,
                ]
            );
        }
    }
    
    /**
     * Save the meta box meta value for the classic editor.
     *
     * @param integer $postId The post ID.
     * @action save_post
     */
    public function saveClassicMetaboxPostMeta($postId)
    {
        if (array_key_exists($this->classicEditorNonceKey, $_POST)) {
            if (wp_verify_nonce($_POST[$this->classicEditorNonceKey], 'save_post')) {
                update_post_meta(
                    $postId,
                    $this->metaKey,
                    array_key_exists($this->metaKey, $_POST)
                );
            }
        }
    }
    
    /**
     * Display the meta box HTML to Classic Editor users.
     *
     * @param \WP_Post $post Post object.
     */
    public function classicMetaboxHtml($post)
    {
        $value = PostMetaHelper::get($post->ID, $this->metaKey);
        
        wp_nonce_field('save_post', $this->classicEditorNonceKey);
        ?>
        <input type="checkbox" id="<?php echo $this->metaKey; ?>" name="<?php echo $this->metaKey; ?>"
               value="1" <?php echo boolval($value) ? 'checked' : ''; ?>>
        <label for="<?php echo $this->metaKey; ?>">Timestamp this post</label>
        <?php
    }
}
