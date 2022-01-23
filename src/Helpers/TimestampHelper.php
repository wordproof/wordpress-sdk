<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\DataTransferObjects\TimestampData;
use WordProof\SDK\Support\Timestamp;

class TimestampHelper
{
    public static function debounce(\WP_Post $post, $withClassicEditorNotice = false)
    {
        $key = 'wordproof_timestamped_debounce_' . $post->id;

        $data = TimestampData::fromPost($post);

        if (!self::shouldBeTimestamped($post, $data)) {
            return;
        }

        $transient = TransientHelper::get($key);

        if ($transient) {
            return $transient;
        }

        $response = Timestamp::sendPostRequest($data);
        TransientHelper::set($key, $response, 5);

        if ($withClassicEditorNotice) {
            NoticeHelper::addTimestampNotice($response);
        }

        return $response;
    }

    public static function shouldBeTimestamped(\WP_Post $post, $data)
    {
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
        $timestampablePostMetaKeys = apply_filters('wordproof_timestamp_post_meta_key_overrides', ['wordproof_timestamp']);

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
