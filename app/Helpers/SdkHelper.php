<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\WordPressSDK;

class SdkHelper
{
    /**
     * Returns the partner set during initialization.
     *
     * @return string|null
     */
    public static function getPartner()
    {
        $sdk = WordPressSDK::getInstance();

        if ($sdk) {
            return $sdk->partner;
        }

        return null;
    }

    /**
     * Returns the environment set during initialization.

     * @return string|null
     */
    public static function getEnvironment()
    {
        $sdk = WordPressSDK::getInstance();

        if ($sdk) {
            return $sdk->environment;
        }

        return null;
    }
}
