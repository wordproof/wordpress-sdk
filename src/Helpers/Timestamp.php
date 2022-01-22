<?php

namespace WordProof\SDK\Helpers;

class Timestamp
{
    public static function shouldBeTimestamped(\WP_Post $post, $data)
    {
        if (!in_array($post->post_status, ['publish', 'inherit']))
            return false;
        
        if (self::hashInputExists($data)) {
            return false;
        }
        
        if (Settings::postTypeIsInSelectedPostTypes($post->post_type))
            return true;

        if (self::hasPostMetaOverrideSetToTrue($post))
            return true;
        
        return false;
    }
    
    public static function addNotice($response) {
        if (self::timestampRequestIsSuccessful($response)) {
            NoticeHelper::add('timestamp_success');
        } else {
            NoticeHelper::add('timestamp_failed');
        }
    }
    
    private static function timestampRequestIsSuccessful($response) {
        if (isset($response->balance) && $response->balance === 0)
            return 'no_balance';
        
        return isset($response->hash);
    }
    
    private static function hasPostMetaOverrideSetToTrue(\WP_Post $post) {
        
        $timestampablePostMetaKeys = apply_filters('wordproof_timestamp_post_meta_key_overrides', ['wordproof_timestamp']);
        
        //Do not use PostMeta helper
        $meta = get_post_meta($post->ID);
        
        foreach ($timestampablePostMetaKeys as $key) {

            if (!isset($meta[$key]))
                continue;
        
            if (is_array($meta[$key])) {
                $value = boolval($meta[$key][0]);
            } else {
                $value = boolval($meta[$key]);
            }
            
            if (!$value)
                continue;
        
            return true;
        }
        
        return false;
    }
    
    private static function hashInputExists($data) {
//        ray()->blue();
        return PostMeta::has($data['uid'], '_wordproof_hash_input_' . $data['hash']);
    }
}
