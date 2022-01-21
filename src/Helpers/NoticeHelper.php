<?php

namespace WordProof\SDK\Helpers;

class NoticeHelper
{
    public static $transientKey = 'wordproof_notice';
    
    public static function add($noticeKey)
    {
        TransientHelper::set(self::$transientKey, $noticeKey);
    }
}
