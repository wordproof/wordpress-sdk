<?php

namespace WordProof\SDK\Helpers;

class BlocksHelper {
    
    private static $containsBlockMeta = '_wordproof_contains_block';
    
    /**
     * @param $post
     * @param $value
     * @return void
     */
    public static function setContainsBlock($postId, $value) {
        PostMetaHelper::update($postId, self::$containsBlockMeta, $value);
    }
    
    /**
     * @param $post
     * @return mixed
     */
    public static function getContainsBlock($postId) {
        return PostMetaHelper::get($postId, self::$containsBlockMeta);
    }
}