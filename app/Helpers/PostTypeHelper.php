<?php

namespace WordProof\SDK\Helpers;

class PostTypeHelper
{
    /**
     * Returns public post types.
     *
     * @return array The public post types.
     */
    public static function getPublicPostTypes()
    {
        return array_values(get_post_types(['public' => true]));
    }
    
    
}
