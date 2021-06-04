<?php

namespace WordProof\SDK\Requests;

class TimestampRequest {
    
    public static function fromPostId($id): array {
        
        $post = get_post($id);
        
        return [
            'uid' => $post->ID,
            'date_modified' => get_post_modified_time('c', false, $post->ID),
            'title' => $post->post_title,
            'url' => get_permalink($post),
            'content' => $post->post_content,
        ];
    }
}