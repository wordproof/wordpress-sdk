<?php

namespace WordProof\SDK\Helpers;

class OptionsHelper
{
    private static $prefix = 'wordproof_';
    private static $optionKeys = ['access_token', 'source_id'];

    public static function set($key, $value)
    {
        return update_option(self::$prefix . $key, $value);
    }

    public static function delete($key)
    {
        return delete_option(self::$prefix . $key);
    }

    public static function get($key)
    {
        return get_option(self::$prefix . $key);
    }

    public static function all()
    {
        foreach (self::$optionKeys as $key) {
            $options[$key] = self::get($key);
        }
        return (object)$options;
    }

    public static function reset()
    {
        foreach (self::$optionKeys as $key) {
            self::delete($key);
        }
    }

    public static function accessToken()
    {
        return self::get('access_token') ?: null;
    }

    public static function sourceId()
    {
        return self::get('source_id') ?: null;
    }

    public static function setAccessToken($value)
    {
        return self::set('access_token', $value);
    }

    public static function setSourceId($value)
    {
        return self::set('source_id', $value);
    }
}
