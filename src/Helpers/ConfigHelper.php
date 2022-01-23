<?php

namespace WordProof\SDK\Helpers;

class ConfigHelper
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
        return ! ConfigHelper::development();
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

        switch ($env) {
            case 'development':
                return [
                    'url'    => 'https://myv2.test',
                    'client' => 3
                ];
            case 'development-ngrok':
                return [
                    'url'    => 'https://mywordproof.eu.ngrok.io',
                    'client' => 4
                ];
            case 'staging':
                return [
                    'url'    => 'https://staging.wordproof.com',
                    'client' => 78
                ];
            default:
                return [
                    'url'    => 'https://my.wordproof.com',
                    'client' => 79
                ];
        }
    }
}
