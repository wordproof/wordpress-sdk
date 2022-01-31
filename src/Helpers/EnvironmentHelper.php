<?php

namespace WordProof\SDK\Helpers;

use WordProof\SDK\Config\EnvironmentConfig;

class EnvironmentHelper
{
    public static function url()
    {
        return self::get('url');
    }

    public static function client()
    {
        return self::get('client');
    }

    public static function sslVerify()
    {
        return ! EnvironmentHelper::development();
    }

    public static function development()
    {
        return SdkHelper::getEnvironment() === 'development';
    }

    public static function get($key)
    {
        return self::values()[$key];
    }

    private static function values()
    {
        $env = SdkHelper::getEnvironment();
        return EnvironmentConfig::get($env);
    }
}
