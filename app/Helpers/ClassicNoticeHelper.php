<?php

namespace WordProof\SDK\Helpers;

class ClassicNoticeHelper
{
    /**
     * @var string The key used for the transient to save the single notice.
     */
    public static $transientKey = 'wordproof_notice';
    
    /**
     * Add a new transient with a notice key.
     *
     * @param string $noticeKey The noticeKey that should be displayed to the user.
     */
    public static function add($noticeKey)
    {
        TransientHelper::set(self::$transientKey, $noticeKey);
    }
    
    /**
     * Add new notice depending on the timestamp response.
     *
     * @param object $response The timestamp response.
     */
    public static function addTimestampNotice($response)
    {
        self::add(self::getNoticeKeyForTimestampResponse($response));
    }
    
    /**
     * Retrieve notice key for the timestamp response.
     *
     * @param object $response The timestamp response.
     * @return string The notice key for this response.
     */
    private static function getNoticeKeyForTimestampResponse($response)
    {
        if (isset($response->balance) && $response->balance === 0) {
            return 'no_balance';
        }

        if (isset($response->hash)) {
            return 'timestamp_success';
        }

        return 'timestamp_failed';
    }
}
