<?php

namespace WordProof\SDK\Helpers;

class NoticeHelper
{
    public static $transientKey = 'wordproof_notice';

    public static function add($noticeKey)
    {
        TransientHelper::set(self::$transientKey, $noticeKey);
    }

    public static function addTimestampNotice($response)
    {
        self::add(self::getNoticeKeyForTimestampResponse($response));
    }

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
