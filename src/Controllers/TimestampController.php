<?php

namespace WordProof\SDK\Controllers;

use WordProof\SDK\Helpers\TimestampHelper;

class TimestampController
{
    public static function timestamp($postId)
    {
        $post = get_post(intval($postId));
        
        return TimestampHelper::debounce($post);
    }
    
    public function timestampAfterPostRequest($postId, $post)
    {
        if (\defined('REST_REQUEST') && \REST_REQUEST)
            return;
    
        return TimestampHelper::debounce($post, true);
    }
    
    public function timestampAfterRestApiRequest($post)
    {
        return TimestampHelper::debounce($post);
    }
}