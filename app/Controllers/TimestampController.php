<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\TimestampHelper;

class TimestampController
{
    /**
     * Timestamp an post triggered by custom action.
     *
     * @param integer $postId The post id to be timestamped.
     * @action wordproof_timestamp
     */
    public static function timestamp($postId)
    {
        $post = get_post(intval($postId));

        return TimestampHelper::debounce($post);
    }
    
    /**
     * Timestamp new posts except those inserted by the API..
     *
     * @param integer $postId The post id to be timestamped.
     * @param \WP_Post $post The post to be timestamped.
     * @action wp_insert_post
     */
    public function timestampAfterPostRequest($postId, $post)
    {
        if (\defined('REST_REQUEST') && \REST_REQUEST) {
            return;
        }

        return TimestampHelper::debounce($post, true);
    }
    
    /**
     * Timestamp posts inserted by the API.
     *
     * @param \WP_Post $post The post to be timestamped.
     * @action rest_after_insert_post
     */
    public function timestampAfterRestApiRequest($post)
    {
        return TimestampHelper::debounce($post);
    }
}