<?php

namespace WordProof\SDK\DataTransferObjects;

class TimestampData
{
    /**
     * Get timestamp data from post object.
     *
     * @param \WP_Post $post
     * @return array
     */
    public static function fromPost($post)
    {
        if ($post->post_type === 'attachment') {
            $content = hash_file('sha256', \get_attached_file($post->ID));
        } else {
            $content = $post->post_content;
        }
        
        return [
            'uid'           => $post->ID,
            'date_modified' => \get_post_modified_time('c', false, $post->ID),
            'title'         => $post->post_title,
            'url'           => \get_permalink($post),
            'content'       => $content,
        ];
    }
}
