<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\DataTransferObjects\TimestampData;
use WordProof\SDK\Support\Timestamp;

class TimestampHelper
{
    public static function debounce(\WP_Post $post)
    {
        $key = 'wordproof_timestamped_debounce_' . $post->id;
        $data = TimestampData::fromPost($post);

        $transient = TransientHelper::get($key);

        if ($transient) {
            return $transient;
        }

        if (!self::shouldBeTimestamped($post, $data)) {
            $response = (object)['status' => 200, 'message' => 'Post should not be timestamped'];
            return new \WP_REST_Response($response, $response->status);
        }

        $response = Timestamp::sendPostRequest($data);

        if ($response === false) {
            $response = (object)['status' => 400, 'message' => 'Something went wrong.'];
            return new \WP_REST_Response($response, $response->status);
        }

        $response->status = 201;

        TransientHelper::set($key, $response, 5);

        return new \WP_REST_Response($response, $response->status);
    }

    public static function shouldBeTimestamped(\WP_Post $post, $data)
    {
        if (!AuthenticationHelper::isAuthenticated()) {
            return false;
        }

        if ($post->post_content === '') {
            return false;
        }

        if (!in_array($post->post_status, ['publish', 'inherit'], true)) {
            return false;
        }

        if (SettingsHelper::postTypeIsInSelectedPostTypes($post->post_type)) {
            return true;
        }

        if (self::hasPostMetaOverrideSetToTrue($post)) {
            return true;
        }

        return false;
    }

    private static function hasPostMetaOverrideSetToTrue(\WP_Post $post)
    {
        $timestampablePostMetaKeys = apply_filters('wordproof_timestamp_post_meta_key_overrides', ['_wordproof_timestamp']);

        //Do not use PostMeta helper
        $meta = get_post_meta($post->ID);

        foreach ($timestampablePostMetaKeys as $key) {
            if (!isset($meta[$key])) {
                continue;
            }

            if (is_array($meta[$key])) {
                $value = boolval($meta[$key][0]);
            } else {
                $value = boolval($meta[$key]);
            }

            if (!$value) {
                continue;
            }

            return true;
        }

        return false;
    }
}
